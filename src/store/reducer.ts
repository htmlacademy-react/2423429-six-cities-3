import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const/cities';
import {
  changeCity,
  loadOffers,
  requireAuthorization,
  setSortType,
  setError,
  setOffersDataLoadingStatus,
} from './action';
import { City, Offers, SortType } from '../types/offer';
import { AuthorizationStatus } from '../const/const';

type InitialState = {
  city: City;
  offers: Offers;
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  sortType: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
