type BaseTile = {
  x: number;
  y: number;
};

type Tile = BaseTile & {
  value: number;
  isEmpty: false;
};

type EmptyTile = BaseTile & {
  value: 0;
  isEmpty: true;
};

export type BoardTile = Tile | EmptyTile;
export type TileCoordinates = Pick<Tile, "x" | "y">;
