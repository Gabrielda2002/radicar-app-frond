// src/hooks/useSearch.ts
import { useState, useEffect } from "react";

const useSearch = <T>(data: T[], searchKeys: string[]) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredData(
        data.filter((item) =>
          searchKeys.some((key) => {
            const keys = key.split('.');
            let value: any = item; // Cambiamos el tipo a 'any'

            for (const k of keys) {
              value = value[k as keyof typeof value]; // Usamos 'typeof value'
              if (value === undefined) return false;
            }

            return String(value).toLowerCase().includes(lowerCaseQuery);
          })
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [query, data, searchKeys]);

  return { query, setQuery, filteredData };
};

export default useSearch;
