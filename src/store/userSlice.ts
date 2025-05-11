import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData, UserData } from '../types/user';
import { loginApi, logoutApi, checkAuthApi } from '../services/api';

export const checkAuth = createAsyncThunk<
  UserData,
  void,
  { rejectValue: string }
>('user/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const response = await checkAuthApi();
    return response.data as UserData;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const loginUser = createAsyncThunk<
  UserData,
  AuthData,
  { rejectValue: string }
>('user/login', async (authData, { rejectWithValue }) => {
  try {
    const response = await loginApi(authData);
    return response.data as UserData;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const logoutUser = createAsyncThunk<void, void>(
  'user/logout',
  async () => {
    await logoutApi();
  }
);

type AuthStatus = 'Unknown' | 'Auth' | 'NoAuth';

interface UserState {
  authorizationStatus: AuthStatus;
  userInfo: UserData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  authorizationStatus: 'Unknown',
  userInfo: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // здесь можно ещё добавить sync‐действия
  },
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.authorizationStatus = 'Unknown';
        state.error = null;
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.isLoading = false;
          state.authorizationStatus = 'Auth';
          state.userInfo = action.payload;
        }
      )
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.authorizationStatus = 'NoAuth';
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.isLoading = false;
          state.authorizationStatus = 'Auth';
          state.userInfo = action.payload;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.authorizationStatus = 'NoAuth';
        state.error = action.payload ?? 'Login failed';
      })
      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.authorizationStatus = 'NoAuth';
        state.userInfo = null;
      });
  },
});

export default userSlice.reducer;
