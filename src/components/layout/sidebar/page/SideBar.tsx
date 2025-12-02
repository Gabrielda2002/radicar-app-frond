import React, { useRef, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useSidebar } from '@/context/sidebarContext';
import { useAccordion } from '../hooks/useAccordion';
import { useSidebarPermissions } from '../hooks/useSidebarPermissions';
import { useSidebarActions } from '../hooks/useSidebarActions';
import { SidebarProps } from '../types/sidebar.types';
import { SIDEBAR_CONFIG } from '../config/sidebarConfig';
import SidebarSection from '../components/SidebarSection';
import ModalReporteRadicado from '../components/ModalGestionReportes';

const SideBar
: React.FC<SidebarProps> = ({ className = '' }) => {
  const { isCollapsed, toggleSideBar } = useSidebar();
  const { toggleAccordion, openAccordions } = useAccordion();
  const { filterSectionsByPermissions } = useSidebarPermissions();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Filter sections based on user permissions
  const filteredSections = filterSectionsByPermissions(SIDEBAR_CONFIG);

  // Modal handlers
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Action handlers
  const { handleAction } = useSidebarActions({
    openReportsModal: openModal
  });

  // Load sidebar state from cookies
  useEffect(() => {
    const savedState = Cookies.get('sidebarState');
    if (savedState === 'collapsed' && !isCollapsed) {
      toggleSideBar();
    }
  }, [isCollapsed, toggleSideBar]);

  // Save sidebar state to cookies
  useEffect(() => {
    Cookies.set('sidebarState', isCollapsed ? 'collapsed' : 'expanded');
  }, [isCollapsed]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !isCollapsed
      ) {
        toggleSideBar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCollapsed, toggleSideBar]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`
          z-10 flex flex-col transition-all duration-500 ease-in-out 
          overflow-y-auto border-r border-gray-200 rtl:border-r-0 rtl:border-l 
          bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg
          ${isCollapsed 
            ? '-translate-x-full w-16 absolute' 
            : 'w-72 absolute'
          } 
          px-4 py-3 h-full scrollbar-thin scrollbar-thumb-gray-300 
          dark:scrollbar-thumb-gray-600 scrollbar-track-transparent
          ${className}
        `}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="flex flex-col justify-between flex-1">
          <nav className="-mx-3 space-y-6">
            <div className="space-y-6">
              {filteredSections.map((section, index: number) => (
                <React.Fragment key={section.id}>
                  <SidebarSection
                    section={section}
                    openAccordions={openAccordions}
                    onToggleAccordion={toggleAccordion}
                    onAction={handleAction}
                  />
                  {index < filteredSections.length - 1 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Modal de reportes */}
      {isModalOpen && (
        <ModalReporteRadicado isOpen={isModalOpen} onClose={closeModal} />
      )}
    </>
  );
};

export default SideBar
;