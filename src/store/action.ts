import { createAction } from '@reduxjs/toolkit';
import { City, SortType } from '../types/offer';

export const changeCity = createAction<City>('CHANGE_CITY');
export const setSortType = createAction<SortType>('SET_SORT_TYPE');
