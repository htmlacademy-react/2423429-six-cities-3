import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { MAX_NEARBY_OFFERS } from '../../const';

const selectNearbyOffers = (state: RootState) => state.nearby.offers;

export const getNearOffers = createSelector(selectNearbyOffers, (offers) =>
  offers.slice(0, MAX_NEARBY_OFFERS)
);
export const getNearbyLoadingStatus = (state: RootState) =>
  state.nearby.isNearbyOffersLoading;
export const getNearbyError = (state: RootState) => state.nearby.error;
