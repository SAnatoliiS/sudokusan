import { Formation, FormationDimensions, SolutionCell } from './types';

/**
 * Creates a formation of solution cells for a given size.
 * @param dimensions The dimensions of the formation.
 * @returns The formation of solution cells.
 */
export const createSolutionFormation = ({ size }: FormationDimensions): Formation<SolutionCell> => {
    // TODO - Add logic to generate a solution formation
    const rows = [];
    for (let i = 0; i < size; i += 1) {
        const row = [];
        for (let j = 0; j < size; j += 1) {
            const value = Math.floor(Math.random() * size) + 1;
            row.push({ value });
        }
        rows.push(row);
    }
    return { rows };
};
