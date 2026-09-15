import React from "react";
import Button from "@/components/common/Ui/Button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}


export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
}) => {
  return (
    <Button
      variant="secondary"
      onClick={onToggle}
      aria-label="Toggle theme"
      title="Modo Oscuro / Claro"
      size={"xs"}
    >
      {theme === "light" ? (
        <Sun className="w-6 h-6 md:w-7 md:h-7" />
      ) : (
        <Moon className="w-6 h-6 md:w-7 md:h-7" />
      )}
    </Button>
  );
};

export default ThemeToggle;
