import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface ChildNode {
  path?: string;
  children?: ChildNode[];
}

export const useSidebarStyles = () => {
  const location = useLocation();

  const isActiveRoute = useCallback(
    (path?: string) => {
      if (!path) return false;
      return location.pathname === path || location.pathname.startsWith(`${path}/`);
    },
    [location.pathname]
  );

  const hasActiveChild = (children?: ChildNode[]): boolean => {
    if (!children || children.length === 0) return false;
    return children.some((child): boolean => {
      if (child.path && isActiveRoute(child.path)) return true;
      if (child.children && child.children.length > 0) {
        return hasActiveChild(child.children);
      }
      return false;
    });
  };

  const getLinkClass = useCallback(
    (path: string, isCollapsed = false) => {
      const isActive = isActiveRoute(path);
      const baseClasses = `flex items-center transition-all duration-300 transform rounded-md group relative border-l-4 ${
        isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
      }`;
      const activeClasses =
        'bg-color2/10 text-color2 border-color2 font-semibold dark:bg-color2/20 dark:text-[#4F9BDC] dark:border-[#4F9BDC]';
      const inactiveClasses =
        'text-gray-600 border-transparent hover:bg-color2/5 hover:text-color2 dark:text-gray-300 dark:hover:bg-color2/10 dark:hover:text-[#4F9BDC]';

      return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    },
    [isActiveRoute]
  );

  const getCategoryClass = useCallback(
    (
      isOpen: boolean,
      collapsed: boolean,
      activeChild = false,
      isActivePage = false
    ) => {
      const baseClasses = `flex items-center transition-all duration-300 transform rounded-md group ${
        isActivePage ? 'border-l-4' : ''
      } ${collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'}`;

      if (isActivePage) {
        return `${baseClasses} bg-color2/10 text-color2 border-color2 font-semibold dark:bg-color2/20 dark:text-[#4F9BDC] dark:border-[#4F9BDC]`;
      }

      if (activeChild) {
        return `${baseClasses} bg-color/5 text-color dark:bg-color/10 dark:text-color`;
      }

      if (isOpen) {
        return `${baseClasses} bg-color/5 text-color dark:bg-color/10 dark:text-color`;
      }

      return `${baseClasses} text-gray-600 hover:bg-color/5 hover:text-color dark:text-gray-300 dark:hover:bg-color/10 dark:hover:text-color`;
    },
    []
  );

  const getIconClass = useCallback(
    (isActive: boolean) => {
      if (isActive) return 'text-current transition-colors duration-300';
      return 'text-gray-500 group-hover:text-current dark:text-gray-400 transition-colors duration-300';
    },
    []
  );

  const getImageClass = useCallback(
    (isActive: boolean) => {
      if (isActive) return 'invert brightness-0';
      return 'opacity-80 group-hover:invert group-hover:brightness-0 dark:invert dark:opacity-70 transition-all duration-300';
    },
    []
  );

  const getTextClass = useCallback(
    (isActive: boolean, isCollapsed = false) => {
      const baseClasses = 'text-sm font-medium whitespace-nowrap transition-colors duration-300';
      if (isCollapsed) return 'hidden';
      return `${baseClasses} ${isActive ? 'text-current' : 'group-hover:text-current'}`;
    },
    []
  );

  return {
    isActiveRoute,
    hasActiveChild,
    getLinkClass,
    getCategoryClass,
    getIconClass,
    getImageClass,
    getTextClass
  };
};