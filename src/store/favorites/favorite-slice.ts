
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThunkOptions } from '..';
import axios from 'axios';
import { setError } from '../app/app-slice';
import { APIRoute } from '../../const';
import { Offer } from '../../types/offer';

type FavoriteState = {
  favorites: Offer[];
  favoritesCount: number;
  isLoadingFavorites: boolean;
  error: string | null;
};

const initialState: FavoriteState = {
  favorites: [],
  favoritesCount: 0,
  isLoadingFavorites: false,
  error: null,
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

export const toggleFavorite = createAsyncThunk<Offer, {
  offerId: string;
  status: number;
}, ThunkOptions>(
  'favorites/toggle',
  async ({ offerId, status }, { extra: api, rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post<Offer>(`${APIRoute.Favorites}/${offerId}/${status}`);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoadingFavorites = false;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoritesCount = action.payload.length;
        state.isLoadingFavorites = true;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoadingFavorites = true;
        state.error = action.payload as string;
      })
      .addCase(toggleFavorite.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const index = state.favorites.findIndex((offer) => offer.id === action.payload.id);
        if (action.payload.isFavorite) {
          if (index === -1) {
            state.favorites.push(action.payload);
            state.favoritesCount += 1;
          }
        } else {
          if (index !== -1) {
            state.favorites.splice(index, 1);
            state.favoritesCount -= 1;
          }
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export default favoriteSlice.reducer;
