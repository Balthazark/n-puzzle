import { useCallback, useState } from "react";
import {
  getShuffledSolvableBoard,
  isSolved,
  initializeBoard,
} from "../utils/BoardUtils";
import { moveTiles } from "../utils/TileUtils";
import { TileCoordinates } from "../types/BoardTile";

const useBoard = (rows: number, columns: number) => {
  const [board, setBoard] = useState(() => initializeBoard(rows, columns));
  const [isBoardSolved, setIsBoardSolved] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = useCallback(() => {
    const shuffledBoard = getShuffledSolvableBoard(board);
    setBoard(shuffledBoard);
    setIsGameStarted(true);
    setIsBoardSolved(false);
  }, [board]);

  const handleShuffleBoard = useCallback(() => {
    const shuffledBoard = getShuffledSolvableBoard(board);
    setBoard(shuffledBoard);
    setIsBoardSolved(false);
  }, [board]);

  const handleMoveTiles = useCallback(
    (tileCoordinates: TileCoordinates) => {
      const boardAfterMove = moveTiles(board, tileCoordinates);
      if (isSolved(boardAfterMove.grid)) {
        setIsBoardSolved(true);
      }
      setBoard(boardAfterMove);
    },
    [board],
  );

  return {
    board,
    isBoardSolved,
    isGameStarted,
    handleStartGame,
    handleShuffleBoard,
    handleMoveTiles,
  };
};

export default useBoard;
