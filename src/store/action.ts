import { createAction } from '@reduxjs/toolkit';
import { City, Offers, SortType } from '../types/offer';

export const changeCity = createAction<City>('CHANGE_CITY');
export const setSortType = createAction<SortType>('SET_SORT_TYPE');

export const loadOffers = createAction<Offers>('data/loadOffers');
