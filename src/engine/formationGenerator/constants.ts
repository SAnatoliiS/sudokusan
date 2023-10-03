import { Difficulty } from '../types';

export const Constants = {
    minimumSwapActionCount: 1000,

    openedCellsProportion: {
        [Difficulty.Easy]: 0.5,
        [Difficulty.Medium]: 0.3,
        [Difficulty.Hard]: 0.2,
        [Difficulty.Expert]: 0.1,
        [Difficulty.Devil]: 0,
    },
};
