import React from "react";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      text: "Amazing recipes! Found my new favorite pasta dish here.",
      gradient: "bg-gradient-to-br from-pink-400 to-purple-500",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Mike R.",
      rating: 5,
      text: "Love the variety of cuisines. Easy to follow instructions!",
      gradient: "bg-gradient-to-br from-blue-400 to-cyan-500",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "John D.",
      rating: 5,
      text: "Perfect for discovering new flavors. Highly recommended!",
      gradient: "bg-gradient-to-br from-orange-400 to-red-500",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Emma L.",
      rating: 4,
      text: "Great collection of authentic recipes from around the world.",
      gradient: "bg-gradient-to-br from-green-400 to-teal-500",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 quicksand-text mb-4">
          What Our Food Lovers Say
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Real reviews from our community
        </p>

        <div className="grid grid-cols-2  lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`${review.gradient} p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-200`}
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-white border-opacity-50 mr-3 object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{review.name}</p>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-300 text-sm">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm opacity-95 leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
