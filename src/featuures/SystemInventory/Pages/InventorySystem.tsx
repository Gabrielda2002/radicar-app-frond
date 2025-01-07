//*Fuctions and Hooks
import ItemsList from "../Components/ItemsList";
import SedesList from "../Components/sedesList";
import React, { useState } from "react";
import DeviceCard from "@/components/common/DevicesCard/DevicesCard";
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import DepartamentosList from "../Components/DepartamentosList";
import useFetchSedes from "../Hooks/useFetchSedes";
import useFetchItems from "../Hooks/useFetchItems";
import { useFetchDepartment } from "../Hooks/UseFetchDeparment";

//*Icons and Images
import COMPUTO from "/src/components/pages/SistemaDeInventario/Images/COMPUTOS.jpg";
import TELECO from "/src/components/pages/SistemaDeInventario/Images/TELECOMUNICACIONES.webp";
import {
  ComputerDesktopIcon,
  SignalIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

const SistemaInventario: React.FC = () => {
  const {
    department: departments,
    loading: loadingDepartment,
    errordepartment,
  } = useFetchDepartment();
  // estados para manejar los departamentos y sedes
  const [departmentSelect, setDepartmentSelect] = useState<number | null>(null);
  // traer las sedes
  const { sedes } = useFetchSedes(departmentSelect);
  const [sedeSelect, setSedeSelect] = useState<number | null>(null);

  const [tipoItem, setTipoItem] = useState<
    "equipos" | "dispositivos-red" | null
  >(null);
  // traer los items
  const { items } = useFetchItems(sedeSelect, tipoItem);

  // estado para manejar la pantalla actual
  const [screen, setScreen] = useState<
    "departamentos" | "sedes" | "tipoItem" | "items"
  >("departamentos");

  // funcion ir al componente anterior
  const handleBack = () => {
    if (screen === "items") {
      setScreen("tipoItem");
      setTipoItem(null);
    } else if (screen === "tipoItem") {
      setScreen("sedes");
      setSedeSelect(null);
    } else if (screen === "sedes") {
      setScreen("departamentos");
      setDepartmentSelect(null);
    }
  };
  //*Logica para implementar el sistema de Loading
  const [isLoading, setisLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleFinishLoading = () => {
    setisLoading(false);
    setShowContent(true);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner duration={200} onFinish={handleFinishLoading} />
      ) : (
        <div className={` ${showContent ? "opacity-100" : "opacity-0"}`}>
          <div>
            <ModalSection
              title="Módulo Inventario"
              breadcrumb={[
                { label: "Inicio", path: "/home" },
                { label: "/ Sistema De Inventario", path: "" },
              ]}
            />

            <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
              {/* si scree en diferente a departamentos se muestra la flecha */}
              {screen !== "departamentos" && (
                <div className="">
                  <button
                    title="Atras"
                    onClick={handleBack}
                    className="flex items-center p-2 mb-4 text-gray-600 duration-300 bg-gray-200 border-2 rounded-md btn btn-secondary hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
                  >
                    <ArrowUturnLeftIcon className="w-6 h-6 mr-2" />
                    <span className="flex items-center pt-1">ATRAS</span>
                  </button>
                </div>
              )}

              <div>
                <div>
                  {screen === "departamentos" && (
                    <div className="grid grid-cols-3 gap-8">
                      {loadingDepartment ? (  
                        <LoadingSpinner />
                      ) : errordepartment ? (
                        <p>{errordepartment}</p>
                      ) : (
                        <DepartamentosList
                          departamentos={departments}
                          onSelected={(departamento) => {
                            setDepartmentSelect(departamento.id);
                            setScreen("sedes");
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>

                {screen === "sedes" && departmentSelect && (
                  <SedesList
                    sedes={sedes}
                    onSelect={(sede) => {
                      setSedeSelect(sede.id);
                      setScreen("tipoItem"); // cambia la pantalla a items
                    }}
                  />
                )}

                {screen === "tipoItem" && sedeSelect && (
                  <>
                    <div>
                      <h2 className="mb-4 text-3xl dark:text-white">
                        Categorías
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <DeviceCard
                        title="Computadores"
                        description="Contenido de la Sección"
                        image={COMPUTO}
                        icon={
                          <ComputerDesktopIcon className="w-8 h-8 text-gray-200" />
                        }
                        onClick={() => {
                          setTipoItem("equipos");
                          setScreen("items");
                        }}
                      />
                      <DeviceCard
                        title="Dispositivos de red"
                        description="Contenido de la Sección"
                        image={TELECO}
                        icon={<SignalIcon className="w-8 h-8 text-gray-200" />}
                        onClick={() => {
                          setTipoItem("dispositivos-red");
                          setScreen("items");
                        }}
                      />
                    </div>
                  </>
                )}

                {screen === "items" && sedeSelect && tipoItem && (
                  <ItemsList
                    invetario={items}
                    tipoItem={tipoItem}
                    idSede={sedeSelect}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SistemaInventario;
