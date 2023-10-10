export interface GridMeta {
    cellCount: number;
    tokenCount: number;
    grid2D: number[][];
}
export interface Indexes {
    rowIndex: number;
    columnIndex: number;
    blockIndex: number;
}
export enum SudokuSolverError {
    NoSolutions = 'No solutions found',
    MoreThanOneSolution = 'More than one solution found',
}
export interface SudokuSolutions {
    error: SudokuSolverError | null;
    result: number[][][];
}
export interface Config {
    blockWidth: number;
    blockHeight: number;
}
