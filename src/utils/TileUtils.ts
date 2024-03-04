import { Board } from "../types/Board";
import { TileCoordinates } from "../types/BoardTile";

export function getEmptyTileCoordinates(board: Board) {
  return board.emptyTileCoordinates;
}
export function isValidMove(board: Board, tileCoordinates: TileCoordinates) {
  const { emptyTileRowCoord, emptyTileColumnCoord } = board;
  const { x: tileRowCoord, y: tileColumnCoord } = tileCoordinates;

  return (
    emptyTileRowCoord === tileRowCoord ||
    emptyTileColumnCoord === tileColumnCoord
  );
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

export function moveTiles(board: Board, inputTileCoordinate: TileCoordinates) {
  if (!isValidMove(board, inputTileCoordinate)) {
    return board;
  }
  const newGrid = board.grid.map((row) => [...row]);
  const emptyTileCoordinates = getEmptyTileCoordinates(board);

  if (isTileAdjacent(inputTileCoordinate, emptyTileCoordinates)) {
    newGrid[emptyTileCoordinates.x][emptyTileCoordinates.y] =
      board.grid[inputTileCoordinate.x][inputTileCoordinate.y];
    newGrid[inputTileCoordinate.x][inputTileCoordinate.y] =
      board.grid[emptyTileCoordinates.x][emptyTileCoordinates.y];

    const newBoard: Board = {
      grid: newGrid,
      rows: board.rows,
      columns: board.columns,
      emptyTileRowCoord: inputTileCoordinate.x,
      emptyTileColumnCoord: inputTileCoordinate.y,
    };

    return newBoard;
  }

  const isHorizontalMove = emptyTileCoordinates.x === inputTileCoordinate.x;
  const distance = isHorizontalMove
    ? emptyTileCoordinates.y - inputTileCoordinate.y
    : emptyTileCoordinates.x - inputTileCoordinate.x;

  const step = distance > 0 ? -1 : 1;

  if (isHorizontalMove) {
    for (
      let y = emptyTileCoordinates.y;
      y != inputTileCoordinate.y;
      y += step
    ) {
      const shiftedY = y + step;
      newGrid[emptyTileCoordinates.x][y] =
        board.grid[emptyTileCoordinates.x][shiftedY];
    }
  } else {
    for (
      let x = emptyTileCoordinates.x;
      x != inputTileCoordinate.x;
      x += step
    ) {
      const shiftedX = x + step;
      newGrid[x][emptyTileCoordinates.y] =
        board.grid[shiftedX][emptyTileCoordinates.y];
    }
  }

  newGrid[inputTileCoordinate.x][inputTileCoordinate.y] =
    board.grid[emptyTileCoordinates.x][emptyTileCoordinates.y];

  const newBoard: Board = {
    grid: newGrid,
    rows: board.rows,
    columns: board.columns,
    emptyTileRowCoord: inputTileCoordinate.x,
    emptyTileColumnCoord: inputTileCoordinate.y,
  };

  return newBoard;
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
  const neighborCoordinates = getNeighborCoordinates(
    tileCoordinate,
    emptyTileCoordinates,
  );
  return [tileCoordinate, ...neighborCoordinates];
}
