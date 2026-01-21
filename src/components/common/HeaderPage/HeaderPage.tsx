import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { ArrowUturnLeftIcon, ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";

interface ModuleSectionProps {
  title: string;
  breadcrumb: { label: string; path: string }[];
  duration?: number;
}

const HeaderPage: React.FC<ModuleSectionProps> = ({
  title,
  breadcrumb,
  duration = 500,
}) => {
  const location = useLocation();

  // Generar breadcrumb automático basado en la URL actual
  const autoBreadcrumb = useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean);
    const autoItems = [{ label: 'Inicio', path: '/' }];
    
    let accumulatedPath = '';
    paths.forEach((path, index) => {
      accumulatedPath += `/${path}`;
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      if (index < paths.length - 1) {
        autoItems.push({ label, path: accumulatedPath });
      }
    })
    
    return autoItems;
  }, [location.pathname]);

  // Usar breadcrumb proporcionado o el automático
  const displayBreadcrumb = breadcrumb.length > 0 ? breadcrumb : autoBreadcrumb;

  return (
    <section className="w-full p-5 mb-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 shadow-indigo-500/40 transition-all duration-300">
      <LoadingSpinner duration={duration} />
      
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Sección del título con botón de retroceso */}
        <div className="flex items-center gap-3">
          <button
            title="Regresar a la página anterior"
            onClick={() => window.history.back()}
            className="group flex items-center justify-center p-2.5 text-gray-600 bg-gray-100 border-2 border-gray-200 rounded-lg 
                     hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 
                     dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 
                     dark:hover:bg-gray-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400
                     transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <ArrowUturnLeftIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl text-color dark:text-gray-100 transition-colors duration-300">
              {title}
            </h1>
            {/* Línea decorativa debajo del título */}
            <div className="h-1 mt-1 bg-linear-to-r from-indigo-500 to-transparent rounded-full w-20 dark:from-indigo-400"></div>
          </div>
        </div>

        {/* Breadcrumb mejorado */}
        <nav className="flex items-center" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 flex-wrap">
            {displayBreadcrumb.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                )}
                <Link
                  to={item.path}
                  className="group flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 
                           dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 
                           rounded-md hover:bg-gray-100 dark:hover:bg-gray-700
                           transition-all duration-200 ease-in-out"
                >
                  {index === 0 && (
                    <HomeIcon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                  )}
                  <span className="transition-all duration-200 group-hover:translate-x-0.5">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default HeaderPage;
