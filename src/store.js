import { configureStore } from "@reduxjs/toolkit";
import searchMealReducer from "./features/searchMeal/searchSlice";
import randomMealReducer from "./features/randomMeal/randomSlice";
import regionMealsReducer from "./features/regionMeals/regionSlice";
import regionAvailReducer from "./features/regionMeals/regionAvailSlice";
import mealDetailsReducer from "./features/mealDetails/mealDetailsSlice";
import favoriteMealReducer from "./features/favoriteMeals/favoriteMealSlice";
import ingredientMealReducer from "./features/mealsByIng/ingredientMealSlice";

export const store = configureStore({
  reducer: {
    searchMeal: searchMealReducer,
    randomMeal: randomMealReducer,
    regionMeals: regionMealsReducer,
    regionAvail: regionAvailReducer,
    mealDetails: mealDetailsReducer,
    favoriteMeals: favoriteMealReducer,
    ingredientMeal: ingredientMealReducer,
  },
});
