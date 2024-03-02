import { Board } from "../types/Board";
import { BoardTile } from "../types/BoardTile";

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
            value: 0,
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

  const emptyTileRowCoord = rows - 1;
  const emptyTileColumnCoord = columns - 1;

  return { grid, rows, columns, emptyTileRowCoord, emptyTileColumnCoord };
}

export function isSolved(board: Board): boolean {}
export function shuffleBoard(board: Board): Board {}