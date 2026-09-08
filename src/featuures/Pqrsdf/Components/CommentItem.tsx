import InitialAvatar from "@/components/common/Ui/InitialAvatar";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { IPqrsdfComment } from "../models/IPqrsdfComment";
import { Paperclip } from "lucide-react";




interface CommentItemProps {
  comment: IPqrsdfComment;
  onOpenAttachment: (comment: IPqrsdfComment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onOpenAttachment,
}) => {
  const hasAttachment = Boolean(comment.attachment);

  return (
    <article className="flex gap-3 py-3">
      <InitialAvatar name={comment.author} size="md" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {comment.author ?? "Usuario"}
          </span>
        </div>

        <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-200">
          {comment.comment}
        </p>

        {hasAttachment && (
          <button
            type="button"
            onClick={() => onOpenAttachment(comment)}
            aria-label={`Abrir adjunto ${comment.attachment?.fileName}`}
            title={comment.attachment?.fileName}
            className="mt-2 inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <Paperclip className="h-4 w-4 mr-2" /> {comment.attachment?.fileName}
          </button>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          {comment.position && <span>{comment.position}</span>}
          {comment.position && <span aria-hidden="true">·</span>}
          <span>{formatRelativeTime(comment.createdAt)}</span>
        </div>
      </div>
    </article>
  );
};

export default CommentItem;