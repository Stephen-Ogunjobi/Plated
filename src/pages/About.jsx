import React from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

export default function About() {
  const [headerRef, isHeaderVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  const [featuresRef, isFeaturesVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const [benefitsRef, isBenefitsVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const [improvementsRef, isImprovementsVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const features = [
    {
      icon: "🔍",
      title: "Smart Recipe Search",
      description:
        "Find recipes by meal name, ingredients, or cuisine type with our intelligent search system.",
    },
    {
      icon: "🎲",
      title: "Daily Meal Discovery",
      description:
        "Discover new recipes every day with our 'Meal of the Day' feature that suggests random delicious meals.",
    },
    {
      icon: "🌍",
      title: "Global Cuisine Explorer",
      description:
        "Explore authentic recipes from different regions and cultures around the world.",
    },
    {
      icon: "📂",
      title: "Category Browsing",
      description:
        "Browse recipes by categories like desserts, main courses, appetizers, and more.",
    },
    {
      icon: "❤️",
      title: "Personal Favorites",
      description:
        "Save your favorite recipes and access them anytime with our favorites system.",
    },
    {
      icon: "📹",
      title: "Video Tutorials",
      description:
        "Watch cooking videos and step-by-step tutorials for many recipes.",
    },
  ];

  const benefits = [
    {
      icon: "⏰",
      title: "Save Time",
      description:
        "No more endless scrolling through recipe blogs. Find what you need instantly.",
    },
    {
      icon: "🎯",
      title: "Reduce Food Waste",
      description:
        "Search by ingredients you already have to minimize waste and save money.",
    },
    {
      icon: "🍽️",
      title: "Expand Your Palate",
      description:
        "Discover new cuisines and cooking techniques from around the world.",
    },
    {
      icon: "📱",
      title: "Cook with Confidence",
      description:
        "Clear instructions and ingredient lists make cooking stress-free and enjoyable.",
    },
  ];

  const improvements = [
    {
      title: "Lightning Fast Search",
      description:
        "Unlike traditional recipe sites, our search returns instant results without ads or lengthy stories.",
      improvement: "10x faster than typical recipe websites",
    },
    {
      title: "Clean, Distraction-Free Interface",
      description:
        "No pop-ups, ads, or unnecessary content. Just pure, beautiful recipe discovery.",
      improvement: "Zero distractions, 100% focus on cooking",
    },
    {
      title: "Mobile-First Design",
      description:
        "Perfectly optimized for cooking with your phone or tablet in the kitchen.",
      improvement: "Touch-friendly interface designed for messy hands",
    },
    {
      title: "Comprehensive Recipe Database",
      description:
        "Access thousands of recipes from TheMealDB with detailed ingredients and instructions.",
      improvement: "Curated, high-quality recipes from trusted sources",
    },
  ];

  return (
    <div className="min-h-screen bg-primary overflow-hidden">
      {/* Hero Section */}
      <section
        ref={headerRef}
        className={`relative min-h-screen flex items-center justify-center px-4 py-20 transition-all duration-1000 ${
          isHeaderVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-50"></div>
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <div className="mb-8 relative">
            <div className="text-8xl mb-6 animate-bounce">🍽️</div>
            <h1 className="text-5xl md:text-7xl font-logo text-primary mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              About Plated
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-8"></div>
          </div>

          <p className="text-xl md:text-2xl text-primary/80 font-quicksand leading-relaxed mb-12 max-w-3xl mx-auto">
            Your ultimate companion for culinary discovery. We're
            revolutionizing how people find, explore, and fall in love with
            cooking through smart technology and beautiful design.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-4 text-primary/70">
              <div className="flex -space-x-2">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                  1K+
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                  5⭐
                </div>
              </div>
              <span className="font-quicksand font-semibold">
                Trusted by food lovers worldwide
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className={`py-20 px-4 transition-all duration-1000 ${
          isFeaturesVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-logo text-primary mb-6">
              What Makes Plated Special?
            </h2>
            <p className="text-xl text-primary/70 font-quicksand max-w-3xl mx-auto">
              We've packed powerful features into an intuitive interface that
              makes recipe discovery feel magical, not overwhelming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-orange-100/50 ${
                  isFeaturesVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isFeaturesVisible
                    ? `${index * 150}ms`
                    : "0ms",
                }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 font-quicksand">
                  {feature.title}
                </h3>
                <p className="text-primary/70 font-quicksand leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        ref={benefitsRef}
        className={`py-20 px-4 bg-gradient-to-r from-orange-50 to-red-50 transition-all duration-1000 ${
          isBenefitsVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-logo text-primary mb-6">
              How Plated Helps You
            </h2>
            <p className="text-xl text-primary/70 font-quicksand max-w-3xl mx-auto">
              Every feature is designed with one goal: making your cooking
              journey easier, more enjoyable, and more delicious.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex items-start gap-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group ${
                  isBenefitsVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{
                  transitionDelay: isBenefitsVisible
                    ? `${index * 200}ms`
                    : "0ms",
                }}
              >
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3 font-quicksand">
                    {benefit.title}
                  </h3>
                  <p className="text-primary/70 font-quicksand leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Improvements Section */}
      <section
        ref={improvementsRef}
        className={`py-20 px-4 transition-all duration-1000 ${
          isImprovementsVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-logo text-primary mb-6">
              Why Choose Plated Over Others?
            </h2>
            <p className="text-xl text-primary/70 font-quicksand max-w-3xl mx-auto">
              We've learned from the frustrations of existing recipe platforms
              and built something better.
            </p>
          </div>

          <div className="space-y-8">
            {improvements.map((improvement, index) => (
              <div
                key={index}
                className={`relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group ${
                  isImprovementsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isImprovementsVisible
                    ? `${index * 150}ms`
                    : "0ms",
                }}
              >
                <div className="p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-3 font-quicksand">
                      {improvement.title}
                    </h3>
                    <p className="text-primary/70 font-quicksand leading-relaxed mb-4">
                      {improvement.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full font-semibold text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {improvement.improvement}
                    </div>
                  </div>
                  <div className="w-full md:w-32 h-2 bg-gradient-to-r from-orange-200 to-red-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isImprovementsVisible ? "100%" : "0%",
                        transitionDelay: isImprovementsVisible
                          ? `${index * 150 + 500}ms`
                          : "0ms",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
