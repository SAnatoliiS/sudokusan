import { CellValue, Formation } from './types';

export const getFormationWithChangedCell = (
    formation: Formation,
    row: number,
    column: number,
    value: CellValue,
): Formation => {
    const rows = formation.rows.map(r => r.map(cell => ({ ...cell })));
    if (rows[row] == null || rows[row][column] == null) {
        console.error(
            `getFormationWithChangedCell: Attempting to access an invalid cell row:${row}, column:${column}`,
        );
        return formation;
    }
    rows[row][column].value = value;
    return { ...formation, rows };
};
