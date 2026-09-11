import React from "react";

import Button from "@/components/common/Ui/Button";

import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const BOX_SIZES: Record<string, string> = {
  xs: "w-9 h-9",
  sm: "w-9 h-9",
  md: "w-10 h-10",
  lg: "w-11 h-11",
  xl: "w-12 h-12",
};

const ICON_SIZES: Record<string, string> = {
  xs: "w-4 h-4",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  size = "md",
  className = "",
}) => {
  const baseBtn =
    "rounded-xl border outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 transition-all duration-200 flex items-center justify-center";

  const boxClasses = BOX_SIZES[size] ?? BOX_SIZES.md;
  const iconClasses = ICON_SIZES[size] ?? ICON_SIZES.md;

  const containerClasses =
    theme === "dark"
      ? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-[#008d93]"
      : "bg-[#f7fdfd] border-[#d8eeee] text-gray-600 hover:bg-[#effbfb] hover:border-[#b7e4e5] hover:text-[#008d93]";

  return (
    <Button
      variant="any"
      onClick={onToggle}
      aria-label="Toggle theme"
      title="Modo Oscuro / Claro"
      className={`${baseBtn} ${boxClasses} ${containerClasses} ${className}`}
      size={size}
    >
      {theme === "light" ? (
        <Sun className={iconClasses} />
      ) : (
        <Moon className={iconClasses} />
      )}
    </Button>
  );
};

export default ThemeToggle;
