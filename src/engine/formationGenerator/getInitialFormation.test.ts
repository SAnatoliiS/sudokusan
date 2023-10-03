import { getInitialFormation } from './getInitialFormation';
import { Difficulty } from '../types';
import { createSolutionFormation } from './createSolutionFormation';
import { checkFormation } from './checkFormation';

describe('getInitialFormation', () => {
    it('should return a valid initial formation', () => {
        const dimensions = { size: 9, blockWidth: 3, blockHeight: 3 };
        const solutionFormation = createSolutionFormation(dimensions);
        const initialFormation = getInitialFormation(solutionFormation, {
            difficulty: Difficulty.Easy,
            dimensions: { size: 9, blockWidth: 3, blockHeight: 3 },
            autoErrorChecking: true,
        });

        const sudokuError = checkFormation(initialFormation, dimensions);
        const nullCount = initialFormation.rows.flat().filter(cell => cell.value === null).length;

        expect(initialFormation).toBeDefined();
        expect(initialFormation.rows.length).toBe(9);
        expect(initialFormation.rows[0].length).toBe(9);
        expect(nullCount).toBeGreaterThanOrEqual(1);
        expect(sudokuError).toBeNull();
    });
});
