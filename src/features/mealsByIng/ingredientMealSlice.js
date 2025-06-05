import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMealsByIngredient = createAsyncThunk(
  "mealsByIng/fetchMealsByIngredient",
  async (ingredient) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    if (!res.ok) throw new Error("Failed to fetch meals");

    const data = await res.json();

    return data.meals;
  }
);

const initialState = {
  meals: [],
  status: "idle",
  error: null,
};

const ingredientMealSlice = createSlice({
  name: "ingredientMeal",
  initialState,
  reducers: {
    clearMeals: (state) => {
      state.meals = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealsByIngredient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMealsByIngredient.fulfilled, (state, action) => {
        state.status = "idle";
        state.meals = action.payload;
      })
      .addCase(fetchMealsByIngredient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { clearMeals } = ingredientMealSlice.actions;
export default ingredientMealSlice.reducer;

export const getMealsByIngredient = (state) => state.ingredientMeal;
