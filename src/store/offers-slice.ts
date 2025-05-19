import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Offers, SortType } from '../types/offer';
import { ThunkOptions } from '.';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const/const';
import { CITIES } from '../const/cities';

type OffersState = {
  offers: Offers;
  city: City;
  sortType: SortType;
  isLoading: boolean;
  hasError: boolean;
  error: string | null;
};

const initialState: OffersState = {
  offers: [],
  city: CITIES[0],
  sortType: 'Popular',
  isLoading: false,
  hasError: false,
  error: null,
};

export const fetchOffersAction = createAsyncThunk<
  Offers,
  undefined,
  ThunkOptions
>('offers/fetch', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.Offers);
  return data;
});

export const clearErrorAction = createAsyncThunk(
  'offers/clearError',
  (_, { dispatch }) => {
    setTimeout(
      () => dispatch(offersSlice.actions.clearError()),
      TIMEOUT_SHOW_ERROR
    );
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offers>) => {
      state.offers = action.payload;
    },
    loadOffersError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error.message || 'Failed to load offers';
      });
  },
});

export const {
  loadOffers,
  loadOffersError,
  setOffersDataLoadingStatus,
  setError,
  changeCity,
  setSortType,
  clearError,
} = offersSlice.actions;
export default offersSlice.reducer;
