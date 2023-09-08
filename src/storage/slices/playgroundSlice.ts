// RTK uses Immer inside, so we can mutate state directly
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Cell, Formation, FormationSize, SolutionCell } from '../types';

interface PlaygroundState {
    currentFormation: Formation<Cell>;
    solutionFormation: Formation<SolutionCell>;
    size: FormationSize;
}

const initialState: PlaygroundState = {
    currentFormation: {
        rows: [],
    },
    solutionFormation: {
        rows: [],
    },
    size: {
        width: 0,
        height: 0,
        sectorWidth: 0,
        sectorHeight: 0,
    },
};

export const playgroundSlice = createSlice({
    name: 'playground',
    initialState,
    reducers: {
        setSolutionFormation: (state, action: PayloadAction<Formation<SolutionCell>>) => {
            state.solutionFormation = action.payload;
        },
        setCurrentFormation: (state, action: PayloadAction<Formation<Cell>>) => {
            state.currentFormation = action.payload;
        },
        setSize: (state, action: PayloadAction<FormationSize>) => {
            state.size = action.payload;
        },
        openCell: (state, action: PayloadAction<{ row: number; column: number }>) => {
            const { row, column } = action.payload;
            state.currentFormation.rows[row][column] = state.solutionFormation.rows[row][column];
        },
    },
});

export const { setCurrentFormation, setSize, setSolutionFormation, openCell } =
    playgroundSlice.actions;

export const selectCurrentFormation = (state: RootState) => state.playground.currentFormation;

export default playgroundSlice.reducer;
