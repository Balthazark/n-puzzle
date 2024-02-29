import { initializeBoard, isSolved, shuffleBoard } from "./BoardUtils";

describe("Test suite for board logic utils", () => {
    describe("Tests for board initialization", () => {
        test("Initializes a symmetric board with correct dimensions", () => {
            const rows = 4;
            const columns = 4;
            const board = initializeBoard(rows, columns);
            expect(board.grid.length).toBe(rows);
            board.grid.forEach((row) => {
                expect(row.length).toBe(columns);
            });
        });
        test("Initializes an unsymmetrical board with correct dimensions", () => {
            const rows = 4;
            const columns = 2;
            const board = initializeBoard(rows, columns);
            expect(board.grid.length).toBe(rows);
            board.grid.forEach((row) => {
                expect(row.length).toBe(columns);
            });
        });
        test("Board contains the correct number of tiles", () => {
            const rows = 4;
            const columns = 3;
            const board = initializeBoard(rows, columns);
            const totalTiles = board.grid.flat().length;
            expect(totalTiles).toBe(rows * columns);
        });
    });
    describe("Tests for shuffling a board", () => {
        test("Shuffle changes the board configuration for a symmetrical 4x4 board", () => {
            const board = initializeBoard(4, 4);
            const shuffledBoard = shuffleBoard(board);
            expect(shuffledBoard).not.toEqual(board);
        });
        test("Shuffle changes the board configuration for a unsymmetrical 4x2 board", () => {
            const board = initializeBoard(4, 2);
            const shuffledBoard = shuffleBoard(board);
            expect(shuffledBoard).not.toEqual(board);
        });
    });
    describe("Tests for determining if a board is solved", () => {
        test("It returns true for an initial 4x4 board in a solved state", () => {
            const solvedBoard = initializeBoard(4, 4);
            expect(isSolved(solvedBoard)).toBe(true);
        });
        test("It returns true for an initial 4x2 board in a solved state", () => {
            const solvedBoard = initializeBoard(4, 2);
            expect(isSolved(solvedBoard)).toBe(true);
        });
        test("It returns false for a shuffled 4x4 board", () => {
            const board = initializeBoard(4, 4);
            const shuffledBoard = shuffleBoard(board);
            expect(isSolved(shuffledBoard)).toBe(false);
        });
        test("It returns false for a shuffled 4x2 board", () => {
            const board = initializeBoard(4, 2);
            const shuffledBoard = shuffleBoard(board);
            expect(isSolved(shuffledBoard)).toBe(false);
        });
    });
    describe("Some additional test for potential edge cases", () => {
        test("Initializes a 1x1 board correctly", () => {
            const board = initializeBoard(1, 1);
            expect(board.grid.length).toBe(1);
            expect(board.grid[0].length).toBe(1);
            expect(isSolved(board)).toBe(true);
        });
    });
});

