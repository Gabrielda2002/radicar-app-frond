import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { ArrowLeft, Circle, House } from "lucide-react";

interface ModuleSectionProps {
  title: string;
  breadcrumb: { label: string; path: string }[];
  duration?: number;
  description?: string;
}

const HeaderPage: React.FC<ModuleSectionProps> = ({
  title,
  breadcrumb,
  duration = 500,
  description
}) => {
  return (
    <header className="relative mb-8 w-full">
      <LoadingSpinner duration={duration} />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            title="Regresar"
            aria-label="Regresar a la página anterior"
            onClick={() => window.history.back()}
            className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e8ebf3] bg-white text-[#253957] shadow-sm transition hover:bg-[#eef2ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-7 w-7" aria-hidden="true" />
          </button>

          <div className="min-w-0">
            <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.04em] text-gray-950 dark:text-gray-300 sm:text-[45px]">
              {title}
            </h1>
            <div className="mt-1 h-[3px] w-[135px] rounded-full bg-gradient-to-r from-teal-600 to-violet-500" />
            {description && (
              <p className="mt-2 max-w-xl text-sm font-medium leading-5 text-[#34466a] dark:text-gray-300">
                {description}
              </p>
            )}
          </div>
        </div>

        <nav aria-label="Ruta de navegación" className="flex w-full items-center justify-end gap-2 text-sm font-medium text-[#34466a] dark:text-gray-300 lg:w-auto lg:pt-3">
          {breadcrumb.map((item, index) => {
            const label = item.label.replace(/^\/+\s*/, "");
            const isCurrent = index === breadcrumb.length - 1 && !item.path;

            return (
              <React.Fragment key={`${item.path}-${item.label}`}>
                {index > 0 && <span aria-hidden="true" className="text-slate-400">/</span>}
                {isCurrent ? (
                  <span aria-current="page" className="inline-flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
                    <Circle className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                    {label}
                  </span>
                ) : item.path ? (
                  <Link to={item.path} className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400">
                    {index === 0 && <House className="h-4 w-4" aria-hidden="true" />}
                    {label}
                  </Link>
                ) : (
                  <span>{label}</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default HeaderPage;
