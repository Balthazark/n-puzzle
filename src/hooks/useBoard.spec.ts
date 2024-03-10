import { renderHook, act } from "@testing-library/react";
import useBoard from "./useBoard";
import { BoardTile } from "../types/BoardTile";
import * as boardUtils from "../utils/BoardUtils";

describe("Tests for the useBoard hook", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("Hook correctly initializes 4x4 board with the specified number of rows and columns", () => {
    const { result } = renderHook(() => useBoard(4, 4));
    expect(result.current.board.columns).toBe(4);
    expect(result.current.board.rows).toBe(4);
    expect(result.current.board.rows).toBe(4);
    expect(result.current.board.grid.length).toBe(4);
    result.current.board.grid.forEach((row) => {
      expect(row.length).toBe(4);
    });
  });
  test("Hook correctly generates a deterministic solved board at start to avoid hydration errors", () => {
    const { result } = renderHook(() => useBoard(4, 4));
    expect(boardUtils.isSolved(result.current.board.grid)).toBe(true);
  });
  test("Hook returns correct game state for an initial solved board before the game has been started", () => {
    const { result } = renderHook(() => useBoard(4, 4));
    expect(result.current.isBoardSolved).toBe(true);
    expect(result.current.isGameStarted).toBe(false);
  });
  test("Hook returns correct game state for if the board is solved or not", () => {
    const { result } = renderHook(() => useBoard(4, 4));
    expect(result.current.isBoardSolved).toBe(true);
  });
  test("Hook correctly stats the game and shuffles board", () => {
    const { result } = renderHook(() => useBoard(4, 4));
    expect(result.current.isGameStarted).toBe(false);
    const oldBoard = result.current.board;
    act(() => {
      result.current.handleStartGame();
    });
    expect(result.current.board).not.toEqual(oldBoard);
    expect(result.current.isBoardSolved).toBe(false);
    expect(result.current.isGameStarted).toBe(true);
  });
  test("Hook correctly reshuffles the board", () => {
    const { result } = renderHook(() => useBoard(4, 4));
    const oldBoard = result.current.board;
    act(() => {
      result.current.handleShuffleBoard();
    });
    expect(result.current.board).not.toEqual(oldBoard);
    expect(result.current.isBoardSolved).toBe(false);
  });
  test("Hook correctly moves tiles and successfully updates the isBoardSolved state ", () => {
    jest
      .spyOn(boardUtils, "getShuffledSolvableBoard")
      .mockImplementationOnce(() => ({
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
            { value: 13, isEmpty: false },
            { value: 14, isEmpty: false },
            { value: 16, isEmpty: true },
            { value: 15, isEmpty: false },
          ],
        ],
        rows: 4,
        columns: 4,
        emptyTileCoordinates: { row: 3, column: 2 },
      }));
    const { result } = renderHook(() => useBoard(4, 4));
    act(() => {
      result.current.handleMoveTiles({ row: 3, column: 3 });
    });
    const tile: BoardTile = { value: 15, isEmpty: false };
    const emptyTile: BoardTile = { value: 16, isEmpty: true };
    expect(result.current.board.grid[3][2]).toEqual(tile);
    expect(result.current.board.grid[3][3]).toEqual(emptyTile);
    expect(result.current.isBoardSolved).toBe(true);
  });
});
