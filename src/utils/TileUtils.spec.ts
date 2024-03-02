import { Board } from "../types/Board";
import { initializeBoard } from "./BoardUtils";
import {
  getEmptyTileCoordinates,
  isValidMove,
  getTileCoordinatesForMove,
  isTileAdjacent,
  getNeighborCoordinates,
} from "./TileUtils";

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
  describe("Tests for getting the coordinates for the tiles to be moved", () => {
    test("Returns true when two tile coordinates are adjacent", () => {
      const coord1 = { x: 2, y: 3 };
      const coord2 = { x: 2, y: 4 };
      expect(isTileAdjacent(coord1, coord2)).toBe(true);
    });
    test("Return the neighbor between a tile and the empty tile in a column", () => {
      const emptyTile = getEmptyTileCoordinates(board);
      const tile = { x: 0, y: 3 };
      const neighborCoordinates = [
        { x: 1, y: 3 },
        { x: 2, y: 3 },
      ];
      const coordinates = getNeighborCoordinates(tile, emptyTile);
      expect(coordinates).toEqual(neighborCoordinates);
    });

    test("Return the neighbor between a tile and the empty tile in a row", () => {
      const emptyTile = getEmptyTileCoordinates(board);
      const tile = { x: 3, y: 0 };
      const neighborCoordinates = [
        { x: 3, y: 1 },
        { x: 3, y: 2 },
      ];
      const coordinates = getNeighborCoordinates(tile, emptyTile);
      expect(coordinates).toEqual(neighborCoordinates);
    });

    test("Returns an array with the single coordinate for a single tile valid move", () => {
      const inputTile = { x: 2, y: 3 };
      const tilesToMove = [{ x: 2, y: 3 }];
      const coordinates = getTileCoordinatesForMove(board, inputTile);
      expect(coordinates).toEqual(tilesToMove);
    });

    test("Returns an array of tile coordinates for multiple tile valid moves", () => {
      const inputTile = { x: 1, y: 3 };
      const tilesToMove = [
        { x: 1, y: 3 },
        { x: 2, y: 3 },
      ];
      const coordinates = getTileCoordinatesForMove(board, inputTile);
      expect(coordinates).toEqual(tilesToMove);
    });
  });
  describe.skip("Tests for returning the new board after a move", () => {
    test("Moves a single tile to the coordinate of the empty tile", () => {});
    test("Moves the empty tile to the correct coordinate after a single tile move", () => {});
    test("Moves multiple tiles to the correct coordinates", () => {});
    test("Moves the empty tile to the correct coordinate after a multi tile move", () => {});
  });
});
