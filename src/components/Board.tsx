import React from "react";
import styled from "styled-components";
import Tile from "./Tile";
import useBoard from "../hooks/useBoard";

type BoardProps = {
  rows: number;
  columns: number;
};

const BoardWrapper = styled.section`
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100dvw;
  height: 100dvh;
  gap: 1em;
`;

const BoardContainer = styled.section<BoardProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  place-self: center;
  width: ${(props) =>
    props.columns / props.rows <= 1
      ? `min(80vw, calc(80vh * ${props.columns / props.rows}))`
      : `min(80vh * ${props.columns / props.rows}, 80vw)`};

  border: 1px solid black;
  aspect-ratio: ${(props) => props.columns / props.rows};
`;

const WinMessage = styled.p`
  font-size: 2vmin;
`;

const ShuffleButton = styled.button`
  font-size: 2vmin;
`;

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
