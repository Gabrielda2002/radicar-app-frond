//*Fuctions
import React from "react";

//*Icons
import { ChevronRightIcon } from "@heroicons/react/16/solid";

interface breadcrumbProps {
  path: { id: string; name: string }[];
  onNavigate: (id: string) => void;
}

const BreadCrumb: React.FC<breadcrumbProps> = ({ path, onNavigate }) => {
  return (
    <>
      <nav className="flex flex-wrap items-center text-gray-600 dark:text-gray-300">
        {path.map((folder, inde) => (
          <div key={folder.id} className="flex items-center">
            <button
              onClick={() => onNavigate(folder.id)}
              className={`text-base font-medium hover:underline ${
                inde === path.length - 1
                  ? "text-gray-800 dark:text-gray-100"
                  : "text-blue-500 dark:text-blue-300"
              }`}
              disabled={inde === path.length - 1}
            >
              {folder.name}
            </button>
            {inde < path.length - 1 && (
              <ChevronRightIcon className="w-4 h-4 mx-2 text-gray-400" />
            )}
          </div>
        ))}
      </nav>
    </>
  );
};

export default BreadCrumb;
