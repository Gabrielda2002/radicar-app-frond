import React from "react";
import { IDepartamentos } from "../../../models/IDepartamentos";
import { MapPinIcon } from "@heroicons/react/24/outline";

// imgs
import Cucuta from "./Images/DEPART-cucuta.jpg";
import Cundinamarca from "./Images/DEPART-cundinamarca.jpg";
import Leticia from "./Images/DEPART-leticia.jpg";

interface DepartamentosListProps {
  departamentos: IDepartamentos[] | null;
  onSelected: (departamentos: IDepartamentos) => void;
}

const DepartamentosList: React.FC<DepartamentosListProps> = ({
  departamentos,
  onSelected,
}) => {
  // imagen segun el departamento
  const getIcon = (name: string) => {
    switch (name) {
      case "Norte de Santander":
        return Cucuta;
      case "Cundinamarca":
        return Cundinamarca;
      case "Amazonas":
        return Leticia;
      default:
        return Cucuta;
    }
  };

  return (
    <>
      {departamentos?.map((d) => (
        <div
          key={d.id}
          className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1"
        >
          <button key={d.id} onClick={() => onSelected(d)}>
            <div className="absolute top-0 left-0 w-56 h-full">
              {/* Imagen de fondo */}
              <img
                src={getIcon(d.name)}
                alt=""
                className="absolute top-0 left-0 w-56 -z-0 opacity-30"
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
                    <h1 className="pl-3 text-3xl font-semibold">{d.name}</h1>
                  </div>
                </div>

                {/* Numero de sedes */}
                {/* <div className="flex items-center">
                  <button className="flex p-2 text-sm text-white bg-gray-700 rounded-full dark:bg-teal-600">
                    <div className="flex items-center">
                      <h2 title="Click para ver las categorias completas">
                        6 Sedes
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
    </>
  );
};

export default DepartamentosList;
