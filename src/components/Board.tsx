import React from "react";
import styled from "styled-components";
import Tile from "./Tile";
import useBoard from "../hooks/useBoard";

type BoardProps = {
  rows: number;
  columns: number;
};

const BoardContainer = styled.section``;

const WinMessage = styled.p``;

const ShuffleButton = styled.button``;

const Board = ({ rows, columns }: BoardProps) => {
  const { board, handleMoveTiles, handleShuffleBoard, isBoardSolved } =
    useBoard(rows, columns);

  return (
    <BoardContainer aria-live="polite">
      {board.grid.map((row, rowIndex) =>
        row.map((tile, columnIndex) => (
          <Tile
            key={`${rowIndex}-${columnIndex}`}
            value={tile.value}
            isEmpty={tile.isEmpty}
            onClick={() =>
              handleMoveTiles({ row: rowIndex, column: columnIndex })
            }
          />
        )),
      )}
      {isBoardSolved && (
        <WinMessage aria-live="polite">Board Solved!🥳🎉</WinMessage>
      )}
      <ShuffleButton onClick={handleShuffleBoard}>Shuffle Board</ShuffleButton>
    </BoardContainer>
  );
};

export default Board;
