import { Matrix } from '../src/types';

export const g = { name: 'George' };
export const mt = { name: 'Marie-Thérèse' };
export const p = { name: 'Patrice' };
export const j = { name: 'Josette' };
export const pj = { name: 'Pierre-Jean' };
export const m = { name: 'Mathias' };

export const pandj = new Set([p, j]);

export const parents: Matrix = new Map([
  [g, null],
  [mt, null],
  [p, new Set([g, mt])],
  [j, null],
  [pj, pandj],
  [m, pandj],
]);

export const numbers: Matrix = new Map([
  ['5', null],
  ['3', null],
  ['7', null],
  ['11', new Set(['5', '7'])],
  ['8', new Set(['7', '3'])],
  ['2', new Set(['11'])],
  ['9', new Set(['11', '8'])],
  ['10', new Set(['11', '3'])],
]);

export const familyMembers = new Set([m, g, pj, mt, p, j]);

export const parentsGenerator = (member: any) => {
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

export const childrenGenerator = (member: any) => {
  switch (member) {
    case m:
      return null;
    case g:
      return new Set([p]);
    case pj:
      return null;
    case mt:
      return new Set([p]);
    case p:
      return new Set([m, pj]);
    case j:
      return new Set([m, pj]);
    default:
      return null;
  }
};
