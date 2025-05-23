import { RootState } from '..';

export const getAppError = (state: RootState): string | null =>
  state.app.isAppError;
