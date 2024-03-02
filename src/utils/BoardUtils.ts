import { Board } from "../types/Board";
import { BoardTile } from "../types/BoardTile";
import { moveTiles } from "./TileUtils";

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
            value: 0,
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

export function isSolved(board: Board): boolean {
  const { grid, emptyTileRowCoord, emptyTileColumnCoord } = board;

  const areTilesInAscendingOrder = grid.flat().every((tile, index) => {
    if (!tile.isEmpty) {
      return tile.value === index + 1;
    }
    return true;
  });

  const isEmptyTileInCorrectPosition =
    emptyTileRowCoord === grid.length - 1 &&
    emptyTileColumnCoord === grid[0].length - 1;

  return areTilesInAscendingOrder && isEmptyTileInCorrectPosition;
}

export function shuffleBoard(board: Board): Board {
  const { rows, columns } = board;
  let shuffledBoard = board;

  const numIterations = rows * columns * 100;

  for (let i = 0; i < numIterations; i++) {
    const adjacentTiles = [
      { x: board.emptyTileRowCoord - 1, y: board.emptyTileColumnCoord },
      { x: board.emptyTileRowCoord + 1, y: board.emptyTileColumnCoord },
      { x: board.emptyTileRowCoord, y: board.emptyTileColumnCoord - 1 },
      { x: board.emptyTileRowCoord, y: board.emptyTileColumnCoord + 1 },
    ].filter(
      (tile) => tile.x >= 0 && tile.x < rows && tile.y >= 0 && tile.y < columns,
    );

    const randomIndex = Math.floor(Math.random() * adjacentTiles.length);
    const selectedTile = adjacentTiles[randomIndex];

    shuffledBoard = moveTiles(shuffledBoard, selectedTile);
  }

  return shuffledBoard;
}
