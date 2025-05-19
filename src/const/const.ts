import { SortType } from '../types/offer';

export const TIMEOUT_SHOW_ERROR = 2000;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  FavoritesEmpty = '/favorites-empty',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RATING = 5;

export const SORT_TYPES: SortType[] = [
  'Popular',
  'PriceLowToHigh',
  'PriceHighToLow',
  'TopRatedFirst',
];

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  Data = "DATA",
  User = 'USER'
}

