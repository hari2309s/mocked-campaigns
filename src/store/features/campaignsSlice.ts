import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { ICampaign } from '../../api/types';
import { getCampaignsApi } from '../../api';
import { RootState } from '../store';
import { v4 as uuid } from 'uuid';

interface CampaignsState {
  selectedCampaign: string;
  campaigns: ICampaign[];
  loading: boolean;
  error: SerializedError | Error | null;
}

const initialState: CampaignsState = {
  selectedCampaign: 'campaign 1',
  campaigns: [],
  loading: false,
  error: null,
};

export const getCampaigns = createAsyncThunk(
  'campaigns/getCampaigns',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCampaignsApi();
      return response as ICampaign[];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaign: (state, action: PayloadAction<string>) => {
      state.selectedCampaign = action.payload;
    },
    addCampaign: (state, action: PayloadAction<string>) => {
      state.campaigns = [
        ...state.campaigns,
        { id: uuid(), name: action.payload, installs: [] },
      ];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        getCampaigns.fulfilled,
        (state, action: PayloadAction<ICampaign[]>) => {
          state.campaigns = action.payload;
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(getCampaigns.pending, state => {
        state.campaigns = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaigns.rejected, (state, action) => {
        state.campaigns = [];
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setCampaign, addCampaign } = campaignsSlice.actions;

export const selectCampaign = (state: RootState) =>
  state.campaigns.selectedCampaign;
export const selectCampaigns = (state: RootState) => state.campaigns.campaigns;
export const selectCampaignsLoading = (state: RootState) =>
  state.campaigns.loading;
export const selectCampaignsError = (state: RootState) => state.campaigns.error;

export default campaignsSlice.reducer;
