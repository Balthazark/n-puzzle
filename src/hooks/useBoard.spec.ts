import { renderHook } from "@testing-library/react";
import useBoard from "./useBoard";
import { isSolved } from "../utils/BoardUtils";

describe("Tests for the useBoard hook", () => {
  const { result } = renderHook(() => useBoard(4, 4));
  test("Hook correctly initializes 4x4 board with the specified number of rows and columns", () => {
    expect(result.current.board.columns).toBe(4);
    expect(result.current.board.rows).toBe(4);
    expect(result.current.board.rows).toBe(4);
    expect(result.current.board.grid.length).toBe(4);
    result.current.board.grid.forEach((row) => {
      expect(row.length).toBe(4);
    });
  });
  test("Hook correctly shuffles the board at initialization and produces and unsolved board", () => {
    expect(isSolved(result.current.board.grid)).toBe(false);
  });
  test("Hook returns correct game state for if the board is solved or not", () => {
    expect(result.current.isSolved).toBe(false);
  });
});
