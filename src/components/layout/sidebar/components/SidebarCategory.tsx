import React from 'react';
import { CategoryProps } from '../types/sidebar.types';
import { useSidebarStyles } from '../hooks/useSidebarStyles';
import SidebarItem from './SidebarItem';
import arrowUp from '/assets/arrow-up.svg';

const SidebarCategory: React.FC<CategoryProps> = ({
  item,
  isOpen,
  onToggle,
  children,
  level = 0
}) => {
  const { getCategoryClass, getIconClass, getImageClass, getTextClass } = useSidebarStyles();
  const IconComponent = typeof item.icon !== 'string' ? item.icon : null;

  return (
    <div className="space-y-2">
      <button
        onClick={onToggle}
        className={getCategoryClass(isOpen)}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Cerrar' : 'Abrir'} ${item.title}`}
      >
        {IconComponent ? (
          <IconComponent className={`w-5 h-5 ${getIconClass(isOpen)}`} />
        ) : (
          <img
            src={item.icon as string}
            alt=""
            className={`w-5 h-5 ${getImageClass(isOpen)}`}
          />
        )}
        <span className={getTextClass(isOpen, level)}>
          {item.title}
        </span>
        <img
          src={arrowUp}
          alt=""
          className={`w-5 h-5 ml-auto transition-all duration-300 dark:invert ${
            isOpen ? 'rotate-180 scale-110' : 'hover:scale-110'
          }`}
        />
      </button>
      
      {isOpen && (
        <div className="ml-4 space-y-2 overflow-hidden">
          <div className="pl-2 border-l-2 border-gray-200 dark:border-gray-600 space-y-1">
            {item.children?.map((child) => (
              <div key={child.id} className="pl-2">
                {child.type === 'category' ? (
                  <SidebarCategory
                    item={child}
                    isOpen={false} // Nested categories start closed
                    onToggle={() => {}} // Handle nested toggle if needed
                    level={level + 1}
                  />
                ) : (
                  <SidebarItem item={child} level={level + 1} />
                )}
              </div>
            ))}
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarCategory;