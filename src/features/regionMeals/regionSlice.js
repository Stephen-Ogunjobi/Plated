import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meals: [],
  status: "idle",
  error: null,
};

export const fetchRegionMeals = createAsyncThunk(
  "region/fetchRegionMeals",
  async (region, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // Handle case where meals is null (no meals found for region)
      const meals = data.meals || [];

      return meals;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    clearRegionMeals: (state) => {
      state.meals = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegionMeals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRegionMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
        state.error = null;
      })
      .addCase(fetchRegionMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.meals = [];
      });
  },
});

export const { clearRegionMeals } = regionSlice.actions;
export default regionSlice.reducer;

export const getRegionMeals = (state) => state.regionMeals;
