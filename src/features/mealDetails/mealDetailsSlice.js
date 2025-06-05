import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMealById = createAsyncThunk(
  "mealDetails/fetchMealById",
  async (mealId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );

      if (!res.ok) {
        throw new Error("Meal not found");
      }

      const data = await res.json();

      if (data.meals && data.meals[0]) {
        return data.meals[0];
      } else {
        throw new Error("Meal not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  meal: null,
  status: "idle",
  error: null,
};

const mealDetailsSlice = createSlice({
  name: "mealDetails",
  initialState,
  reducers: {
    clearMealDetails: (state) => {
      state.meal = null;
      state.status = "idle";
      state.error = null;
    },
    setMealDetails: (state, action) => {
      state.meal = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMealById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meal = action.payload;
      })
      .addCase(fetchMealById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearMealDetails, setMealDetails } = mealDetailsSlice.actions;
export default mealDetailsSlice.reducer;

export const getMealDetails = (state) => state.mealDetails;
