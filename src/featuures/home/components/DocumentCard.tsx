import React from "react";
import { FileText, ExternalLink } from "lucide-react";
import Button from "@/components/common/Ui/Button";

interface DocumentCardProps {
  onOpen: () => void;
  title: string;
  subTitle: string;
  description: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ onOpen, title, subTitle, description }) => {
  return (
    <div className="group relative flex items-center gap-4 overflow-hidden p-4 md:p-5 mb-3 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-teal-500/60 dark:hover:bg-gray-800/95">

      <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-200/70 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/30">
        <FileText className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.8} />
      </div>

      <div className="flex-1 min-w-0 pl-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700/80 dark:text-teal-300/80">
          {subTitle}
        </p>
        <h2 className="mt-0.5 text-base md:text-lg font-semibold text-gray-800 truncate dark:text-gray-100">
          {title}
        </h2>
        <p className="mt-0.5 text-xs md:text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={onOpen}
        icon={<ExternalLink className="h-4 w-4" strokeWidth={2} />}
        iconPosition="right"
        className="shrink-0"
      >
        Leer
      </Button>
    </div>
  );
};

export default DocumentCard;
