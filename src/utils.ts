import { Filter, Generator, Matrix, MatrixItem, Row, Item } from './types';

const tautology = () => true;

const identity = (obj: any) => obj;

export const getIndex = (index: number) => (row: Row) => [...row][index];

export const filterEntries = (matrix: Matrix, filter: Filter = tautology) =>
  new Map([...matrix].filter(filter));

const filterAndMapEntries = (
  matrix: Matrix,
  filter: Filter = tautology,
  map = identity,
) => [...filterEntries(matrix, filter)].map(map);

const filterAndGetIndexEntries = (index: number) => (
  matrix: Matrix,
  filter: Filter = tautology,
) => filterAndMapEntries(matrix, filter, getIndex(index));

const filterAndGetValues = filterAndGetIndexEntries(1);

export const filterAndGetKeys = filterAndGetIndexEntries(0);

export const getValues = (matrix: Matrix) => filterAndGetValues(matrix);

export const getKeys = (matrix: Matrix) => filterAndGetKeys(matrix);

export const isEmptyRow = (row: Row | null | undefined) =>
  row == null || row.size === 0;

export const reverseMatrix = (matrix: Matrix) => {
  const keys = getKeys(matrix);
  const reverse = new Map();
  keys.forEach(key => {
    if (!reverse.has(key)) {
      reverse.set(key, new Set());
    }
    const row = matrix.get(key);
    if (!isEmptyRow(row)) {
      row!.forEach((item: Item) => {
        if (!reverse.has(item)) {
          reverse.set(item, new Set([key]));
        } else {
          reverse.get(item).add(key);
        }
      });
    }
  });
  return reverse;
};

export const generateMatrix = (row: Row, generator: Generator) =>
  new Map(
    [...row.keys()].map<[Item, Row | null]>(key => [key, generator(key)]),
  );

export const isEmptyMatrix = (matrix: Matrix) =>
  filterEntries(matrix, ([key, value]) => isEmptyRow(value)).size ===
  getKeys(matrix).length;
