import { configureStore } from '@reduxjs/toolkit';
import matchReducer from './matchSlice';

export const store = configureStore({
  reducer: {
    matches: matchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;