import { useState } from "react";
import { initializeBoard } from "../utils/BoardUtils";

const useBoard = (rows: number, columns: number) => {
  const [board, setBoard] = useState(() => initializeBoard(rows, columns));
  const [isSolved, setIsSolved] = useState(false);

  return { board, isSolved };
};

export default useBoard;
