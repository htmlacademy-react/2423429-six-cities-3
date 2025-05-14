import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const/cities';
import { changeCity } from './action';
import { City, Offer } from '../types/offer';
import { offers } from '../mocks/offers';

interface AppState {
  city: City;
  offers: Offer[];
}

const initialState: AppState = {
  city: CITIES[0],
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
});

export { reducer };
