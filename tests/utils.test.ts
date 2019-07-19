import { getIndex, filterEntries, reverseMatrix, getKeys } from '../src/utils';

import { g, mt, p, j, pj, m, pandj, parents } from './dataset';

const children = new Map([
  [g, new Set([p])],
  [mt, new Set([p])],
  [p, new Set([pj, m])],
  [j, new Set([pj, m])],
  [pj, new Set()],
  [m, new Set()],
]);

test('getIndex', () => {
  expect(getIndex(1)(pandj)).toEqual(j);
});

test('filterEntries', () => {
  expect(filterEntries(parents, ([k, v]) => k === g)).toEqual(
    new Map([[g, null]]),
  );
});

test('getKeys', () => {
  expect(getKeys(parents)).toEqual([g, mt, p, j, pj, m]);
});

test('reverseMatrix', () => {
  expect(reverseMatrix(parents)).toEqual(children);
});
