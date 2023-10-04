import { GameConfig } from './types';
import { SudokuStore } from './SudokuStore';

export const newGame = (config: GameConfig) => {
    const sudokuStore = new SudokuStore(config);

    return {
        formation: sudokuStore,
    };
};
