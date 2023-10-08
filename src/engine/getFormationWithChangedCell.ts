import { Cell, Formation } from './types';

export const getFormationWithChangedCell = (
    formation: Formation,
    row: number,
    column: number,
    cell: Cell,
): Formation => {
    // Get a copy of rows in order to not mutate the original formation
    const rows = formation.rows.map(r => r.map(currentCell => ({ ...currentCell })));
    if (rows[row] == null || rows[row][column] == null) {
        console.error(
            `getFormationWithChangedCell: Attempting to access an invalid cell row:${row}, column:${column}`,
        );
        return formation;
    }
    rows[row][column] = cell;
    return { ...formation, rows };
};
