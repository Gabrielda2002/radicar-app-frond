import React from "react";

import Button from "@/components/common/Ui/Button";

import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  size = "md",
  className = "",
}) => {
  const baseBtn =
    "rounded-xl p-2.5 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 transition-all duration-200 flex items-center justify-center";

  const sizeClasses =
    size === "sm" || size === "xs" ? "w-6 h-6" : "w-7 h-7";

    const containerClasses =
     theme === "dark"
      ? "text-[#008d93] hover:bg-[#283547]"
      : "text-[#008d93] bg-transparent hover:bg-[#dff5f5]";

  return (
    <Button
      variant="any"
      onClick={onToggle}
      aria-label="Toggle theme"
      title="Modo Oscuro / Claro"
      className={`${baseBtn} ${containerClasses} ${className}`}
      size={size}
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