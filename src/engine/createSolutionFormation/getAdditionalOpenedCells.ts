import { Difficulty } from '../types';
import { Constants } from './constants';

export function getAdditionalOpenedCells(
    difficulty: Difficulty,
    size: number,
    openedCellsCount: number,
): number {
    const additionalOpenedCellsCount = Math.floor(
        Constants.openedCellsProportion[difficulty] * (size ** 2 - openedCellsCount),
    );
    return additionalOpenedCellsCount;
}
