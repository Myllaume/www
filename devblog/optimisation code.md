---
title: Optimisation du code
description: Analogie pour explicier l’approche modulaire d’un problème par les développeurs
date: "2020-01-01"
keywords:
  - programmation modulaire
tags: devblog
layout: post.njk
---

Voici une analogie pour expliciter un problème de développement et une réflexion sur les solutions à adopter :

Vous avez d’une part une casserole d’eau froide par-terre et d’autre part une plaque chaude posée sur un meuble. Vous devez faire bouillir cette eau. Vous prenez donc la casserole sur le sol et la placez sur la plaque pour qu’elle chauffe et finisse par bouillir. Après cela, on vous pose une seconde casserole avec le même objectif. Cette casserole est sur une table. Que faites-vous ?

# Deux coups, un geste

S’il suffisait simplement de la déplacer à son tour sur la plaque de cuisson, nous ne parlerions pas de cette situation. Un développeur serait effectivement tenté de faire autrement. Nous avons dû faire face à un objectif simple : porter une casserole à un endroit précis pour qu’elle puisse chauffer jusqu’à bouillir. La casserole d’eau bouillante, c’est la sortie, le résultat final. Or, nous avons deux entrées différentes, deux situations initiales différentes pour nos deux casseroles d’eau froide. L’une part du sol et l’autre de la table. Quel traitement faut-il faire pour que de deux entrées, d’un même geste, nous puissions arriver à l’unique sortie attendue : l’eau boue.

Après avoir fait face à la première situation, un développeur n’aurait pas pu inventer la seconde, mais au moins l’anticiper dans sa logique de travail. Il ne peut plus partir du sol, il doit partir de la table. Faut-il donc tout recommencer ? Refaire un autre programme qui part de la table ? Un développeur pourrait pour cette nouvelle situation développer un second programme qui va placer la casserole par-terre. Il pourra ensuite exécuter son premier programme, développé pour le première situation, qui placera la casserole sur la plaque de cuisson.

Ainsi, il ne va pas complexifier son programme initial en multipliant les possibilités d’entrée, pas plus qu’il ne va réécrire ce programme pour pallier à chaque variation. Si elles venaient à devenir nombreuses, un seul programme deviendrait trop lourd pour pallier toutes les situations. Un développeur expérimenté aura la méthode pour développer plusieurs petites fonctions reliées entre elles afin de s’adapter à une multitude d’entrées.

# Entre deux lecteurs

De cette manière, on répond à un problème initial, puis à une surprise et finalement on fait place à de nouvelles éventualités. Il est plus facile d’empiler de petites briques que de concevoir un gros bloc. Ce dernier serait plus difficile à développer, mais aussi moins malléable, ou avec des risques d’erreur. Des petits blocs peuvent être appréhendés plus facilement, limitant ainsi les bugs et facilitant leur mise à jour. De plus, il est possible de les assembler et ré-assembler dans une logique orientée objet.

En tant que développeur on va chercher la faciliter de lecture, de travail. Le code est destiné à être lu par une machine et un code moins verbeux serait aussi moins lourd à exécuter. Pourtant, on donne priorité à la lecture humaine, celle du responsable et non de l’exécutant des programmes. L’optimisation c’est concilier ces deux lecteurs à travers l’interface homme-machine qu’est le langage.