import { useState, useEffect } from "react";

interface ImagePopupProps {
  imageUrl: string;
  autoShowDelay?: number;
  storageKey?: string; 
  showOncePerSession?: boolean; // Mostrar solo una vez por sesión
}

const ImagePopup = ({
  imageUrl,
  autoShowDelay = 500,
  storageKey = "image-popup-shown",
}: ImagePopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);

    }, autoShowDelay);

    return () => clearTimeout(timer);
  }, [autoShowDelay, storageKey]);

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[400px] md:w-[500px] p-6 bg-white rounded-lg shadow-xl">
            <button
              onClick={closePopup}
              className="absolute text-gray-500 top-2 right-2 hover:text-red-500"
              aria-label="Cerrar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex justify-center">
              <img
                src={imageUrl}
                className="max-w-full rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePopup;
