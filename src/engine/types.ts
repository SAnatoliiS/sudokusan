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
    autoErrorChecking: boolean;
    difficulty: Difficulty;
}

export type CellValue = number | null;

export interface Cell {
    value: CellValue;
}

export interface SolutionCell extends Cell {
    value: NonNullable<Cell['value']>;
}

export type Row<T extends Cell | SolutionCell = Cell> = T[];

// Placement of numbers in the two-dimensional playground of setuppable size
export interface Formation<T extends Cell | SolutionCell = Cell> {
    rows: Row<T>[];
}

export enum CellValidationResult {
    AlreadySet = 'already-set',
    AlreadyInRow = 'already-in-row',
    AlreadyInColumn = 'already-in-column',
    AlreadyInBlock = 'already-in-block',
    InvalidValue = 'invalid-value',
    OutOfBounds = 'out-of-bounds',
    Valid = 'valid',
}
