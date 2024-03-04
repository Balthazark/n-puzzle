import { Board } from "../types/Board";
import {
  countInversions,
  getNewEmptyTileCoords,
  initializeBoard,
  isBoardSolvable,
  isSolved,
  shuffleBoard,
  shuffleTiles,
} from "./BoardUtils";

describe("Test suite for board logic utils", () => {
  describe("Tests for board initialization with equal rows and columns", () => {
    const rows = 4;
    const columns = 4;
    const { grid, emptyTileRowCoord, emptyTileColumnCoord } = initializeBoard(
      rows,
      columns,
    );
    test("Initializes a 4x4 board with correct dimensions", () => {
      expect(grid.length).toBe(rows);
      grid.forEach((row) => {
        expect(row.length).toBe(columns);
      });
    });
    test("A 4x4 board contains the correct number of tiles", () => {
      const totalTiles = grid.flat().length;
      expect(totalTiles).toBe(rows * columns);
    });
    test("The last tile of a 4x4 board is empty", () => {
      const lastRowIndex = rows - 1;
      const lastColumnIndex = columns - 1;
      const lastTile = grid[lastRowIndex][lastColumnIndex];
      expect(lastTile.isEmpty).toBe(true);
    });
    test("A 4x4 board has the correct empty tile indices and the isEmpty field is set correctly", () => {
      expect(emptyTileRowCoord).toBe(rows - 1);
      expect(emptyTileColumnCoord).toBe(columns - 1);
      const emptyTile = grid[emptyTileRowCoord][emptyTileColumnCoord];
      expect(emptyTile.isEmpty).toBe(true);
    });
    test("A 4x4 board has the correct values", () => {
      let expectedValue = 1;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          expect(grid[i][j].value).toBe(expectedValue);
          expectedValue++;
        }
      }
    });
  });
  describe("Tests for board initialization with unequal rows and columns", () => {
    const rows = 4;
    const columns = 2;
    const { grid, emptyTileRowCoord, emptyTileColumnCoord } = initializeBoard(
      rows,
      columns,
    );
    test("Initializes a 4x2 board with correct dimensions", () => {
      expect(grid.length).toBe(rows);
      grid.forEach((row) => {
        expect(row.length).toBe(columns);
      });
    });
    test("A 4x2 board contains the correct number of tiles", () => {
      const totalTiles = grid.flat().length;
      expect(totalTiles).toBe(rows * columns);
    });
    test("Last tile of a 4x2 board is empty", () => {
      const lastRowIndex = rows - 1;
      const lastColumnIndex = columns - 1;
      const lastTile = grid[lastRowIndex][lastColumnIndex];
      expect(lastTile.isEmpty).toBe(true);
    });
    test("A 4x2 board has the correct empty tile indices and correctly set isEmpty value", () => {
      expect(emptyTileRowCoord).toBe(rows - 1);
      expect(emptyTileColumnCoord).toBe(columns - 1);
      const emptyTile = grid[emptyTileRowCoord][emptyTileColumnCoord];
      expect(emptyTile.isEmpty).toBe(true);
    });
    test("A 4x2 board has the correct values", () => {
      let expectedValue = 1;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          expect(grid[i][j].value).toBe(expectedValue);
          expectedValue++;
        }
      }
    });
  });
  describe("Tests for shuffling a board", () => {
    test("Tiles are shuffled from their input state into a new state for a 4x4 board", () => {
      const board = initializeBoard(4, 4);
      const flatTiles = board.grid.flat();
      const shuffledFlatTiles = shuffleTiles(flatTiles);
      expect(flatTiles).not.toEqual(shuffledFlatTiles);
    });
    test("Tiles are shuffled from their input state into a new state for a 4x2 board", () => {
      const board = initializeBoard(4, 2);
      const flatTiles = board.grid.flat();
      const shuffledFlatTiles = shuffleTiles(flatTiles);
      expect(flatTiles).not.toEqual(shuffledFlatTiles);
    });
    test("Shuffle changes the board configuration for a 4x4 board", () => {
      const board = initializeBoard(4, 4);
      const shuffledBoard = shuffleBoard(board);
      expect(shuffledBoard).not.toEqual(board);
    });
    test("Shuffle changes the board configuration for a 4x2 board", () => {
      const board = initializeBoard(4, 2);
      const shuffledBoard = shuffleBoard(board);
      expect(shuffledBoard).not.toEqual(board);
    });
    test("Correctly finds the row and column index of the empty tile for a 4x4 board", () => {
      const { grid, rows, columns, emptyTileRowCoord, emptyTileColumnCoord } =
        initializeBoard(4, 4);
      const { row, column } = getNewEmptyTileCoords(grid, rows, columns);
      expect(row).toEqual(emptyTileRowCoord);
      expect(column).toEqual(emptyTileColumnCoord);
    });
    test("Correctly finds the row and column index of the empty tile for a 4x2 board", () => {
      const { grid, rows, columns, emptyTileRowCoord, emptyTileColumnCoord } =
        initializeBoard(4, 2);
      const { row, column } = getNewEmptyTileCoords(grid, rows, columns);
      expect(row).toEqual(emptyTileRowCoord);
      expect(column).toEqual(emptyTileColumnCoord);
    });
    test("Correctly updates the row and column index of a 4x4 board after a shuffle", () => {
      const board = initializeBoard(4, 4);
      const { grid, rows, columns, emptyTileRowCoord, emptyTileColumnCoord } =
        shuffleBoard(board);
      const { row, column } = getNewEmptyTileCoords(grid, rows, columns);
      expect(row).toEqual(emptyTileRowCoord);
      expect(column).toEqual(emptyTileColumnCoord);
    });
    test("Correctly updates the row and column index of a 4x2 board after a shuffle", () => {
      const board = initializeBoard(4, 2);
      const { grid, rows, columns, emptyTileRowCoord, emptyTileColumnCoord } =
        shuffleBoard(board);
      const { row, column } = getNewEmptyTileCoords(grid, rows, columns);
      expect(row).toEqual(emptyTileRowCoord);
      expect(column).toEqual(emptyTileColumnCoord);
    });
  });
  describe("Tests for determining if a board is solvable", () => {
    test("Correctly counts inversions in a flat grid array representing a solvable 3x3 puzzle", () => {
      const flatTiles = [
        { value: 1, isEmpty: false },
        { value: 8, isEmpty: false },
        { value: 2, isEmpty: false },
        { value: 0, isEmpty: true },
        { value: 4, isEmpty: false },
        { value: 3, isEmpty: false },
        { value: 7, isEmpty: false },
        { value: 6, isEmpty: false },
        { value: 5, isEmpty: false },
      ];
      const inversionCount = countInversions(flatTiles);
      expect(inversionCount).toBe(10);
    });
    test("Correctly counts inversions in a flat grid array representing an unsolvable 3x3 puzzle", () => {
      const flatTiles = [
        { value: 8, isEmpty: false },
        { value: 1, isEmpty: false },
        { value: 2, isEmpty: false },
        { value: 9, isEmpty: true },
        { value: 4, isEmpty: false },
        { value: 3, isEmpty: false },
        { value: 7, isEmpty: false },
        { value: 6, isEmpty: false },
        { value: 5, isEmpty: false },
      ];
      const inversionCount = countInversions(flatTiles);
      expect(inversionCount).toBe(11);
    });
    test("Correctly counts inversions in a flat grid array representing a 4x4 puzzle", () => {
      const flatTiles = [
        { value: 2, isEmpty: false },
        { value: 1, isEmpty: false },
        { value: 3, isEmpty: false },
        { value: 4, isEmpty: false },
        { value: 5, isEmpty: false },
        { value: 6, isEmpty: false },
        { value: 7, isEmpty: false },
        { value: 8, isEmpty: false },
        { value: 9, isEmpty: true },
        { value: 10, isEmpty: true },
        { value: 11, isEmpty: true },
        { value: 12, isEmpty: true },
        { value: 13, isEmpty: true },
        { value: 14, isEmpty: true },
        { value: 15, isEmpty: true },
        { value: 16, isEmpty: false },
      ];
      const inversionCount = countInversions(flatTiles);
      expect(inversionCount).toBe(1);
    });
    test("Correctly identifies a solvable 3x3 puzzle configuration", () => {
      const solvableBoard: Board = {
        grid: [
          [
            { value: 1, isEmpty: false },
            { value: 8, isEmpty: false },
            { value: 2, isEmpty: false },
          ],
          [
            { value: 9, isEmpty: true },
            { value: 4, isEmpty: false },
            { value: 3, isEmpty: false },
          ],
          [
            { value: 7, isEmpty: false },
            { value: 6, isEmpty: false },
            { value: 6, isEmpty: false },
          ],
        ],
        rows: 3,
        columns: 3,
        emptyTileRowCoord: 2,
        emptyTileColumnCoord: 0,
      };
      expect(
        isBoardSolvable(
          solvableBoard.grid,
          solvableBoard.rows,
          solvableBoard.columns,
        ),
      ).toBe(true);
    });
    test("Correctly identifies a solvable 3x3 puzzle configuration", () => {
      const solvableBoard: Board = {
        grid: [
          [
            { value: 1, isEmpty: false },
            { value: 8, isEmpty: false },
            { value: 2, isEmpty: false },
          ],
          [
            { value: 9, isEmpty: true },
            { value: 4, isEmpty: false },
            { value: 3, isEmpty: false },
          ],
          [
            { value: 7, isEmpty: false },
            { value: 6, isEmpty: false },
            { value: 5, isEmpty: false },
          ],
        ],
        rows: 3,
        columns: 3,
        emptyTileRowCoord: 2,
        emptyTileColumnCoord: 0,
      };
      expect(
        isBoardSolvable(
          solvableBoard.grid,
          solvableBoard.rows,
          solvableBoard.columns,
        ),
      ).toBe(true);
    });
    test("Correctly identifies a solvable 3x3 puzzle configuration", () => {
      const solvableBoard: Board = {
        grid: [
          [
            { value: 8, isEmpty: false },
            { value: 1, isEmpty: false },
            { value: 2, isEmpty: false },
          ],
          [
            { value: 9, isEmpty: true },
            { value: 4, isEmpty: false },
            { value: 3, isEmpty: false },
          ],
          [
            { value: 7, isEmpty: false },
            { value: 6, isEmpty: false },
            { value: 5, isEmpty: false },
          ],
        ],
        rows: 3,
        columns: 3,
        emptyTileRowCoord: 2,
        emptyTileColumnCoord: 0,
      };
      expect(
        isBoardSolvable(
          solvableBoard.grid,
          solvableBoard.rows,
          solvableBoard.columns,
        ),
      ).toBe(true);
    });
  });
  describe("Tests for determining if a board is solved", () => {
    test("It returns true for an initial 4x4 board in a solved state", () => {
      const solvedBoard = initializeBoard(4, 4);
      expect(isSolved(solvedBoard.grid)).toBe(true);
    });
    test("It returns true for an initial 4x2 board in a solved state", () => {
      const solvedBoard = initializeBoard(4, 2);
      expect(isSolved(solvedBoard.grid)).toBe(true);
    });
    test("It returns false for a shuffled 4x4 board", () => {
      const board = initializeBoard(4, 4);
      const shuffledBoard = shuffleBoard(board);
      expect(isSolved(shuffledBoard.grid)).toBe(false);
    });
    test("It returns false for a shuffled 4x2 board", () => {
      const board = initializeBoard(4, 2);
      const shuffledBoard = shuffleBoard(board);
      expect(isSolved(shuffledBoard.grid)).toBe(false);
    });
  });
  describe("Some additional test for potential edge cases", () => {
    test("Initializes a 1x1 board correctly", () => {
      const board = initializeBoard(1, 1);
      expect(board.grid.length).toBe(1);
      expect(board.grid[0].length).toBe(1);
      expect(isSolved(board.grid)).toBe(true);
    });
    test("It returns false for an almost solved board with the empty tile in the start position", () => {
      const board: Board = {
        grid: [
          [
            { value: 0, isEmpty: true },
            { value: 1, isEmpty: false },
          ],
          [
            { value: 2, isEmpty: false },
            { value: 3, isEmpty: false },
          ],
        ],
        rows: 2,
        columns: 2,
        emptyTileRowCoord: 0,
        emptyTileColumnCoord: 0,
      };
      expect(isSolved(board.grid)).toBe(false);
    });
  });
});
