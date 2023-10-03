import { getFormationWithChangedCell } from '../getFormationWithChangedCell';
import { SudokuSolverError } from '../sudokuSolver';
import type { Cell, Formation, GameConfig, SolutionCell } from '../types';
import { checkFormation } from './checkFormation';
import { getAdditionalOpenedCells } from './getAdditionalOpenedCells';

function openRandomCell(
    formation: Formation,
    solutionFormation: Formation<SolutionCell>,
): Formation {
    if (formation.rows.flat().every(cell => cell.value !== null)) {
        console.error('openRandomCell: All cells are already opened');
        return formation;
    }

    let resultFormation = formation;
    let openedCellCount = 0;

    const formationSize = formation.rows.length;

    while (openedCellCount === 0) {
        const row = Math.floor(Math.random() * formationSize);
        const column = Math.floor(Math.random() * formationSize);

        if (resultFormation.rows[row][column].value === null) {
            resultFormation = getFormationWithChangedCell(
                resultFormation,
                row,
                column,
                solutionFormation.rows[row][column].value,
            );
            openedCellCount += 1;
        }
    }

    return resultFormation;
}

function closeRandomCell(formation: Formation): Formation {
    if (formation.rows.flat().every(cell => cell.value !== null)) {
        console.error('closeRandomCell: All cells are already closed');
        return formation;
    }

    let resultFormation = formation;
    let closedCellCount = 0;

    const formationSize = formation.rows.length;

    while (closedCellCount === 0) {
        const row = Math.floor(Math.random() * formationSize);
        const column = Math.floor(Math.random() * formationSize);

        if (resultFormation.rows[row][column].value !== null) {
            resultFormation = getFormationWithChangedCell(resultFormation, row, column, null);
            closedCellCount += 1;
        }
    }

    return resultFormation;
}

function makeCertainNumberOfOpenCells(
    formation: Formation,
    solutionFormation: Formation<SolutionCell>,
    startOpenedCellCount: number,
    targetOpenedCellCount: number,
): Formation {
    let resultFormation = formation;
    let openedCellCount = startOpenedCellCount;

    while (openedCellCount !== targetOpenedCellCount) {
        if (openedCellCount < targetOpenedCellCount) {
            resultFormation = openRandomCell(resultFormation, solutionFormation);
            openedCellCount += 1;
        } else {
            resultFormation = closeRandomCell(resultFormation);
            openedCellCount -= 1;
        }
    }

    return resultFormation;
}

/**
 * Returns a new formation with some cells removed from the input formation.
 * @param solutionFormation The formation to remove cells from.
 * @returns A new formation with some cells removed.
 */
export const getInitialFormation = (
    solutionFormation: Formation<SolutionCell>,
    config: GameConfig,
): Formation => {
    let openedCellCount = 0;
    let cellCountToOpen = Math.floor(solutionFormation.rows.length ** 2 * 0.2);

    const resultRows: Array<Array<Cell>> = Array(solutionFormation.rows.length)
        .fill(null)
        .map(() =>
            Array(solutionFormation.rows.length)
                .fill(null)
                .map(() => ({
                    value: null,
                })),
        );

    let resultFormation = { ...solutionFormation, rows: resultRows };

    let sudokuError: SudokuSolverError | null = SudokuSolverError.MoreThanOneSolution;

    while (sudokuError !== null) {
        switch (sudokuError) {
            case SudokuSolverError.MoreThanOneSolution:
                cellCountToOpen += 1;
                break;
            case SudokuSolverError.NoSolutions:
                throw new Error('No solutions found');
            default:
        }
        resultFormation = makeCertainNumberOfOpenCells(
            resultFormation,
            solutionFormation,
            openedCellCount,
            cellCountToOpen,
        );
        openedCellCount = cellCountToOpen;
        sudokuError = checkFormation(resultFormation, config.dimensions);
    }

    const additionalOpenedCellsCount = getAdditionalOpenedCells(
        config.difficulty,
        config.dimensions.size,
        openedCellCount,
    );

    const resultFormation1 = makeCertainNumberOfOpenCells(
        resultFormation,
        solutionFormation,
        openedCellCount,
        openedCellCount + additionalOpenedCellsCount,
    );

    return resultFormation1;
};
