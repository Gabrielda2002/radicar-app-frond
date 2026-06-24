import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CategoryProps } from '../types/sidebar.types';
import { useSidebarStyles } from '../hooks/useSidebarStyles';
import SidebarItem from './SidebarItem';
import arrowUp from '/assets/arrow-up.svg';

interface ExtendedCategoryProps extends CategoryProps {
  isCollapsed?: boolean;
}

interface PopoverPosition {
  top: number;
  left: number;
}

const SidebarCategory: React.FC<ExtendedCategoryProps> = ({
  item,
  isOpen: isOpenProp,
  onToggle,
  children,
  level = 0,
  onAction,
  isCollapsed = false
}) => {
  const { isActiveRoute, hasActiveChild, getCategoryClass, getIconClass, getImageClass, getTextClass } = useSidebarStyles();
  const IconComponent = typeof item.icon !== 'string' ? item.icon : null;
  const activeChild = hasActiveChild(item.children);
  const isActivePage = item.path ? isActiveRoute(item.path) : false;
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<PopoverPosition>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const isOpen = isOpenProp || activeChild || isActivePage;

  const updatePopoverPosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPopoverPosition({
      top: rect.top,
      left: rect.right + 8
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setShowPopover(false);
    };

    if (showPopover) {
      updatePopoverPosition();
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', updatePopoverPosition);
      window.addEventListener('scroll', updatePopoverPosition, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', updatePopoverPosition);
      window.removeEventListener('scroll', updatePopoverPosition, true);
    };
  }, [showPopover]);

  const handleToggle = () => {
    if (isCollapsed) {
      setShowPopover((prev) => !prev);
    } else {
      onToggle();
    }
  };

  const handleChildClick = () => {
    if (isCollapsed) {
      setShowPopover(false);
    }
  };

  const tooltip = isCollapsed && (
    <span className="absolute left-full top-1/2 z-50 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:block group-hover:opacity-100 dark:bg-gray-700">
      {item.title}
      <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-gray-800 dark:border-r-gray-700" />
    </span>
  );

  const popover = showPopover && (
    <div
      ref={popoverRef}
      className="fixed z-[100] w-60 rounded-lg border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-800"
      style={{ top: popoverPosition.top, left: popoverPosition.left }}
    >
      <div className="mb-2 border-b border-gray-100 px-2 pb-1.5 text-sm font-semibold text-color dark:border-gray-700 dark:text-color">
        {item.title}
      </div>
      <div className="space-y-1">
        {item.children?.map((child) => (
          <div key={child.id}>
            {child.type === 'category' ? (
              <SidebarCategory
                item={child}
                isOpen={false}
                onToggle={() => {}}
                level={level + 1}
                onAction={onAction}
                isCollapsed={isCollapsed}
              />
            ) : (
              <div onClick={handleChildClick}>
                <SidebarItem item={child} level={level + 1} onAction={onAction} isCollapsed={false} />
              </div>
            )}
          </div>
        ))}
        {children}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={getCategoryClass(isOpen, isCollapsed, activeChild, isActivePage)}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Cerrar' : 'Abrir'} ${item.title}`}
        title={isCollapsed ? item.title : undefined}
      >
        {IconComponent ? (
          <IconComponent className={`w-5 h-5 ${getIconClass(activeChild || isOpen || isActivePage)}`} />
        ) : (
          <img
            src={item.icon as string}
            alt=""
            className={`w-5 h-5 ${getImageClass(activeChild || isOpen || isActivePage)}`}
          />
        )}
        <span className={`${getTextClass(activeChild || isOpen || isActivePage, isCollapsed)} ml-3`}>
          {item.title}
        </span>
        {!isCollapsed && (
          <img
            src={arrowUp}
            alt=""
            className={`w-5 h-5 ml-auto transition-all duration-300 dark:invert ${
              isOpen ? 'rotate-180 scale-110' : 'hover:scale-110'
            }`}
          />
        )}
        {tooltip}
      </button>

      {/* Expandido: acordeón clásico */}
      {!isCollapsed && isOpen && (
        <div className="ml-4 mt-2 space-y-2 overflow-hidden">
          <div className="pl-2 border-l-2 border-gray-200 dark:border-gray-600 space-y-1">
            {item.children?.map((child) => (
              <div key={child.id} className="pl-2">
                {child.type === 'category' ? (
                  <SidebarCategory
                    item={child}
                    isOpen={false}
                    onToggle={() => {}}
                    level={level + 1}
                    onAction={onAction}
                    isCollapsed={isCollapsed}
                  />
                ) : (
                  <SidebarItem item={child} level={level + 1} onAction={onAction} isCollapsed={isCollapsed} />
                )}
              </div>
            ))}
            {children}
          </div>
        </div>
      )}

      {/* Colapsado: popover flotante via portal para evitar overflow del sidebar */}
      {isCollapsed && createPortal(popover, document.body)}
    </div>
  );
};

export default SidebarCategory;