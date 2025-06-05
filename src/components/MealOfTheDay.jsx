import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRandomMeal,
  fetchRandomMeal,
} from "../features/randomMeal/randomSlice";

export default function MealOfTheDay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { meals: randomMeal, status } = useSelector(getRandomMeal);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!randomMeal || Object.keys(randomMeal).length === 0) {
      dispatch(fetchRandomMeal());
    }
  }, [dispatch, randomMeal]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleViewRecipe = () => {
    if (randomMeal && Object.keys(randomMeal).length > 0) {
      navigate("/recipe", { state: { meal: randomMeal } });
    }
  };

  const handleTryAnother = () => {
    setImageLoaded(false);
    dispatch(fetchRandomMeal());
  };

  const getIngredients = (meal) => {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim() || "",
        });
      }
    }
    return ingredients;
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  if (status === "loading") {
    return (
      <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-logo text-primary mb-4">
              Meal of the Day
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
              <div className="animate-pulse">
                <div className="h-60 md:h-80 bg-gray-300"></div>
                <div className="p-6 md:p-8">
                  <div className="h-6 md:h-8 bg-gray-300 rounded-lg mb-3 md:mb-4"></div>
                  <div className="h-3 md:h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 md:h-4 bg-gray-300 rounded mb-3 md:mb-4 w-3/4"></div>
                  <div className="flex space-x-3 md:space-x-4">
                    <div className="h-10 md:h-12 bg-gray-300 rounded-lg flex-1"></div>
                    <div className="h-10 md:h-12 bg-gray-300 rounded-lg flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!randomMeal || Object.keys(randomMeal).length === 0) {
    return (
      <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-logo text-primary mb-6 md:mb-8">
              Meal of the Day
            </h2>
            <div className="max-w-md mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <p className="text-primary/70 font-quicksand mb-4 md:mb-6 text-sm md:text-base">
                Unable to load today's special meal. Please try again.
              </p>
              <button
                onClick={handleTryAnother}
                className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const ingredients = getIngredients(randomMeal);

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-red-400 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400 rounded-full animate-float-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-6 md:mb-8 lg:mb-12 transition-all duration-1000 ${
            hasAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="text-3xl md:text-4xl animate-bounce">🍽️</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-logo text-primary">
              Meal of the Day
            </h2>
            <span className="text-3xl md:text-4xl animate-bounce animation-delay-300">
              ✨
            </span>
          </div>
          <p className="text-base md:text-lg text-primary/80 font-quicksand max-w-2xl mx-auto px-4">
            Discover today's handpicked culinary delight - a perfect recipe to
            inspire your cooking adventure
          </p>
        </div>

        {/* Main Card */}
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 delay-200 ${
            hasAnimated
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-orange-100 hover:shadow-3xl transition-all duration-500 group">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                <div className="aspect-[4/3] lg:aspect-[1/1] relative">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 animate-pulse"></div>
                  )}
                  <img
                    src={randomMeal.strMealThumb}
                    alt={randomMeal.strMeal}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating Tags */}
                  <div className="absolute top-4 md:top-6 left-4 md:left-6 flex flex-wrap gap-1.5 md:gap-2">
                    {randomMeal.strCategory && (
                      <span className="px-2.5 md:px-4 py-1.5 md:py-2 bg-orange-500/90 text-white text-xs md:text-sm font-semibold rounded-full backdrop-blur-sm animate-fade-in delay-500">
                        {randomMeal.strCategory}
                      </span>
                    )}
                    {randomMeal.strArea && (
                      <span className="px-2.5 md:px-4 py-1.5 md:py-2 bg-blue-500/90 text-white text-xs md:text-sm font-semibold rounded-full backdrop-blur-sm animate-fade-in delay-700">
                        {randomMeal.strArea}
                      </span>
                    )}
                  </div>

                  {/* Special Badge */}
                  <div className="absolute top-4 md:top-6 right-4 md:right-6">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold animate-pulse">
                      TODAY'S PICK
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
                <div className="space-y-4 md:space-y-5 lg:space-y-6">
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-logo text-primary mb-2 md:mb-3 leading-tight">
                      {randomMeal.strMeal}
                    </h3>
                    <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                  </div>

                  {/* Description */}
                  {randomMeal.strInstructions && (
                    <p className="text-primary/80 font-quicksand leading-relaxed text-sm md:text-base lg:text-lg">
                      {truncateText(randomMeal.strInstructions)}
                    </p>
                  )}

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 py-3 md:py-4">
                    <div className="text-center p-3 md:p-4 bg-orange-50 rounded-xl">
                      <div className="text-xl md:text-2xl mb-1 md:mb-2">🥘</div>
                      <div className="text-xs md:text-sm text-primary/70 font-quicksand">
                        Ingredients
                      </div>
                      <div className="text-lg md:text-xl font-bold text-primary">
                        {ingredients.length}
                      </div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-red-50 rounded-xl">
                      <div className="text-xl md:text-2xl mb-1 md:mb-2">⏱️</div>
                      <div className="text-xs md:text-sm text-primary/70 font-quicksand">
                        Prep Time
                      </div>
                      <div className="text-lg md:text-xl font-bold text-primary">
                        ~30 min
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-3 md:pt-4">
                    <button
                      onClick={handleViewRecipe}
                      className="flex-1 group/btn bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-orange-300 focus:outline-none font-quicksand text-sm md:text-base"
                    >
                      <span className="inline-flex items-center justify-center gap-2 md:gap-3">
                        <span>View Full Recipe</span>
                        <svg
                          className="w-4 md:w-5 h-4 md:h-5 transition-transform duration-300 group-hover/btn:translate-x-1"
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
                      </span>
                    </button>

                    <button
                      onClick={handleTryAnother}
                      className="flex-1 sm:flex-none bg-white border-2 border-orange-200 text-orange-600 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg focus:ring-4 focus:ring-orange-200 focus:outline-none font-quicksand text-sm md:text-base"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <span className="text-lg md:text-xl animate-spin-slow">
                          🎲
                        </span>
                        <span>Try Another</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
        
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}
