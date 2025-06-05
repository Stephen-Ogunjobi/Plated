import React from "react";
import TypeWriter from "./Typewritter";
import SearchBar from "./SearchBar";
import RandomBtn from "./RandomBtn";
export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat animate-hero-bg"
        style={{
          backgroundImage: "url('herofood.webp')",
          filter: "blur(5px) brightness(0.8)",
          zIndex: 1,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-logo text-white mb-4 drop-shadow-lg animate-fade-in">
            Welcome to Plated...
          </h2>
          <TypeWriter
            className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md animate-fade-in delay-200"
            text="Discover delicious meals and culinary adventures."
            delay={100}
          ></TypeWriter>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl animate-fade-in delay-300">
          <SearchBar />

          <div className="mt-6">
            <RandomBtn />
          </div>
        </div>

        <div className="mt-8 animate-fade-in delay-500">
          <p className="text-white/80 text-sm sm:text-base">
            Join thousands of food lovers exploring new flavors every day
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style>{`
        @keyframes hero-bg {
          0% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.08) translateY(-10px); }
          100% { transform: scale(1) translateY(0); }
        }
        .animate-hero-bg {
          animation: hero-bg 16s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}
