"use client";

import { useState, useEffect } from "react";

export default function TypeWriter({ text, className = "", delay = 50 }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <div className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="border-r-2 border-primary animate-[blink_1s_infinite]"></span>
      )}
    </div>
  );
}
