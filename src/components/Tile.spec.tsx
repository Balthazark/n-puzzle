import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tile from "./Tile";
import { TileCoordinates } from "../types/BoardTile";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../styles/Themes";

describe("Unit tests for tile component", () => {
  test("Renders a non-empty tile correctly", () => {
    const mockHandleClick = jest.fn();
    const tileValue = 1;
    render(
      <ThemeProvider theme={lightTheme}>
        {" "}
        <Tile value={tileValue} isEmpty={false} onClick={mockHandleClick} />
      </ThemeProvider>,
    );
    const tileElement = screen.getByText("1");
    expect(tileElement).toBeInTheDocument();
    expect(tileElement).toBeEnabled();
  });

  test("Renders an empty tile correctly", () => {
    const mockHandleClick = jest.fn();
    render(
      <ThemeProvider theme={lightTheme}>
        {" "}
        <Tile value={16} isEmpty={true} onClick={mockHandleClick} />
      </ThemeProvider>,
    );
    const tileElement = screen.getByRole("button");
    expect(tileElement).toBeInTheDocument();
    expect(tileElement).toBeDisabled();
  });

  test("Calls the on click function with the correct arguments when clicked", () => {
    const tileCoordinates = { row: 1, column: 2 };
    const mockHandleClickTyped = jest.fn() as jest.Mock<
      void,
      [TileCoordinates]
    >;
    render(
      <ThemeProvider theme={lightTheme}>
        <Tile
          value={5}
          isEmpty={false}
          onClick={() => mockHandleClickTyped(tileCoordinates)}
        />
      </ThemeProvider>,
    );
    const tileElement = screen.getByText("5");
    fireEvent.click(tileElement);
    expect(mockHandleClickTyped).toHaveBeenCalledWith(tileCoordinates);
  });
  test("Clicking an empty tile does not call the onClick handler", () => {
    const mockHandleClick = jest.fn();
    render(
      <ThemeProvider theme={lightTheme}>
        <Tile value={16} isEmpty={true} onClick={mockHandleClick} />
      </ThemeProvider>,
    );
    const tileElement = screen.getByRole("button");
    fireEvent.click(tileElement);
    expect(mockHandleClick).not.toHaveBeenCalled();
  });
});
