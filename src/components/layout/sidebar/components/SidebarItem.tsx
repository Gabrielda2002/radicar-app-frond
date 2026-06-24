import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarItemProps } from '../types/sidebar.types';
import { useSidebarStyles } from '../hooks/useSidebarStyles';

interface ExtendedSidebarItemProps extends SidebarItemProps {
  isCollapsed?: boolean;
}

const SidebarItem: React.FC<ExtendedSidebarItemProps> = ({
  item,
  level = 0,
  onAction,
  isCollapsed = false
}) => {
  const { isActiveRoute, getLinkClass, getIconClass, getImageClass, getTextClass } = useSidebarStyles();
  const IconComponent = typeof item.icon !== 'string' ? item.icon : null;
  const isActive = item.path ? isActiveRoute(item.path) : false;

  const handleAction = () => {
    if (typeof item.action === 'function') {
      item.action();
    } else if (typeof item.action === 'string' && onAction) {
      onAction(item.action);
    }
  };

  const content = () => (
    <>
      {IconComponent ? (
        <IconComponent className={`w-5 h-5 ${getIconClass(isActive)}`} />
      ) : (
        <img
          src={item.icon as string}
          alt=""
          className={`w-5 h-5 ${getImageClass(isActive)}`}
        />
      )}
      <span className={`${getTextClass(isActive, isCollapsed)} ${level > 0 ? 'ml-3' : 'ml-3'}`}>
        {item.title}
      </span>
    </>
  );

  const tooltip = isCollapsed && (
    <span className="absolute left-full top-1/2 z-50 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:block group-hover:opacity-100 dark:bg-gray-700">
      {item.title}
      <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-gray-800 dark:border-r-gray-700" />
    </span>
  );

  if (item.path) {
    return (
      <NavLink to={item.path} aria-current={isActive ? 'page' : undefined}>
        <div className={getLinkClass(item.path, isCollapsed)} title={isCollapsed ? item.title : undefined}>
          {content()}
          {tooltip}
        </div>
      </NavLink>
    );
  }

  if (item.action) {
    return (
      <button
        onClick={handleAction}
        className={getLinkClass('', isCollapsed)}
        title={isCollapsed ? item.title : undefined}
      >
        {content()}
        {tooltip}
      </button>
    );
  }

  return (
    <div className={getLinkClass('', isCollapsed)} title={isCollapsed ? item.title : undefined}>
      {content()}
      {tooltip}
    </div>
  );
};

export default SidebarItem;