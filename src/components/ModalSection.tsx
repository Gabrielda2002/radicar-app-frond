import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner"; // Asegúrate de importar tu componente de spinner
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

interface ModuleSectionProps {
  title: string;
  breadcrumb: { label: string; path: string }[];
  duration?: number; // Duración opcional para el spinner
}

const ModalSection: React.FC<ModuleSectionProps> = ({
  title,
  breadcrumb,
  duration = 500, // Valor por defecto
}) => {
  return (
    <section className="p-4 mb-6 bg-white rounded-md shadow-lg dark:bg-gray-800 shadow-indigo-500/40">
      <LoadingSpinner duration={duration} />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="">
            <button
              title="Regresa a la página anterior"
              onClick={() => window.history.back()}
              className="flex items-center p-2 text-gray-600 duration-300 bg-gray-200 border-2 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <ArrowUturnLeftIcon className="w-6 h-6" />
            </button>
          </div>

          <h1 className="pl-3 text-4xl font-bold text-color dark:text-gray-200">
            {title}
          </h1>
        </div>
        <ol className="flex items-center space-x-2">
          {breadcrumb.map((item, index) => (
            <Link key={index} to={item.path}>
              <li className="text-slate-400 hover:underline">{item.label}</li>
            </Link>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ModalSection;
