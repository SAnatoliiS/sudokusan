import { History } from './History';
import { createSolutionFormation, getInitialFormation } from './formationGenerator';
import { getFormationWithChangedCell } from './getFormationWithChangedCell';
import { Formation, SolutionCell, CellValidationResult, CellValue, GameConfig } from './types';
import { validateValue } from './validateValue';

export class SudokuStore {
    private solutionFormation: Formation<SolutionCell>;

    private currentFormation: Formation;

    private history: History;

    private config: GameConfig;

    constructor(config: GameConfig) {
        this.solutionFormation = createSolutionFormation(config.dimensions);
        this.currentFormation = getInitialFormation(this.solutionFormation, config);
        this.history = new History();
        this.config = config;
    }

    public getFormation(): Formation {
        return this.currentFormation;
    }

    public setFormation(formation: Formation): void {
        this.currentFormation = formation;
    }

    public getSolution(): Formation<SolutionCell> {
        return this.solutionFormation;
    }

    public assumeValueAtCoordinates(
        value: CellValue,
        row: number,
        column: number,
    ): {
        validationResult: CellValidationResult;
        newFormation: Formation;
    } {
        const validationResult: CellValidationResult = validateValue(
            this.currentFormation,
            this.solutionFormation,
            row,
            column,
            value,
            this.config,
        );
        if (validationResult.errors.length === 0) {
            this.insertValueByCoordinate(value, row, column);
        }

        return {
            validationResult,
            newFormation: this.currentFormation,
        };
    }

    public eraseValueAtCoordinates(row: number, column: number): Formation {
        const validationResult: CellValidationResult = validateValue(
            this.currentFormation,
            this.solutionFormation,
            row,
            column,
            null,
            this.config,
        );
        if (validationResult.errors.length === 0) {
            this.insertValueByCoordinate(null, row, column);
        }
        return this.currentFormation;
    }

    private insertValueByCoordinate(value: CellValue, row: number, column: number) {
        const newFormation = getFormationWithChangedCell(this.currentFormation, row, column, value);
        this.setFormation(newFormation);
        this.history.addMove({
            row,
            column,
            value,
        });
    }

    /*
        TODO: Add the following methods:
        cancelLastAction
        giveHint
    */
}
