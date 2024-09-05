import { useState, useEffect } from 'react';

const usePagination = (data: any[], initialItemsPerPage: number) => {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Reset the page when itemsPerPage changes
  }, [itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  return { currentPage, totalPages, paginate, currentData, setItemsPerPage };
};

export default usePagination;
