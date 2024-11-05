//*Fuctions and Hooks
import { useState } from "react";
import { NavLink } from "react-router-dom";
import DeviceCard from "../../../../DevicesCard";
import ModalSection from "../../../../ModalSection";

//*Icons
import { SignalIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";

//*Images
import COMPUTO from "/src/components/pages/SistemaDeInventario/Images/COMPUTOS.jpg";
import TELECO from "/src/components/pages/SistemaDeInventario/Images/TELECOMUNICACIONES.webp";

const sede03 = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category === activeCategory ? null : category); // Alternar la categoría activa
  };

  return (
    <>
      <ModalSection
        title="Sede Cúcuta - Sede 03"
        breadcrumb={[
          { label: "Inicio", path: "/inicio" },
          { label: "/ Sistema De Inventario", path: "/SistemaDeInventario" },
          { label: "/ Cúcuta", path: "/SistemaDeInventario/Cucuta" },
          { label: "/ Sede 03", path: "" },
        ]}
      />
      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* Barra de Busqueda */}
        <div className="relative mb-3">
          <label>
            <span className="text-xl dark:text-white">Buscar Item:</span>
          </label>
          <section className="flex items-center mt-4">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full p-2 pl-10 border-2 border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
          </section>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Secciones de contenedores */}

          <NavLink to="/SistemaDeInventario/Cucuta/Sede03/computadores">
            <DeviceCard
              title="Computadores"
              description="Contenido de la Sección"
              image={COMPUTO}
              icon={<ComputerDesktopIcon className="w-8 h-8 text-gray-200" />}
              onClick={() => handleCategoryClick("computo")}
            />
          </NavLink>

          <NavLink to="/SistemaDeInventario/Cucuta/Sede03/Perifericos">
            <DeviceCard
              title="Telecomunicaciones"
              description="Contenido de la sección"
              image={TELECO}
              icon={<SignalIcon className="w-8 h-8 text-gray-200" />}
              onClick={() => handleCategoryClick("telecomunicaciones")}
            />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default sede03;
