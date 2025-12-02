import { useState, useMemo } from 'react';

// Tipo auxiliar para obtener el tipo de un valor anidado usando un path
export type NestedKeyOf<T> = {
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

// Función para formatear fecha a string comparable
function formatDateForSearch(date: Date | string | null | undefined): string {
  if (!date) return '';
  
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return '';
    
    // Formato: YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return [
      `${year}-${month}-${day}`,     // 2024-01-15
      `${day}/${month}/${year}`,     // 15/01/2024
      `${day}-${month}-${year}`,     // 15-01-2024
      `${day}/${month}`,             // 15/01
      `${day}-${month}`,             // 15-01
      `${month}/${year}`,            // 01/2024
      `${month}-${year}`,            // 01-2024
      String(year),                  // 2024
      String(month),                 // 01
      String(day)                    // 15
    ].join(' ');
  } catch {
    return '';
  }
}

function useSearch<T extends object>(data: T[], searchKeys: NestedKeyOf<T>[]) {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.toLowerCase().trim();

  const filteredData = useMemo(() => {
    if (normalizedQuery === '') {
      return data;
    }

    return data
      .filter((item) =>
        searchKeys.some((key) => {
          const value = getNestedValue(item, key as string);
          
          if (value === undefined || value === null) return false;
          
          // Si es una fecha (Date object o string que parece fecha)
          if (value instanceof Date || 
              (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value))) {
            const dateString = formatDateForSearch(value);
            return dateString.toLowerCase().includes(normalizedQuery);
          }
          
          // Búsqueda normal para otros tipos
          return String(value).toLowerCase().includes(normalizedQuery);
        })
      )
      .sort((a, b) => {
        // Priorizar coincidencias exactas
        const aMatch = searchKeys.some((key) => {
          const value = getNestedValue(a, key as string);
          if (value instanceof Date || 
              (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value))) {
            const dateString = formatDateForSearch(value);
            return dateString.toLowerCase() === normalizedQuery;
          }
          return value !== undefined && 
                 String(value).toLowerCase() === normalizedQuery;
        });
        
        const bMatch = searchKeys.some((key) => {
          const value = getNestedValue(b, key as string);
          if (value instanceof Date || 
              (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value))) {
            const dateString = formatDateForSearch(value);
            return dateString.toLowerCase() === normalizedQuery;
          }
          return value !== undefined && 
                 String(value).toLowerCase() === normalizedQuery;
        });

        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;

        // Ordenar por el primer campo como fallback
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