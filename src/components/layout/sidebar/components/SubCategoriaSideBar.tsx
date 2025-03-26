import React from "react";
import { NavLink } from "react-router-dom";

interface SubCategoryProps {
  to: string;
  icon: React.ComponentType<{ className?: string }> | string;
  title: string;
  isCollapsed: boolean;
}

const SubCategory: React.FC<SubCategoryProps> = ({
  to,
  icon,
  title,
  isCollapsed,
}) => {

  const IconComponent = typeof icon !== 'string' ? icon : null;

  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group mb-2 ${
            isActive
              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
          }`}
        >
          {IconComponent ? (
            <IconComponent
              className={`w-5 h-5 mx-2 ${
                isActive ? "text-white" : "group-hover:text-white dark:text-white"
              }`}
            />
          ) : (
            <img
              src={icon as string}
              alt=""
              className={`w-5 h-5 mx-2 ${
                isActive ? "invert" : "group-hover:invert dark:invert"
              }`}
            />
          )}
          {!isCollapsed && (
            <span
              className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                isActive ? "text-white dark:text-gray-200" : ""
              }`}
            >
              {title}
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
};

export default SubCategory;
