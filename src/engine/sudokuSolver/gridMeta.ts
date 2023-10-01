import { GridMeta } from './types';

/**
 * Helper to get some meta about the grid.
 */
export const gridMeta = (puzzle: number[][]): GridMeta => {
    const g = puzzle.flat();
    const cellCount = g.length;
    const tokenCount = Math.sqrt(cellCount);
    const grid2D = g.map(e => (e === 0 ? new Array(tokenCount).fill(1).map((_, i) => i + 1) : [e]));
    return { cellCount, tokenCount, grid2D };
};
