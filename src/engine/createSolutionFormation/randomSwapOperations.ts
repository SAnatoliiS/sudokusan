import { Formation, SolutionCell, FormationDimensions } from '../types';

const swapRows = (
    formation: Formation<SolutionCell>,
    row1: number,
    row2: number,
): Formation<SolutionCell> => {
    const rows = formation.rows.slice();
    const tempRow = rows[row1];
    rows[row1] = rows[row2];
    rows[row2] = tempRow;

    return { rows };
};

const swapColumns = (
    formation: Formation<SolutionCell>,
    column1: number,
    column2: number,
): Formation<SolutionCell> => {
    const rows = formation.rows.slice();
    const newRows = rows.map(row => {
        const newRow = [...row];
        const tempCell = newRow[column1];
        newRow[column1] = newRow[column2];
        newRow[column2] = tempCell;

        return newRow;
    });
    return { rows: newRows };
};

const swapRowsArea = (
    formation: Formation<SolutionCell>,
    rowArea1: number,
    rowArea2: number,
    { blockHeight }: FormationDimensions,
): Formation<SolutionCell> => {
    const rows = formation.rows.slice();
    const rowArea1Start = rowArea1 * blockHeight;
    const rowArea2Start = rowArea2 * blockHeight;
    for (let i = 0; i < blockHeight; i += 1) {
        const tempRow = rows[rowArea1Start + i];
        rows[rowArea1Start + i] = rows[rowArea2Start + i];
        rows[rowArea2Start + i] = tempRow;
    }

    return { rows };
};

const swapColumnsArea = (
    formation: Formation<SolutionCell>,
    columnArea1: number,
    columnArea2: number,
    { blockWidth }: FormationDimensions,
): Formation<SolutionCell> => {
    const rows = formation.rows.slice();
    const columnArea1Start = columnArea1 * blockWidth;
    const columnArea2Start = columnArea2 * blockWidth;
    const newRows = rows.map(row => {
        const newRow = row.slice();
        for (let i = 0; i < blockWidth; i += 1) {
            const tempCell = newRow[columnArea1Start + i];
            newRow[columnArea1Start + i] = newRow[columnArea2Start + i];
            newRow[columnArea2Start + i] = tempCell;
        }
        return newRow;
    });

    return { rows: newRows };
};

const getRandomLinesOfOneArea = (size: number, blockSize: number) => {
    const lineArea = Math.floor(Math.random() * (size / blockSize));
    const lineAreaStart = lineArea * blockSize;

    const line1 = Math.floor(Math.random() * blockSize);
    // Lets make sure that we don't swap the line with itself
    const line2 = (line1 + Math.floor(Math.random() * (blockSize - 1)) + 1) % blockSize;

    return {
        lineAreaStart,
        line1,
        line2,
    };
};

const swapRandomRowsOfOneArea = (
    formation: Formation<SolutionCell>,
    { size, blockHeight }: FormationDimensions,
): Formation<SolutionCell> => {
    const {
        lineAreaStart: rowAreaStart,
        line1: row1,
        line2: row2,
    } = getRandomLinesOfOneArea(size, blockHeight);
    return swapRows(formation, rowAreaStart + row1, rowAreaStart + row2);
};

const swapRandomColumnsOfOneArea = (
    formation: Formation<SolutionCell>,
    { size, blockWidth }: FormationDimensions,
): Formation<SolutionCell> => {
    const {
        lineAreaStart: columnAreaStart,
        line1: column1,
        line2: column2,
    } = getRandomLinesOfOneArea(size, blockWidth);
    return swapColumns(formation, columnAreaStart + column1, columnAreaStart + column2);
};

// Make function that returns two random areas
const getRandomAreas = (size: number, blockSize: number) => {
    const numberOfAreas = size / blockSize;
    const area1 = Math.floor(Math.random() * numberOfAreas);
    // Let's make sure that we don't swap the area with itself
    const area2 = (area1 + Math.floor(Math.random() * (numberOfAreas - 1)) + 1) % numberOfAreas;

    return {
        area1,
        area2,
    };
};

const swapRandomRowsAreas = (
    formation: Formation<SolutionCell>,
    formationDimensions: FormationDimensions,
): Formation<SolutionCell> => {
    const { size, blockHeight } = formationDimensions;
    const { area1: rowArea1, area2: rowArea2 } = getRandomAreas(size, blockHeight);

    return swapRowsArea(formation, rowArea1, rowArea2, formationDimensions);
};

const swapRandomColumnsAreas = (
    formation: Formation<SolutionCell>,
    formationDimensions: FormationDimensions,
): Formation<SolutionCell> => {
    const { size, blockWidth } = formationDimensions;
    const { area1: rowArea1, area2: rowArea2 } = getRandomAreas(size, blockWidth);

    return swapColumnsArea(formation, rowArea1, rowArea2, formationDimensions);
};

export const randomSwapOperations = [
    swapRandomRowsOfOneArea,
    swapRandomColumnsOfOneArea,
    swapRandomRowsAreas,
    swapRandomColumnsAreas,
];
