import { initializeBoard, isSolved, shuffleBoard } from "./BoardUtils";

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
    test("A 4x4 board has the correct empty tile indices", () => {
      expect(emptyTileRowCoord).toBe(rows - 1);
      expect(emptyTileColumnCoord).toBe(columns - 1);
      const emptyTile = grid[emptyTileRowCoord][emptyTileColumnCoord];
      expect(emptyTile.isEmpty).toBe(true);
    });
    test("A 4x4 board has the correct values for the non empty tiles", () => {
      let expectedValue = 1;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (!grid[i][j].isEmpty) {
            expect(grid[i][j].value).toBe(expectedValue);
            expectedValue++;
          }
        }
      }
    });
    test("A 4x4 boards empty tile has a value of 0", () => {
      const lastRow = grid[rows - 1];
      const lastTile = lastRow[lastRow.length - 1];
      expect(lastTile.value).toBe(0);
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
    test("A 4x2 board has the correct empty tile indices", () => {
      expect(emptyTileRowCoord).toBe(rows - 1);
      expect(emptyTileColumnCoord).toBe(columns - 1);
      const emptyTile = grid[emptyTileRowCoord][emptyTileColumnCoord];
      expect(emptyTile.isEmpty).toBe(true);
    });
    test("A 4x2 board has the correct values for the non empty tiles", () => {
      let expectedValue = 1;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (!grid[i][j].isEmpty) {
            expect(grid[i][j].value).toBe(expectedValue);
            expectedValue++;
          }
        }
      }
    });
    test("A 4x2 boards empty tile has a value of 0", () => {
      const lastRow = grid[rows - 1];
      const lastTile = lastRow[lastRow.length - 1];
      expect(lastTile.value).toBe(0);
    });
  });
  describe("Tests for shuffling a board", () => {
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
  });
  describe("Tests for determining if a board is solved", () => {
    test("It returns true for an initial 4x4 board in a solved state", () => {
      const solvedBoard = initializeBoard(4, 4);
      expect(isSolved(solvedBoard)).toBe(true);
    });
    test("It returns true for an initial 4x2 board in a solved state", () => {
      const solvedBoard = initializeBoard(4, 2);
      expect(isSolved(solvedBoard)).toBe(true);
    });
    test("It returns false for a shuffled 4x4 board", () => {
      const board = initializeBoard(4, 4);
      const shuffledBoard = shuffleBoard(board);
      expect(isSolved(shuffledBoard)).toBe(false);
    });
    test("It returns false for a shuffled 4x2 board", () => {
      const board = initializeBoard(4, 2);
      const shuffledBoard = shuffleBoard(board);
      expect(isSolved(shuffledBoard)).toBe(false);
    });
  });
  describe("Some additional test for potential edge cases", () => {
    test("Initializes a 1x1 board correctly", () => {
      const board = initializeBoard(1, 1);
      expect(board.grid.length).toBe(1);
      expect(board.grid[0].length).toBe(1);
      expect(isSolved(board)).toBe(true);
    });
  });
});
