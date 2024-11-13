import React, { memo, useCallback, useMemo } from "react";
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

  const getStartPage = useCallback(() => {
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
  }, [currentPage, totalPages, halfPageNumbers]);

  const startPage = useMemo(() => getStartPage(), [getStartPage]);
  const endPage = useMemo(
    () => Math.min(startPage + pageNumbersToShow - 1, totalPages),
    [startPage, totalPages, pageNumbersToShow]
  );

  const handleClick = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    },
    [onPageChange, totalPages]
  );

  return (
    <div className="flex items-center justify-center space-x-1 ">
      <button
        title="Primero"
        type="button"
        className="inline-flex items-center justify-center w-10 h-8 py-0 bg-gray-200 border rounded-md shadow-md cursor-pointer dark:bg-color hover:bg-gray-600 dark:hover:bg-teal-400 group"
        onClick={() => handleClick(1)}
        disabled={currentPage === 1}
      >
        <img className="w-5 group-hover:invert" src={arrowLeft} alt="" />
      </button>
      <button
        title="anterior"
        type="button"
        className="inline-flex items-center justify-center w-10 h-8 py-0 bg-gray-200 border rounded-md shadow-md cursor-pointer dark:bg-color hover:bg-gray-600 dark:hover:bg-teal-400 group"
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
          className={`inline-flex items-center justify-center w-10 h-8 text-sm font-bold border rounded shadow-md  text-stone-600 dark:text-white  bg-gray-200  dark:bg-color  hover:bg-gray-500 hover:text-white dark:hover:bg-teal-400 ${
            page === currentPage
              ? " dark:bg-gray-900 border-teal-500 dark:border-white bg-red-700" //estilo de button activo (no funciona el bg-red ahhhhh!!!)
              : " " //estilos de buttones inactivos
          }`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        title="siguiente"
        type="button"
        className="inline-flex items-center justify-center w-10 h-8 py-0 bg-gray-200 border rounded-md shadow-md cursor-pointer dark:bg-color hover:bg-gray-600 dark:hover:bg-teal-400 group"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img className="w-5 group-hover:invert" src={arrowRight2} alt="" />
      </button>
      <button
        title="ultimo"
        type="button"
        className="inline-flex items-center justify-center w-10 h-8 py-0 bg-gray-200 border rounded-md shadow-md cursor-pointer dark:bg-color hover:bg-gray-600 dark:hover:bg-teal-400 group"
        onClick={() => handleClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        <img className="w-5 group-hover:invert" src={arrowRight} alt="" />
      </button>
    </div>
  );
};

export default Pagination;
