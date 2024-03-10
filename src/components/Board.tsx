import React from "react";
import styled from "styled-components";
import Tile from "./Tile";
import useBoard from "../hooks/useBoard";
import { device } from "../styles/Breakpoints";

type StyledBoardProps = {
  $rows: number;
  $columns: number;
};

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

const BoardContainer = styled.section<StyledBoardProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  place-self: center;
  width: min(60svw, calc(60vh * ${(props) => props.$columns / props.$rows}));
  height: min(60svh, calc(60vw * ${(props) => props.$rows / props.$columns}));
  aspect-ratio: ${(props) => props.$columns / props.$rows};

  @media ${device.sm} {
    width: min(50svw, calc(50svh * ${(props) => props.$columns / props.$rows}));
    height: min(
      50svh,
      calc(50svw * ${(props) => props.$rows / props.$columns})
    );
  }
`;

const WinMessage = styled.p`
  text-align: center;
  font-size: clamp(1rem, 1vw + 0.5rem, 4rem);
  color: ${(props) => props.theme.colors.textSecondary};
`;

const StyledButton = styled.button`
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
  const {
    board,
    isGameStarted,
    handleStartGame,
    handleMoveTiles,
    handleShuffleBoard,
    isBoardSolved,
  } = useBoard(rows, columns);

  return (
    <BoardWrapper>
      <BoardContainer aria-live="polite" $columns={columns} $rows={rows}>
        {board.grid.map((row, rowIndex) =>
          row.map((tile, columnIndex) => (
            <Tile
              key={`${rowIndex}-${columnIndex}`}
              value={tile.value}
              isEmpty={tile.isEmpty}
              isGameStarted={isGameStarted}
              onClick={() =>
                handleMoveTiles({ row: rowIndex, column: columnIndex })
              }
            />
          )),
        )}
      </BoardContainer>
      {isBoardSolved && isGameStarted && (
        <WinMessage aria-live="polite">
          Board Solved!🥳🎉<br></br>Shuffle the board to play again!
        </WinMessage>
      )}
      {!isGameStarted ? (
        <StyledButton onClick={handleStartGame} aria-label="Start Game">
          Start Game
        </StyledButton>
      ) : (
        <StyledButton onClick={handleShuffleBoard} aria-label="Shuffle Board">
          Shuffle Board
        </StyledButton>
      )}
    </BoardWrapper>
  );
};

export default Board;
