import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchRegions,
  getRegions,
} from "./../features/regionMeals/regionAvailSlice";

export default function Regions() {
  const { regions, status } = useSelector(getRegions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    if (status === "idle" && (!regions || regions.length === 0)) {
      dispatch(fetchRegions());
    }
  }, [dispatch, status, regions]);

  const handleRegionSelect = (regionName) => {
    setSelectedRegion(regionName);
    setIsOpen(false);
    navigate(`/regions/${regionName}`);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (status === "loading") {
    return (
      <section className=" px-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 quicksand-text">
            Explore World Cuisines
          </h2>
          <div className="bg-white rounded-xl p-4 shadow-md animate-pulse mx-auto max-w-md">
            <div className="h-12 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="py-12 px-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 quicksand-text">
            Explore World Cuisines
          </h2>
          <p className="text-red-600 text-lg mb-4">
            Failed to load regions. Please try again later.
          </p>
          <button
            onClick={() => dispatch(fetchRegions())}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg 
                     transition-colors duration-200 font-semibold"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Show loading if regions is null or undefined
  if (!regions) {
    return (
      <section className="py-12 px-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 quicksand-text">
            Explore World Cuisines
          </h2>
          <div className="bg-white rounded-xl p-4 shadow-md animate-pulse mx-auto max-w-md">
            <div className="h-12 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no regions found
  if (regions.length === 0) {
    return (
      <section className="py-12 px-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 quicksand-text">
            Explore World Cuisines
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            No regions available at the moment.
          </p>
          <button
            onClick={() => dispatch(fetchRegions())}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg 
                     transition-colors duration-200 font-semibold"
          >
            Reload Regions
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 min-h-auto">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 quicksand-text">
            Explore World Cuisines
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Choose a region to discover authentic recipes from different
            cultures around the globe
          </p>
        </div>

        {/* Custom Dropdown */}
        <div className="relative inline-block text-left max-w-md mx-auto">
          {/* Dropdown Button */}
          <button
            onClick={toggleDropdown}
            className="group w-full bg-white border-2 border-gray-200 rounded-xl px-6 py-4 
                     text-left shadow-lg hover:shadow-xl transition-all duration-300
                     hover:border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-100
                     min-w-80"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 
                               rounded-full flex items-center justify-center mr-3
                               group-hover:from-orange-200 group-hover:to-orange-300
                               transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Select Region
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {selectedRegion || "Choose a cuisine to explore"}
                  </p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl
                          max-h-80 overflow-y-auto animate-fadeInDown"
            >
              <div className="py-2">
                {regions.map((region, index) => {
                  const regionName = region.strArea;
                  return (
                    <button
                      key={regionName}
                      onClick={() => handleRegionSelect(regionName)}
                      className="w-full px-6 py-3 text-left hover:bg-orange-50 transition-colors duration-150
                               flex items-center justify-between group border-b border-gray-50 last:border-b-0"
                      style={{
                        animation: `slideInLeft 0.3s ease-out ${
                          index * 0.02
                        }s both`,
                      }}
                    >
                      <span className="text-gray-800 font-medium group-hover:text-orange-600 transition-colors duration-150">
                        {regionName}
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 
                                   group-hover:text-orange-500 transition-all duration-150"
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
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Backdrop to close dropdown */}
          {isOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            ></div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8">
          <p className="text-gray-500 text-sm">
            🌍 {regions.length} regions available • Click to explore recipes
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
