import { combineReducers } from '@reduxjs/toolkit';
import offerReducer from './offer/offer-slice';
import offersReducer from './offers/offers-slice';
import userReducer from './user/user-slice';
import commentsReducer from './comments/comments-slice';
import nearbyOffersReducer from './nearby-offers/nearby-offers-slice';
import appReducer from './app/app-slice';
import favoriteReducer from '../store/favorites/favorite-slice';

export const rootReducer = combineReducers({
  offer: offerReducer,
  offers: offersReducer,
  user: userReducer,
  comments: commentsReducer,
  nearby: nearbyOffersReducer,
  app: appReducer,
  favorites: favoriteReducer,
});
