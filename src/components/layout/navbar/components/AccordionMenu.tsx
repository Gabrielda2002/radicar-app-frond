import React, { useState, useEffect } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { X } from "lucide-react";
import HelpDesk from "@/featuures/HelpDesk/Components/ModalCreateTicket";
import ModalPausasActivas from "./ModalPausasActivas";
import Button from "@/components/common/Ui/Button";

interface AccordionMenuProps {
  theme: string;
  children: React.ReactNode;
}

const AccordionMenu: React.FC<AccordionMenuProps> = ({ theme, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Cerrar menú con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div className="relative z-50">
      <div className="flex gap-2">
      <HelpDesk />
      <Button
        onClick={toggleAccordion}
        aria-label="Abrir menú"
        variant="secondary"
      >
        <TiThMenuOutline className="w-6 h-6" />
      </Button>
      </div>

      {/* Backdrop/Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Contenedor del menú */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] sm:w-[60%] max-w-sm transition-transform duration-300 ease-in-out z-50 overflow-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        } shadow-2xl`}
        style={{ height: "100vh" }}
      >
        {/* Header del menú */}
        <div
          className={`sticky top-0 z-10 flex items-center justify-between p-4 border-b ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-xl font-bold">Menú</h2>
          <button
            onClick={closeMenu}
            aria-label="Cerrar menú"
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark"
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido del menú */}
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default AccordionMenu;
