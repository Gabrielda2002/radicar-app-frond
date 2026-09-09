import React from "react";
import { FileText, ExternalLink, AlertTriangle } from "lucide-react";
import Button from "@/components/common/Ui/Button";
import { DocumentCategory } from "../utils/homeConfig";

interface DocumentCardProps {
  onOpen: () => void;
  code?: string;
  title: string;
  subTitle: string;
  description: string;
  category?: DocumentCategory;
  badgeClassName?: string;
  meta?: string;
  confidential?: boolean;
}

const CATEGORY_DEFAULT_BADGE: Record<DocumentCategory, string> = {
  juridico: "bg-teal-50 text-teal-700 border-teal-200",
  "talento-humano": "bg-purple-50 text-purple-800 border-purple-200",
  "sst-calidad": "bg-sky-50 text-sky-800 border-sky-200",
};

const DocumentCard: React.FC<DocumentCardProps> = ({
  onOpen,
  title,
  subTitle,
  description,
  category,
  badgeClassName,
  meta,
  confidential,
}) => {
  const resolvedBadgeClass =
    badgeClassName || (category ? CATEGORY_DEFAULT_BADGE[category] : "bg-teal-50 text-teal-700 border-teal-200");

  return (
    <article className="group relative flex flex-col sm:flex-row sm:items-center items-start justify-between gap-4 overflow-hidden p-4 md:p-5 mb-3 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-teal-500/60 dark:hover:bg-gray-800/95">
      <div className="flex items-start gap-4 min-w-0">
        <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-200/70 transition-all group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/30">
          <FileText className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex-1 pl-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${resolvedBadgeClass}`}
            >
              {subTitle}
            </span>
            {meta && <span className="text-xs text-gray-400 dark:text-gray-500">• {meta}</span>}
            {confidential && (
              <span className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2} />
                Confidencial &amp; Preventivo
              </span>
            )}
          </div>

          <h2 className="mt-0.5 text-base md:text-lg font-semibold text-gray-800 truncate dark:text-gray-100">
            {title}
          </h2>
          <p className="mt-0.5 text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={onOpen}
        icon={<ExternalLink className="h-4 w-4" strokeWidth={2} />}
        iconPosition="right"
        className="shrink-0 self-end sm:self-center"
      >
        Leer
      </Button>
    </article>
  );
};

export default DocumentCard;