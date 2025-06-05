import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getMealsCategory } from "../utils/apiMeals";
import CategoryCard from "../components/CategoryCard";

export default function Categories({ mealsCategory: mealsCategoryFromProps }) {
  const mealsCategoryFromLoader = useLoaderData();
  const mealsCategory = mealsCategoryFromProps || mealsCategoryFromLoader;
  const [loadedImages, setLoadedImages] = useState(new Set());

  const handleImageLoad = (categoryId) => {
    setLoadedImages((prev) => new Set([...prev, categoryId]));
  };

  if (!mealsCategory || !mealsCategory.categories) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-logo text-primary mb-3 md:mb-4 animate-fade-in-static px-2">
            Food Categories
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-primary/80 font-quicksand max-w-sm sm:max-w-xl md:max-w-2xl mx-auto animate-fade-in-static delay-200-static px-4">
            Explore our diverse collection of delicious meal categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {mealsCategory.categories.map((category, index) => (
            <CategoryCard
              key={category.idCategory}
              category={category}
              index={index}
              onImageLoad={handleImageLoad}
              isImageLoaded={loadedImages.has(category.idCategory)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInStatic {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-static {
          animation: fadeInStatic 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        
        .delay-200-static { 
          animation-delay: 0.2s; 
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .container {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}

export async function loader() {
  const mealsCategory = await getMealsCategory();
  if (!mealsCategory) {
    console.error("Failed to load meal categories.");
    return { categories: [] };
  }
  return mealsCategory;
}
