import React, { useState } from "react";

interface AccordionMenuProps {
  theme: string;
  children: React.ReactNode;
}

const AccordionMenu: React.FC<AccordionMenuProps> = ({
  theme,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-50 ">
      {/* Botón siempre visible en la esquina */}
      <button
        onClick={toggleAccordion}
        className={`relative lg:top-2 right-5 sm:right-2 z-10 p-2 rounded-full shadow-lg transition-all ${
          theme === "dark"
            ? "bg-gray-600 text-white w-7 hover:bg-gray-500"
            : "bg-gray-200 text-gray-800 w-7 hover:bg-gray-300"
        }`}
      >
        {isOpen ? "x" : "+"}
      </button>

      {/* Contenedor del menú */}
      <div
        className={`fixed top-0 right-0 h-full w-[55%] sm:w-[48%] max-w-sm transition-transform duration-300 overflow-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        } shadow-lg`}
        style={{ height: "100vh" }} // Aumentar la altura del contenedor
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Menú</h2>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AccordionMenu;
