import { BoardTile, TileCoordinates } from "./BoardTile";

export type Board = {
  grid: BoardTile[][];
  rows: number;
  columns: number;
  emptyTileCoordinates: TileCoordinates;
};
