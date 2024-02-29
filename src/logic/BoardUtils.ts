import { Board } from "../types/models/Board";
import { BoardTile } from "../types/models/BoardTile";

export function initializeBoard(rows: number, columns: number): Board {
  const grid: BoardTile[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: BoardTile[] = [];

    for (let j = 0; j < columns; j++) {
      const value = i * columns + j + 1;

      const isLastTile = i === rows - 1 && j === columns - 1;

      const boardTile: BoardTile = isLastTile
        ? {
            x: i,
            y: j,
            isEmpty: true,
          }
        : {
            x: i,
            y: j,
            isEmpty: false,
            value: value,
          };

      row.push(boardTile);
    }
    grid.push(row);
  }

  return { grid, rows, columns };
}

export function isSolved(board: Board): boolean {}
export function shuffleBoard(board: Board): Board {}
