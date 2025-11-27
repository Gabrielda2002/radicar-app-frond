import React from "react";
import { ChevronRight } from "lucide-react";

interface MobileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  badge?: number;
  showArrow?: boolean;
  theme?: "light" | "dark";
  className?: string;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  icon,
  label,
  onClick,
  badge,
  showArrow = true,
  theme = "light",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-4 py-3 
        transition-all duration-200 rounded-lg
        ${
          theme === "dark"
            ? "hover:bg-gray-700 active:bg-gray-600 text-white"
            : "hover:bg-gray-100 active:bg-gray-200 text-gray-900"
        }
        ${className}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 text-xl">
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {badge !== undefined && badge > 0 && (
          <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full">
            {badge > 9 ? "9+" : badge}
          </span>
        )}
        {showArrow && (
          <ChevronRight
            className={`w-4 h-4 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          />
        )}
      </div>
    </button>
  );
};

export default MobileMenuItem;
