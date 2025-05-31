import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIMEOUT_SHOW_ERROR } from '../../const';

type AppState = {
  isAppError: string | null;
};

const initialState: AppState = {
  isAppError: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.isAppError = action.payload;
    },
    clearError: (state) => {
      state.isAppError = null;
    },
  },
});

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  (_, { dispatch }) => {
    setTimeout(
      () => dispatch(appSlice.actions.clearError()),
      TIMEOUT_SHOW_ERROR
    );
  }
);

export const { setError, clearError } = appSlice.actions;
export default appSlice.reducer;
