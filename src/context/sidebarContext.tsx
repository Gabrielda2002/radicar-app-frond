import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextProps {
  isCollapsed: boolean;
  toggleSideBar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar debe ser usado dentro de un SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const toggleSideBar = () => {
    if (isToggling) return;
    setIsToggling(true);

    setTimeout(() => {
      setIsToggling(false);
    }, 200); // Simulate a slow transition effect
    setIsCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSideBar }}>
      {children}
    </SidebarContext.Provider>
  );
};
