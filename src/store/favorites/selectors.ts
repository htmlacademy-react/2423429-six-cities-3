import { RootState } from '..';

export const getFavorites = (state: RootState) => state.favorites.favorites;
export const getFavoritesLoadingStatus = (state: RootState) => state.favorites.isLoadingFavorites;
export const getFavoritesError = (state: RootState) => state.favorites.errorFavorites;
export const getChangingFavoriteStatus = (state: RootState) => state.favorites.isChangingFavoriteStatus;
