import { store } from '../store';
import { setError } from '../store/offers-slice';
import { clearErrorAction } from '../store/offers-slice';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
