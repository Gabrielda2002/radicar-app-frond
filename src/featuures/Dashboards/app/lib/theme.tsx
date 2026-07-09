import { type ReactNode } from "react";
import { useTheme as useRadicarTheme } from "@/context/blackWhiteContext";

type Theme = "light" | "dark";
type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

/**
 * El tema (claro/oscuro) lo gobierna radicar (blackWhiteContext), que aplica
 * la clase `.dark`. Este provider es un passthrough para no duplicar/pelear el
 * control del DOM; `useTheme` refleja y delega en el tema global de radicar.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useTheme(): ThemeContextValue {
  const { theme, toggleTheme } = useRadicarTheme();
  const current: Theme = theme === "dark" ? "dark" : "light";
  return {
    theme: current,
    toggle: toggleTheme,
    setTheme: (t: Theme) => {
      if (t !== current) toggleTheme();
    },
  };
}
