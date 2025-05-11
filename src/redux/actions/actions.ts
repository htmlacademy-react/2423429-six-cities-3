// 1. Описываем возможные значения названий городов
import { CityName } from '../../types/offer';

// 2. Тип описания одного жилья
export interface AccommodationType {
  id: number;
  title: string;
  price: number;
  previewImage: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  city: CityName;
}

// 3. Константы с типами экшенов
export enum OfferActionType {
  SetCity = 'offers/setCity',
  LoadAccommodations = 'offers/loadAccommodations',
}

// 4. Описание интерфейсов экшенов
export interface SetCityAction {
  type: OfferActionType.SetCity;
  payload: CityName;
}

export interface LoadAccommodationsAction {
  type: OfferActionType.LoadAccommodations;
  payload: AccommodationType[];
}

// 5. Объединённый тип всех экшенов
export type OfferAction = SetCityAction | LoadAccommodationsAction;

// 6. Action-creators
export const setCity = (city: CityName): SetCityAction => ({
  type: OfferActionType.SetCity,
  payload: city,
});

export const loadAccommodations = (
  items: AccommodationType[]
): LoadAccommodationsAction => ({
  type: OfferActionType.LoadAccommodations,
  payload: items,
});
