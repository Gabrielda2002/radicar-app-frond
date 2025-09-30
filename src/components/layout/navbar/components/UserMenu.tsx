import React from "react";
import { Menu, MenuButton } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import type { UserNavigationItem } from "../types/navigation.types";

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
  userIconUrl,
  buttonClassName =
    "flex items-center px-3 py-1 text-base bg-gray-200 rounded hover:bg-gray-700 focus:outline-none dark:bg-color dark:hover:bg-teal-600 hover:text-white transition duration-300 group",
  itemsClassName,
}) => {
  return (
    <Menu as="div" className="relative" title="Perfil">
      <MenuButton className={buttonClassName} aria-label="Menú de usuario">
        <img
          alt="Profile"
          src={avatarUrl}
          className="object-cover w-8 h-8 rounded-full dark:border-white"
        />
        <img
          src={userIconUrl}
          alt="User Logo"
          className="w-8 h-8 text-white group-hover:invert dark:invert"
        />
      </MenuButton>
      <Menu.Items
        transition
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${itemsClassName ?? ""}`}
      >
        {items.map((item) => (
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
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default UserMenu;
