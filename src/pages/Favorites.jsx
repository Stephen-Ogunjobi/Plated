import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFavoriteMeals } from "../features/favoriteMeals/favoriteMealSlice";
import { fetchMealById } from "../features/mealDetails/mealDetailsSlice";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import Loader from "../components/Loader";
import Error from "./../components/Error";
import FavoriteBtn from "../components/FavoriteBtn";

function MealCard({ meal, index }) {
  const navigate = useNavigate();

  const [cardRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -60px 0px",
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isIntersecting, hasAnimated]);

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure: measure?.trim() || "" });
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients(meal);
  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  const handleViewRecipe = () => {
    navigate("/recipe", { state: { meal } });
  };

  const handleYouTubeClick = (e) => {
    e.stopPropagation();
    if (meal.strYoutube) {
      window.open(meal.strYoutube, "_blank", "noopener,noreferrer");
    }
  };

  const animationDelay = hasAnimated ? `${index * 150}ms` : "0ms";

  return (
    <article
      ref={cardRef}
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-orange-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col h-full ${
        hasAnimated
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
        transitionDelay: animationDelay,
      }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden flex-shrink-0">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Category and Area Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {meal.strCategory && (
            <span className="px-3 py-1 bg-orange-500/90 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
              {meal.strCategory}
            </span>
          )}
          {meal.strArea && (
            <span className="px-3 py-1 bg-blue-500/90 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
              {meal.strArea}
            </span>
          )}
        </div>

        {/* Tags */}
        {meal.strTags && (
          <div className="absolute top-4 right-4">
            <div className="flex flex-wrap gap-1 max-w-32">
              {meal.strTags
                .split(",")
                .slice(0, 2)
                .map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Quick actions overlay on hover */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {meal.strYoutube && (
            <button
              onClick={handleYouTubeClick}
              className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg mr-2"
              title="Watch on YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-orange-600 transition-colors duration-300 font-quicksand leading-tight">
          {meal.strMeal}
        </h3>

        {/* Instructions Preview */}
        {meal.strInstructions && (
          <p className="text-primary/80 text-sm leading-relaxed mb-3 font-quicksand">
            {truncateText(meal.strInstructions, 120)}
          </p>
        )}

        {/* Ingredients Section */}
        <div className="mb-4 flex-grow">
          <h4 className="text-sm font-semibold text-primary mb-2 font-quicksand uppercase tracking-wide">
            Key Ingredients ({ingredients.length})
          </h4>
          <div className="grid grid-cols-2 gap-1">
            {ingredients.slice(0, 6).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center text-xs text-primary/70 font-quicksand"
              >
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 flex-shrink-0"></span>
                <span className="truncate">
                  {item.measure} {item.ingredient}
                </span>
              </div>
            ))}
          </div>
          {ingredients.length > 6 && (
            <p className="text-xs text-primary/60 mt-1 font-quicksand">
              +{ingredients.length - 6} more ingredients
            </p>
          )}
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="flex items-center justify-between pt-3 border-t border-orange-100/70 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewRecipe();
            }}
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm transition-all duration-300 group-hover:translate-x-1 transform inline-flex items-center gap-2"
          >
            View Recipe
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <FavoriteBtn meal={meal} />
        </div>
      </div>
    </article>
  );
}

export default function Favorites() {
  const dispatch = useDispatch();
  const favoriteMeals = useSelector(getFavoriteMeals);
  const navigate = useNavigate();

  const [fullMealDetails, setFullMealDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFullMealDetails = async () => {
      if (favoriteMeals.length === 0) {
        setFullMealDetails([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const mealDetailsPromises = favoriteMeals.map(async (favMeal) => {
          const result = await dispatch(fetchMealById(favMeal.idMeal));
          if (fetchMealById.fulfilled.match(result)) {
            return result.payload;
          } else {
            throw new Error(`Failed to fetch meal ${favMeal.strMeal}`);
          }
        });

        const mealDetails = await Promise.all(mealDetailsPromises);
        setFullMealDetails(mealDetails);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching favorite meal details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFullMealDetails();
  }, [favoriteMeals, dispatch]);

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="min-h-screen bg-primary">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-pink-50 to-orange-50 border-b border-orange-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg
                className="w-12 h-12 text-red-500 animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <h1 className="text-4xl md:text-5xl font-logo text-primary animate-fade-in-static">
                Your Favorites
              </h1>
            </div>
            <p className="text-lg text-primary/80 font-quicksand max-w-2xl mx-auto animate-fade-in-static delay-200-static">
              {fullMealDetails.length > 0
                ? `You have ${fullMealDetails.length} favorite ${
                    fullMealDetails.length === 1 ? "recipe" : "recipes"
                  } saved`
                : "No favorite recipes yet. Start exploring and save your favorites!"}
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        {fullMealDetails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fullMealDetails.map((meal, index) => (
              <MealCard key={meal.idMeal} meal={meal} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 text-primary/30">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3 font-quicksand">
              No favorite recipes yet
            </h3>
            <p className="text-primary/70 font-quicksand mb-6 max-w-md mx-auto">
              Start exploring recipes and click the heart icon to save your
              favorites here. Your saved recipes will appear in this collection.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg focus:ring-4 focus:ring-orange-300 focus:outline-none font-quicksand"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Discover Recipes
            </button>
          </div>
        )}
      </div>

      {/* Go Back Home Button */}
      <div className="container mx-auto px-4 pb-16">
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-orange-300 focus:outline-none font-quicksand"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes fadeInStatic {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-static {
          animation: fadeInStatic 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        
        .delay-200-static { 
          animation-delay: 0.2s; 
        }
      `}</style>
    </div>
  );
}
