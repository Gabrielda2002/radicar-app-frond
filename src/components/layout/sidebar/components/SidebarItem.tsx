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
  const iconSizeClass = isCollapsed ? 'h-6 w-6 shrink-0' : 'h-5 w-5 shrink-0';

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
        <IconComponent className={`${iconSizeClass} ${getIconClass(isActive)}`} />
      ) : (
        <img
          src={item.icon as string}
          alt=""
          className={`${iconSizeClass} object-contain ${getImageClass(isActive)}`}
        />
      )}
      <span className={`${getTextClass(isActive, isCollapsed)} ${level > 0 ? 'ml-3' : 'ml-3'}`}>
        {item.title}
      </span>
    </>
  );

  if (item.path) {
    return (
      <NavLink to={item.path} aria-current={isActive ? 'page' : undefined}>
        <div className={getLinkClass(item.path, isCollapsed)} title={isCollapsed ? item.title : undefined}>
          {content()}
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
      </button>
    );
  }

  return (
    <div className={getLinkClass('', isCollapsed)} title={isCollapsed ? item.title : undefined}>
      {content()}
    </div>
  );
};

export default SidebarItem;