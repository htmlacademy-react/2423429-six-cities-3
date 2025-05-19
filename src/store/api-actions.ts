import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';
import {
  APIRoute,
  AuthorizationStatus,
  TIMEOUT_SHOW_ERROR,
} from '../const/const';
import {
  loadOffers,
  loadOffersError,
  setError,
  setOffersDataLoadingStatus,
} from '../store/offers-slice';
import {  requireAuthorization,
  setAuthLoadingStatus} from '../store/user-slice'
import { AuthData } from '../types/auth-data';
import { saveToken, dropToken } from '../services/token';
import { UserData } from '../types/user-data';
import { store, ThunkOptions } from '.';

export const clearErrorAction = createAsyncThunk('/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  ThunkOptions
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  try {
    dispatch(setOffersDataLoadingStatus(true));
    dispatch(loadOffersError(false));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));
  } catch (error) {
    dispatch(setError('Failed to load offers'));
    dispatch(loadOffersError(true));
    throw error;
  } finally {
    dispatch(setOffersDataLoadingStatus(false));
  }
});

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, ThunkOptions>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      dispatch(setAuthLoadingStatus(true));
      const {
        data: { token },
      } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      dispatch(
        setError(error instanceof Error ? error.message : 'Unknown error')
      );
      throw error;
    } finally {
      dispatch(setAuthLoadingStatus(false));
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError('Logout failed'));
    }
  }
);
