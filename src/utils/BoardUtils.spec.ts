import { Board } from "../types/Board";
import { TileCoordinates } from "../types/BoardTile";
import {
  calculateTaxicabDistance,
  countInversions,
  getNewEmptyTileCoords,
  initializeBoard,
  getShuffledSolvableBoard,
  isBoardSolvable,
  isSolved,
  makeBoardSolvable,
  shuffleBoard,
  shuffleTiles,
} from "./BoardUtils";

describe("Test suite for board logic utils", () => {
  describe("Tests for board initialization with equal rows and columns", () => {
    const rows = 4;
    const columns = 4;
    const { grid, emptyTileCoordinates } = initializeBoard(rows, columns);
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
      expect(emptyTileCoordinates.row).toBe(rows - 1);
      expect(emptyTileCoordinates.column).toBe(columns - 1);
      const emptyTile =
        grid[emptyTileCoordinates.row][emptyTileCoordinates.column];
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
    const { grid, emptyTileCoordinates } = initializeBoard(rows, columns);
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
      expect(emptyTileCoordinates.row).toBe(rows - 1);
      expect(emptyTileCoordinates.column).toBe(columns - 1);
      const emptyTile =
        grid[emptyTileCoordinates.row][emptyTileCoordinates.column];
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
      const { grid, rows, columns, emptyTileCoordinates } = initializeBoard(
        4,
        4,
      );
      const { row, column } = getNewEmptyTileCoords(grid, rows, columns);
      expect(row).toEqual(emptyTileCoordinates.row);
      expect(column).toEqual(emptyTileCoordinates.column);
    });
    test("Correctly finds the row and column index of the empty tile for a 4x2 board", () => {
      const { grid, rows, columns, emptyTileCoordinates } = initializeBoard(
        4,
        2,
      );
      const { row, column } = getNewEmptyTileCoords(grid, rows, columns);
      expect(row).toEqual(emptyTileCoordinates.row);
      expect(column).toEqual(emptyTileCoordinates.column);
    });
    test("Correctly updates the row and column index of a 4x4 board after a shuffle", () => {
      const board = initializeBoard(4, 4);
      const { grid, rows, columns, emptyTileCoordinates } = shuffleBoard(board);
      const { row, column } = getNewEmptyTileCoords(grid, rows, columns);
      expect(row).toEqual(emptyTileCoordinates.row);
      expect(column).toEqual(emptyTileCoordinates.column);
    });
    test("Correctly updates the row and column index of a 4x2 board after a shuffle", () => {
      const board = initializeBoard(4, 2);
      const { grid, rows, columns, emptyTileCoordinates } = shuffleBoard(board);
      const { row, column } = getNewEmptyTileCoords(grid, rows, columns);
      expect(row).toEqual(emptyTileCoordinates.row);
      expect(column).toEqual(emptyTileCoordinates.column);
    });
  });
  describe("Calculates correct taxi cab distance from the empty tile to its correct position", () => {
    const rows = 4;
    const columns = 4;

    test("Empty tile at bottom-right corner", () => {
      const emptyTileCoordinates: TileCoordinates = { row: 3, column: 3 };
      const emptyTileGoalCoordinates: TileCoordinates = {
        row: rows - 1,
        column: columns - 1,
      };

      expect(
        calculateTaxicabDistance(
          emptyTileCoordinates,
          emptyTileGoalCoordinates,
        ),
      ).toBe(0);
    });
    test("Empty tile at top-left corner", () => {
      const emptyTileCoordinates: TileCoordinates = { row: 0, column: 0 };
      const emptyTileGoalCoordinates: TileCoordinates = {
        row: rows - 1,
        column: columns - 1,
      };
      expect(
        calculateTaxicabDistance(
          emptyTileCoordinates,
          emptyTileGoalCoordinates,
        ),
      ).toBe(6);
    });

    test("Empty tile in the middle", () => {
      const emptyTileCoordinates: TileCoordinates = { row: 1, column: 2 };
      const emptyTileGoalCoordinates: TileCoordinates = {
        row: rows - 1,
        column: columns - 1,
      };
      expect(
        calculateTaxicabDistance(
          emptyTileCoordinates,
          emptyTileGoalCoordinates,
        ),
      ).toBe(3);
    });
  });
  describe("Tests for determining if a board is solvable", () => {
    test("Correctly counts inversions in a flat grid array representing a solvable 3x3 puzzle", () => {
      const grid = [
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
      ];
      const inversionCount = countInversions(grid);
      expect(inversionCount).toBe(15);
    });
    test("Correctly counts inversions in a flat grid array representing an unsolvable 3x3 puzzle", () => {
      const grid = [
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
      ];
      const inversionCount = countInversions(grid);
      expect(inversionCount).toBe(16);
    });
    test("Correctly counts inversions in a flat grid array representing a solvable 4x4 puzzle", () => {
      const grid = [
        [
          { value: 6, isEmpty: false },
          { value: 13, isEmpty: false },
          { value: 7, isEmpty: false },
          { value: 10, isEmpty: false },
        ],

        [
          { value: 8, isEmpty: false },
          { value: 9, isEmpty: false },
          { value: 11, isEmpty: false },
          { value: 16, isEmpty: true },
        ],

        [
          { value: 15, isEmpty: false },
          { value: 2, isEmpty: false },
          { value: 12, isEmpty: false },
          { value: 5, isEmpty: false },
        ],
        [
          { value: 14, isEmpty: false },
          { value: 3, isEmpty: false },
          { value: 1, isEmpty: false },
          { value: 4, isEmpty: false },
        ],
      ];
      const inversionCount = countInversions(grid);
      expect(inversionCount).toBe(70);
    });
    test("Correctly counts inversions in a flat grid array representing an unsolvable 4x4 puzzle", () => {
      const grid = [
        [
          { value: 3, isEmpty: false },
          { value: 9, isEmpty: false },
          { value: 1, isEmpty: false },
          { value: 15, isEmpty: false },
        ],
        [
          { value: 14, isEmpty: false },
          { value: 11, isEmpty: false },
          { value: 4, isEmpty: false },
          { value: 6, isEmpty: false },
        ],

        [
          { value: 13, isEmpty: false },
          { value: 16, isEmpty: true },
          { value: 10, isEmpty: false },
          { value: 12, isEmpty: false },
        ],
        [
          { value: 2, isEmpty: false },
          { value: 7, isEmpty: false },
          { value: 8, isEmpty: false },
          { value: 5, isEmpty: false },
        ],
      ];
      const inversionCount = countInversions(grid);
      expect(inversionCount).toBe(62);
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
        emptyTileCoordinates: { row: 1, column: 0 },
      };
      expect(isBoardSolvable(solvableBoard)).toBe(true);
    });
    test("Correctly identifies an unsolvable 3x3 puzzle configuration", () => {
      const unsolvableBoard: Board = {
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
        emptyTileCoordinates: { row: 1, column: 0 },
      };
      expect(isBoardSolvable(unsolvableBoard)).toBe(false);
    });
    test("Correctly identifies a solvable 4x4 puzzle configuration", () => {
      const solvableBoard: Board = {
        grid: [
          [
            { value: 6, isEmpty: false },
            { value: 13, isEmpty: false },
            { value: 7, isEmpty: false },
            { value: 10, isEmpty: false },
          ],

          [
            { value: 8, isEmpty: false },
            { value: 9, isEmpty: false },
            { value: 11, isEmpty: false },
            { value: 16, isEmpty: true },
          ],

          [
            { value: 15, isEmpty: false },
            { value: 2, isEmpty: false },
            { value: 12, isEmpty: false },
            { value: 5, isEmpty: false },
          ],
          [
            { value: 14, isEmpty: false },
            { value: 3, isEmpty: false },
            { value: 1, isEmpty: false },
            { value: 4, isEmpty: false },
          ],
        ],
        rows: 4,
        columns: 4,
        emptyTileCoordinates: { row: 1, column: 3 },
      };
      expect(isBoardSolvable(solvableBoard)).toBe(true);
    });
    test("Correctly identifies an unsolvable 4x4 puzzle configuration", () => {
      const unsolvableBoard: Board = {
        grid: [
          [
            { value: 3, isEmpty: false },
            { value: 9, isEmpty: false },
            { value: 1, isEmpty: false },
            { value: 15, isEmpty: false },
          ],
          [
            { value: 14, isEmpty: false },
            { value: 11, isEmpty: false },
            { value: 4, isEmpty: false },
            { value: 6, isEmpty: false },
          ],

          [
            { value: 13, isEmpty: false },
            { value: 16, isEmpty: true },
            { value: 10, isEmpty: false },
            { value: 12, isEmpty: false },
          ],
          [
            { value: 2, isEmpty: false },
            { value: 7, isEmpty: false },
            { value: 8, isEmpty: false },
            { value: 5, isEmpty: false },
          ],
        ],
        rows: 4,
        columns: 4,
        emptyTileCoordinates: { row: 2, column: 1 },
      };
      expect(isBoardSolvable(unsolvableBoard)).toBe(false);
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
  describe("Tests for making board solvable", () => {
    test("Returns a solvable board", () => {
      const unsolvableBoard: Board = {
        grid: [
          [
            { value: 3, isEmpty: false },
            { value: 9, isEmpty: false },
            { value: 1, isEmpty: false },
            { value: 15, isEmpty: false },
          ],
          [
            { value: 14, isEmpty: false },
            { value: 11, isEmpty: false },
            { value: 4, isEmpty: false },
            { value: 6, isEmpty: false },
          ],

          [
            { value: 13, isEmpty: false },
            { value: 16, isEmpty: true },
            { value: 10, isEmpty: false },
            { value: 12, isEmpty: false },
          ],
          [
            { value: 2, isEmpty: false },
            { value: 7, isEmpty: false },
            { value: 8, isEmpty: false },
            { value: 5, isEmpty: false },
          ],
        ],
        rows: 4,
        columns: 4,
        emptyTileCoordinates: { row: 2, column: 1 },
      };
      expect(isBoardSolvable(unsolvableBoard)).toBe(false);
      const solvableBoard = makeBoardSolvable(unsolvableBoard);
      expect(isBoardSolvable(solvableBoard)).toBe(true);
    });
  });
  describe("Tests for generating a solvable and shuffled board", () => {
    test("Always returns a solvable board", () => {
      const rows = 2;
      const columns = 2;
      const attempts = 10;

      for (let i = 0; i < attempts; i++) {
        const board = initializeBoard(rows + i, columns + i);
        const solvableBoard = getShuffledSolvableBoard(board);
        expect(isBoardSolvable(solvableBoard)).toBe(true);
      }
      for (let i = 0; i < attempts; i++) {
        const board = initializeBoard(rows + i, columns);
        const solvableBoard = getShuffledSolvableBoard(board);
        expect(isBoardSolvable(solvableBoard)).toBe(true);
      }
      for (let i = 0; i < attempts; i++) {
        const board = initializeBoard(rows, columns + i);
        const solvableBoard = getShuffledSolvableBoard(board);
        expect(isBoardSolvable(solvableBoard)).toBe(true);
      }
    });
  });

  describe("Some additional test for potential edge cases", () => {
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
        emptyTileCoordinates: { row: 0, column: 0 },
      };
      expect(isSolved(board.grid)).toBe(false);
    });
  });
});
