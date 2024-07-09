import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { IOverview } from '../../api/types';
import { getOverviewApi } from '../../api';
import { RootState } from '../store';

interface OverviewState {
  overview: IOverview;
  loading: boolean;
  error: SerializedError | Error | null;
}

const initialState: OverviewState = {
  overview: { installs: [], revenue: [] },
  loading: false,
  error: null,
};

export const getOverview = createAsyncThunk(
  'overview/getOverview',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOverviewApi();
      return response as IOverview;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getOverview.fulfilled,
        (state, action: PayloadAction<IOverview>) => {
          state.overview = action.payload;
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(getOverview.pending, state => {
        state.overview = { installs: [], revenue: [] };
        state.loading = true;
        state.error = null;
      })
      .addCase(getOverview.rejected, (state, action) => {
        state.overview = { installs: [], revenue: [] };
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const selectOverview = (state: RootState) => state.overview.overview;
export const selectOverviewLoading = (state: RootState) =>
  state.overview.loading;
export const selectOverviewError = (state: RootState) => state.overview.error;

export default overviewSlice.reducer;
