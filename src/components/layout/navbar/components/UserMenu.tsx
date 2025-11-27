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

export const UserMenu: React.FC<UserMenuProps> = ({
  items,
  theme,
  avatarUrl,
  // userIconUrl,
  buttonClassName = "flex items-center px-3 py-1 text-base bg-gray-200 rounded hover:bg-gray-700 focus:outline-none dark:bg-color dark:hover:bg-teal-600 hover:text-white transition duration-300 group",
  itemsClassName,
}) => {
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

  const toUpperCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const { user: userLocal } = useAuth();

  const userName = userLocal ? toUpperCamelCase(userLocal.name) : "";

  const userRol = userLocal ? userLocal.rol : "";
  console.log(userRol);

  const toggleSubmenu = (index: number) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  const renderMenuItem = (item: UserNavigationItem, index: number) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    if (hasSubmenu) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleSubmenu(index)}
            className={`flex justify-between items-center py-2 ps-2 pe-2 text-sm w-full text-left ${
              theme === "dark"
                ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
            } transition-colors duration-300`}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {openSubmenuIndex === index && (
            <div
              className={`${
                theme === "dark" ? "bg-gray-700" : "bg-gray-50"
              } pl-4`}
            >
              {item.submenu?.map((subItem, subIndex) => (
                <Menu.Item key={`${item.name}-${subIndex}`}>
                  {subItem.action ? (
                    <button
                      onClick={subItem.action}
                      className={`block py-2 ps-4 text-sm w-full text-left ${
                        theme === "dark"
                          ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                          : "text-gray-700 hover:bg-blue-200 hover:text-gray-900"
                      } transition-colors duration-300`}
                    >
                      {subItem.name}
                    </button>
                  ) : subItem.href?.startsWith("http") ? (
                    <a
                      href={subItem.href}
                      className={`block py-2 text-sm ps-4 ${
                        theme === "dark"
                          ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                          : "text-gray-700 hover:bg-blue-200 hover:text-gray-900"
                      } transition-colors duration-300`}
                    >
                      {subItem.name}
                    </a>
                  ) : (
                    <NavLink
                      to={subItem.href ?? "/"}
                      className={`block py-2 text-sm ps-4 ${
                        theme === "dark"
                          ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                          : "text-gray-700 hover:bg-blue-200 hover:text-gray-900"
                      } transition-colors duration-300`}
                    >
                      {subItem.name}
                    </NavLink>
                  )}
                </Menu.Item>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Menu.Item key={item.name}>
        {item.action ? (
          <button
            onClick={item.action}
            className={`block py-2 ps-2 text-sm w-full text-left ${
              theme === "dark"
                ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
            } transition-colors duration-300`}
          >
            {item.name}
          </button>
        ) : item.href?.startsWith("http") ? (
          <a
            href={item.href}
            className={`block py-2 text-sm ps-2 ${
              theme === "dark"
                ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
            } transition-colors duration-300`}
          >
            {item.name}
          </a>
        ) : (
          <NavLink
            to={item.href ?? "/"}
            className={`block py-2 text-sm ps-2 ${
              theme === "dark"
                ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
            } transition-colors duration-300`}
          >
            {item.name}
          </NavLink>
        )}
      </Menu.Item>
    );
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className={buttonClassName} aria-label="Menú de usuario">
        <div>
          <p className="text-lg mr-2 dark:text-white">{userName}</p>
          <p className="text-sm mr-2 text-gray-400">{userRol}</p>
        </div>
        <img
          alt="Profile"
          src={avatarUrl}
          className="object-cover w-8 h-8 rounded-full dark:border-white"
        />
      </MenuButton>
      <Menu.Items
        transition
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
          itemsClassName ?? ""
        }`}
      >
        {items.map((item, index) => renderMenuItem(item, index))}
      </Menu.Items>
    </Menu>
  );
};

export default UserMenu;
