import React from "react";

interface ProfileFieldProps {
  icon: string | React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  title?: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ icon, label, value, title }) => {
  const IconComponent = typeof icon === 'string' 
    ? () => (
        <img
          src={icon}
          alt={`${label} Icon`}
          className="w-5 h-5 flex-shrink-0 text-gray-600 dark:text-gray-300 dark:filter dark:invert"
        />
      )
    : icon;

  return (
    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300" title={title || label}>
      <IconComponent className="w-5 h-5 flex-shrink-0 text-gray-600 dark:text-gray-300" />
      <div className="flex flex-col min-w-0">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
          {label}
        </span>
        <span className="text-sm font-normal text-gray-800 dark:text-gray-200 truncate">
          {value}
        </span>
      </div>
    </div>
  );
};

export default ProfileField;