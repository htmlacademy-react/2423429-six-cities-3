import { RootState } from '..';
import { MAX_NEARBY_OFFERS } from '../../const';

export const getNearOffers = (state: RootState) => state.nearby.offers.slice(0, MAX_NEARBY_OFFERS);
export const getNearbyLoadingStatus = (state: RootState) => state.nearby.isNearbyOffersLoading;
export const getNearbyError = (state: RootState) => state.nearby.error;
