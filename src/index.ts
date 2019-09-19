/**
 * Kahn's algorithm
 */

import {
  filterAndGetKeys,
  generateMatrix,
  isEmptyMatrix,
  isEmptyRow,
  reverseMatrix,
} from './utils';

import { Params, EnrichedParams, Matrix, Opt, Row } from './types';

const PARENTS = 'parents';

const checkParams = (params: Params) => {
  const { generator, receivedData } = params;

  if (generator && !(receivedData instanceof Set)) {
    throw new Error('You must pass a Set if you want to use generator !');
  } else if (!generator && receivedData instanceof Set) {
    throw new Error('You must pass a generator if you want to use a Set !');
  }

  return params;
};

const prepareData = (params: Params) => {
  const { generator, receivedData, type } = params;

  let parents: Matrix;
  let children: Matrix;

  const completeMatrix: Matrix = generator
    ? generateMatrix(receivedData as Row, generator)
    : (receivedData as Matrix);

  if (type === PARENTS) {
    parents = new Map(completeMatrix);
    children = reverseMatrix(completeMatrix);
  } else {
    children = new Map(completeMatrix);
    parents = reverseMatrix(completeMatrix);
  }

  return Object.assign({}, params, { children, parents });
};

const calculate = (params: EnrichedParams) => {
  const { children, parents } = params;

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

const kahn = (
  receivedData: Matrix | Row,
  { type, generator }: Opt = { type: PARENTS },
) => {
  const params = { generator, receivedData, type };
  return calculate(prepareData(checkParams(params)));
};

export { reverseMatrix };
export default kahn;
