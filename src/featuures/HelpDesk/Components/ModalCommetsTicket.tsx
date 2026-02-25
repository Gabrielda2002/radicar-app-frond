import React, { useState } from "react";
import { FormatDate } from "@/utils/FormatDate";
import { MessageSquare } from "lucide-react";
import { useFetchCommentsByTicket } from "../Hooks/useFetchCommentsByTicket";
import Button from "@/components/common/Ui/Button";
import ModalDefault from "@/components/common/Ui/ModalDefault";

interface ModalCommentsTicketProps {
  idTicket: number;
}

const ModalCommetsTicket: React.FC<ModalCommentsTicketProps> = ({
  idTicket,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());

  const CHARACTER_LIMIT = 200;

  // const { dataComments, loadingComments, errorComments } =
  //   useFetchComments(isModalOpen);

  const { dataComments, errorComments, fetchComments } =
    useFetchCommentsByTicket();

  const toggleExpanded = (commentId: number) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };


  return (
    <>
      <Button
        variant="any"
        onClick={() => {
          setIsModalOpen(true);
          fetchComments(idTicket);
        }}
        title="Comentarios"
        icon={<MessageSquare className="w-4 h-4" />}
        className="p-2 duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:opacity-80 dark:bg-gray-500"
      />
      {/* Modal */}

      <ModalDefault
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Comentarios del Ticket"
        size="md"
        footerVariant="default"
      >
        <div className="max-h-[68vh] overflow-y-auto px-4 py-6 bg-gray-50 dark:bg-gray-900">
          {errorComments ? (
            <div className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="w-16 h-16 text-red-300 dark:text-red-600 mb-4" />
              <p className="text-red-500 dark:text-red-400 text-center">
                {errorComments}
              </p>
            </div>
          ) :  (
            <div className="space-y-4">
              {dataComments.map((c, idx) => {
                const initials = `${c.responsable.charAt(0)}${c.lastName.charAt(0)}`.toUpperCase();
                const isLongComment = c.comment.length > CHARACTER_LIMIT;
                const isExpanded = expandedComments.has(c.id);
                const displayComment = isExpanded || !isLongComment 
                  ? c.comment 
                  : `${c.comment.slice(0, CHARACTER_LIMIT)}...`;
                
                return (
                  <div
                    key={c.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                          {initials}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm">
                            {c.responsable} {c.lastName}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            •
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {FormatDate(c.createdAt)}
                          </span>
                        </div>
                        
                        {/* Comment */}
                        <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed wrap-break-word">
                          {displayComment}
                        </div>

                        {/* Ver más/menos button */}
                        {isLongComment && (
                          <button
                            onClick={() => toggleExpanded(c.id)}
                            className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150 focus:outline-none focus:underline"
                          >
                            {isExpanded ? "Ver menos" : "Ver más"}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Timeline connector */}
                    {idx < dataComments.length - 1 && (
                      <div className="ml-5 mt-3 mb-0 h-4 border-l-2 border-gray-200 dark:border-gray-700" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ModalDefault>
    </>
  );
};

export default ModalCommetsTicket;
