export const g = { name: "George" };
export const mt = { name: "Marie-Thérèse" };
export const p = { name: "Patrice" };
export const j = { name: "Josette" };
export const pj = { name: "Pierre-Jean" };
export const m = { name: "Mathias" };

export const pandj = new Set([p, j]);

export const parents = new Map([
  [g, null],
  [mt, null],
  [p, new Set([g, mt])],
  [j, null],
  [pj, pandj],
  [m, pandj]
]);

export const numbers = new Map([
  ["5", null],
  ["3", null],
  ["7", null],
  ["11", new Set(["5", "7"])],
  ["8", new Set(["7", "3"])],
  ["2", new Set(["11"])],
  ["9", new Set(["11", "8"])],
  ["10", new Set(["11", "3"])]
]);
