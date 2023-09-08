import { configureStore } from '@reduxjs/toolkit';
import playgroundReducer from './slices/playgroundSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middlewares: any = [
    /* other middlewares */
];

if (__DEV__) {
    // We don't need redux-flipper in prod
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
}
export const store = configureStore({
    reducer: {
        playground: playgroundReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
