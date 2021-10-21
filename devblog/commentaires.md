---
title: Formes de commentaires
description: 
date: "2021-06-30"
keywords:
  - 
tags: devblog
layout: post.njk
eleventyExcludeFromCollections: true
---

```javascript
if (
        // there is an activeElement at all
        $btn.length &&

        // it's a child of the form
        $form.has($btn) &&
    )
    {
        // execution
    }
```

```javascript
const input = [
    /**
     * Configuration
     */

    'confirmConfigRegistration', // config/index.js → config/main-render.js
    'getConfig',                 // config/index.js → config/main-render.js
];
```