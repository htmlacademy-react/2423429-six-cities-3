import { createReducer} from "@reduxjs/toolkit";
import { CITIES } from "../const/cities";
import { changeCity, setOffers} from './action';
import { City, Offer } from "../types/offer";

interface AppState {
  city: City;
  offers: Offer[];
}

const initialState: AppState = {
  city: CITIES[0],
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
