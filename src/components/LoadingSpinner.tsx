import React, { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  duration?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-700 ease-in-out ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-indigo-600 border-color"></div>
    </div>
  );
};

export default LoadingSpinner;
