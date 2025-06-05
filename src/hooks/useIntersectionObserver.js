import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to observe an element's intersection with the viewport.
 * @param {object} options - Intersection Observer options (root, rootMargin, threshold).
 * @returns {[React.MutableRefObject<any>, boolean]} - A ref to attach to the element and a boolean indicating if it's intersecting.
 */
export default function useIntersectionObserver(options) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        setIsIntersecting(entry.isIntersecting);
        // Optional: Unobserve after it becomes visible if you only want to animate once
        if (entry.isIntersecting) {
          observer.unobserve(element);
        }
      },
      {
        // Default options if none are provided
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is visible
        ...options, // Spread any custom options
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]); // Re-run effect if options change

  return [elementRef, isIntersecting];
}
