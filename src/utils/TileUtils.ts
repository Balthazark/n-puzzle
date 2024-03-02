import { Board } from "../types/Board";

export function getEmptyTileCoordinates(board: Board) {
  return { x: board.emptyTileRowIndex, y: board.emptyTileColumnIndex };
}
export function isValidMove(board: Board) {
  console.log("Not implemented", board);
}

export function moveTiles(board: Board) {
  console.log("Not implemented", board);
}
