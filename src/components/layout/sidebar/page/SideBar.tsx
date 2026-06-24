import React from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useSidebar } from '@/context/sidebarContext';
import { useAccordion } from '../hooks/useAccordion';
import { useSidebarPermissions } from '../hooks/useSidebarPermissions';
import { SidebarProps } from '../types/sidebar.types';
import { SIDEBAR_CONFIG } from '../config/sidebarConfig';
import SidebarSection from '../components/SidebarSection';

const SideBar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { isCollapsed, toggleSideBar } = useSidebar();
  const { toggleAccordion, openAccordions } = useAccordion();
  const { filterSectionsByPermissions } = useSidebarPermissions();

  const filteredSections = filterSectionsByPermissions(SIDEBAR_CONFIG);

  return (
    <aside
      className={`
        z-10 flex flex-col transition-[width] duration-300 ease-in-out
        overflow-y-auto border-r border-gray-200 rtl:border-r-0 rtl:border-l
        bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg
        ${isCollapsed ? 'w-16 px-2 py-3' : 'w-72 px-4 py-3'}
        h-full scrollbar-thin scrollbar-thumb-gray-300
        dark:scrollbar-thumb-gray-600 scrollbar-track-transparent
        ${className}
      `}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex flex-col justify-between flex-1">
        <nav className="space-y-6">
          {filteredSections.map((section, index: number) => (
            <React.Fragment key={section.id}>
              <SidebarSection
                section={section}
                openAccordions={openAccordions}
                onToggleAccordion={toggleAccordion}
                isCollapsed={isCollapsed}
              />
              {index < filteredSections.length - 1 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2" />
              )}
            </React.Fragment>
          ))}
        </nav>

        <button
          onClick={toggleSideBar}
          className={`
            mt-6 flex items-center justify-center rounded-lg border border-gray-200
            bg-gray-50 p-2 text-gray-600 transition-colors duration-200
            hover:bg-color2 hover:text-white hover:border-color2
            dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300
            dark:hover:bg-color2 dark:hover:text-white
            ${isCollapsed ? 'w-full' : 'w-fit self-end'}
          `}
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          title={isCollapsed ? 'Expandir' : 'Colapsar'}
        >
          {isCollapsed ? (
            <ChevronsRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronsLeft className="w-5 h-5" />
              <span className="ml-2 text-xs font-medium hidden md:inline">Colapsar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;