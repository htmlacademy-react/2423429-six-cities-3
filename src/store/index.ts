import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import offersReducer from './offers-slice';
import userReducer from './user-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AxiosInstance } from 'axios';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
