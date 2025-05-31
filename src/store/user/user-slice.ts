import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../../const';
import { AuthData, UserData } from '../../types/auth';
import { ThunkOptions } from '..';
import { saveToken, dropToken } from '../../services/token';
import { fetchFavorites, resetFavorites } from '../favorites/favorite-slice';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  isAuthLoading: boolean;
  userData: {
    email: string;
  } | null;
  error: string | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuthLoading: false,
  userData: null,
  error: null,
};

export const checkAuthAction = createAsyncThunk<UserData, void, ThunkOptions>(
  'user/checkAuth',
  async (_arg, { extra: api, dispatch }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavorites());
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, ThunkOptions>(
  'user/login',
  async ({ login: email, password }, { extra: api, dispatch }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    dispatch(resetFavorites());
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, void, ThunkOptions>(
  'user/logout',
  async (_arg, { extra: api, dispatch }) => {
    await api.delete(APIRoute.Logout);
    dispatch(resetFavorites());
    dropToken();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = { email: action.payload.email };
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(loginAction.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isAuthLoading = false;
        state.userData = { email: action.payload.email };
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.error = action.error.message || 'Logout failed';
      });
  },
});

export default userSlice.reducer;
