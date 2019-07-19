# topo-kahn

[![Build Status](https://travis-ci.org/liitfr/topo-kahn.svg?branch=master)](https://travis-ci.org/liitfr/topo-kahn)
[![Coverage Status](https://coveralls.io/repos/github/liitfr/topo-kahn/badge.svg?branch=master)](https://coveralls.io/github/liitfr/topo-kahn?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f4857de1aa3244f88cf135e4360e83d5)](https://www.codacy.com/app/liitfr/topo-kahn?utm_source=github.com&utm_medium=referral&utm_content=liitfr/topo-kahn&utm_campaign=Badge_Grade)
![npm bundle size](https://img.shields.io/bundlephobia/min/topo-kahn.svg)
![NPM](https://img.shields.io/npm/l/topo-kahn.svg)
![npm](https://img.shields.io/npm/v/topo-kahn.svg)

Topological sort (Kahn algorithm) an oriented graph containing any kind of node, using ES6 Maps & Sets.

## Example

```js
import sort from topo-kahn ;

const g = { name: "George" };
const mt = { name: "Marie-Thérèse" };
const p = { name: "Patrice" };
const j = { name: "Josette" };
const pj = { name: "Pierre-Jean" };
const m = { name: "Mathias" };

const pandj = new Set([p, j]);

const parents = new Map([
  [m, pandj],
  [g, null],
  [pj, pandj],
  [mt, null],
  [p, new Set([g, mt])],
  [j, null]
]);

const sorted = sort(parents); // sorted = new Set([g, mt, j, p, pj, m]);
```

## How to use

`topo-kahn` expects as input a dependency matrix.
This matrix should be expressed as a `Map` containing :

- as a key: a node of your dependency graph.
- as a value: a `Set` containing all node's parents. Can be null or empty though

`topo-kahn` returns a `Set` containing ordered nodes

## FAQ

- Why should I use it ? If you like this way to express a graph, and / or if you want to define any kind of node (objects, strings, numbers, ...), then you should give it a try
- What if there's a loop in my graph ? `topo-kahn` will throw an error
- What if I have a matrix containing node's children, and not parents ? Just pass a `type` option set to `children`

```js
import sort from topo-kahn ;

const sorted = sort(children, { type: 'children' });
// eq. to const sorted = sort(parents);
```

## Reverse a matrix

`topo-kahn` exports a specific function called `reverseMatrix` if you need to.
