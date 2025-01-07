import React from "react";
import { ILugarRadicacion } from "@/models/ILugarRadicado";
import { MapPinIcon } from "@heroicons/react/24/outline";

//img
import Sede01 from "./Images/SEDE-01-cucuta.webp";
import Sede03 from "./Images/SEDE-03-cucuta.webp";
import Sede04 from "./Images/SEDE-04-cucuta.webp";
import Sede05 from "./Images/SEDE-05-cucuta.webp";
import Sede06 from "./Images/SEDE-06-cucuta.webp";
import Sede07 from "./Images/SEDE-07-cucuta.webp";

interface sedesListProps {
  sedes: ILugarRadicacion[] | null;
  onSelect: (sede: ILugarRadicacion) => void;
}

const SedesList: React.FC<sedesListProps> = ({ sedes, onSelect }) => {
  // seleccionar icono por sede
  const getIcon = (name: string) => {
    switch (name) {
      case "Cúcuta/Especialistas":
        return Sede01;
      case "Cúcuta/Call Center":
        return Sede03;
      case "Cúcuta/Calle 15":
        return Sede04;
      case "Cúcuta/Sede Ank":
        return Sede05;
      case "Cúcuta/Calle 14":
        return Sede06;
      case "Cúcuta/Torre Compensar":
        return Sede07;
      default:
        return Sede01;
    }
  };

  return (
    <div className="w-full">
      <h2 className="mb-4 text-3xl font-bold dark:text-white">Sedes</h2>

      <div className="grid grid-cols-2 gap-8">
        {sedes?.map((s) => (
          <div
            key={s.id}
            className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-lg dark:shadow-indigo-500 dark:hover:shadow-indigo-600 dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1"
          >
            {/* Imagen de fondo */}
            <button key={s.id} onClick={() => onSelect(s)}>
              <div className="absolute top-0 left-0 h-full w-72">
                <img
                  src={getIcon(s.name)}
                  alt=""
                  className="absolute top-0 left-0 w-72 -z-0 opacity-30 "
                />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent to-gray-200 dark:to-gray-900"></div>
              </div>
              {/* Contenido principal con z-index positivo */}
              <div className="relative">
                <div className="flex justify-between space-x-8">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-500 rounded-full dark:bg-teal-600">
                      <MapPinIcon className="text-gray-100 dark:text-gray-100 w-9 h-9" />
                    </div>
                    <div>
                      <h1 className="pl-3 text-3xl font-semibold">{s.name}</h1>
                      {/* <span className="ml-3">Leticia</span> */}
                    </div>
                  </div>
                  {/* numero de categorias */}
                  {/* <div className="flex items-center">
                  <button className="flex p-2 text-sm text-white bg-gray-700 rounded-full dark:bg-teal-600">
                    <div className="flex items-center">
                      <h2 title="Click para ver las categorias completas">
                        2 Categorias
                      </h2>
                    </div>
                  </button>
                </div> */}
                </div>
                <div></div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SedesList;
