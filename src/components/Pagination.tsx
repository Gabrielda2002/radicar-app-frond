import React from "react";
import arrowLeft from "/assets/arrow-left.svg";
import arrowLeft2 from "/assets/arrow-left2.svg";
import arrowRight from "/assets/arrow-right.svg";
import arrowRight2 from "/assets/arrow-right2.svg";
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
        title="Primero"
        type="button"
        className="inline-flex items-center justify-center w-8 h-8 py-0 border border-indigo-500 rounded-md shadow-md hover:bg-indigo-400 dark:bg-gray-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-400 group"
        onClick={() => handleClick(1)}
        disabled={currentPage === 1}
      >
        <img className="w-5 group-hover:invert" src={arrowLeft} alt="" />
      </button>
      <button
        title="anterior"
        type="button"
        className="inline-flex items-center justify-center w-8 h-8 py-0 border border-indigo-500 rounded-md shadow-md hover:bg-indigo-400 dark:bg-gray-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-400 group"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img className="w-5 group-hover:invert" src={arrowLeft2} alt="" />
      </button>
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      ).map((page) => (
        <button
          key={page}
          type="button"
          title={`Pagina ${page}`}
          className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-700 dark:text-gray-200 ${
            page === currentPage
              ? "dark:text-gray-200 text-gray-200 dark:border-indigo-600 dark:bg-indigo-400 hover:bg-indigo-400 border-indigo-600 bg-indigo-400"
              : "dark:border-gray-100 dark:hover:text-gray-200 hover:text-gray-200 dark:hover:bg-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-400 border-indigo-600"
          }`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        title="siguiente"
        type="button"
        className="inline-flex items-center justify-center w-8 h-8 py-0 border border-indigo-500 rounded-md shadow-md hover:bg-indigo-400 dark:bg-gray-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-400 group"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img className="w-5 group-hover:invert" src={arrowRight2} alt="" />
      </button>
      <button
        title="ultimo"
        type="button"
        className="inline-flex items-center justify-center w-8 h-8 py-0 border border-indigo-500 rounded-md shadow-md hover:bg-indigo-400 dark:bg-gray-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-400 group"
        onClick={() => handleClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        <img className="w-5 group-hover:invert" src={arrowRight} alt="" />
      </button>
    </div>
  );
};

export default Pagination;
