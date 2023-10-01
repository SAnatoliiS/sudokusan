// Tests for sudokuSolver.ts
import { solveSudoku } from './sudokuSolver';
import { SudokuSolverError, type Config } from './types';

describe('solveSudoku', () => {
    it('Should return 2 solutions and the MoreThanOneSolution error for 9x9 sudoku.', () => {
        const puzzle = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 0, 6, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 9, 6, 0, 3, 0],
            [0, 7, 0, 0, 0, 0, 0, 1, 0],
            [8, 0, 0, 2, 5, 0, 0, 9, 0],
            [0, 4, 0, 0, 0, 0, 8, 0, 0],
            [0, 6, 0, 4, 0, 9, 0, 0, 8],
            [0, 0, 5, 0, 0, 0, 0, 2, 0],
            [0, 0, 0, 5, 0, 0, 0, 0, 7],
        ];
        const config: Config = {
            blockWidth: 3,
            blockHeight: 3,
        };
        const solutions = solveSudoku(puzzle, config);
        expect(solutions.result.length).toEqual(2);
        expect(solutions.error).toEqual(SudokuSolverError.MoreThanOneSolution);
    });
    it('should return 1 solution for a valid 6x6 sudoku puzzle', () => {
        const puzzle = [
            [0, 0, 3, 0, 6, 0],
            [0, 5, 0, 2, 0, 4],
            [0, 3, 0, 0, 1, 0],
            [2, 0, 1, 0, 0, 5],
            [0, 0, 2, 4, 0, 6],
            [6, 4, 0, 1, 0, 0],
        ];
        const config: Config = {
            blockWidth: 3,
            blockHeight: 2,
        };
        const solutions = solveSudoku(puzzle, config);
        expect(solutions.result.length).toEqual(1);
        expect(solutions.error).toBeNull();
    });
    it('should return 1 solution for a valid 4x4 sudoku puzzle', () => {
        const puzzle = [
            [0, 0, 3, 0],
            [0, 0, 0, 2],
            [0, 3, 0, 0],
            [2, 0, 1, 0],
        ];
        const config: Config = {
            blockWidth: 2,
            blockHeight: 2,
        };
        const solutions = solveSudoku(puzzle, config);
        expect(solutions.result.length).toEqual(1);
        expect(solutions.error).toBeNull();
    });
    it('should return an empty array for an invalid 9x9 sudoku puzzle', () => {
        const puzzle = [
            [0, 0, 0, 0, 0, 0, 4, 0, 0],
            [3, 0, 6, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 9, 6, 0, 3, 0],
            [0, 7, 0, 0, 0, 0, 0, 1, 0],
            [8, 0, 0, 2, 5, 0, 0, 9, 0],
            [0, 4, 0, 0, 0, 0, 8, 0, 0],
            [0, 6, 0, 4, 0, 9, 0, 0, 8],
            [0, 0, 5, 0, 0, 0, 0, 2, 0],
            [0, 0, 0, 5, 0, 0, 0, 0, 7],
        ];
        const config: Config = {
            blockWidth: 3,
            blockHeight: 3,
        };
        const solutions = solveSudoku(puzzle, config);
        expect(solutions.result.length).toEqual(1);
        expect(solutions.error).toBeNull();
    });
    // no solutions
    it('should return an empty array for an invalid 9x9 sudoku puzzle', () => {
        const puzzle = [
            [0, 0, 0, 0, 0, 0, 4, 5, 0],
            [3, 0, 6, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 9, 6, 0, 3, 0],
            [0, 7, 0, 0, 0, 0, 0, 1, 0],
            [8, 0, 0, 2, 5, 0, 0, 9, 0],
            [0, 4, 0, 0, 0, 0, 8, 0, 0],
            [0, 6, 0, 4, 0, 9, 0, 0, 8],
            [0, 0, 5, 0, 0, 0, 0, 2, 0],
            [0, 0, 0, 5, 0, 0, 0, 0, 7],
        ];
        const config: Config = {
            blockWidth: 3,
            blockHeight: 3,
        };
        const solutions = solveSudoku(puzzle, config);
        expect(solutions.result.length).toEqual(0);
        expect(solutions.error).toEqual(SudokuSolverError.NoSolutions);
    });
});
