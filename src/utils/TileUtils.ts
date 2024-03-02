import { Board } from "../types/Board";
import { TileCoordinates } from "../types/BoardTile";

export function getEmptyTileCoordinates(board: Board) {
  return { x: board.emptyTileRowIndex, y: board.emptyTileColumnIndex };
}
export function isValidMove(board: Board, tileCoordinates: TileCoordinates) {
  console.log("Not implemented", board, tileCoordinates);
}

export function moveTiles(board: Board) {
  console.log("Not implemented", board);
}
