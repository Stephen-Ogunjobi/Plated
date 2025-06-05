function Loader() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Spinner */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
            {/* Spinning ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 border-r-orange-600 rounded-full animate-spin"></div>
            {/* Inner pulsing dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Food icons floating around */}
          <div className="absolute -top-2 -left-2 text-2xl animate-bounce delay-100">
            🍽️
          </div>
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce delay-300">
            🍳
          </div>
          <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce delay-500">
            🥘
          </div>
          <div className="absolute -bottom-2 -right-2 text-2xl animate-bounce delay-700">
            🍲
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h3 className="text-2xl font-logo text-primary">
            Cooking up something delicious...
          </h3>
          <p className="text-primary/70 font-quicksand">
            Please wait while we prepare your meal
          </p>

          {/* Loading dots */}
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>

      <style>{`
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>
    </div>
  );
}

export default Loader;
