import React from "react";
import { Menu, MenuButton } from "@headlessui/react";
import type { SupportLink } from "../types/navigation.types";

interface SupportMenuProps {
  links: SupportLink[];
  theme: "light" | "dark";
  buttonClassName?: string; // permite pasar estilos distintos segun contexto
  itemsClassName?: string; // para posicionamiento (absolute en desktop, estático en móvil)
}

export const SupportMenu: React.FC<SupportMenuProps> = ({
  links,
  theme,
  buttonClassName = "p-2 text-base bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:bg-teal-600 dark:bg-color transition duration-300",
  itemsClassName,
}) => {
  return (
    <Menu as="div" className="relative" title="Soportes">
      <MenuButton className={buttonClassName}>Soportes</MenuButton>

      <Menu.Items
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
          itemsClassName ?? ""
        }`}
      >
        <div className="flex-grow w-full py-2 mt-1">
          {links.map((link) => (
            <Menu.Item key={link.name}>
              {({ active }) => (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    active
                      ? "bg-blue-100 text-gray-900 dark:text-white dark:bg-gray-600"
                      : "text-gray-700 dark:text-gray-200"
                  } group flex items-center w-full px-2 py-2 text-sm`}
                >
                  {link.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default SupportMenu;
