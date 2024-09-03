import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbersToShow = 5; // Número de botones de página que se mostrarán
  const halfPageNumbers = Math.floor(pageNumbersToShow / 2);

  const getStartPage = () => {
    if (totalPages <= pageNumbersToShow) {
      return 1;
    }
    if (currentPage <= halfPageNumbers) {
      return 1;
    }
    if (currentPage + halfPageNumbers >= totalPages) {
      return totalPages - pageNumbersToShow + 1;
    }
    return currentPage - halfPageNumbers;
  };

  const startPage = getStartPage();
  const endPage = Math.min(startPage + pageNumbersToShow - 1, totalPages);

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-1 dark:text-gray-800">
      <button
        title="First"
        type="button"
        className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100"
        onClick={() => handleClick(1)}
        disabled={currentPage === 1}
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="18 15 12 9 18 3"></polyline>
        </svg>
      </button>
      <button
        title="previous"
        type="button"
        className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      ).map((page) => (
        <button
          key={page}
          type="button"
          title={`Page ${page}`}
          className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-50 ${
            page === currentPage
              ? "dark:text-violet-600 dark:border-violet-600"
              : "dark:border-gray-100"
          }`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        title="next"
        type="button"
        className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      <button
        title="Last"
        type="button"
        className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100"
        onClick={() => handleClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="6 15 12 9 6 3"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
