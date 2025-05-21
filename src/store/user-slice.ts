import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../const/const';
import { ThunkOptions } from '.';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
  userData: {
    email: string;
  } | null;
  error: string | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isLoading: false,
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
  async (_, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requireAuthorization: (
      state,
      action: PayloadAction<AuthorizationStatus>
    ) => {
      state.authorizationStatus = action.payload;
    },
    setAuthLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
        state.userData = { email: action.payload.email };
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
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
export const { requireAuthorization, setAuthLoadingStatus } = userSlice.actions;
