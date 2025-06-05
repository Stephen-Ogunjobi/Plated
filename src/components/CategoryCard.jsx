import React, { useState, useEffect } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { useDispatch } from "react-redux";
import { fetchMealsByIngredient } from "../features/mealsByIng/ingredientMealSlice";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({
  category,
  index,
  onImageLoad,
  isImageLoaded,
}) {
  const navigate = useNavigate();
  const [cardRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -60px 0px", // Start animation slightly earlier
  });

  const dispatch = useDispatch();

  const handleExplore = () => {
    dispatch(fetchMealsByIngredient(category.strCategory));
    navigate(`/ingredients/${category.strCategory}`);
  };

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isIntersecting, hasAnimated]);

  const truncateDescription = (description, maxLength = 120) => {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength).trim() + "...";
  };

  // Mobile-specific truncation for better 2-column layout
  const getMobileMaxLength = () => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      return 80; // Shorter text for mobile 2-column layout
    }
    return 120;
  };

  // Calculate columns based on window width for dynamic delay calculation
  const getColumnCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 4; // xl
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 640) return 2; // sm and md (assuming md also uses 2 columns for this animation)
    }
    return 2; // Default to 2 columns for mobile
  };

  const columns = getColumnCount();
  const animationDelay = hasAnimated
    ? window.innerWidth < 640 // Mobile breakpoint (sm)
      ? `${index * 100}ms` // Faster sequential for mobile
      : `${Math.floor(index / columns) * 180 + (index % columns) * 90}ms` // Enhanced grid staggering
    : "0ms";

  return (
    <article
      ref={cardRef}
      className={`group bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-orange-100 transition-all duration-300 hover:-translate-y-1.5 ${
        hasAnimated
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-95"
      }`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "600ms", // Slightly faster base duration for a snappier feel
        transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)", // Smoother easing (easeOutExpo-like)
        transitionDelay: animationDelay,
      }}
    >
      <div className="relative overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 animate-pulse flex items-center justify-center">
            <div className="w-8 md:w-12 h-8 md:h-12 border-2 md:border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={category.strCategoryThumb}
          alt={category.strCategory}
          className={`w-full h-32 sm:h-40 md:h-48 object-cover transition-all duration-500 group-hover:scale-105 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => onImageLoad(category.idCategory)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
      </div>
      <div className="p-2.5 md:p-3">
        <h3 className="text-base md:text-xl font-bold text-primary mb-1 md:mb-1.5 group-hover:text-orange-600 transition-colors duration-300 font-quicksand leading-tight">
          {category.strCategory}
        </h3>
        <p className="text-primary/75 text-xs md:text-sm leading-relaxed font-quicksand line-clamp-3 md:line-clamp-4 h-[calc(1.25rem*3)] md:h-[calc(1.5rem*4)]">
          {truncateDescription(
            category.strCategoryDescription,
            getMobileMaxLength()
          )}
        </p>
        <div className="mt-1.5 md:mt-2 pt-1.5 md:pt-2 border-t border-orange-100/70">
          <button
            onClick={handleExplore}
            className="text-orange-600 hover:text-orange-700 font-semibold text-xs md:text-sm transition-colors duration-300 group-hover:translate-x-1 transform inline-flex items-center gap-1 md:gap-1.5"
          >
            <span className="truncate">Explore recipes</span>
            <svg
              className="w-3 md:w-4 h-3 md:h-4 transition-transform duration-300 group-hover:translate-x-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5} // Slightly bolder arrow
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
