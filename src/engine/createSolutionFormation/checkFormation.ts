import { SudokuSolverError, solveSudoku } from '../solveSudoku';
import { Formation, FormationDimensions } from '../types';

export function checkFormation(
    formation: Formation,
    { blockWidth, blockHeight }: FormationDimensions,
): SudokuSolverError | null {
    const rawFormation = formation.rows.map(row =>
        row.map(cell => (cell.value === null ? 0 : cell.value)),
    );
    const solution = solveSudoku(rawFormation, { blockWidth, blockHeight });
    return solution.error;
}
