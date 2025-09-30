import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarItemProps } from '../types/sidebar.types';
import { useSidebarStyles } from '../hooks/useSidebarStyles';

const SidebarItem: React.FC<SidebarItemProps> = ({ item, level = 0 }) => {
  const { getLinkClass, getIconClass, getImageClass, getTextClass } = useSidebarStyles();
  const IconComponent = typeof item.icon !== 'string' ? item.icon : null;

  const handleAction = () => {
    if (typeof item.action === 'function') {
      item.action();
    }
  };

  const content = (isActive: boolean = false) => (
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
      <span className={getTextClass(isActive, level)}>
        {item.title}
      </span>
    </>
  );

  if (item.path) {
    return (
      <NavLink to={item.path}>
        {({ isActive }) => (
          <div className={getLinkClass(item.path!)}>
            {content(isActive)}
          </div>
        )}
      </NavLink>
    );
  }

  if (item.action) {
    return (
      <button
        onClick={handleAction}
        className={getLinkClass('')}
      >
        {content()}
      </button>
    );
  }

  return (
    <div className={getLinkClass('')}>
      {content()}
    </div>
  );
};

export default SidebarItem;