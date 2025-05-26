import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AxiosInstance } from 'axios';
import { rootReducer } from './root-reducer';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkOptions = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
