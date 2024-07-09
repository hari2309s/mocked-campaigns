import { configureStore } from '@reduxjs/toolkit';
import overviewReducer from './features/overviewSlice';
import campaignsReducer from './features/campaignsSlice';

export const store = configureStore({
  reducer: {
    overview: overviewReducer,
    campaigns: campaignsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
