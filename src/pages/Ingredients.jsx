import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getMealsByIngredient,
  fetchMealsByIngredient,
} from "../features/mealsByIng/ingredientMealSlice";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import Loader from "../components/Loader";
import Error from "../components/Error";
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

  const handleViewRecipe = () => {
    navigate("/recipe", { state: { meal } });
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
      onClick={handleViewRecipe}
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

        {/* Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <span className="text-primary font-semibold text-sm">
              View Recipe
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-orange-600 transition-colors duration-300 font-quicksand leading-tight">
          {meal.strMeal}
        </h3>

        {/* Note about limited info */}
        <div className="flex-grow">
          <p className="text-primary/60 text-sm italic mb-4 font-quicksand">
            Click to view full recipe details and instructions
          </p>
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

export default function Ingredients() {
  const { ingredient } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { meals, status, error } = useSelector(getMealsByIngredient);

  const [displayedMeals, setDisplayedMeals] = useState([]);

  // Fetch meals when component mounts or ingredient changes
  useEffect(() => {
    if (ingredient) {
      dispatch(fetchMealsByIngredient(ingredient));
    }
  }, [dispatch, ingredient]);

  // Update displayed meals when data changes
  useEffect(() => {
    if (meals && meals.length > 0) {
      if (status === "idle") {
        const timer = setTimeout(() => {
          setDisplayedMeals(meals);
        }, 300);
        return () => clearTimeout(timer);
      } else {
        setDisplayedMeals(meals);
      }
    } else {
      setDisplayedMeals([]);
    }
  }, [meals, status]);

  if (status === "loading") return <Loader />;
  if (status === "error") return <Error message={error} />;

  return (
    <div className="min-h-screen bg-primary">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-b border-orange-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-logo text-primary mb-4 animate-fade-in-static">
              Recipes with {ingredient}
            </h1>
            <p className="text-lg text-primary/80 font-quicksand max-w-2xl mx-auto animate-fade-in-static delay-200-static">
              {displayedMeals.length > 0
                ? `Discover ${displayedMeals.length} delicious ${
                    displayedMeals.length === 1 ? "recipe" : "recipes"
                  } featuring ${ingredient}`
                : `No recipes found with ${ingredient}. Try exploring other ingredients.`}
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        {displayedMeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedMeals.map((meal, index) => (
              <MealCard key={meal.idMeal} meal={meal} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 text-primary/30">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3 font-quicksand">
              No recipes found
            </h3>
            <p className="text-primary/70 font-quicksand mb-6 max-w-md mx-auto">
              We couldn't find any recipes with {ingredient}. This ingredient
              might not be available in our database.
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="container mx-auto px-4 pb-16">
        <div className="text-center space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-gray-300 focus:outline-none font-quicksand mr-4"
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
            Go Back
          </button>

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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
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
