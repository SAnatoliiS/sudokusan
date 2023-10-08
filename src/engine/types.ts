// Size of the playground
export interface FormationDimensions {
    size: number;
    blockWidth: number;
    blockHeight: number;
}

export enum Difficulty {
    Easy,
    Medium,
    Hard,
    Expert,
    Devil,
}

export interface GameConfig {
    dimensions: FormationDimensions;
    validation: {
        checkForConflictsOnInsert: boolean;
        checkForWrongValuesOnInsert: boolean;
    };
    difficulty: Difficulty;
}

export type CellValue = number | null;

export interface Cell {
    value: CellValue;
    fixed: boolean;
}

export interface SolutionCell {
    value: NonNullable<CellValue>;
}

export type Row<T extends Cell | SolutionCell = Cell> = T[];

// Placement of numbers in the two-dimensional playground of setuppable size
export interface Formation<T extends Cell | SolutionCell = Cell> {
    rows: Row<T>[];
}

export enum CellValidationError {
    AlreadySet = 'already-set',
    AlreadyInRow = 'already-in-row',
    AlreadyInColumn = 'already-in-column',
    AlreadyInBlock = 'already-in-block',
    WrongValue = 'wrong-value',
    OutOfBounds = 'out-of-bounds',
}

export interface ConflictingCellCoordinates {
    error: CellValidationError;
    row: number;
    column: number;
}

export interface CellValidationResult {
    errors: CellValidationError[];
    conflictingCellCoordinates: ConflictingCellCoordinates[];
}

export interface Move {
    row: number;
    column: number;
    value: CellValue;
}

export interface SudokuGameInitializationParams {
    config: GameConfig;
    restoreGame?: {
        moveHistory: Move[];
        solutionFormation: Formation<SolutionCell>;
        currentFormation: Formation;
    };
}

export interface SudokuStoreInitializationParams {
    config: GameConfig;
    restoreGame?: {
        solutionFormation: Formation<SolutionCell>;
        currentFormation: Formation;
    };
}
