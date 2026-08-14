import { useEffect, useRef } from "react";
import Modal from "@/components/common/Ui/Modal";
import ModalHeader from "@/components/common/Ui/ModalHeader";
import ModalBody from "@/components/common/Ui/ModalBody";
import ModalFooter from "@/components/common/Ui/ModalFooter";
import { useStoreComments } from "@/featuures/Pqrsdf/store/useStoreComments";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

interface ModalCommentsProps {
  isOpen: boolean;
  onClose: () => void;
  pqrsdfId: number;
  filingNumber?: number | null;
}

const ModalComments: React.FC<ModalCommentsProps> = ({
  isOpen,
  onClose,
  pqrsdfId,
  filingNumber,
}) => {
  const { comments, error, isLoading, fetchComments, resetComments } =
    useStoreComments();

  const currentPqrsdfIdRef = useRef<number | null>(null);

  useEffect(() => {
    currentPqrsdfIdRef.current = isOpen ? pqrsdfId : null;

    if (isOpen && pqrsdfId) {
      fetchComments(pqrsdfId);
    }

    return () => {
      resetComments();
    };
  }, [isOpen, pqrsdfId, fetchComments, resetComments]);

  const handleCreated = () => {
    if (currentPqrsdfIdRef.current === pqrsdfId) {
      fetchComments(pqrsdfId);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalHeader
        title={
          filingNumber
            ? `Comentarios — Radicado #${filingNumber}`
            : "Comentarios"
        }
        onClose={onClose}
      />
      <ModalBody
        className="flex flex-col p-4 bg-gray-50 dark:bg-gray-900"
        maxHeight="max-h-[55vh]"
      >
        <CommentList
          key={pqrsdfId}
          comments={comments}
          isLoading={isLoading}
          error={error}
        />
      </ModalBody>
      <ModalFooter className="border-t border-gray-200 dark:border-gray-800">
        <CommentForm
          key={pqrsdfId}
          pqrsdfId={pqrsdfId}
          onCreated={handleCreated}
        />
      </ModalFooter>
    </Modal>
  );
};

export default ModalComments;
