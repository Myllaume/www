---
title: Le relais des données de D3
description: Comment la biliothèque JavaScript D3 actualise t-elle les données intégrées ?
date: "2021-06-30"
keywords:
  - graphe
tags: devblog
layout: post.njk
eleventyExcludeFromCollections: true
---

La bibliothèque D3 permet de réaliser des diagrammes, graphes et autres visualisations. C'est aussi, moins abstraitement, une formidable usine permettant de manipuler des données et les éléments du DOM qui y sont liés.

Ci-dessous on déclare et affecte

- un jeu de données pour un graphe (objet `data`),
- l'élement du DOM qui va contenir la mise en forme des éléments du graphe (objet `svg`),
- l'objet qui va contenir le code source, les fonctions permettant de manipuler ces différents éléments du graphe (objet `elts`).

```javascript
const data = {
        nodes: [
            { id: 1, label: 'item 1', type: 'note', hidden: false },
            { id: 2, label: 'item 1', type: 'idea', hidden: false }
        ],
        links: [ { id: 1, source: 1, target: 2 } ]
    }
    , svg = d3.select("#graph") // <svg id="graph"></svg>
    , elts = {};

// génération des nœuds
elts.nodes = svg.append("g")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g");

// génération des liens
elts.links = svg.append("g")
    .selectAll("line")
    .data(data.links)
    .enter().append("line");
```

L'enchaînement des fonctions `append()` et `data()` réalise l'interface entre les éléments intégrés au DOM et leur pendant abstrait. Le second permet d'appliquer des traitements arbitraires à ces éléments, mais aussi d'actualiser le jeu de données original.

Ci-dessous, on affecte à chaque nœud un attribut `data-node` avec pour valeur son propre identifiant. L'effet est immédiat sur l'ensemble des nœuds du graphe (en tant qu'élément HTML).

```javascript
elts.nodes
    .attr("data-node", (d) => d.id)
    // <g data-node="1"></g>
```

On peut aussi programmer une fonction qui va cacher certain nœuds. Dans ce cas, il est nécessaire de traiter les données avant d'affecter un attribut permettant de cacher l'élément, comme ci-dessous.

```javascript
function hideType(typeName) {
    const nodesToHide = elts.nodes.filter(n => n.type === typeName);
    nodesToHide.style('display', 'none');
}
```

On affecte à la constante `nodesToHide` un objet avec un formatage particulier à D3. Si D3 intègre une fonction `filter`, il n'est pas possible de lui appliquer les structures de contrôle habituelles de JavaScript comme `map` ou `for`. Si l'on souhaite obtenir un tableau d'objets standard, il est nécessaire faire appel à la fonction `data()` comme ci-dessous.

```javascript
elts.nodes
    .filter(n => n.type === 'idea')
    .data()
    .map(function (n) {
        // cette affectation n'est qu'un exemple et n'a pas d'incidence sur le jeu de données
        n.hidden = true;
        return n;
    });
```

Si D3 me permet de visualiser mon jeu de données, de manipuler ses valeurs et son affichage, il n'est pas le seul à en dépendre. D'autres fonctions de mon code source doivent effectuer des tests sur mon objet `data` pour disposer d'autres fonctionnalités. Par exemple, je souhaite que le moteur de recherche intégré à la page ne suggère comme résultats de recherche que les nœuds qui n'ont pas été cachés (`hidden: true`).

Je suis alors face à une difficulté : comment actualiser mon objet `data` quand mes traitements ne concernent que quelques éléments de l'objet `elts` ? C'est ce second objet qui me permet de manipuler les éléments. Par son biais, j'aimerais pouvoir affecter différents booléens dans mon objet `data` m'assurant de l'état des l'élément. Pour cela je ne veux pas avoir à analyser les éléments avec des sélécteurs, mais à vérifier dans l'objet `data` quels sont les éléments cachés, les éléments en surbrillance, ou même ceux qui ont été supprimés.

Heureusement, D3 garde toujours un lien avec le jeu de données original. Souvenons-nous du premier extrait de code et de l'appel `data(data.nodes)`. L'interface n'a jamais cessé et il est très simple de réaffecter à D3 un jeu de données actualisé à l'objet `elts.nodes` qu'il va automatiquement repercuter sur l'objet `data.nodes`.

Dans l'extrait de code ci-dessous, j'effectue un mes tests avec l'objet `data.nodes` car il est d'une forme standard et donc plus souple à manipuler. Je fais appel à l'objet `elts.nodes` pour le traitement, mais aussi pour qu'il réaffecte ses propres valeurs.

```javascript
function hideType(typeName) {
    let nodesToHideIds;

    nodesToHideIds = data.nodes
        .filter(n => n.type === typeName)
        .map(node => node.id);

    elts.nodes
        .filter(n => nodesToHideIds.includes(n.id))
        .style('display', 'none');

    // => le nœud en tant qu'élément est caché

    elts.nodes.data(
        elts.nodes
            .data()
            .map(function(n) {
                if (nodesToHideIds.includes(n.id)) {
                    n.hidden = true; }

                return n;
            })
        );

    // => l'objet 'data.nodes' est actualisé : { id: 2, label: 'item 1', type: 'idea', hidden: true }
}
```