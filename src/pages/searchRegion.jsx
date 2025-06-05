import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRegionMeals,
  getRegionMeals,
  clearRegionMeals,
} from "../features/regionMeals/regionSlice";

export default function SearchRegion() {
  const { region } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regionState = useSelector(getRegionMeals);

  const { meals = [], status = "idle", error = null } = regionState || {};

  useEffect(() => {
    if (region) {
      dispatch(clearRegionMeals());

      dispatch(fetchRegionMeals(region));
    }
  }, [region, dispatch]);

  const handleMealClick = (meal) => {
    navigate(`/recipe`, { state: { meal } });
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleRetry = () => {
    if (region) {
      dispatch(fetchRegionMeals(region));
    }
  };

  // Show loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-primary py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="text-center mb-12">
            <button
              onClick={handleBackClick}
              className="inline-flex items-center text-gray-600 hover:text-orange-600 
                       transition-colors duration-200 mb-6 group"
            >
              <svg
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </button>
          </div>

          {/* Loading Header */}
          <div className="text-center mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600"></div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 quicksand-text">
                Loading {region} Cuisine
              </h1>
              <p className="text-gray-600 text-lg">
                Fetching delicious recipes from {region}...
              </p>
            </div>
          </div>

          {/* Meals Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md"
              >
                <div className="h-48 bg-gray-300 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (status === "failed") {
    return (
      <div className="min-h-screen bg-primary py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="inline-flex items-center text-gray-600 hover:text-orange-600 
                     transition-colors duration-200 mb-6 group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </button>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-6xl mb-4">😞</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-2">
              We couldn't load the recipes from {region}.
            </p>
            {error && (
              <p className="text-red-500 text-sm mb-6">Error: {error}</p>
            )}
            <div className="space-x-4">
              <button
                onClick={handleRetry}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg 
                         transition-colors duration-200 font-semibold"
              >
                Try Again
              </button>
              <button
                onClick={handleBackClick}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg 
                         transition-colors duration-200 font-semibold"
              >
                Go Back Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state (no meals found) - check if we have a non-loading status and no meals
  if (
    (status === "succeeded" || status === "idle") &&
    (!meals || meals.length === 0)
  ) {
    return (
      <div className="min-h-screen bg-primary py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="inline-flex items-center text-gray-600 hover:text-orange-600 
                     transition-colors duration-200 mb-6 group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </button>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-6xl mb-4">🍽️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              No recipes found for {region}
            </h1>
            <p className="text-gray-600 mb-6">
              We don't have any recipes from this region yet. Try another region
              or check back later!
            </p>
            <div className="space-x-4">
              <button
                onClick={handleRetry}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg 
                         transition-colors duration-200 font-semibold"
              >
                Try Again
              </button>
              <button
                onClick={handleBackClick}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg 
                         transition-colors duration-200 font-semibold"
              >
                Explore Other Regions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show meals (success state) - if we have meals, show them regardless of status
  if (meals && meals.length > 0) {
    return (
      <div className="min-h-screen bg-primary py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="inline-flex items-center text-gray-600 hover:text-orange-600 
                       transition-colors duration-200 mb-6 group"
            >
              <svg
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </button>

            {/* Region Header */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <div className="text-6xl mb-4">🌍</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 quicksand-text">
                {region} Cuisine
              </h1>
              <p className="text-gray-600 text-lg">
                Discover {meals.length} authentic {region.toLowerCase()} recipes
              </p>
            </div>
          </div>

          {/* Meals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.map((meal, index) => (
              <div
                key={meal.idMeal}
                onClick={() => handleMealClick(meal)}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl 
                         transform hover:scale-105 transition-all duration-300 cursor-pointer
                         border border-gray-100 hover:border-orange-200"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`,
                }}
              >
                {/* Meal Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover group-hover:scale-110 
                             transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 
                                transition-opacity duration-300"
                  ></div>

                  {/* Quick View Indicator */}
                  <div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300"
                  >
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <svg
                        className="w-4 h-4 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Meal Info */}
                <div className="p-4">
                  <h3
                    className="font-semibold text-gray-800 text-lg mb-2 
                               group-hover:text-orange-600 transition-colors duration-200
                               leading-tight"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {meal.strMeal}
                  </h3>

                  {/* Region Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      🌍 {region}
                    </span>

                    {/* Arrow indicator */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg
                        className="w-5 h-5 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-12 space-y-2">
            <p className="text-gray-500">
              Click on any recipe to see detailed cooking instructions
            </p>

            <button
              onClick={handleBackClick}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3  rounded-lg 
                         transition-colors duration-200 font-semibold"
            >
              Go Back Home
            </button>
          </div>
        </div>

        {/* Custom Styles */}
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  // Fallback state - if none of the above conditions are met
  return (
    <div className="min-h-screen bg-primary py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center text-gray-600 hover:text-orange-600 
                   transition-colors duration-200 mb-6 group"
        >
          <svg
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </button>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="text-6xl mb-4">🤔</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Something unexpected happened
          </h1>
          <p className="text-gray-600 mb-6">
            Status: {status}, Meals: {meals?.length || 0}
          </p>
          <button
            onClick={handleRetry}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg 
                     transition-colors duration-200 font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
