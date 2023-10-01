import { Indexes } from './types';

/**
 * Given the size of a grid, the width and height of a block, returns a function
 * that takes an index and returns the row, column and block indexes.
 * @param size The size of the grid.
 * @param blockWidth The width of a block.
 * @param blockHeight The height of a block.
 * @return A function that takes an index and returns the row, column and block indexes.
 */
export const indexesHelper =
    (size: number, blockWidth: number, blockHeight: number) =>
    (cellIndex: number): Indexes => {
        const rowIndex = Math.floor(cellIndex / size);
        const columnIndex = cellIndex % size;
        const blockIndex =
            Math.floor(rowIndex / blockHeight) * (size / blockWidth) +
            Math.floor(columnIndex / blockWidth);
        return { rowIndex, columnIndex, blockIndex };
    };
