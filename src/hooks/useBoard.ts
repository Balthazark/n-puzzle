import { useState } from "react";
import { initializeSolvableBoard } from "../utils/BoardUtils";

const useBoard = (rows: number, columns: number) => {
  const [board, setBoard] = useState(() => initializeSolvableBoard(rows, columns));
  const [isSolved, setIsSolved] = useState(false);

  return { board, isSolved };
};

export default useBoard;
