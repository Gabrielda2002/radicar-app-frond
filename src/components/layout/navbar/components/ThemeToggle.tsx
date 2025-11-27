import React from "react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
  size?: "sm" | "md"; // sm para móvil, md para desktop
  className?: string;
}

import Button from "@/components/common/Ui/Button";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  size = "md",
  className = "",
}) => {
  const baseBtn =
    "p-2 rounded-full focus:outline-none transition-colors duration-300";

  const sizeClasses = size === "sm" ? "w-5 h-5" : "w-6 h-6";

  const containerClasses =
    size === "sm"
      ? theme === "dark"
        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
      : theme === "dark"
      ? "relative p-2 text-gray-200 bg-gray-700 border-2 border-gray-600 rounded-full dark:bg-color dark:hover:bg-teal-600 hover:bg-gray-600 group"
      : "relative p-2 text-gray-800 bg-gray-200 border-2 border-gray-300 rounded-full hover:bg-gray-700 hover:text-white group";
  return (
    <Button
      variant="any"
      onClick={onToggle}
      aria-label="Toggle theme"
      title="Modo Oscuro / Claro"
      className={`${baseBtn} ${containerClasses} ${className}`}
    >
      {theme === "light" ? (
        <Sun className={sizeClasses} />
      ) : (
        <Moon className={sizeClasses} />
      )}
    </Button>
  );
};

export default ThemeToggle;
