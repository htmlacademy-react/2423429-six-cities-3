import { createAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/offer';

export const changeCity = createAction<City>('CHANGE_CITY');
export const setOffers = createAction<Offer[]>('SET_OFFERS');
