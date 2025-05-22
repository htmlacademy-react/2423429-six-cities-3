import { RootState } from '../index';
import { TReview } from '../../types/offer';

export const getComments = (state: RootState): TReview[] => state.comments.comments;
export const getCommentsLoading = (state: RootState): boolean => state.comments.isCommentsLoading;
export const getCommentsError = (state: RootState): string | null => state.comments.error;