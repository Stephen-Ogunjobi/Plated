import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRandomMeal,
  getRandomMeal,
} from "../features/randomMeal/randomSlice";
import { useNavigate } from "react-router-dom";

export default function RandomBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector(getRandomMeal);
  const isLoading = status === "loading";

  async function handleRandomMeal() {
    const result = await dispatch(fetchRandomMeal());
    if (result.payload) {
      navigate("/recipe", { state: { meal: result.payload } });
    }
  }

  return (
    <>
      <button
        onClick={handleRandomMeal}
        disabled={isLoading}
        className="px-8 py-3 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 backdrop-blur-sm hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <span className="inline-flex items-center gap-2">
          <span
            className={`text-xl ${
              isLoading ? "animate-spin" : "animate-dice-spin"
            }`}
          >
            {isLoading ? "⚡" : "🎲"}
          </span>
          {isLoading ? "Getting Random Meal..." : "Get a Random Meal"}
        </span>
      </button>

      <style>{`
        @keyframes dice-spin {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.1); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .animate-dice-spin {
          animation: dice-spin 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
