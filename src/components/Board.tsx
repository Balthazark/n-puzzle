import React from "react";
import styled from "styled-components";
import Tile from "./Tile";
import useBoard from "../hooks/useBoard";
import { device } from "../styles/Breakpoints";

const BoardWrapper = styled.section`
  background-color: ${(props) => props.theme.colors.secondaryAccent};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  border-radius: 1rem;
`;

const BoardContainer = styled.section<BoardProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  place-self: center;
  width: min(60vw, calc(60vh * ${(props) => props.columns / props.rows}));
  height: min(60vh, calc(60vw * ${(props) => props.rows / props.columns}));
  aspect-ratio: ${(props) => props.columns / props.rows};

  @media ${device.sm} {
    width: min(50vw, calc(50vh * ${(props) => props.columns / props.rows}));
    height: min(50vh, calc(50vw * ${(props) => props.rows / props.columns}));
  }
`;

const WinMessage = styled.p`
  text-align: center;
  font-size: clamp(1rem, 1vw + 0.5rem, 4rem);
  color: ${(props) => props.theme.colors.textSecondary};
`;

const ShuffleButton = styled.button`
  font-weight: bold;
  padding: 1rem;
  border-radius: 1rem;
  border-style: none;
  font-size: clamp(0.5rem, 1vw + 0.5rem, 2rem);
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryAccent};
  }
`;

type BoardProps = {
  rows: number;
  columns: number;
};

const Board = ({ rows, columns }: BoardProps) => {
  const { board, handleMoveTiles, handleShuffleBoard, isBoardSolved } =
    useBoard(rows, columns);

  return (
    <BoardWrapper>
      <BoardContainer aria-live="polite" columns={columns} rows={rows}>
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
      </BoardContainer>
      {isBoardSolved && (
        <WinMessage aria-live="polite">
          Board Solved!🥳🎉<br></br>Shuffle the board to play again!
        </WinMessage>
      )}
      <ShuffleButton onClick={handleShuffleBoard}>Shuffle Board</ShuffleButton>
    </BoardWrapper>
  );
};

export default Board;
