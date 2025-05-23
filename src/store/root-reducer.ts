import { combineReducers } from '@reduxjs/toolkit';
import offerReducer from './offer/offer-slice';
import offersReducer from './offers/offers-slice';
import userReducer from './user/user-slice';
import commentsReducer from './commments/comments-slice';
import nearbyOffersReducer from './nearby-offers/nearby-offers-slice';
import appReducer from './app/app-slice'

export const rootReducer = combineReducers({
  offer: offerReducer,
  offers: offersReducer,
  user: userReducer,
  comments: commentsReducer,
  nearby: nearbyOffersReducer,
  app: appReducer,
});
