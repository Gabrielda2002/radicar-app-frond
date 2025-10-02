// Types
export * from './types/sidebar.types';

// Hooks
export { useAccordion } from './hooks/useAccordion';
export { useSidebarStyles } from './hooks/useSidebarStyles';
export { useSidebarPermissions } from './hooks/useSidebarPermissions';
export { useSidebarActions } from './hooks/useSidebarActions';

// Components
export { default as SidebarImproved } from './SidebarImproved';
export { default as SidebarCategory } from './components/SidebarCategory';
export { default as SidebarItem } from './components/SidebarItem';
export { default as SidebarSection } from './components/SidebarSection';
export { default as SidebarDemo } from './SidebarDemo';

// Config
export { SIDEBAR_CONFIG } from './config/sidebarConfig';