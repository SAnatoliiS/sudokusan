import { FormationDimensions, Formation, SolutionCell, Row } from '../types';

const getRowWithMovedCellsForward = (row: SolutionCell[], moveBy: number): SolutionCell[] => {
    const cutRowStart = row.slice(0, moveBy);
    return row.slice(moveBy).concat(cutRowStart);
};

export const generateBaseFormation = ({
    size,
    blockHeight,
    blockWidth,
}: FormationDimensions): Formation<SolutionCell> => {
    const initialRow: Row<SolutionCell> = Array.from({ length: size }, (_, index) => ({
        value: index + 1,
    }));

    const firstRowsArea: Row<SolutionCell>[] = Array.from({ length: blockHeight }, (_, index) =>
        getRowWithMovedCellsForward(initialRow, index * blockWidth),
    );

    const restRowsArea: Row<SolutionCell>[] = Array.from(
        { length: size / blockHeight - 1 },
        (_, index) => {
            const currentRowsArea = firstRowsArea.map(row =>
                getRowWithMovedCellsForward(row, index + 1),
            );
            return currentRowsArea;
        },
    ).flat();

    const baseRows: Row<SolutionCell>[] = [...firstRowsArea, ...restRowsArea];

    return { rows: baseRows };
};
