import { createAction } from '@reduxjs/toolkit';
import { City, Offers, SortType } from '../types/offer';
import { AuthorizationStatus } from '../const/const';

export const changeCity = createAction<City>('CHANGE_CITY');
export const setSortType = createAction<SortType>('SET_SORT_TYPE');

export const loadOffers = createAction<Offers>('data/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);

export const setError = createAction<string | null>('data/setError');
