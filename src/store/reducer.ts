import { createReducer } from '@reduxjs/toolkit';
import { Offer, CityName } from '../types/offer';
import { setCity, loadOffers } from './actions';

export interface OffersState {
  city: CityName;
  offers: Offer[];
}

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
