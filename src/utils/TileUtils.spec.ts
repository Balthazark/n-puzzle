import { Board } from "../types/Board";
import { TileCoordinates } from "../types/BoardTile";
import { initializeBoard } from "./BoardUtils";
import {
  isValidMove,
  getTileCoordinatesForMove,
  getNeighborCoordinates,
  moveTiles,
} from "./TileUtils";

describe("Test suite for tile logic utils", () => {
  let board: Board;

  beforeEach(() => {
    // Initialize a board using the utility function
    board = initializeBoard(4, 4);
  });
  describe("Tests for getting the empty tile coordinates in a board", () => {
    test("It returns the empty tile coordinates from a board", () => {
      const { emptyTileCoordinates } = board;
      expect(emptyTileCoordinates).toEqual({
        row: 3,
        column: 3,
      });
    });
  });
  describe("Tests for validating that a tile is in the same column or row as the empty tile and thus can be moved", () => {
    test("Returns true for a tile that is in the same row or column as the empty row", () => {
      const { emptyTileCoordinates } = board;
      const validMoveInColumn = isValidMove(emptyTileCoordinates, {
        row: 3,
        column: 2,
      });
      const validMoveInRow = isValidMove(emptyTileCoordinates, {
        row: 2,
        column: 3,
      });
      expect(validMoveInColumn).toBe(true);
      expect(validMoveInRow).toBe(true);
    });
    test("Returns false for a tile that is in the same row or column as the empty row", () => {
      const { emptyTileCoordinates } = board;
      const invalidMove = isValidMove(emptyTileCoordinates, {
        column: 1,
        row: 1,
      });
      expect(invalidMove).toBe(false);
    });
  });
  describe("Tests for getting the coordinates for the tiles to be moved", () => {
    test("Return the neighbor between a tile and the empty tile in a column", () => {
      const { emptyTileCoordinates } = board;
      const tile: TileCoordinates = { row: 0, column: 3 };
      const neighborCoordinates: TileCoordinates[] = [
        { row: 1, column: 3 },
        { row: 2, column: 3 },
      ];
      const coordinates = getNeighborCoordinates(tile, emptyTileCoordinates);
      expect(coordinates).toEqual(neighborCoordinates);
    });

    test("Return the neighbor between a tile and the empty tile in a row", () => {
      const { emptyTileCoordinates } = board;
      const tile: TileCoordinates = { row: 3, column: 0 };
      const neighborCoordinates: TileCoordinates[] = [
        { row: 3, column: 1 },
        { row: 3, column: 2 },
      ];
      const coordinates = getNeighborCoordinates(tile, emptyTileCoordinates);
      expect(coordinates).toEqual(neighborCoordinates);
    });

    test("Returns an array with the single coordinate for a single tile valid move", () => {
      const { emptyTileCoordinates } = board;
      const inputTile: TileCoordinates = { row: 2, column: 3 };
      const tilesToMove: TileCoordinates[] = [{ row: 2, column: 3 }];
      const coordinates = getTileCoordinatesForMove(
        inputTile,
        emptyTileCoordinates,
      );
      expect(coordinates).toEqual(tilesToMove);
    });

    test("Returns an array of tile coordinates for multiple tile valid moves", () => {
      const { emptyTileCoordinates } = board;
      const inputTile: TileCoordinates = { row: 1, column: 3 };
      const tilesToMove: TileCoordinates[] = [
        { row: 1, column: 3 },
        { row: 2, column: 3 },
      ];
      const coordinates = getTileCoordinatesForMove(
        inputTile,
        emptyTileCoordinates,
      );
      expect(coordinates).toEqual(tilesToMove);
    });
  });
  describe("Tests for returning the new board after a move", () => {
    test("Returns the same board if a invalid move was chosen", () => {
      const inputTile: TileCoordinates = { row: 0, column: 0 };
      const newBoard = moveTiles(board, inputTile);
      expect(board).toEqual(newBoard);
    });
    test("Updates the Board with correct coordinates for the new empty tile", () => {
      const inputTile: TileCoordinates = { row: 2, column: 3 };
      const { emptyTileCoordinates } = moveTiles(board, inputTile);
      expect(emptyTileCoordinates.row).toEqual(2);
      expect(emptyTileCoordinates.column).toEqual(3);
    });
    test("Swaps a single tile with the empty tile", () => {
      const inputTile: TileCoordinates = { row: 2, column: 3 };
      const expectedBoard: Board = {
        grid: [
          [
            { value: 1, isEmpty: false },
            { value: 2, isEmpty: false },
            { value: 3, isEmpty: false },
            { value: 4, isEmpty: false },
          ],
          [
            { value: 5, isEmpty: false },
            { value: 6, isEmpty: false },
            { value: 7, isEmpty: false },
            { value: 8, isEmpty: false },
          ],
          [
            { value: 9, isEmpty: false },
            { value: 10, isEmpty: false },
            { value: 11, isEmpty: false },
            { value: 16, isEmpty: true },
          ],
          [
            { value: 13, isEmpty: false },
            { value: 14, isEmpty: false },
            { value: 15, isEmpty: false },
            { value: 12, isEmpty: false },
          ],
        ],
        rows: 4,
        columns: 4,
        emptyTileCoordinates: {
          row: 2,
          column: 3,
        },
      };
      const newBoard = moveTiles(board, inputTile);
      expect(newBoard).toEqual(expectedBoard);
    });
    test("Moves multiple tiles and the empty tile vertically to the correct coordinates", () => {
      const inputTile: TileCoordinates = { row: 1, column: 3 };
      const expectedBoard: Board = {
        grid: [
          [
            { value: 1, isEmpty: false },
            { value: 2, isEmpty: false },
            { value: 3, isEmpty: false },
            { value: 4, isEmpty: false },
          ],
          [
            { value: 5, isEmpty: false },
            { value: 6, isEmpty: false },
            { value: 7, isEmpty: false },
            { value: 16, isEmpty: true },
          ],
          [
            { value: 9, isEmpty: false },
            { value: 10, isEmpty: false },
            { value: 11, isEmpty: false },
            { value: 8, isEmpty: false },
          ],
          [
            { value: 13, isEmpty: false },
            { value: 14, isEmpty: false },
            { value: 15, isEmpty: false },
            { value: 12, isEmpty: false },
          ],
        ],
        rows: 4,
        columns: 4,
        emptyTileCoordinates: {
          row: 1,
          column: 3,
        },
      };
      const newBoard = moveTiles(board, inputTile);
      console.log("NEW BOARD", newBoard.grid);
      expect(newBoard).toEqual(expectedBoard);
    });
    test("Moves multiple tiles and the empty tile horizontally to the correct coordinates", () => {
      const inputTile: TileCoordinates = { row: 3, column: 0 };
      const expectedBoard: Board = {
        grid: [
          [
            { value: 1, isEmpty: false },
            { value: 2, isEmpty: false },
            { value: 3, isEmpty: false },
            { value: 4, isEmpty: false },
          ],
          [
            { value: 5, isEmpty: false },
            { value: 6, isEmpty: false },
            { value: 7, isEmpty: false },
            { value: 8, isEmpty: false },
          ],
          [
            { value: 9, isEmpty: false },
            { value: 10, isEmpty: false },
            { value: 11, isEmpty: false },
            { value: 12, isEmpty: false },
          ],
          [
            { value: 16, isEmpty: true },
            { value: 13, isEmpty: false },
            { value: 14, isEmpty: false },
            { value: 15, isEmpty: false },
          ],
        ],
        rows: 4,
        columns: 4,
        emptyTileCoordinates: {
          row: 3,
          column: 0,
        },
      };
      const newBoard = moveTiles(board, inputTile);
      expect(newBoard).toEqual(expectedBoard);
    });
  });
});
