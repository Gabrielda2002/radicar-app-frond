import { FormatDate } from "@/utils/FormatDate";
import type {
  IPqrsdfComment,
} from "@/featuures/Pqrsdf/models/IPqrsdfComment";
import { useSecureFileAccess } from "@/featuures/SystemGC/Hooks/useSecureFileAccess";
import CommentAttachment from "./CommentAttachment";
import { MessageSquare } from "lucide-react";

interface CommentListProps {
  comments: IPqrsdfComment[];
  isLoading: boolean;
  error: string | null;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  isLoading,
  error,
}) => {
  const { openSecureFile  } = useSecureFileAccess();

  return (
    <>
      {error && (
        <div className="p-3 mb-3 text-sm text-white bg-red-500 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin dark:border-indigo-600 border-color"></div>
        </div>
      ) : comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400">
          <MessageSquare className="w-10 h-10 mb-2" />
          <p className="text-base font-semibold">Sin comentarios</p>
          <p className="text-sm">Sé el primero en comentar esta solicitud.</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {c.author ?? "Usuario"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {FormatDate(c.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap dark:text-gray-200">
                {c.comment}
              </p>
              {c.attachment && (
                <CommentAttachment
                  attachment={c.attachment}
                  onOpen={() => {
                    openSecureFile(
                      c.attachment!.id.toString(),
                      "VIEW",
                      "pqrsdf",
                    );
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CommentList;
