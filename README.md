# topo-kahn

[![Build Status](https://travis-ci.org/liitfr/topo-kahn.svg?branch=master)](https://travis-ci.org/liitfr/topo-kahn)
[![Coverage Status](https://coveralls.io/repos/github/liitfr/topo-kahn/badge.svg?branch=master)](https://coveralls.io/github/liitfr/topo-kahn?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f4857de1aa3244f88cf135e4360e83d5)](https://www.codacy.com/app/liitfr/topo-kahn?utm_source=github.com&utm_medium=referral&utm_content=liitfr/topo-kahn&utm_campaign=Badge_Grade)
![npm bundle size](https://img.shields.io/bundlephobia/min/topo-kahn.svg)
![NPM](https://img.shields.io/npm/l/topo-kahn.svg)
![npm](https://img.shields.io/npm/v/topo-kahn.svg)

Topological sort (Kahn algorithm) an oriented graph containing any kind of node, using ES6 Maps & Sets.

## Examples

let start with some family members :

```js
import sort, { reverseMatrix } from topo-kahn ;

const g = { name: "George" };
const mt = { name: "Marie-Thérèse" };
const p = { name: "Patrice" };
const j = { name: "Josette" };
const pj = { name: "Pierre-Jean" };
const m = { name: "Mathias" };
const pandj = new Set([p, j]);

...
```

### Static style, by passing a Map that represents dependency matrix

```js
...

const parents = new Map([
  [m, pandj],
  [g, null],
  [pj, pandj],
  [mt, null],
  [p, new Set([g, mt])],
  [j, null],
]);

const sorted = sort(parents); // sorted = new Set([g, mt, j, p, pj, m]);
```

### Functional style, by passing a Set that represents family members and a generator function

```js
...

const family = new Set([m, g, pj, mt, p, j]);

const getParents = member => {
  switch (member) {
    case m:
      return pandj;
    case g:
      return null;
    case pj:
      return pandj;
    case mt:
      return null;
    case p:
      return new Set([g, mt]);
    case j:
    default:
      return null;
  }
};

const sorted = sort(family, { generator: getParents }); // same result !
```

### You can even pass a reversed matrix / generator and work the other way around !

```js
// reverseMatrix is a util function provided by this package
const sorted = sort(reverseMatrix(parents), { type: 'children' }); // same result !

// or

const sorted = sort(family, { generator: getChildren, type: 'children' }); // same result !
```

## FAQ

- Why should I use it ?
  - If you like this way to express a graph
  - Or if you already have a function that defines dependencies between nodes
  - If you want / need to define any kind of node (objects, strings, numbers, ...) by using ES6 Maps & Sets
- What if there's a loop in my graph ? `topo-kahn` will throw an error
- What if I have a matrix containing node's children, and not parents ? Just pass a `type` option set to `children`

```js
import sort from topo-kahn ;

const sorted = sort(children, { type: 'children' });
// eq. to const sorted = sort(parents);
```

## Reverse a matrix

`topo-kahn` exports a specific function called `reverseMatrix` if you need to.
