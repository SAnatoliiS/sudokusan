import { Formation, SolutionCell } from '../types';

/**
 * Returns a new formation with some cells removed from the input formation.
 * @param solutionFormation The formation to remove cells from.
 * @returns A new formation with some cells removed.
 */
export const getInitialFormation = (solutionFormation: Formation<SolutionCell>): Formation => {
    // TODO - Add logic to generate an initial formation
    const rows = solutionFormation.rows.map(row => {
        return row.map(cell => {
            return {
                value: Math.random() > 0.8 ? cell.value : null,
            };
        });
    });
    return { rows };
};
