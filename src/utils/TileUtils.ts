import { Board } from "../types/Board";
import { TileCoordinates } from "../types/BoardTile";

export const isValidMove = (
  emptyTileCoordinates: TileCoordinates,
  tileCoordinates: TileCoordinates,
) => {
  return (
    emptyTileCoordinates.row === tileCoordinates.row ||
    emptyTileCoordinates.column === tileCoordinates.column
  );
};

export const moveTiles = (
  board: Board,
  inputTileCoordinates: TileCoordinates,
) => {
  const { grid, emptyTileCoordinates } = board;
  if (!isValidMove(emptyTileCoordinates, inputTileCoordinates)) {
    return board;
  }

  //Deep copy the grid to avoid side effects
  const newGrid = grid.map((row) => row.map((tile) => ({ ...tile })));

  //Check axis of movement
  const isHorizontalMove =
    emptyTileCoordinates.row === inputTileCoordinates.row;

  //Get correct indices depending on the axis
  const start = isHorizontalMove
    ? inputTileCoordinates.column
    : inputTileCoordinates.row;
  const end = isHorizontalMove
    ? emptyTileCoordinates.column
    : emptyTileCoordinates.row;
  // Determine the direction of movement based on the start and end positions
  const step = start < end ? 1 : -1;

  if (isHorizontalMove) {
    for (let column = end; column != start; column -= step) {
      newGrid[emptyTileCoordinates.row][column] =
        grid[emptyTileCoordinates.row][column - step];
    }
  } else {
    for (let row = end; row != start; row -= step) {
      newGrid[row][emptyTileCoordinates.column] =
        grid[row - step][emptyTileCoordinates.column];
    }
  }

  //Assign the empty tile to the input tiles indices
  newGrid[inputTileCoordinates.row][inputTileCoordinates.column] =
    grid[emptyTileCoordinates.row][emptyTileCoordinates.column];

  return {
    ...board,
    grid: newGrid,
    emptyTileCoordinates: inputTileCoordinates,
  };
};

export const getNeighborCoordinates = (
  inputTile: TileCoordinates,
  emptyTile: TileCoordinates,
) => {
  const neighborCoordinates: TileCoordinates[] = [];

  if (inputTile.row === emptyTile.row) {
    const startColumn = Math.min(inputTile.column, emptyTile.column) + 1;
    const endColumn = Math.max(inputTile.column, emptyTile.column);
    for (let column = startColumn; column < endColumn; column++) {
      neighborCoordinates.push({ row: inputTile.row, column: column });
    }
  } else if (inputTile.column === emptyTile.column) {
    const startRow = Math.min(inputTile.row, emptyTile.row) + 1;
    const endRow = Math.max(inputTile.row, emptyTile.row);
    for (let row = startRow; row < endRow; row++) {
      neighborCoordinates.push({ row: row, column: inputTile.column });
    }
  }

  return neighborCoordinates;
};

export const getTileCoordinatesForMove = (
  tileCoordinates: TileCoordinates,
  emptyTileCoordinates: TileCoordinates,
) => {
  const neighborCoordinates = getNeighborCoordinates(
    tileCoordinates,
    emptyTileCoordinates,
  );
  return [tileCoordinates, ...neighborCoordinates];
};
