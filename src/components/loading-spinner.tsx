import React, { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

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
      <OrbitProgress
        variant="track-disc"
        dense
        color="#31cca9"
        size="large"
        text=""
        textColor="#000000"
      />
    </div>
  );
};

export default LoadingSpinner;
