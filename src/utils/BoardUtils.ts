import { Board } from "../types/Board";
import { BoardTile, TileCoordinates } from "../types/BoardTile";

export function calculateTaxicabDistance(
  rows: number,
  columns: number,
  tileCoordinates: TileCoordinates,
) {
  console.log("Not implemented yet", rows, columns, tileCoordinates);
  return 1;
}

export function countInversions(grid: BoardTile[]) {
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

export function isBoardSolvable(
  grid: BoardTile[][],
  rows: number,
  columns: number,
) {}

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

  return { grid, rows, columns, emptyTileRowCoord, emptyTileColumnCoord };
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
) {
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

  const { row, column } = getNewEmptyTileCoords(shuffledGrid, rows, columns);

  return {
    columns: columns,
    rows: rows,
    grid: shuffledGrid,
    emptyTileRowCoord: row,
    emptyTileColumnCoord: column,
  };
}
