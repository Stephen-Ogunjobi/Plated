import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearchMeal } from "../features/searchMeal/searchSlice";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchSearchMeal(query.trim()));
      navigate("/search");
    }
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search for a meal..."
          className="w-full px-6 py-4 rounded-xl text-primary placeholder-gray-400 bg-white border-0 focus:ring-4 focus:ring-orange-200 focus:outline-none text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          minLength={2}
        />
      </div>
      <button
        type="submit"
        disabled={!query.trim()}
        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-orange-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:from-orange-500 disabled:hover:to-red-500"
      >
        Search
      </button>
    </form>
  );
}
