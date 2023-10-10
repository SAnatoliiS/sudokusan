import { createSolutionFormation, getInitialFormation } from './createSolutionFormation';
import { getFormationWithChangedCell } from './getFormationWithChangedCell';
import { Formation, SolutionCell, CellValue, Cell, SudokuStoreInitializationParams } from './types';

export class SudokuStore {
    private solutionFormation: Formation<SolutionCell>;

    private currentFormation: Formation;

    constructor({ config, restoreGame }: SudokuStoreInitializationParams) {
        if (restoreGame) {
            const { solutionFormation, currentFormation } = restoreGame;
            this.solutionFormation = solutionFormation;
            this.currentFormation = currentFormation;
        } else {
            this.solutionFormation = createSolutionFormation(config.dimensions);
            this.currentFormation = getInitialFormation(this.solutionFormation, config);
        }
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

    public insertValueByCoordinates(value: CellValue, row: number, column: number) {
        const newFormation = getFormationWithChangedCell(this.currentFormation, row, column, {
            value,
            fixed: false,
        });
        this.setFormation(newFormation);
    }

    public insertCellByCoordinates(cell: Cell, row: number, column: number) {
        const newFormation = getFormationWithChangedCell(this.currentFormation, row, column, cell);
        this.setFormation(newFormation);
    }

    /*
        TODO: Add the following methods:
        cancelLastAction
        giveHint
    */
}
