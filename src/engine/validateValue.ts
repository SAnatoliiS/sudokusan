import {
    CellValidationError,
    CellValidationResult,
    CellValue,
    ConflictingCellCoordinates,
    Formation,
    FormationDimensions,
    GameConfig,
    SolutionCell,
} from './types';

interface CheckResult {
    errors: CellValidationError[];
    conflictingCellCoordinates: ConflictingCellCoordinates[];
}

const checkOutOfBounds = (formation: Formation, row: number, column: number): CheckResult => {
    if (formation.rows[row] == null || formation.rows[row][column] == null) {
        return {
            errors: [CellValidationError.OutOfBounds],
            conflictingCellCoordinates: [],
        };
    }
    return {
        errors: [],
        conflictingCellCoordinates: [],
    };
};

const checkAlreadySet = (formation: Formation, row: number, column: number): CheckResult => {
    if (formation.rows[row][column].value != null) {
        return {
            errors: [CellValidationError.AlreadySet],
            conflictingCellCoordinates: [],
        };
    }
    return {
        errors: [],
        conflictingCellCoordinates: [],
    };
};

const checkAlreadyInRow = (formation: Formation, row: number, value: CellValue): CheckResult => {
    const rowValues: CellValue[] = formation.rows[row].map(cell => cell.value);
    if (rowValues.includes(value)) {
        return {
            errors: [CellValidationError.AlreadyInRow],
            conflictingCellCoordinates: rowValues
                .filter(cellValue => cellValue === value)
                .map((_cellValue, index) => {
                    return {
                        error: CellValidationError.AlreadyInRow,
                        row,
                        column: index,
                    };
                }),
        };
    }
    return {
        errors: [],
        conflictingCellCoordinates: [],
    };
};

const checkAlreadyInColumn = (
    formation: Formation,
    column: number,
    value: CellValue,
): CheckResult => {
    const columnValues: CellValue[] = formation.rows.map(currentRow => currentRow[column].value);
    if (columnValues.includes(value)) {
        return {
            errors: [CellValidationError.AlreadyInColumn],
            conflictingCellCoordinates: columnValues
                .filter(cellValue => cellValue === value)
                .map((_cellValue, index) => {
                    return {
                        error: CellValidationError.AlreadyInColumn,
                        row: index,
                        column,
                    };
                }),
        };
    }
    return {
        errors: [],
        conflictingCellCoordinates: [],
    };
};

const checkWrongValue = (
    solutionFormation: Formation<SolutionCell>,
    row: number,
    column: number,
    value: CellValue,
): CheckResult => {
    if (solutionFormation.rows[row][column].value !== value) {
        return {
            errors: [CellValidationError.WrongValue],
            conflictingCellCoordinates: [],
        };
    }
    return {
        errors: [],
        conflictingCellCoordinates: [],
    };
};

interface CellAlreadyInBlockResult {
    row: number;
    column: number;
    value: CellValue;
}

const checkAlreadyInBlock = (
    formation: Formation,
    row: number,
    column: number,
    value: CellValue,
    formationDimensions: FormationDimensions,
): CheckResult => {
    const blockStartRow =
        Math.floor(row / formationDimensions.blockHeight) * formationDimensions.blockHeight;
    const blockStartColumn =
        Math.floor(column / formationDimensions.blockWidth) * formationDimensions.blockWidth;
    const blockCells: CellAlreadyInBlockResult[] = formation.rows
        .slice(blockStartRow, blockStartRow + formationDimensions.blockHeight)
        .reduce<CellAlreadyInBlockResult[]>((acc, currentRow, currentRowIndex) => {
            const blockCellsInRow: CellAlreadyInBlockResult[] = currentRow
                .slice(blockStartColumn, blockStartColumn + formationDimensions.blockWidth)
                .map((cell, columnIndex) => ({
                    value: cell.value,
                    row: currentRowIndex + blockStartRow,
                    column: blockStartColumn + columnIndex,
                }));
            return acc.concat(blockCellsInRow);
        }, []);
    const blockValues: CellValue[] = blockCells.map(cell => cell.value);
    if (blockValues.includes(value)) {
        return {
            errors: [CellValidationError.AlreadyInBlock],
            conflictingCellCoordinates: blockCells
                .filter(cell => cell.value === value)
                .map(cell => {
                    return {
                        error: CellValidationError.AlreadyInBlock,
                        row: cell.row,
                        column: cell.column,
                    };
                }),
        };
    }
    return {
        errors: [],
        conflictingCellCoordinates: [],
    };
};

export const validateValue = (
    formation: Formation,
    solutionFormation: Formation<SolutionCell>,
    row: number,
    column: number,
    value: CellValue,
    { dimensions, validation }: GameConfig,
): CellValidationResult => {
    const errors: CellValidationError[] = [];
    const conflictingCellCoordinates: ConflictingCellCoordinates[] = [];

    const checkOutOfBoundsResult = checkOutOfBounds(formation, row, column);
    const checkAlreadySetResult = checkAlreadySet(formation, row, column);

    errors.push(...checkOutOfBoundsResult.errors, ...checkAlreadySetResult.errors);
    conflictingCellCoordinates.push(
        ...checkOutOfBoundsResult.conflictingCellCoordinates,
        ...checkAlreadySetResult.conflictingCellCoordinates,
    );

    // If the value is null, we don't need to check for conflicts or wrong values
    if (value == null) {
        return {
            errors,
            conflictingCellCoordinates,
        };
    }

    if (!validation.checkForConflictsOnInsert) {
        const checkAlreadyInRowResult = checkAlreadyInRow(formation, row, value);
        const checkAlreadyInColumnResult = checkAlreadyInColumn(formation, column, value);
        const checkAlreadyInBlockResult = checkAlreadyInBlock(
            formation,
            row,
            column,
            value,
            dimensions,
        );

        errors.push(
            ...checkAlreadyInRowResult.errors,
            ...checkAlreadyInColumnResult.errors,
            ...checkAlreadyInBlockResult.errors,
        );
        conflictingCellCoordinates.push(
            ...checkAlreadyInRowResult.conflictingCellCoordinates,
            ...checkAlreadyInColumnResult.conflictingCellCoordinates,
            ...checkAlreadyInBlockResult.conflictingCellCoordinates,
        );
    }

    if (!validation.checkForWrongValuesOnInsert) {
        const checkWrongValueResult = checkWrongValue(solutionFormation, row, column, value);

        errors.push(...checkWrongValueResult.errors);
        conflictingCellCoordinates.push(...checkWrongValueResult.conflictingCellCoordinates);
    }

    return {
        errors,
        conflictingCellCoordinates,
    };
};
