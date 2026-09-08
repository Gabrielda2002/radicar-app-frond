import React from "react";

type InitialAvatarSize = "sm" | "md" | "lg";

interface InitialAvatarProps {
  name?: string | null;
  size?: InitialAvatarSize;
  className?: string;
}

const sizeClasses: Record<InitialAvatarSize, string> = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
};

export const getInitial = (name?: string | null): string => {
  if (!name) return "?";

  const normalized = name.trim();
  if (!normalized) return "?";

  return normalized.charAt(0).toUpperCase();
};

export const InitialAvatar: React.FC<InitialAvatarProps> = ({
  name,
  size = "md",
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-100 ${sizeClasses[size]} ${className}`}
    >
      {getInitial(name)}
    </div>
  );
};

export default InitialAvatar;
