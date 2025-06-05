import React, { useState } from "react";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/categories", label: "Categories" },
    { to: "/about", label: "About" },
    { to: "/favorites", label: "Favorites" },
  ];

  return (
    <nav className="bg-primary shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl font-quicksand text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg"
                    : "text-primary hover:text-orange-600 hover:bg-orange-50"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full animate-fade-in"></span>
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="relative z-50 p-2 rounded-lg hover:bg-orange-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
            aria-label="Toggle navigation menu"
          >
            <RxHamburgerMenu
              className={`text-primary text-2xl cursor-pointer transition-transform duration-300 ${
                isOpen ? "rotate-90" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-primary border-t border-orange-200 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-2">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              onClick={() => setIsOpen(false)}
              to={item.to}
              className={({ isActive }) =>
                `group block relative px-4 py-3 mb-1 rounded-xl font-quicksand text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg transform scale-105"
                    : "text-primary hover:text-orange-600 hover:bg-orange-50 hover:translate-x-2"
                }`
              }
            >
              {({ isActive }) => (
                <span
                  className={`flex items-center justify-between transition-all duration-300 transform ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isOpen
                      ? `${index * 100}ms`
                      : `${(navItems.length - index - 1) * 50}ms`,
                  }}
                >
                  <span className="flex items-center gap-3">
                    {/* Icon indicators for mobile */}
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-white"
                          : "bg-orange-300 group-hover:bg-orange-500"
                      }`}
                    ></span>
                    {item.label}
                  </span>
                  {isActive && (
                    <svg
                      className="w-4 h-4 text-white animate-fade-in"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        /* Enhanced hover effect for desktop links */
        .group:hover .group-hover\\:w-full {
          width: 100%;
        }
        
        /* Smooth gradient animation */
        .bg-gradient-to-r {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Active link pulse effect */
        .scale-105 {
          animation: pulse-scale 0.3s ease-out;
        }
        
        @keyframes pulse-scale {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1.05); }
        }
      `}</style>
    </nav>
  );
}
