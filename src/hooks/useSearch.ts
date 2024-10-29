import { useState, useMemo } from 'react';

// Tipo auxiliar para obtener el tipo de un valor anidado usando un path
type NestedKeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`;
}[keyof T & (string | number)];

// Función auxiliar para obtener el valor de una propiedad anidada
function getNestedValue<T>(obj: T, path: string): any {
  return path.split('.').reduce((curr: any, key: string) => {
    return curr ? curr[key] : undefined;
  }, obj);
}

function useSearch<T extends object>(data: T[], searchKeys: NestedKeyOf<T>[]) {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.toLowerCase();

  const filteredData = useMemo(() => {
    if (normalizedQuery === '') {
      return data;
    }

    return data
      .filter((item) =>
        searchKeys.some((key) => {
          const value = getNestedValue(item, key as string);
          return value !== undefined && 
                 String(value).toLowerCase().includes(normalizedQuery);
        })
      )
      .sort((a, b) => {
        const aMatch = searchKeys.some((key) => {
          const value = getNestedValue(a, key as string);
          return value !== undefined && 
                 String(value).toLowerCase() === normalizedQuery;
        });
        const bMatch = searchKeys.some((key) => {
          const value = getNestedValue(b, key as string);
          return value !== undefined && 
                 String(value).toLowerCase() === normalizedQuery;
        });

        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;

        const firstKey = searchKeys[0];
        if (firstKey) {
          const aValue = getNestedValue(a, firstKey as string);
          const bValue = getNestedValue(b, firstKey as string);
          return aValue && bValue ? String(aValue).localeCompare(String(bValue)) : 0;
        }
        return 0;
      });
  }, [data, searchKeys, normalizedQuery]);

  return { query, setQuery, filteredData };
}

export default useSearch;