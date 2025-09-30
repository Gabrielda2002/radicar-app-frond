import { useMemo } from 'react';
import { useAuth } from '@/context/authContext';
import { SidebarSection, MenuItem } from '../types/sidebar.types';

export const useSidebarPermissions = () => {
  const { rol } = useAuth();
  const userRole = Number(rol);

  const hasPermission = useMemo(() => {
    return (roles?: number[]) => {
      if (!roles || roles.length === 0) return true;
      return roles.includes(userRole);
    };
  }, [userRole]);

  const filterItemsByPermissions = useMemo(() => {
    return (items: MenuItem[]): MenuItem[] => {
      return items
        .filter(item => hasPermission(item.roles))
        .map(item => ({
          ...item,
          children: item.children ? filterItemsByPermissions(item.children) : undefined
        }))
        .filter(item => !item.children || item.children.length > 0);
    };
  }, [hasPermission]);

  const filterSectionsByPermissions = useMemo(() => {
    return (sections: SidebarSection[]): SidebarSection[] => {
      return sections
        .filter(section => hasPermission(section.roles))
        .map(section => ({
          ...section,
          items: filterItemsByPermissions(section.items)
        }))
        .filter(section => section.items.length > 0);
    };
  }, [hasPermission, filterItemsByPermissions]);

  return {
    hasPermission,
    filterItemsByPermissions,
    filterSectionsByPermissions,
    userRole
  };
};