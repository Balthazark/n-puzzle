import { Board } from "../types/Board";
import { TileCoordinates } from "../types/BoardTile";

export function getEmptyTileCoordinates(board: Board) {
  return { x: board.emptyTileRowCoord, y: board.emptyTileColumnCoord };
}
export function isValidMove(board: Board, tileCoordinates: TileCoordinates) {
  const emptyTileRowCoord = board.emptyTileRowCoord;
  const emptyTileColumnCoord = board.emptyTileColumnCoord;
  const tileRowCoord = tileCoordinates.x;
  const tileColumnCoord = tileCoordinates.y;

  if (
    !(
      emptyTileRowCoord === tileRowCoord ||
      emptyTileColumnCoord === tileColumnCoord
    )
  ) {
    return false;
  }
  return true;
}

export function isTileAdjacent(
  firstTile: TileCoordinates,
  secondTile: TileCoordinates,
) {
  return (
    Math.abs(firstTile.x - secondTile.x) +
      Math.abs(firstTile.y - secondTile.y) ===
    1
  );
}

export function getNeighborCoordinates(
  tile: TileCoordinates,
  emptyTile: TileCoordinates,
) {
  console.log("Not implemented", tile, emptyTile);
}

export function getTileCoordinatesForMove(
  board: Board,
  tileCoordinate: TileCoordinates,
) {
  console.log("Not implemented", board, tileCoordinate);
}

export function moveTiles(board: Board, tileCoordinates: TileCoordinates[]) {
  console.log("Not implemented", board, tileCoordinates);
}
