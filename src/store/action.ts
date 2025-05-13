import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const changeCity = createAction<string>('CHANGE_CITY');
export const setOffers = createAction<Offer[]>('SET_OFFERS');
