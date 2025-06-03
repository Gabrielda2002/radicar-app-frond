import React from "react";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import Button from "./Button";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  isSubmitting?: boolean;
  isValid?: boolean;
  className?: string;
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  size = "lg",
  children,
  submitText = "Guardar",
  cancelText = "Cancelar",
  showCancelButton = true,
  isSubmitting = false,
  isValid = true,
  className,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} className={className}>
      <form onSubmit={onSubmit}>
        <ModalHeader title={title} onClose={onClose} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter variant="form">
          {showCancelButton && (
            <Button
              variant="closed"
              onClick={onClose}
              type="button"
              disabled={isSubmitting}
              className="w-30 h-10"
            >
              {cancelText}
            </Button>
          )}
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
            className="w-30 h-10"
          >
            {submitText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
export default FormModal;
