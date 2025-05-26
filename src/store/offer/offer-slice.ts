import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThunkOptions } from '..';
import { APIRoute } from '../../const';
import { Offer } from '../../types/offer';
import { setError } from '../app/app-slice';
import axios from 'axios';
import { Nullable } from 'vitest';

type OfferState = {
  offer: Offer | null;
  isOfferLoading: boolean;
  error: Nullable<string>;
  errorStatus: number | null;
};

const initialState: OfferState = {
  offer: null,
  isOfferLoading: false,
  error: null,
  errorStatus: null,
};

export const fetchOffer = createAsyncThunk<Offer, string, ThunkOptions>(
  'offer/fetch',
  async (offerId, { extra: api, rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return rejectWithValue('404');
      }

      dispatch(setError('Failed to load offer'));
      throw error;
    }
  }
);

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
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

        if (action.payload === '404') {
          state.errorStatus = 404;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default offerSlice.reducer;
