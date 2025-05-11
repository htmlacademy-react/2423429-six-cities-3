import { createAction } from '@reduxjs/toolkit';
import { Offer, CityName } from '../types/offer';

export const setCity = createAction<CityName>('offers/setCity');
export const loadOffers = createAction<Offer[]>('offers/loadOffers');
