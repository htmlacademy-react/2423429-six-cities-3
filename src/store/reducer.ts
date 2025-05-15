import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const/cities';
import {
  changeCity,
  loadOffers,
  requireAuthorization,
  setSortType,
  setError,
} from './action';
import { City, Offers, SortType } from '../types/offer';
import { AuthorizationStatus } from '../const/const';

type InitalState = {
  city: City;
  offers: Offers;
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
};

const initialState: InitalState = {
  city: CITIES[0],
  offers: [],
  sortType: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
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
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
