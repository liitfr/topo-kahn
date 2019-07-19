# topo-kahn

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

const sorted = sort(parents);
```

## How to use

`topo-kahn` expects as input a dependency matrix.
This matrix should be expressed as a `Map` containing :

- as a key: a node of your dependency graph.
- as a value: a `Set` containing all node's parents. Can be null or empty though

## FAQ

- Why should I use it ? If you like this way to express a graph, and / or if you want to define any kind of node (objects, strings, numbers, ...), then you should give it a try
- What if there's a loop in my graph ? `topo-kahn` will throw an error
- What if I have a matrix containing node's children, and not parents ? Just pass a `type` option set to `children`

```js
import sort from topo-kahn ;

const sorted = sort(children, { type: 'children' });
// eq to const sorted = sort(parents);
```

## Reverse a matrix

`topo-kahn` exports a specific function called `reverseMatrix` if you need to.
