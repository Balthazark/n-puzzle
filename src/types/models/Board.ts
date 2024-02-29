import { BoardTile } from "./BoardTile";

export type Board = {
  grid: BoardTile[][];
  rows: number;
  columns: number;
  emptyTileRowIndex: number
  emptyTileColumnIndex: number
};
