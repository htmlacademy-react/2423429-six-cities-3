import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Offers, SortType } from '../../types/offer';
import { ThunkOptions } from '..';
import { CITIES } from '../../const/CITIES';
import { APIRoute } from '../../const';
import { setError } from '../app/app-slice';

type OffersState = {
  [x: string]: any;
  offers: Offers;
  city: City;
  sortType: SortType;
  isOffersLoading: boolean;
  hasOffersError: boolean;
};

const initialState: OffersState = {
  offers: [],
  city: CITIES[0],
  sortType: 'Popular',
  isOffersLoading: false,
  hasOffersError: false,
};

export const fetchOffersAction = createAsyncThunk<
  Offers,
  undefined,
  ThunkOptions
>('offers/fetch', async (_arg, { dispatch, extra: api }) => {
  try {
  const { data } = await api.get<Offers>(APIRoute.Offers);
  return data;
  } catch (error) {
    dispatch(setError('Failed to load offers. Please try again.'))
  }
});

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
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

export const { changeCity, setSortType } = offersSlice.actions;
export default offersSlice.reducer;
