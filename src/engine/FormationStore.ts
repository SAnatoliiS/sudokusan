import { createSolutionFormation, getInitialFormation } from './formationGenerator';
import { getFormationWithOpenCell } from './getFormationWithOpenedCell';
import { Formation, SolutionCell, CellValidationResult, CellValue, GameConfig } from './types';
import { validateValue } from './validateValue';

export class FormationStore {
    private solutionFormation: Formation<SolutionCell>;

    private currentFormation: Formation;

    private config: GameConfig;

    constructor(config: GameConfig) {
        this.solutionFormation = createSolutionFormation(config.dimensions);
        this.currentFormation = getInitialFormation(this.solutionFormation);
        this.config = config;
    }

    getFormation(): Formation {
        return this.currentFormation;
    }

    setFormation(formation: Formation): void {
        this.currentFormation = formation;
    }

    getSolution(): Formation<SolutionCell> {
        return this.solutionFormation;
    }

    // TODO: Add duplicate cell coordinates in validation result
    insertValueByCoordinate(value: CellValue, row: number, column: number) {
        const validationResult: CellValidationResult = validateValue(
            this.currentFormation,
            this.solutionFormation,
            row,
            column,
            value,
            this.config.dimensions,
        );
        if (validationResult === CellValidationResult.Valid) {
            const newFormation = getFormationWithOpenCell(
                this.currentFormation,
                row,
                column,
                value,
            );
            this.setFormation(newFormation);
        }

        return {
            validationResult,
            newFormation: this.currentFormation,
        };
    }

    /*
    TODO: Add the following methods:
    cancelLastAction
    eraseCell
    giveHint
    */
}
