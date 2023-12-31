/* eslint-disable no-console */
import { generateBaseFormation } from './generateBaseFormation';
import { randomSwapOperations } from './randomSwapOperations';
import { Formation, FormationDimensions, SolutionCell } from '../types';
import { Constants } from './constants';

/**
 * Creates a formation of solution cells for a given size.
 * @param dimensions The dimensions of the formation.
 * @returns The formation of solution cells.
 */
export const createSolutionFormation = (
    formationDimensions: FormationDimensions,
    measurePerformance = true,
): Formation<SolutionCell> => {
    // lets measure the time it takes to generate the solution
    const startTime = measurePerformance ? Date.now() : 0;

    const baseFormation = generateBaseFormation(formationDimensions);

    const numberOfSwaps =
        Math.floor(Math.random() * Constants.minimumSwapActionCount) +
        Constants.minimumSwapActionCount;
    let resultFormation = baseFormation;
    for (let i = 0; i < numberOfSwaps; i += 1) {
        const randomSwapOperation =
            randomSwapOperations[Math.floor(Math.random() * randomSwapOperations.length)];
        resultFormation = randomSwapOperation(resultFormation, formationDimensions);
    }

    const endTime = measurePerformance ? Date.now() : 0;
    if (measurePerformance && startTime && endTime) {
        console.log(`Solution generation took ${endTime - startTime} milliseconds.`);
    }
    return resultFormation;
};
