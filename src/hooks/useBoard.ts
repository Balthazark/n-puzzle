import { useState } from "react";
import { initializeBoard } from "../utils/BoardUtils";

const useBoard = (rows: number, columns: number) => {
  const [board, setBoard] = useState(() => initializeBoard(rows, columns));

  return { board };
};

export default useBoard;
