import { RootState } from '..';

export const getOffer = (state: RootState) => state.offer.offer;
export const getOfferLoadingStatus = (state: RootState) =>
  state.offer.isOfferLoading;
export const getOfferError = (state: RootState) => state.offer.error;
export const getOfferErrorStatus = (state: RootState) => state.offer.errorStatus;
