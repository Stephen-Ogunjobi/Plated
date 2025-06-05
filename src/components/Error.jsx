import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function Error({ message }) {
  const routeError = useRouteError();
  const navigate = useNavigate();

  // Use prop message first, then route error, then fallback
  const errorMessage =
    message || routeError?.message || "Unknown error occurred";

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-4 text-red-500">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-primary mb-4 font-quicksand">
          Something went wrong
        </h1>
        <p className="text-primary/70 mb-6 font-quicksand">{errorMessage}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg focus:ring-4 focus:ring-orange-300 focus:outline-none font-quicksand"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
