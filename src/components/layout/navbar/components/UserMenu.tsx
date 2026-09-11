import React, { useState } from "react";
import { Menu, MenuButton } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import type { UserNavigationItem } from "../types/navigation.types";
import { useAuth } from "@/context/authContext";

interface UserMenuProps {
  items: UserNavigationItem[];
  theme: "light" | "dark";
  avatarUrl: string;
  userIconUrl: string;
  buttonClassName?: string;
  itemsClassName?: string;
}

const itemClasses = (theme: "light" | "dark", withPadding = "ps-2") =>
  `block py-2 ${withPadding} text-sm w-full text-left transition-colors duration-300 ${
    theme === "dark"
      ? "text-gray-200 hover:bg-gray-600 hover:text-white"
      : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
  }`;

export const UserMenu: React.FC<UserMenuProps> = ({
  items,
  theme,
  avatarUrl,
  buttonClassName,
  itemsClassName,
}) => {
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const { user: userLocal } = useAuth();

  const toUpperCamelCase = (str: string) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const userName = userLocal ? toUpperCamelCase(userLocal.name) : "";
  const userRol = userLocal ? userLocal.rol : "";

  const toggleSubmenu = (index: number) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  // Estándar de navbar: mismo patrón que ThemeToggle — colores resueltos por
  // el prop `theme`, sin depender de la variante `dark:` de Tailwind (evita
  // que quede el borde claro por defecto cuando `dark:` no se activa).
  const baseButtonClasses =
    "flex items-center gap-2 rounded-xl border p-2 transition-all duration-200 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0";

  const themeButtonClasses =
    theme === "dark"
      ? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-[#008d93]"
      : "bg-[#f7fdfd] border-[#d8eeee] text-gray-600 hover:bg-[#effbfb] hover:border-[#b7e4e5] hover:text-[#008d93]";

  const defaultButtonClassName = `${baseButtonClasses} ${themeButtonClasses}`;

  const renderSubItem = (subItem: NonNullable<UserNavigationItem["submenu"]>[number]) => {
    const classes = itemClasses(theme, "ps-4");
    if (subItem.action) {
      return (
        <button onClick={subItem.action} className={classes}>
          {subItem.name}
        </button>
      );
    }
    if (subItem.href?.startsWith("http")) {
      return (
        <a href={subItem.href} className={classes}>
          {subItem.name}
        </a>
      );
    }
    return (
      <NavLink to={subItem.href ?? "/"} className={classes}>
        {subItem.name}
      </NavLink>
    );
  };

  const renderMenuItem = (item: UserNavigationItem, index: number) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    if (hasSubmenu) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleSubmenu(index)}
            className={`flex justify-between items-center py-2 ps-2 pe-2 text-sm w-full text-left transition-colors duration-300 ${
              theme === "dark"
                ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
            }`}
          >
            <span>{item.name}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                openSubmenuIndex === index ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {openSubmenuIndex === index && (
            <div className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-50"} pl-4`}>
              {item.submenu?.map((subItem, subIndex) => (
                <Menu.Item key={`${item.name}-${subIndex}`}>
                  {renderSubItem(subItem)}
                </Menu.Item>
              ))}
            </div>
          )}
        </div>
      );
    }

    const classes = itemClasses(theme);
    return (
      <Menu.Item key={item.name}>
        {item.action ? (
          <button onClick={item.action} className={classes}>
            {item.name}
          </button>
        ) : item.href?.startsWith("http") ? (
          <a href={item.href} className={classes}>
            {item.name}
          </a>
        ) : (
          <NavLink to={item.href ?? "/"} className={classes}>
            {item.name}
          </NavLink>
        )}
      </Menu.Item>
    );
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className={buttonClassName ?? defaultButtonClassName} aria-label="Menú de usuario">
        <div className="text-right">
          <p className="text-sm font-medium leading-tight">{userName}</p>
          <p className="text-xs text-gray-400 leading-tight">{userRol}</p>
        </div>
        <img alt="Profile" src={avatarUrl} className="object-cover w-8 h-8 rounded-full" />
      </MenuButton>

      <Menu.Items
        transition
        className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
          itemsClassName ?? ""
        }`}
      >
        {items.map((item, index) => renderMenuItem(item, index))}
      </Menu.Items>
    </Menu>
  );
};

export default UserMenu;