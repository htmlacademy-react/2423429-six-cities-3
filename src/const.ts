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

export const RATING = 5 ;