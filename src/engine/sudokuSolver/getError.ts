import { DoX } from './DoX';
import { SudokuSolverError } from './types';

export function getError(solutions: DoX[][]): SudokuSolverError | null {
    if (solutions.length === 0) {
        return SudokuSolverError.NoSolutions;
    }
    if (solutions.length > 1) {
        return SudokuSolverError.MoreThanOneSolution;
    }
    return null;
}
