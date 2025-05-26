import { City, Offers, SortType } from '../../types/offer';
import { RootState } from '../index';

export const getCity = (state: RootState): City => state.offers.city;
export const getOffers = (state: RootState): Offers => state.offers.offers;
export const getSortType = (state: RootState): SortType =>
  state.offers.sortType;
export const getOffersLoadingStatus = (state: RootState): boolean =>
  state.offers.isOffersLoading;
export const getHasError = (state: RootState): boolean =>
  state.offers.hasOffersError;
