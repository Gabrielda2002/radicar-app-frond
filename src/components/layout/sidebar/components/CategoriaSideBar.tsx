import React from "react";

//icons
import arrowUp from "/assets/arrow-up.svg";

interface CategoryProps {
  title: string;
  // Modificamos el tipo para aceptar tanto un componente como una cadena
  icon: React.ComponentType<{ className?: string }> | string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const Category: React.FC<CategoryProps> = ({
  title,
  icon,
  isOpen,
  toggle,
  children,
}) => {
  // Verificamos si el icono es un componente o una cadena
  const IconComponent = typeof icon !== 'string' ? icon : null;
  
  return (  
    <div className="space-y-3">
      <button
        onClick={toggle}
        className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
          isOpen
            ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
            : "text-gray-600 dark:text-gray-200 hover:bg-color hover:text-white"
        } w-full`}
      >
        {IconComponent ? (
          // Renderizamos el componente si icon es un componente
          <IconComponent className={`w-5 h-5 ${
            isOpen ? "text-white" : "group-hover:text-white dark:text-white"
          }`} />
        ) : (
          // Renderizamos la imagen si icon es una cadena
          <img
            src={icon as string}
            alt=""
            className={`w-5 h-5 ${
              isOpen ? "invert" : "group-hover:invert dark:invert"
            }`}
          />
        )}
        <span
          className={`absolute left-8 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
            isOpen ? "text-white dark:text-gray-200" : ""
          }`}
        >
          {title}
        </span>
        <img
          src={arrowUp}
          alt=""
          className={`w-6 h-6 ml-auto transition-transform duration-300 dark:invert ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="mt-2 space-y-3">{children}</div>}
    </div>
  );
};
export default Category;