import React from "react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
  size?: "sm" | "md"; // sm para móvil, md para desktop
  className?: string;
}

import sun from "/assets/sun.svg";
import moon from "/assets/moon.svg";
import Button from "@/components/common/Ui/Button";

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
        ? "bg-gray-600 hover:bg-gray-300 text-white"
        : "bg-gray-200 hover:bg-gray-500 text-gray-800"
      : theme === "light"
      ? "relative p-2 text-gray-800 bg-gray-200 border-2 rounded-full dark:border-gray-800 hover:bg-gray-700 dark:bg-color dark:hover:bg-teal-600 dark:text-gray-200 group"
      : "relative p-2 text-gray-800 bg-gray-200 border-2 rounded-full dark:border-gray-800 hover:bg-gray-700 dark:bg-color dark:hover:bg-teal-600 dark:text-gray-200 group";

  return (
    <Button
      variant="any"
      onClick={onToggle}
      aria-label="Toggle theme"
      title="Modo Oscuro / Claro"
      className={`${baseBtn} ${containerClasses} ${className}`}
    >
      {theme === "light" ? (
        <img src={moon} alt="Moon Icon" className={`${sizeClasses} group-hover:invert`} />
      ) : (
        <img src={sun} alt="Sun Icon" className={`${sizeClasses} invert`} />
      )}
    </Button>
  );
};

export default ThemeToggle;
