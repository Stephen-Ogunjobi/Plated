import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMeals } from "../features/favoriteMeals/favoriteMealSlice";
import {
  addFavorite,
  removeFavorite,
} from "../features/favoriteMeals/favoriteMealSlice";

export default function FavoriteBtn({ meal }) {
  const dispatch = useDispatch();
  const favoriteMeals = useSelector(getFavoriteMeals);

  const isFavorite = favoriteMeals.some((fav) => fav.idMeal === meal.idMeal);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ idMeal: meal.idMeal }));
    } else {
      dispatch(
        addFavorite({
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
        })
      );
    }
  };

  return (
    <button
      onClick={handleFavorite}
      className="text-red-500 hover:text-red-600 font-semibold text-sm transition-all duration-300 transform hover:scale-110 inline-flex items-center gap-2"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            className="lucide lucide-heart-icon lucide-heart"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span className="hidden sm:inline">Unfavorite</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="lucide lucide-heart-icon lucide-heart"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span className="hidden sm:inline">Favorite</span>
        </>
      )}
    </button>
  );
}
