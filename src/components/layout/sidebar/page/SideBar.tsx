import React from 'react';
import { useSidebar } from '@/context/sidebarContext';
import { useAccordion } from '../hooks/useAccordion';
import { useSidebarPermissions } from '../hooks/useSidebarPermissions';
import { SidebarProps } from '../types/sidebar.types';
import { SIDEBAR_CONFIG } from '../config/sidebarConfig';
import SidebarSection from '../components/SidebarSection';

const SideBar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { isCollapsed } = useSidebar();
  const { toggleAccordion, openAccordions } = useAccordion();
  const { filterSectionsByPermissions } = useSidebarPermissions();

  const filteredSections = filterSectionsByPermissions(SIDEBAR_CONFIG);

  return (
    <aside
      className={`
        sidebar-scrollbar-scope z-10 flex h-full min-h-0 flex-col transition-[width] duration-300 ease-in-out
        border-r border-gray-200 rtl:border-r-0 rtl:border-l
        bg-white dark:bg-gray-900 dark:border-gray-800
        shadow-lg dark:shadow-none
        ${isCollapsed ? 'w-16 px-2 pt-2 pb-2' : 'w-72 px-3 pt-2 pb-2'}
        ${className}
      `}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <nav className="sidebar-scrollbar -mr-2 min-h-0 flex-1 space-y-0.5 overflow-y-auto pr-2">
          {filteredSections.map((section, index: number) => (
            <React.Fragment key={section.id}>
              <SidebarSection
                section={section}
                openAccordions={openAccordions}
                onToggleAccordion={toggleAccordion}
                isCollapsed={isCollapsed}
              />
              {index < filteredSections.length - 1 && (
                <div className="border-t border-gray-200 dark:border-gray-800 pt-2" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
