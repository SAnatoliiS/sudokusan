/* eslint-disable no-param-reassign */
import { DoX } from './DoX';

/**
 * Verbatim copy of DK's search algorithm. The meat of the DLX algorithm.
 * @param h The root node.
 * @param s The solution array.
 * @param maxSolutionCount The maximum number of solutions to find.
 * @param solutions The array of solutions.
 * @return The array of solutions.
 */
export function search(
    h: DoX,
    s: DoX[],
    maxSolutionCount: number,
    solutions: DoX[][] = [],
): DoX[][] {
    if (h.R === h) {
        return [...solutions, s.slice()];
    }
    const newSolutions: DoX[][] = [];
    const c: DoX = chooseColumn(h);
    cover(c);
    for (let r: DoX = c.D; r !== c; r = r.D) {
        if (maxSolutionCount && newSolutions.length >= maxSolutionCount) {
            break;
        }
        s.push(r);
        for (let j: DoX = r.R; r !== j; j = j.R) {
            cover(j.H);
        }
        const sol: DoX[][] = search(h, s, maxSolutionCount, solutions);
        newSolutions.push(...sol);
        r = s.pop() as DoX;
        for (let j: DoX = r.R; j !== r; j = j.R) {
            uncover(j.H);
        }
    }
    uncover(c);
    return newSolutions.concat(solutions);
}

/**
 * Verbatim copy of DK's chooseColumn algorithm.
 * @param h The root node.
 * @return
 */
const chooseColumn = (h: DoX): DoX => {
    let s = Number.POSITIVE_INFINITY;
    let c = h;
    for (let j = h.R; j !== h; j = j.R) {
        if (j.S < s) {
            c = j;
            s = j.S;
        }
    }
    return c;
};

/**
 * Verbatim copy of DK's cover algorithm
 * @param c
 */
const cover = (c: DoX): void => {
    c.L.R = c.R;
    c.R.L = c.L;
    for (let i: DoX = c.D; i !== c; i = i.D) {
        for (let j: DoX = i.R; j !== i; j = j.R) {
            j.U.D = j.D;
            j.D.U = j.U;
            j.H.S -= 1;
        }
    }
};

/**
 * Verbatim copy of DK's uncover algorithm
 * @param c
 */
const uncover = (c: DoX): void => {
    for (let i: DoX = c.U; i !== c; i = i.U) {
        for (let j: DoX = i.L; i !== j; j = j.L) {
            j.H.S += 1;
            j.U.D = j;
            j.D.U = j;
        }
    }
    c.L.R = c;
    c.R.L = c;
};
