import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchMeal = createAsyncThunk(
  "searchMeal/fetchSearchMeal",
  async (query) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await res.json();
    return data.meals || [];
  }
);

const initialState = {
  meals: [],
  status: "idle",
  error: null,
};

const searchMealSlice = createSlice({
  name: "searchMeal",
  initialState,
  reducers: {
    clearSearchMeal(state) {
      state.meals = [];
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchSearchMeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchMeal.fulfilled, (state, action) => {
        (state.status = "idle"), (state.meals = action.payload);
      })
      .addCase(fetchSearchMeal.rejected, (state, action) => {
        (state.status = "error"), (state.error = action.error.message);
      }),
});

export const { clearSearchMeal } = searchMealSlice.actions;
export default searchMealSlice.reducer;

export const getSearchMeal = (state) => state.searchMeal;
