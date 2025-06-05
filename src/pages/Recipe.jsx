import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMealById,
  getMealDetails,
} from "../features/mealDetails/mealDetailsSlice";
import Loader from "../components/Loader";
import Error from "../components/Error";
import FavoriteBtn from "../components/FavoriteBtn";

export default function Recipe() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { meal: stateMeal } = location.state || {};
  const { meal: reduxMeal, status, error } = useSelector(getMealDetails);

  const [currentMeal, setCurrentMeal] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine which meal to use and fetch if needed
  useEffect(() => {
    if (stateMeal) {
      // If we have meal data from navigation state, use it
      setCurrentMeal(stateMeal);
      dispatch(fetchMealById(stateMeal.idMeal));
    } else if (params.id) {
      // If we have an ID in params, fetch the meal
      dispatch(fetchMealById(params.id));
    }
  }, [stateMeal, params.id, dispatch]);

  // Update current meal when Redux state changes
  useEffect(() => {
    if (reduxMeal && status === "succeeded") {
      setCurrentMeal(reduxMeal);
    }
  }, [reduxMeal, status]);

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

  const handleYouTubeClick = () => {
    if (currentMeal?.strYoutube) {
      window.open(currentMeal.strYoutube, "_blank", "noopener,noreferrer");
    }
  };

  const handleSourceClick = () => {
    if (currentMeal?.strSource) {
      window.open(currentMeal.strSource, "_blank", "noopener,noreferrer");
    }
  };

  if (status === "loading") return <Loader />;
  if (status === "failed") return <Error message={error} />;
  if (!currentMeal) return <Error message="Recipe not found" />;

  const ingredients = getIngredients(currentMeal);

  return (
    <div className="min-h-screen bg-primary">
      <div className="relative h-96 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={currentMeal.strMealThumb}
          alt={currentMeal.strMeal}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-logo text-white mb-4 animate-fade-in-static">
                  {currentMeal.strMeal}
                </h1>
                <div className="flex flex-wrap gap-3 mb-4">
                  {currentMeal.strCategory && (
                    <span className="px-4 py-2 bg-orange-500 text-white rounded-full font-semibold text-sm">
                      {currentMeal.strCategory}
                    </span>
                  )}
                  {currentMeal.strArea && (
                    <span className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold text-sm">
                      {currentMeal.strArea}
                    </span>
                  )}
                  {currentMeal.strTags &&
                    currentMeal.strTags
                      .split(",")
                      .slice(0, 3)
                      .map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold text-sm"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FavoriteBtn meal={currentMeal} />
                {currentMeal.strYoutube && (
                  <button
                    onClick={handleYouTubeClick}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch Video
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-primary mb-6 font-quicksand">
                Ingredients ({ingredients.length})
              </h2>
              <div className="space-y-3">
                {ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors duration-200"
                  >
                    <span className="font-medium text-primary font-quicksand">
                      {item.ingredient}
                    </span>
                    <span className="text-primary/70 text-sm font-quicksand">
                      {item.measure}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6 font-quicksand">
                Instructions
              </h2>
              {currentMeal.strInstructions ? (
                <div className="prose prose-lg max-w-none">
                  <div className="text-primary/80 leading-relaxed font-quicksand whitespace-pre-line">
                    {currentMeal.strInstructions}
                  </div>
                </div>
              ) : (
                <p className="text-primary/60 italic font-quicksand">
                  No instructions available for this recipe.
                </p>
              )}

              {currentMeal.strSource && (
                <div className="mt-8 pt-6 border-t border-orange-100">
                  <button
                    onClick={handleSourceClick}
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300"
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Original Source
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12 ">
        <div className="text-center ">
          <button
            onClick={() => navigate(-1)}
            className="group mb-3 inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-gray-300 focus:outline-none font-quicksand mr-4"
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
      `}</style>
    </div>
  );
}
