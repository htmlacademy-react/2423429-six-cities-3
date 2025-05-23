import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { ThunkOptions } from '..';
import { APIRoute } from '../../const';

type NearbyOffersState = {
  offers: Offer[];
  isNearbyOffersLoading: boolean;
  error: string | null;
};

const initialState: NearbyOffersState = {
  offers: [],
  isNearbyOffersLoading: false,
  error: null,
};

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  ThunkOptions
>('nearby/fetch', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer[]>(
    `${APIRoute.Offers}/${offerId}/nearby`
  );
  return data;
});

const nearbyOffersSlice = createSlice({
  name: 'nearby',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isNearbyOffersLoading = true;
        state.error = null;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isNearbyOffersLoading = false;
      })
      .addCase(fetchNearbyOffers.rejected, (state, action) => {
        state.isNearbyOffersLoading = false;
        state.error = action.error.message || 'Failed to load nearby offers';
      });
  },
});

export default nearbyOffersSlice.reducer;
