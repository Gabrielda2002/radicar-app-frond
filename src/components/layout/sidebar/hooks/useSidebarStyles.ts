import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useSidebarStyles = () => {
  const location = useLocation();

  const getLinkClass = useCallback(
    (path: string) => {
      const baseClasses = "flex items-center px-3 py-2 transition-all duration-300 transform rounded-lg group relative";
      const activeClasses = "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200 shadow-md";
      const inactiveClasses = "text-gray-600 dark:text-gray-300 hover:bg-color2 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white hover:shadow-sm hover:scale-[1.02]";
      
      return `${baseClasses} ${
        location.pathname === path ? activeClasses : inactiveClasses
      }`;
    },
    [location.pathname]
  );

  const getCategoryClass = useCallback(
    (isOpen: boolean) => {
      const baseClasses = "flex items-center px-3 py-2 transition-all duration-300 transform rounded-lg group w-full";
      const openClasses = "bg-color text-white dark:bg-gray-700 dark:text-gray-200 shadow-md";
      const closedClasses = "text-gray-600 dark:text-gray-300 hover:bg-color hover:text-white dark:hover:bg-gray-700 dark:hover:text-white hover:shadow-sm hover:scale-[1.02]";
      
      return `${baseClasses} ${isOpen ? openClasses : closedClasses}`;
    },
    []
  );

  const getIconClass = useCallback(
    (isActive: boolean) => {
      if (isActive) return "text-white dark:text-gray-200";
      return "group-hover:text-white dark:text-white transition-colors duration-300";
    },
    []
  );

  const getImageClass = useCallback(
    (isActive: boolean) => {
      if (isActive) return "invert";
      return "group-hover:invert dark:invert transition-all duration-300";
    },
    []
  );

  const getTextClass = useCallback(
    (isActive: boolean, level: number = 0) => {
      const baseClasses = "text-sm font-medium whitespace-nowrap transition-colors duration-300";
      const levelPadding = level > 0 ? `ml-${4 + level * 2}` : "absolute left-8 mx-2";
      const activeClasses = "text-white dark:text-gray-200";
      const inactiveClasses = "group-hover:text-white dark:group-hover:text-gray-200";
      
      return `${baseClasses} ${levelPadding} ${
        isActive ? activeClasses : inactiveClasses
      }`;
    },
    []
  );

  return {
    getLinkClass,
    getCategoryClass,
    getIconClass,
    getImageClass,
    getTextClass
  };
};