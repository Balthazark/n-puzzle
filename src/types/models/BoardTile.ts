type BaseTile = {
  x: number;
  y: number;
};

type Tile = BaseTile & {
  value: number;
  isEmpty: false;
};

type EmptyTile = BaseTile & {
  isEmpty: true;
};

export type BoardTile = Tile | EmptyTile;
