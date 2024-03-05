import { useState } from "react";
import {
  initializeSolvableBoard,
  shuffleBoard,
  isSolved,
} from "../utils/BoardUtils";
import { moveTiles } from "../utils/TileUtils";
import { TileCoordinates } from "../types/BoardTile";

const useBoard = (rows: number, columns: number) => {
  const [board, setBoard] = useState(() =>
    initializeSolvableBoard(rows, columns),
  );
  const [isBoardSolved, setIsBoardSolved] = useState(false);

  const handleRestartGame = () => {
    const shuffledBoard = shuffleBoard(board);
    setBoard(shuffledBoard);
    setIsBoardSolved(false);
  };

  const handleMoveTiles = (tileCoordinates: TileCoordinates) => {
    const boardAfterMove = moveTiles(board, tileCoordinates);
    if (isSolved(boardAfterMove.grid)) {
      setIsBoardSolved(true);
    }
    setBoard(boardAfterMove);
  };

  return { board, isBoardSolved, handleRestartGame, handleMoveTiles };
};

export default useBoard;
