// DeviceCard.tsx
import React from "react";

interface DeviceCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  title,
  description,
  image,
  icon,
  onClick,
}) => {
  return (
    <div
      className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg shadow-sm cursor-pointer dark:shadow-indigo-500 dark:hover:shadow-indigo-600 hover:shadow-lg dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 h-full w-72">
        <img
          src={image}
          alt={title}
          className="absolute top-0 left-0 w-72 -z-0 opacity-30"
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent to-gray-200 dark:to-gray-900"></div>
      </div>
      <div className="relative">
        <div className="flex justify-between space-x-8">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-500 rounded-full dark:bg-teal-600">
              {icon}
            </div>
            <div>
              <h1 className="pl-3 text-2xl font-semibold">{title}</h1>
              <span className="ml-3 text-sm">{description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
