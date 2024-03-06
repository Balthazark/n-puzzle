import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Board from "./Board";
import * as useBoard from "../hooks/useBoard";

describe("Unit tests for board component", () => {
  test("Board component renders correct number of tiles and shuffle button", () => {
    render(<Board rows={4} columns={4} />);
    const tiles = screen.getAllByRole("button");
    expect(tiles).toHaveLength(17);
  });
  test("Board renders shuffle button correctly", () => {
    render(<Board rows={4} columns={4} />);
    const shuffleButton = screen.getByRole("button", {
      name: /shuffle board/i,
    });
    expect(shuffleButton).toBeInTheDocument();
  });
  test("Board component renders win message when board is solved", () => {
    const mockUseBoard = jest.spyOn(useBoard, "default").mockReturnValue({
      board: {
        grid: [],
        rows: 4,
        columns: 4,
        emptyTileCoordinates: { row: 3, column: 3 },
      },
      handleMoveTiles: jest.fn(),
      handleShuffleBoard: jest.fn(),
      isBoardSolved: true,
    });
    render(<Board rows={4} columns={4} />);
    const winMessage = screen.getByText(/board solved/i);
    expect(winMessage).toBeInTheDocument();
    mockUseBoard.mockRestore();
  });
});
describe("Integration tests for board component", () => {
  test("Clicking Shuffle Button shuffles the board", () => {
    const { container } = render(<Board rows={4} columns={4} />);
    const initialBoard = container.innerHTML;
    const shuffleButton = screen.getByRole("button", {
      name: /shuffle board/i,
    });
    fireEvent.click(shuffleButton);
    const shuffledBoard = container.innerHTML;
    expect(initialBoard).not.toEqual(shuffledBoard);
  });
});
