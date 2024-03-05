import { Board } from "../types/Board";
import { BoardTile, TileCoordinates } from "../types/BoardTile";

export function calculateTaxicabDistance(
  startCoordinates: TileCoordinates,
  endCoordinates: TileCoordinates,
) {
  return (
    Math.abs(startCoordinates.row - endCoordinates.row) +
    Math.abs(startCoordinates.column - endCoordinates.column)
  );
}

export function countInversions(grid: BoardTile[][]) {
  let inversionCount = 0;
  const flatTiles = grid.flat();
  for (let i = 0; i < flatTiles.length - 1; i++) {
    for (let j = i + 1; j < flatTiles.length; j++) {
      if (flatTiles[i].value > flatTiles[j].value) {
        inversionCount++;
      }
    }
  }
  return inversionCount;
}

export function isBoardSolvable(board: Board) {
  const { grid, rows, columns, emptyTileCoordinates } = board;
  const emptyTileGoalCoordinates: TileCoordinates = {
    row: rows - 1,
    column: columns - 1,
  };

  const inversions = countInversions(grid);
  const taxicabDistance = calculateTaxicabDistance(
    emptyTileCoordinates,
    emptyTileGoalCoordinates,
  );

  return (inversions + taxicabDistance) % 2 === 0;
}

export function initializeBoard(rows: number, columns: number): Board {
  const grid: BoardTile[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: BoardTile[] = [];

    for (let j = 0; j < columns; j++) {
      const value = i * columns + j + 1;

      const isLastTile = i === rows - 1 && j === columns - 1;

      const boardTile: BoardTile = isLastTile
        ? {
            isEmpty: true,
            value: value,
          }
        : {
            isEmpty: false,
            value: value,
          };

      row.push(boardTile);
    }
    grid.push(row);
  }

  const emptyTileRowCoord = rows - 1;
  const emptyTileColumnCoord = columns - 1;
  const emptyTileCoordinates = {
    row: emptyTileRowCoord,
    column: emptyTileColumnCoord,
  };

  return { grid, rows, columns, emptyTileCoordinates };
}

export function isSolved(grid: BoardTile[][]): boolean {
  const flatTiles = grid.flat();
  for (let i = 0; i < flatTiles.length - 1; i++) {
    if (flatTiles[i].value !== i + 1) {
      return false;
    }
  }
  return true;
}

export function shuffleTiles(tiles: BoardTile[]) {
  const shuffledTiles = [...tiles];

  for (let i = shuffledTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
  }

  return shuffledTiles;
}

export function getNewEmptyTileCoords(
  grid: BoardTile[][],
  rows: number,
  columns: number,
): TileCoordinates {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (grid[row][column].isEmpty) {
        return { row, column };
      }
    }
  }
  throw new Error("Empty tile not found.");
}

export function shuffleBoard(board: Board): Board {
  const { grid, rows, columns } = board;

  const flatTiles = grid.flat();
  const shuffledTiles = shuffleTiles(flatTiles);

  const shuffledGrid: BoardTile[][] = [];

  for (let row = 0; row < rows; row++) {
    const newRowTiles = shuffledTiles.slice(row * columns, (row + 1) * columns);
    shuffledGrid.push(newRowTiles);
  }

  const emptyTileCoordinates = getNewEmptyTileCoords(
    shuffledGrid,
    rows,
    columns,
  );

  return {
    columns: columns,
    rows: rows,
    grid: shuffledGrid,
    emptyTileCoordinates: emptyTileCoordinates,
  };
}

export function makeBoardSolvable(board: Board): Board {
  const { grid, rows, columns } = board;
  const solvableGrid = [...grid];

  if (solvableGrid[0][0].isEmpty && solvableGrid[0][1].isEmpty) {
    const temp = solvableGrid[rows - 1][columns - 1];
    solvableGrid[rows - 1][columns - 1] = solvableGrid[rows - 1][columns - 2];
    solvableGrid[rows - 1][columns - 2] = temp;
    return {
      ...board,
      grid: solvableGrid,
    };
  }
  const temp = solvableGrid[0][0];
  solvableGrid[0][0] = solvableGrid[0][1];
  solvableGrid[0][1] = temp;
  return {
    ...board,
    grid: solvableGrid,
  };
}

export function initializeSolvableBoard(rows: number, columns: number) {
  if (rows < 2 || columns < 2) {
    throw new Error(
      "Not a valid board size, use a value equal or greater than 2 for rows and columns",
    );
  }

  const solvedBoard = initializeBoard(rows, columns);
  const shuffledBoard = shuffleBoard(solvedBoard);
  const solvableBoard = isBoardSolvable(shuffledBoard)
    ? shuffledBoard
    : makeBoardSolvable(shuffledBoard);

  return solvableBoard;
}
