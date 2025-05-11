import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { fetchFavoritesApi, toggleFavoriteApi } from '../services/api';

export const fetchFavorites = createAsyncThunk<
  Offer[],
  void,
  { rejectValue: string }
>('favorites/fetchFavorites', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchFavoritesApi();
    return response.data as Offer[];
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// переключить статус избранного для оффера
export const toggleFavorite = createAsyncThunk<
  Offer,
  number,
  { rejectValue: string }
>('favorites/toggleFavorite', async (offerId, { rejectWithValue }) => {
  try {
    const response = await toggleFavoriteApi(offerId);
    return response.data as Offer;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

interface FavoritesState {
  items: Offer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  isLoading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<Offer[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Can’t load favorites';
      })
      .addCase(
        toggleFavorite.fulfilled,
        (state, action: PayloadAction<Offer>) => {
          const idx = state.items.findIndex((o) => o.id === action.payload.id);
          if (action.payload.isFavorite) {
            if (idx === -1) {
              state.items.push(action.payload);
            }
          } else {
            if (idx > -1) {
              state.items.splice(idx, 1);
            }
          }
        }
      );
  },
});

export default favoritesSlice.reducer;
