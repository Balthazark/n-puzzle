import { Board } from "../types/Board";
import { initializeBoard } from "./BoardUtils";
import { getEmptyTileCoordinates, isValidMove } from "./TileUtils";

describe("Test suite for tile logic utils", () => {
  let board: Board;

  beforeEach(() => {
    // Initialize a board using the utility function
    board = initializeBoard(4, 4);
  });
  describe("Tests for getting the empty tile coordinates in a board", () => {
    test("It returns the empty tile coordinates from a board", () => {
      const emptyTileCoordinates = getEmptyTileCoordinates(board);
      expect(emptyTileCoordinates).toEqual({ x: 3, y: 3 });
    });
  });
  describe("Tests for validating that a tile is in the same column or row as the empty tile and thus can be moved", () => {
    test("Returns true for a tile that is in the same row or column as the empty row", () => {
      const validMoveInColumn = isValidMove(board, { x: 3, y: 2 });
      const validMoveInRow = isValidMove(board, { x: 2, y: 3 });
      expect(validMoveInColumn).toBe(true);
      expect(validMoveInRow).toBe(true);
    });
    test("Returns false for a tile that is in the same row or column as the empty row", () => {
      const invalidMove = isValidMove(board, { x: 1, y: 1 });
      expect(invalidMove).toBe(false);
    });
  });
});
