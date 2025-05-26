import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TReview } from '../../types/review';
import { ThunkOptions } from '..';
import { APIRoute } from '../../const';
import axios, { AxiosError } from 'axios';

type CommentsState = {
  comments: TReview[];
  isCommentsLoading: boolean;
  isPosting: boolean;
  error: string | null;
  postError: string | null;
};

const initialState: CommentsState = {
  comments: [],
  isCommentsLoading: false,
  isPosting: false,
  error: null,
  postError: null,
};

export const fetchComments = createAsyncThunk<TReview[], string, ThunkOptions>(
  'comments/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TReview[]>(
      `${APIRoute.Comments}/${offerId}`
    );
    return data;
  }
);

export const postComment = createAsyncThunk<TReview, { offerId: string; comment: string; rating: number }, ThunkOptions>(
  'comments/post',
  async ({ offerId, comment, rating }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<TReview>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.error || 'Failed to post comment');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isCommentsLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isCommentsLoading = false;
        state.error = action.error.message || 'Failed to load comments';
      })
      .addCase(postComment.pending, (state) => {
        state.isPosting = true;
        state.postError = null;
      })
      .addCase(postComment.fulfilled, (state) => {
        state.isPosting = false;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.isPosting = false;
        const error = action.payload;
        if (error instanceof AxiosError) {
          state.postError = error.response?.data?.error || 'Failed to post comment';
        } else {
          state.postError = typeof error === 'string' ? error : 'Unknown error occurred';
        }
      });
  },
});

export default commentsSlice.reducer;
