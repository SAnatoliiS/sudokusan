/* eslint-disable no-param-reassign */
import { DoX } from './DoX';

/**
 * @param size The size of the grid. 9 for a 9x9 sudoku.
 */
export function convertSolutionToArray(size: number) {
    return (a: DoX[]): number[][] => {
        const result = new Array(size).fill(null).map(() => new Array(size).fill(0));
        return a.reduce((p: number[][], c: DoX) => {
            // Lets make 2d array of 0s
            const [i, v] = c.V.split(':');
            const iNum = Number(i);
            const row = Math.floor(iNum / size);
            const col = iNum % size;
            p[row][col] = Number(v);
            return p;
        }, result);
    };
}
