import { CellValue, Formation } from './types';

export const getFormationWithOpenCell = (
    formation: Formation,
    row: number,
    column: number,
    value: CellValue,
): Formation => {
    const rows = formation.rows.slice();
    if (rows[row] == null || rows[row][column] == null) {
        return formation;
    }
    rows[row][column].value = value;
    return { rows };
};
