import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const/cities';
import {
  changeCity,
  loadOffers,
  requireAuthorization,
  setSortType,
} from './action';
import { City, Offers, SortType } from '../types/offer';
import { AuthorizationStatus } from '../const/const';

type InitalState = {
  city: City;
  offers: Offers;
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
};

const initialState: InitalState = {
  city: CITIES[0],
  offers: [],
  sortType: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
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
    });
});

export { reducer };
