import {
    CellValidationResult,
    CellValue,
    Formation,
    FormationDimensions,
    Row,
    SolutionCell,
} from './types';

export const validateValue = (
    formation: Formation,
    solutionFormation: Formation<SolutionCell>,
    row: number,
    column: number,
    value: CellValue,
    formationDimensions: FormationDimensions,
): CellValidationResult => {
    const rows: Row[] = formation.rows.slice();
    if (rows[row] == null || rows[row][column] == null) {
        return CellValidationResult.OutOfBounds;
    }
    if (rows[row][column].value != null) {
        return CellValidationResult.AlreadySet;
    }
    const rowValues: CellValue[] = rows[row].map(cell => cell.value);
    if (rowValues.includes(value)) {
        return CellValidationResult.AlreadyInRow;
    }
    const columnValues: CellValue[] = rows.map(currentRow => currentRow[column].value);
    if (columnValues.includes(value)) {
        return CellValidationResult.AlreadyInColumn;
    }

    const blockStartRow =
        Math.floor(row / formationDimensions.blockHeight) * formationDimensions.blockHeight;
    const blockStartColumn =
        Math.floor(column / formationDimensions.blockWidth) * formationDimensions.blockWidth;
    const blockValues: CellValue[] = rows
        .slice(blockStartRow, blockStartRow + formationDimensions.blockHeight)
        .reduce<CellValue[]>((acc, currentRow) => {
            const blockValuesInRow: CellValue[] = currentRow
                .slice(blockStartColumn, blockStartColumn + formationDimensions.blockWidth)
                .map(cell => cell.value);
            return acc.concat(blockValuesInRow);
        }, []);
    if (blockValues.includes(value)) {
        return CellValidationResult.AlreadyInBlock;
    }

    if (solutionFormation.rows[row][column].value !== value) {
        return CellValidationResult.InvalidValue;
    }
    return CellValidationResult.Valid;
};
