import { GameConfig } from './types';
import { FormationStore } from './FormationStore';

export const newGame = (config: GameConfig) => {
    const formationStore = new FormationStore(config);

    return {
        formation: formationStore,
    };
};
