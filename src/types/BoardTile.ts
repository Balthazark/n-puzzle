type BaseTile = {
  value: number;
};

type Tile = BaseTile & {
  isEmpty: false;
};

type EmptyTile = BaseTile & {
  isEmpty: true;
};

export type BoardTile = Tile | EmptyTile;
export type TileCoordinates = {
  row: number;
  column: number;
};
