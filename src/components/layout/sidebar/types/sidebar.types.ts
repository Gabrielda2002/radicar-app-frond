import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface MenuItem {
  id: string;
  title: string;
  icon: IconType | string;
  path?: string;
  roles?: number[];
  children?: MenuItem[];
  type: 'category' | 'subcategory' | 'item' | 'section';
  action?: string | (() => void);
}

export interface SidebarSection {
  id: string;
  title?: string;
  items: MenuItem[];
  roles?: number[];
}

export interface SidebarProps {
  className?: string;
}

export interface CategoryProps {
  item: MenuItem;
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
  level?: number;
  onAction?: (actionKey: string) => void;
}

export interface SubCategoryProps {
  item: MenuItem;
  level?: number;
}

export interface SidebarItemProps {
  item: MenuItem;
  level?: number;
  onAction?: (actionKey: string) => void;
}

export interface AccordionState {
  [key: string]: boolean;
}

export interface UseDownloadReporteReturn {
  downloadReport: (
    dateStart: string,
    dateEnd: string,
    cupsCode: string | null,
    endPoint: string,
    headquarter: number,
    statusCups?: string,
    convenio?: number,
  ) => Promise<void>;
  error: string | null;
  loading: boolean;
}