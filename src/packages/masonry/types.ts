export interface PositionItem {
  left?: number;
  height?: number;
  top?: number;
}

export interface MasonryItem extends Object {
  _masonryIndex?: number;
}

export interface SectionRecord {
  head?: number;
  tail?: number;
}
