import React from "react";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ModalBody from "./ModalBody";
import Button from "./Button";

interface ModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  funtionClick?: () => void;
  showCancelButton?: boolean;
  isSubmitting?: boolean;
  isValid?: boolean;
  className?: string;
}

const ModalDefault: React.FC<ModalContentProps> = ({
  isOpen,
  onClose,
  title,
  size = "lg",
  children,
  submitText = "Guardar",
  cancelText = "Cancelar",
  showCancelButton = true,
  isSubmitting = false,
  isValid = true,
  className,
  funtionClick = () => {},
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} className={className}>
      <ModalHeader title={title} onClose={onClose} />
      <ModalBody>{children}</ModalBody>
      <ModalFooter variant="form">
        {showCancelButton && (
          <Button
            type="button"
            variant="closed"
            onClick={onClose}
            disabled={isSubmitting}
            className="btn btn-secondary"
          >
            {cancelText}
          </Button>
        )}
        <Button
          type="button"
          variant="primary"
          disabled={isSubmitting || !isValid}
          className="btn btn-primary"
          onClick={funtionClick}
        >
          {submitText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDefault;
