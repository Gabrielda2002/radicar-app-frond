import React from "react";

interface StarRatingProps {
  name: string;
  rating: number;
  onChange: (name: string, value: number) => void;
  error?: string;
  touched?: boolean;
  label: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  name,
  rating,
  onChange,
  error,
  touched,
  label,
}) => {

    

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor=""
          className="block mb-2 text-sm font-medium text-zinc-700 dark:text-gray-300"
        >
          {label}
        </label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(name, star)}
              className="focus:outline-none"
            >
              <svg
                className={`w-8 h-8 ${
                  star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </button>
          ))}
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            {rating} de 5
          </span>
        </div>
        {touched && error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </>
  );
};

export default StarRating;
