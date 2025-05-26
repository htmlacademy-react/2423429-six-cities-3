import { RootState } from '../index';
import { TReview } from '../../types/review';

export const getComments = (state: RootState): TReview[] =>
  state.comments.comments;
export const getCommentsLoading = (state: RootState): boolean =>
  state.comments.isCommentsLoading;
export const getCommentsError = (state: RootState): string | null =>
  state.comments.error;

export const getPosting = (state: RootState): boolean => state.comments.isPosting;
export const getPostError = (state: RootState): string | null => state.comments.postError;
