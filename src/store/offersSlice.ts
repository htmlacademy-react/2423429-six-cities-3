// src/store/offersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Offer, CityName } from '../types/offer';
import { fetchOffersApi } from '../services/api';

export interface OffersState {
  city: CityName;
  items: Offer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  city: 'Paris',
  items: [],
  isLoading: false,
  error: null,
};

/**
 * thunk для получения списка офферов
 */
export const fetchOffers = createAsyncThunk<
  Offer[],
  void,
  { rejectValue: string }
>('offers/fetchOffers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchOffersApi();
    return response.data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return rejectWithValue(message);
  }
});

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<CityName>) {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to load offers';
      });
  },
});

export const { setCity } = offersSlice.actions;
export default offersSlice.reducer;
