// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { TIMEOUT_SHOW_ERROR } from "../const/const";

// type AppState = {
//     isAppError: string | null;
// }

// const initialState: AppState = {
//     isAppError: null
// }

// const appSlice = createSlice({
//   name: 'app',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//         state.isAppError = null;
//       },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(appSlice, (state, action) => {
//         state.isAppError = action.error.message || 'App Error';
//       });
//   },
// });

// export const clearErrorAction = createAsyncThunk(
//   'app/clearError',
//   (_, { dispatch }) => {
//     setTimeout(
//       () => dispatch(appSlice.actions.clearError()),
//       TIMEOUT_SHOW_ERROR
//     );
//   }
// );

// export default appSlice.reducer;
