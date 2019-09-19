export type Matrix = Map<Item, Row | null>;
export type MatrixItem = [Item, Row | null];
export type Row = Set<Item>;
export type Item = any;
export type Generator = (item: Item) => Row | null;
export type Filter = (item: MatrixItem) => boolean;
export type Opt = {
  type?: 'parents' | 'children';
  generator?: Generator;
};
export type Params = {
  generator?: Generator;
  receivedData: Matrix | Row;
  type?: 'parents' | 'children';
};
export type EnrichedParams = {
  generator?: Generator;
  receivedData: Matrix | Row;
  type?: 'parents' | 'children';
  children: Matrix;
  parents: Matrix;
};
