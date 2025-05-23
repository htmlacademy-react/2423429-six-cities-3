import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThunkOptions } from '..';
import { APIRoute } from '../../const';
import { Offer } from '../../types/offer';

type OfferState = {
  offer: Offer | null;
  isOfferLoading: boolean;
  error: string | null;
};

const initialState: OfferState = {
  offer: null,
  isOfferLoading: false,
  error: null,
};

export const fetchOffer = createAsyncThunk<Offer, string, ThunkOptions>(
  'offer/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  }
);

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    resetOffer: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.isOfferLoading = true;
        state.error = null;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.isOfferLoading = false;
        state.error = action.error.message || 'Failed to load offer';
      });
  },
});

export const { resetOffer } = offerSlice.actions;
export default offerSlice.reducer;
