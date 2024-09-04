// src/hooks/useSearch.ts
import { useState, useMemo } from 'react';

function useSearch<T>(data: T[], searchKeys: (keyof T)[]) {
  const [query, setQuery] = useState('');

  // Convertir la consulta a minúsculas una sola vez
  const normalizedQuery = query.toLowerCase();

  const filteredData = useMemo(() => {
    if (normalizedQuery === '') {
      return data; // Mostrar datos originales si la consulta está vacía
    }

    return data
      .filter((item) =>
        searchKeys.some((key) =>
          String(item[key]).toLowerCase().includes(normalizedQuery)
        )
      )
      .sort((a, b) => {
        const aMatch = searchKeys.some((key) =>
          String(a[key]).toLowerCase() === normalizedQuery
        );
        const bMatch = searchKeys.some((key) =>
          String(b[key]).toLowerCase() === normalizedQuery
        );

        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;

        return searchKeys[0] &&
          String(a[searchKeys[0]]).localeCompare(String(b[searchKeys[0]]));
      });
  }, [data, searchKeys, normalizedQuery]);

  return { query, setQuery, filteredData };
}

export default useSearch;
