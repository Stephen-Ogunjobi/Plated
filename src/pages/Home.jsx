import React from "react";
import { useLoaderData } from "react-router-dom";
import { getMealsCategory } from "../utils/apiMeals";
import HeroSection from "../components/HeroSection";
import Categories from "./Categories";
import MealOfTheDay from "../components/MealOfTheDay";
import Regions from "../components/Regions";
import Reviews from "../components/Reviews";

export default function Home() {
  const { mealsCategory } = useLoaderData();

  return (
    <div className="flex  flex-col mx-auto bg-primary ">
      <HeroSection />
      <MealOfTheDay />
      <Categories mealsCategory={mealsCategory} />
      <Regions />
      <Reviews />
    </div>
  );
}

export async function loader() {
  const mealsCategory = await getMealsCategory();
  return { mealsCategory };
}
