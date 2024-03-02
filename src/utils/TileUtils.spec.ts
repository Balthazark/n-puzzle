import { Board } from "../types/Board";
import { initializeBoard } from "./BoardUtils";
import { getEmptyTileCoordinates } from "./TileUtils";

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
});
