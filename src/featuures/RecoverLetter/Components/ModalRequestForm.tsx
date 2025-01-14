import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/UseBlockScroll";
import { FC } from "react";

interface ModalRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalRequestForm: FC<ModalRequestFormProps> = ({ isOpen, onClose }) => {
  const { showAnimation, closing } = useAnimation(isOpen, onClose);
  useBlockScroll(isOpen);

  if (!showAnimation) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center w-full h-full pt-16 duration-300 bg-black w ransition-opacity bg-opacity-40 backdrop-blur-sm">
      <section
        className={`z-10 w-[600px] h-[600px] bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
          showAnimation && !closing
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-2 pt-4 bg-gray-200 border-b-2 border-black dark:border-white dark:bg-gray-800">
          <h2 className="p-2 text-2xl font-semibold text-color dark:text-gray-200">
            Enviar solicitud
          </h2>
          <button
            className="text-xl text-gray-500 duration-200 rounded-md hover:text-gray-900 dark:text-gray-100 hover:bg-gray-400 w-7 h-7 dark:hover:bg-gray-300 dark:hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        
        
      </section>
    </div>
  );
};
export default ModalRequestForm;
