import { RootState } from '../../store';

export const getNearOffers = (state: RootState) => state.nearby.offers;
export const getNearbyLoadingStatus = (state: RootState) => state.nearby.isNearbyOffersLoading;
export const getNearbyError = (state: RootState) => state.nearby.error;
