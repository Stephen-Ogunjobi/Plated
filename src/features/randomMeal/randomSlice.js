import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRandomMeal = createAsyncThunk(
  "randomMeal/fetchRandomMeal",
  async () => {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await res.json();
    return data.meals[0] || [];
  }
);
const initialState = {
  meals: [],
  status: "idle",
  error: null,
};

const randomMealSlice = createSlice({
  name: "randomMeal",
  initialState,
  reducers: {
    fetchRandomMealStart: (state) => {
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomMeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRandomMeal.fulfilled, (state, action) => {
        state.status = "idle";
        state.meals = action.payload;
      })
      .addCase(fetchRandomMeal.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { fetchRandomMealStart } = randomMealSlice.actions;
export default randomMealSlice.reducer;

export const getRandomMeal = (state) => state.randomMeal;
