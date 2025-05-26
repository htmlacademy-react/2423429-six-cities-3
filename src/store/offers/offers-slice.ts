import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Offers, SortType } from '../../types/offer';
import { ThunkOptions } from '..';
import { APIRoute } from '../../const';
import { CITIES } from '../../const/cities';

type OffersState = {
  offers: Offers;
  city: City;
  sortType: SortType;
  isOffersLoading: boolean;
  hasOffersError: boolean;
  offersError: string | null;
};

const initialState: OffersState = {
  offers: [],
  city: CITIES[0],
  sortType: 'Popular',
  isOffersLoading: false,
  hasOffersError: false,
  offersError: null,
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
        state.hasOffersError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.isOffersLoading = false;
        state.hasOffersError = true;
        state.offersError = action.error.message || 'Failed to load offers';
      });
  },
});

export const { changeCity, setSortType } = offersSlice.actions;
export default offersSlice.reducer;
