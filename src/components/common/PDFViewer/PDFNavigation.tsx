import clsx from "clsx";
import {
  VscChevronRight,
  VscChevronLeft,
  VscZoomIn,
  VscZoomOut,
} from "react-icons/vsc";

type PDFNavigationProps = {
  pageNumber: number;
  numPages: number;
  scale: number;
  onPrev: () => void;
  onNext: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

export default function PDFNavigation({
  pageNumber,
  numPages,
  scale,
  onPrev,
  onNext,
  onZoomIn,
  onZoomOut,
}: PDFNavigationProps) {
  return (
    <div className="flex justify-center">
      <div
        className={clsx(
          "inline-flex rounded shadow justify-center border border-slate-300",
          "bg-white",
          "divide-x divide-x-slate-100"
        )}
      >
        {/* flecha izquierda */}
        <button
          disabled={pageNumber <= 1}
          onClick={onPrev}
          type="button"
          className="relative inline-flex items-center rounded-l px-2 py-2 text-slate-500 ring-0 ring-inset ring-slate-700 hover:bg-slate-50 enabled:hover:text-slate-900 transition-all focus:z-10 disabled:opacity-70 pointer-events-auto dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-800"
        >
          <VscChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* zoom alejar */}
        <button
          disabled={scale <= 0.25}
          onClick={onZoomOut}
          type="button"
          className="relative inline-flex items-center px-2 py-2 text-slate-500 ring-0 ring-inset ring-slate-700 hover:bg-slate-50 enabled:hover:text-slate-900 transition-all focus:z-10 pointer-events-auto disabled:opacity-70 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
        >
          <VscZoomOut className="h-5 w-5" aria-hidden="true" />
        </button>

        <span className="relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-slate-700 ring-0 ring-inset ring-slate-700 bg-slate-50 min-w-20 pointer-events-auto dark:bg-gray-700 dark:text-gray-200">
          {numPages > 0 ? pageNumber : "-"} / {numPages > 0 ? numPages : "-"}
        </span>

        {/* zoom acercar */}
        <button
          disabled={scale >= 5}
          onClick={onZoomIn}
          type="button"
          className="relative inline-flex items-center px-2 py-2 text-slate-500 ring-0 ring-inset ring-slate-700 hover:bg-slate-50 enabled:hover:text-slate-900 transition-all focus:z-10 pointer-events-auto disabled:opacity-70 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
        >
          <VscZoomIn className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* flecha a la derecha */}
        <button
          disabled={pageNumber >= numPages || numPages === 0}
          onClick={onNext}
          type="button"
          className="relative inline-flex items-center rounded-r px-2 py-2 text-slate-500 ring-0 ring-inset ring-slate-700 hover:bg-slate-50 enabled:hover:text-slate-900 transition-all focus:z-10 disabled:opacity-70 pointer-events-auto dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
        >
          <VscChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
