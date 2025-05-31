import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThunkOptions } from '..';
import axios from 'axios';
import { setError } from '../app/app-slice';
import { APIRoute } from '../../const';
import { Offer } from '../../types/offer';

type FavoriteState = {
  favorites: Offer[];
  isLoadingFavorites: boolean;
  errorFavorites: string | null;
  isChangingFavoriteStatus: boolean;
};

const initialState: FavoriteState = {
  favorites: [],
  isLoadingFavorites: false,
  errorFavorites: null,
  isChangingFavoriteStatus: false,
};

export const fetchFavorites = createAsyncThunk<Offer[], void, ThunkOptions>(
  'favorites/fetch',
  async (_, { extra: api, rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorites);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setError(error.message));
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const toggleFavorite = createAsyncThunk<
  Offer,
  {
    offerId: string;
    status: number;
  },
  ThunkOptions
>(
  'favorites/toggle',
  async ({ offerId, status }, { extra: api, rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post<Offer>(
        `${APIRoute.Favorites}/${offerId}/${status}`
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setError(error.message));
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    resetFavorites: (state) => {
      state.favorites = [];
      state.isLoadingFavorites = false;
      state.errorFavorites = null;
      state.isChangingFavoriteStatus = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoadingFavorites = true;
        state.errorFavorites = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoadingFavorites = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoadingFavorites = false;
        state.errorFavorites = action.payload as string;
      })

      .addCase(toggleFavorite.pending, (state) => {
        state.isChangingFavoriteStatus = true;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.isChangingFavoriteStatus = false;

        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== action.payload.id
          );
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.isChangingFavoriteStatus = false;
        state.errorFavorites = action.payload as string;
      });
  },
});
export const { resetFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
