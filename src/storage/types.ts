// Size of the playground
export interface FormationSize {
    width: number;
    height: number;
    sectorWidth: number;
    sectorHeight: number;
}

export type Cell = number | null;
export type SolutionCell = NonNullable<Cell>;

export type Row<T = Cell | SolutionCell> = T[];

// Placement of numbers in the two-dimensional playground of setuppable size
export interface Formation<T extends Cell | SolutionCell> {
    rows: Row<T>[];
}
