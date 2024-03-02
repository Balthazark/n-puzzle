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
  const neighborCoordinates: TileCoordinates[] = [];

  if (tile.x === emptyTile.x) {
    const startCoordinate = Math.min(tile.y, emptyTile.y) + 1;
    const endCoordinate = Math.max(tile.y, emptyTile.y);
    for (let y = startCoordinate; y < endCoordinate; y++) {
      neighborCoordinates.push({ x: tile.x, y });
    }
  } else if (tile.y === emptyTile.y) {
    const startCoordinate = Math.min(tile.x, emptyTile.x) + 1;
    const endCoordinate = Math.max(tile.x, emptyTile.x);
    for (let x = startCoordinate; x < endCoordinate; x++) {
      neighborCoordinates.push({ x, y: tile.y });
    }
  }

  return neighborCoordinates;
}

export function getTileCoordinatesForMove(
  board: Board,
  tileCoordinate: TileCoordinates,
) {
  const emptyTileCoordinates = getEmptyTileCoordinates(board);
  if (isTileAdjacent(tileCoordinate, emptyTileCoordinates)) {
    return [tileCoordinate];
  }
  const neighborCoordinates = getNeighborCoordinates(
    tileCoordinate,
    emptyTileCoordinates,
  );
  return [tileCoordinate, ...neighborCoordinates];
}

export function moveTiles(board: Board, tileCoordinates: TileCoordinates[]) {
  return board;
  console.log("Not implemented", board, tileCoordinates);
}
