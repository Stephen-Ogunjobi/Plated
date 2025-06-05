import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  regions: [],
  status: "idle",
  error: null,
};

export const fetchRegions = createAsyncThunk(
  "region/fetchRegions",
  async () => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    const data = await res.json();
    return data.meals;
  }
);

const regionAvailSlice = createSlice({
  name: "regionAvail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.status = "idle";
        state.regions = action.payload;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default regionAvailSlice.reducer;

export const getRegions = (state) => state.regionAvail;
