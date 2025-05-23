import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Offers, SortType } from '../../types/offer';
import { ThunkOptions } from '..';
import { CITIES } from '../../const/cities';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../../const';


type OffersState = {
  [x: string]: any;
  offers: Offers;
  city: City;
  sortType: SortType;
  isOffersLoading: boolean;
  hasError: boolean;
  error: string | null;
};

const initialState: OffersState = {
  offers: [],
  city: CITIES[0],
  sortType: 'Popular',
  isOffersLoading: false,
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

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
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
        state.isOffersLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.isOffersLoading = false;
        state.hasError = true;
        state.error = action.error.message || 'Failed to load offers';
      });
  },
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

export const {
  setError,
  changeCity,
  setSortType,
} = offersSlice.actions;
export default offersSlice.reducer;
