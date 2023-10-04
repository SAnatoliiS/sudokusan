import { CellValue } from './types';

interface Move {
    row: number;
    column: number;
    value: CellValue;
}

export class History {
    private history: Move[];

    constructor(history?: Move[]) {
        this.history = history ?? [];
    }

    addMove(move: Move) {
        this.history.push(move);
    }

    undoLastMove(): Move | undefined {
        return this.history.pop();
    }
}
