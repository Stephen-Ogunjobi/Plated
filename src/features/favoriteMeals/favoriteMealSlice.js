import { createSlice } from "@reduxjs/toolkit";

const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const initialState = {
  meals: storedFavorites,
  status: "idle",
  error: null,
};

export const favoriteMealSlice = createSlice({
  name: "favoriteMeals",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exist = state.meals.find(
        (meal) => meal.idMeal === action.payload.idMeal
      );
      if (!exist) {
        state.meals = [...state.meals, action.payload];
        localStorage.setItem("favorites", JSON.stringify(state.meals));
      }
    },
    removeFavorite: (state, action) => {
      state.meals = state.meals.filter(
        (meal) => meal.idMeal !== action.payload.idMeal
      );
      localStorage.setItem("favorites", JSON.stringify(state.meals));
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteMealSlice.actions;
export default favoriteMealSlice.reducer;

export const getFavoriteMeals = (state) => state.favoriteMeals.meals;
export const getFavoriteMealsStatus = (state) => state.favoriteMeals.status;
