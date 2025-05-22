import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../const/const';
import { ThunkOptions } from '.';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';

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
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, ThunkOptions>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, void, ThunkOptions>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
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
