import React from "react";
import { Menu, MenuButton } from "@headlessui/react";
import { BookOpen } from "lucide-react";
import Button from "@/components/common/Ui/Button";
import type { SupportLink } from "../types/navigation.types";

interface SupportMenuProps {
  links: SupportLink[];
  theme: "light" | "dark";
  buttonClassName?: string;
  itemsClassName?: string;
}

export const SupportMenu: React.FC<SupportMenuProps> = ({
  links,
  theme,
  buttonClassName,
  itemsClassName,
}) => {
  const isDark = theme === "dark";

  const itemClasses = (active: boolean) =>
    `group flex items-center w-full px-3 py-2 text-sm transition-colors duration-150 ${active
      ? isDark
        ? "bg-gray-700 text-[#008d93]"
        : "bg-[#effbfb] text-[#008d93]"
      : isDark
        ? "text-gray-200"
        : "text-gray-700"
    }`;

  return (
    <Menu as="div" className="relative" title="Soportes">
      <MenuButton
        as={Button}
        variant="secondary"
        className={buttonClassName}
        icon={<BookOpen className="h-4 w-4" />}
      >
        Soportes
      </MenuButton>

      <Menu.Items
        className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-[#e2f1f1]"} rounded-xl border shadow-lg ring-1 ring-black ring-opacity-5 ${itemsClassName ?? ""
          }`}
      >
        <div className="w-full py-2 mt-1">
          {links.map((link) => (
            <Menu.Item key={link.name}>
              {({ active }) => (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={itemClasses(active)}
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