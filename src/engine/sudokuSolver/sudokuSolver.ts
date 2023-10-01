// Note: This is a port of the DLX algorithm from the Dancing Links paper by Donald Knuth.
import { DoX } from './DoX';
import { addBelow, addRight } from './addHelpers';
import { search } from './algorithmXSearch';
import { convertSolutionToArray } from './convertSolutionToArray';
import { getError } from './getError';
import { gridMeta } from './gridMeta';
import { indexesHelper } from './indexesHelper';
import type { Config, SudokuSolutions } from './types';

/**
 * Given a puzzle string, reduce it to an exact-cover matrix and use
 * Donald Knuth's DLX algorithm to solve it.
 * @param puzzle
 */
export function getSudokuSolutions(
    puzzle: number[][],
    config: Config,
    maxSolutionCount = 2,
): SudokuSolutions {
    const { blockWidth, blockHeight } = config;
    const size = puzzle.length;
    const {
        cellCount, // The total number of cells in a grid (81 for a 9x9 grid)
        tokenCount, // The total number of unique tokens to be placed.
        grid2D, // A 2D array representation of the grid, with each element
        // being an array of candidates for a cell. Known cells are
        // single element arrays.
    } = gridMeta(puzzle);

    const getIndex = indexesHelper(size, blockWidth, blockHeight);

    /**
     * The DLX Header row.
     * Its length is 4 times the grid's size. This is to be able to encode
     * each of the 4 Sudoku constrains, onto each of the cells of the grid.
     * The array is initialized with unlinked DoX nodes, but in the next step
     * those nodes are all linked.
     */
    const headRow = new Array(4 * cellCount).fill('').map((_, i) => new DoX(`H${i}`));

    /**
     * The header row root object. This is circularly linked to be to the left
     * of the first header object in the header row array.
     * It is used as the entry point into the DLX algorithm.
     */
    const head = new DoX('ROOT');
    headRow.reduce((p, c) => addRight(p, c), head);

    /**
     * Transposed the sudoku puzzle into a exact cover matrix, so it can be passed
     * to the DLX algorithm to solve.
     */
    for (let currentCellIndex = 0; currentCellIndex < cellCount; currentCellIndex += 1) {
        const { rowIndex, columnIndex, blockIndex } = getIndex(currentCellIndex);
        grid2D[currentCellIndex].forEach(num => {
            const id = `${currentCellIndex}:${num}`;
            const condIdx = num - 1;

            // The 4 columns that we will populate.
            const A = headRow[currentCellIndex];
            const B = headRow[cellCount + condIdx + rowIndex * tokenCount];
            const C = headRow[cellCount * 2 + condIdx + columnIndex * tokenCount];
            const D = headRow[cellCount * 3 + condIdx + blockIndex * tokenCount];

            // The Row-Column Constraint
            const rcc = addBelow(A.U, new DoX(id, A));

            // The Row-Number Constraint
            const rnc = addBelow(B.U, addRight(rcc, new DoX(id, B)));

            // The Column-Number Constraint
            const cnc = addBelow(C.U, addRight(rnc, new DoX(id, C)));

            // The Block-Number Constraint
            addBelow(D.U, addRight(cnc, new DoX(id, D)));
        });
    }
    const solutions = search(head, [], maxSolutionCount);

    return {
        error: getError(solutions),
        result: solutions.slice(0, maxSolutionCount).map(convertSolutionToArray(size)),
    };
}
