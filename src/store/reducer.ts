import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const/cities';
import { changeCity, loadOffers, setSortType } from './action';
import { City, Offer, SortType } from '../types/offer';
import { offers } from '../mocks/offers';

interface AppState {
  city: City;
  offers: Offer[];
  sortType: SortType;
}

const initialState: AppState = {
  city: CITIES[0],
  offers,
  sortType: 'Popular',
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
    });
});

export { reducer };
