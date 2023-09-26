/* eslint-disable no-console */
import { generateBaseFormation } from './generateBaseFormation';
import { randomSwapOperations } from './randomSwapOperations';
import { Formation, FormationDimensions, SolutionCell } from '../types';
import { constants } from './constants';

/**
 * Creates a formation of solution cells for a given size.
 * @param dimensions The dimensions of the formation.
 * @returns The formation of solution cells.
 */
export const createSolutionFormation = (
    formationDimensions: FormationDimensions,
): Formation<SolutionCell> => {
    // lets measure the time it takes to generate the solution
    const startTime = performance.now();
    const baseFormation = generateBaseFormation(formationDimensions);

    const numberOfSwaps =
        Math.floor(Math.random() * constants.minimumSwapActionCount) +
        constants.minimumSwapActionCount;
    let resultFormation = baseFormation;
    for (let i = 0; i < numberOfSwaps; i += 1) {
        const randomSwapOperation =
            randomSwapOperations[Math.floor(Math.random() * randomSwapOperations.length)];
        resultFormation = randomSwapOperation(resultFormation, formationDimensions);
    }

    const endTime = performance.now();
    console.log(`Solution generation took ${endTime - startTime} milliseconds.`);
    return resultFormation;
};

const logFormation = (formation: Formation) => {
    for (let i = 0; i < formation.rows.length; i += 1) {
        console.log(formation.rows[i].map(cell => cell.value).join(' '));
    }
};

const solutionFormation = createSolutionFormation({ size: 16, blockWidth: 4, blockHeight: 4 });
logFormation(solutionFormation);
