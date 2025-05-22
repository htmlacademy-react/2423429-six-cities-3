import { AuthorizationStatus } from '../../const/const';
import { RootState } from '../index';

export const getAuthorizationStatus = (state: RootState): AuthorizationStatus =>
  state.user.authorizationStatus;

export const getAuthCheckedStatus = (state: RootState): boolean =>
  state.user.authorizationStatus !== AuthorizationStatus.Unknown;

export const getAuthLoadingStatus = (state: RootState): boolean =>
  state.user.isAuthLoading;

export const getUserData = (state: RootState) => state.user.userData;

export const getAuthError = (state: RootState) => state.user.error;
