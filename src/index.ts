/**
 * Kahn's algorithm
 */

import {
  filterAndGetKeys,
  isEmptyRow,
  reverseMatrix,
  isEmptyMatrix,
} from './utils';

import { Matrix, Row } from './types';

type Opt = {
  type: 'parents' | 'children';
};
const PARENTS = 'parents';

const kahn = (matrixRef: Matrix, { type }: Opt = { type: PARENTS }) => {
  let parents: Matrix;
  let children: Matrix;
  if (type === PARENTS) {
    parents = new Map(matrixRef);
    children = reverseMatrix(matrixRef);
  } else {
    children = new Map(matrixRef);
    parents = reverseMatrix(matrixRef);
  }

  const orphans = filterAndGetKeys(parents, ([key, line]) => isEmptyRow(line));
  const pile = orphans;
  const result = new Set();

  while (pile.length > 0) {
    const item = pile.shift();
    result.add(item);
    const itemChildren = children.get(item);
    if (itemChildren) {
      itemChildren.forEach((child: Row) => {
        parents.set(
          child,
          new Set([...parents.get(child)].filter(parent => parent !== item)),
        );
        if (isEmptyRow(parents.get(child))) {
          pile.push(child);
        }
      });
    }
  }

  if (!isEmptyMatrix(parents)) {
    throw new Error('Loop detected in graph !');
  }

  return result;
};

export { reverseMatrix };
export default kahn;
