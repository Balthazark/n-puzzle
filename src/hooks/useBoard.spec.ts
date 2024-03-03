import { renderHook } from "@testing-library/react";
import useBoard from "./useBoard";

describe("Tests for the useBoard hook", () => {
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
});
