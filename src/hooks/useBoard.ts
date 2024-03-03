import { useState } from "react";
import { initializeBoard, shuffleBoard } from "../utils/BoardUtils";

const useBoard = (rows: number, columns: number) => {
  const [board, setBoard] = useState(() => shuffleBoard(initializeBoard(rows, columns)));
  const [isSolved, setIsSolved] = useState(false);

  return { board, isSolved };
};

export default useBoard;
