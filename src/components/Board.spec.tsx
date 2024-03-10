import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Board from "./Board";
import * as useBoard from "../hooks/useBoard";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../styles/Themes";

describe("Unit tests for board component", () => {
  test("Board component renders correct number of tiles and shuffle button", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Board rows={4} columns={4} />
      </ThemeProvider>,
    );
    const tiles = screen.getAllByRole("button");
    expect(tiles).toHaveLength(17);
  });
  test("Tiles are non interactive before starting the game", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Board rows={4} columns={4} />
      </ThemeProvider>,
    );
    const buttons = screen.getAllByRole("button");
    const startGameButton = screen.getByRole("button", { name: /start game/i });
    const tileButtons = buttons.filter((button) => button !== startGameButton);
    tileButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
  test("Board renders start game button correctly", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Board rows={4} columns={4} />
      </ThemeProvider>,
    );
    const startGameButton = screen.getByRole("button", {
      name: /start game/i,
    });
    expect(startGameButton).toBeInTheDocument();
  });
  test("Board component renders win message when board is solved", () => {
    const mockUseBoard = jest.spyOn(useBoard, "default").mockReturnValue({
      board: {
        grid: [],
        rows: 4,
        columns: 4,
        emptyTileCoordinates: { row: 3, column: 3 },
      },
      handleStartGame: jest.fn(),
      handleMoveTiles: jest.fn(),
      handleShuffleBoard: jest.fn(),
      isGameStarted: true,
      isBoardSolved: true,
    });
    render(
      <ThemeProvider theme={lightTheme}>
        <Board rows={4} columns={4} />
      </ThemeProvider>,
    );
    const winMessage = screen.getByText(/board solved/i);
    expect(winMessage).toBeInTheDocument();
    mockUseBoard.mockRestore();
  });
});
describe("Integration tests for board component", () => {
  test("Board renders shuffle button correctly after starting the game", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Board rows={4} columns={4} />
      </ThemeProvider>,
    );
    const startGameButton = screen.getByRole("button", {
      name: /start game/i,
    });
    fireEvent.click(startGameButton);
    const shuffleButton = screen.getByRole("button", {
      name: /shuffle board/i,
    });
    expect(shuffleButton).toBeInTheDocument();
  });
  test("Tiles are interactive after starting the game", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Board rows={4} columns={4} />
      </ThemeProvider>,
    );
    const startGameButton = screen.getByRole("button", {
      name: /start game/i,
    });
    fireEvent.click(startGameButton);
    const buttons = screen.getAllByRole("button");
    const emptyTileButton = screen.getByRole("button", { name: "" });
    const buttonsWithoutEmptyTile = buttons.filter(
      (button) => button !== emptyTileButton,
    );
    expect(buttonsWithoutEmptyTile).toHaveLength(16);
    buttonsWithoutEmptyTile.forEach((button) => {
      expect(button).toBeEnabled();
    });
  });
  test("Clicking shuffle button shuffles the board after starting the game", () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Board rows={4} columns={4} />
      </ThemeProvider>,
    );
    const startGameButton = screen.getByRole("button", {
      name: /start game/i,
    });
    fireEvent.click(startGameButton);
    const boardAfterStart = container.innerHTML;
    const shuffleButton = screen.getByRole("button", {
      name: /shuffle board/i,
    });
    fireEvent.click(shuffleButton);
    const shuffledBoard = container.innerHTML;
    expect(boardAfterStart).not.toEqual(shuffledBoard);
  });
  test("Win message is not rendered after starting the game", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Board rows={4} columns={4} />
      </ThemeProvider>,
    );
    const startGameButton = screen.getByRole("button", {
      name: /start game/i,
    });
    fireEvent.click(startGameButton);
    const winMessage = screen.queryByText(/board solved/i);
    expect(winMessage).not.toBeInTheDocument();
  });
  test("Win message is not rendered after doing a shuffle", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Board rows={4} columns={4} />
      </ThemeProvider>,
    );
    const startGameButton = screen.getByRole("button", {
      name: /start game/i,
    });
    fireEvent.click(startGameButton);
    const shuffleButton = screen.getByRole("button", {
      name: /shuffle board/i,
    });
    fireEvent.click(shuffleButton);
    const winMessage = screen.queryByText(/board solved/i);
    expect(winMessage).not.toBeInTheDocument();
  });
});
