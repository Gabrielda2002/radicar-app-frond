import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useDarkMode = () => {
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = Cookies.get("theme");
    return savedTheme ? savedTheme : "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      Cookies.set("theme", newTheme, { expires: 365, secure: true, sameSite: "Lax" });
      return newTheme;
    });
  };

  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Aplicar la clase 'dark' al body (compatible con Tailwind v4)
  useEffect(() => {
    const body = document.body;
    if (theme === "dark") {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [theme]);

  return { theme, toggleTheme };
};

export default useDarkMode;
