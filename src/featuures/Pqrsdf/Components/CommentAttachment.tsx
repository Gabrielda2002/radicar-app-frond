import React from "react";
import { IPqrsdfCommentAttachment } from "../models/IPqrsdfComment";
import { Eye, FileText } from "lucide-react";

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface CommentAttachmentProps {
  attachment: IPqrsdfCommentAttachment;
  onOpen: () => void;
}

const CommentAttachment: React.FC<CommentAttachmentProps> = ({
  attachment,
  onOpen,
}) => {

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 mt-2 text-sm bg-gray-100 rounded-md dark:bg-gray-700">
      <FileText className="w-4 h-4 shrink-0 text-gray-500 dark:text-gray-300" />
      <span className="flex-1 min-w-0 truncate" title={attachment.fileName}>
        {attachment.fileName}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {formatFileSize(attachment.fileSize)}
      </span>
      <button
        type="button"
        onClick={() => onOpen()}
        className="flex items-center gap-1 cursor-pointer text-blue-500 hover:text-blue-700 disabled:opacity-50"
        aria-label={`Ver adjunto ${attachment.fileName}`}
      >
        <Eye className="w-4 h-4" />
        Ver
      </button>
    </div>
  );
};

export default CommentAttachment;