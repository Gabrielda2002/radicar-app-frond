import React, { useState } from "react";
import clsx from "clsx";
import Button from "./Button";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: "default" | "pills" | "underline";
  fullWidth?: boolean;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  variant = "default",
  fullWidth = false,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const getTabButtonVariant = (isActive: boolean) => {
    if (variant === "pills") {
      return isActive ? "primary" : "secondary";
    }
    return "any";
  };

  const getTabButtonClasses = (isActive: boolean) => {
    const baseClasses = "transition-all duration-200 font-medium";

    if (variant === "underline") {
      return clsx(
        baseClasses,
        "border-b-2 rounded-none px-4 py-2",
        isActive
          ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-300"
      );
    }

    if (variant === "pills") {
      return clsx(baseClasses, "rounded-full");
    }

    return clsx(
      baseClasses,
      "border-2 rounded-t-md border-b-0",
      isActive
        ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400"
        : "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
    );
  };

  return (
    <div className={clsx("w-full", className)}>
      {/* Tab Headers */}
      <div
        className={clsx(
          "flex gap-1",
          variant === "underline" && "border-b border-gray-200 dark:border-gray-700",
          fullWidth && "w-full"
        )}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant={getTabButtonVariant(isActive)}
              className={clsx(
                getTabButtonClasses(isActive),
                fullWidth && "flex-1"
              )}
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
              disabled={tab.disabled}
              icon={tab.icon}
              iconPosition="left"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
            >
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div
        className={clsx(
          "mt-4",
          variant === "default" && "border-2 border-gray-300 dark:border-gray-600 rounded-b-md rounded-tr-md p-4 bg-white dark:bg-gray-800"
        )}
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={activeTab}
      >
        {activeTabContent}
      </div>
    </div>
  );
};

export default Tabs;
