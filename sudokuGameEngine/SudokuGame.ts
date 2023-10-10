import {
    CellValidationResult,
    CellValue,
    Formation,
    GameConfig,
    SolutionCell,
    SudokuGameInitializationParams,
} from './types';
import { SudokuStore } from './SudokuStore';
import { History } from './History';
import { validateValue } from './validateValue';

export class SudokuGame {
    private config: GameConfig;

    private store: SudokuStore;

    private history: History;

    private solutionFormation: Formation<SolutionCell>;

    constructor({ config, restoreGame }: SudokuGameInitializationParams) {
        this.config = config;

        if (restoreGame) {
            const { moveHistory, solutionFormation, currentFormation } = restoreGame;
            this.store = new SudokuStore({
                config,
                restoreGame: { solutionFormation, currentFormation },
            });
            this.history = new History(moveHistory);
            this.store.setFormation(currentFormation);
        } else {
            this.store = new SudokuStore({ config });
            this.history = new History();
        }

        this.solutionFormation = this.store.getSolution();
    }

    public getFormation() {
        return this.store.getFormation();
    }

    public setFormation(formation: Formation) {
        this.store.setFormation(formation);
    }

    public getSolution() {
        return this.store.getSolution();
    }

    public getMoveHistory() {
        return this.history.getMoveHistory();
    }

    private saveMove(value: CellValue, row: number, column: number) {
        this.store.insertValueByCoordinates(value, row, column);
        this.history.addMove({ row, column, value });
    }

    public assumeValueInCell(
        value: CellValue,
        row: number,
        column: number,
    ): {
        validationResult: CellValidationResult;
        newFormation: Formation;
    } {
        const currentFormation = this.store.getFormation();
        const validationResult: CellValidationResult = validateValue(
            currentFormation,
            this.solutionFormation,
            row,
            column,
            value,
            this.config,
        );
        if (validationResult.errors.length === 0) {
            this.saveMove(value, row, column);
        }

        return {
            validationResult,
            newFormation: currentFormation,
        };
    }

    public eraseCell(row: number, column: number): Formation {
        const currentFormation = this.store.getFormation();
        const validationResult: CellValidationResult = validateValue(
            currentFormation,
            this.solutionFormation,
            row,
            column,
            null,
            this.config,
        );
        if (validationResult.errors.length === 0) {
            this.saveMove(null, row, column);
        }
        return currentFormation;
    }

    public undoLastMove(): void {
        const lastMove = this.history.undoLastMove();
        if (lastMove) {
            const { value, row, column } = lastMove;
            this.store.insertValueByCoordinates(value, row, column);
        }
    }

    public getHint(row: number, column: number): Formation {
        const { value } = this.solutionFormation.rows[row][column];
        this.store.insertCellByCoordinates({ value, fixed: true }, row, column);
        return this.store.getFormation();
    }
}
