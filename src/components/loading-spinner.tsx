import React, { useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators'; // Asegúrate de importar OrbitProgress correctamente

interface LoadingSpinnerProps {
  duration?: number; // Duración opcional en milisegundos (por defecto 5000ms)
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ duration = 100000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta
  }, [duration]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out bg-gray-100 dark:bg-gray-900">
      <OrbitProgress variant="track-disc" dense color="#31cca9" size="large" text="" textColor="#000000" />
    </div>
  );
};

export default LoadingSpinner;
