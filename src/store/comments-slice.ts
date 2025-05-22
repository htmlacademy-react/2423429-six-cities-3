import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TReview } from '../types/offer';
import { ThunkOptions } from '.';
import { APIRoute } from '../const/const';

type CommentsState = {
  comments: TReview[];
  isCommentsLoading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  comments: [],
  isCommentsLoading: false,
  error: null,
};

export const fetchComments = createAsyncThunk<TReview[], string, ThunkOptions>(
  'comments/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TReview[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetComments: () => initialState,
  },
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
      });
  },
});

export const { resetComments } = commentsSlice.actions;
export default commentsSlice.reducer;
