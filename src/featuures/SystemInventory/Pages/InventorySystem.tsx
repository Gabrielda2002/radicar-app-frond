//*Fuctions and Hooks
import ItemsList from "../Components/ItemsList";
import SedesList from "../Components/sedesList";
import React, { useCallback, useEffect, useState } from "react";
import DeviceCard from "@/components/common/DevicesCard/DevicesCard";
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import DepartamentosList from "../Components/DepartamentosList";
import useFetchSedes from "../Hooks/UseFetchSedes";
import useFetchItems from "../Hooks/UseFetchItems";
import { useFetchDepartment } from "../Hooks/UseFetchDeparment";
import { Hammer, Tv, Smartphone } from "lucide-react";

//*Icons and Images
import COMPUTO from "@/assets/InvetorySystem/Images/COMPUTOS.jpg";
import TELECO from "@/assets/InvetorySystem/Images/TELECOMUNICACIONES.webp";
import {
  ComputerDesktopIcon,
  SignalIcon,
  ArrowUturnLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import StatiticsScreemItems from "../Components/StatiticsScreemItems";
import { GlobalSearchResult } from "../Hooks/useGlobalSearch";
import GlobalSearch from "../Components/GlobalSearch";

const SistemaInventario: React.FC = () => {
  const {
    department: departments,
    loading: loadingDepartment,
    errordepartment,
  } = useFetchDepartment();

  // estados para manejar los departamentos y sedes
  const [departmentSelect, setDepartmentSelect] = useState<number | null>(null);

  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  const [ targetItemId, setTargetItemId ] = useState<string | number | null>(null);

  const handleNavigateToItem = useCallback((result: GlobalSearchResult) => {
    setSedeSelect(result.sedeId);
    setDepartmentSelect(result.departmentId);
    setTargetItemId(result.item.id);
    setTipoItem(result.tipoItem as any);
    setScreen("items");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsGlobalSearchOpen(true);
      }

      if (event.key === "Escape") {
        setIsGlobalSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // traer las sedes
  const { sedes } = useFetchSedes(departmentSelect);

  const [sedeSelect, setSedeSelect] = useState<number | null>(null);

  const [tipoItem, setTipoItem] = useState<
    | "equipos"
    | "dispositivos-red"
    | "inventario/general"
    | "inventario/televisores"
    | "inventario/celulares"
    | null
  >(null);

  // traer los items
  const { items, refetch } = useFetchItems(sedeSelect, tipoItem);

  // estado para manejar la pantalla actual
  const [screen, setScreen] = useState<
    "departamentos" | "sedes" | "tipoItem" | "items"
  >("departamentos");

  const handleItemsUpdate = useCallback(() => {
    refetch();
  }, [refetch]);

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
              <div>
                {screen !== "departamentos" && (
                  <button
                    title="Atras"
                    onClick={handleBack}
                    className="flex items-center p-2 mb-4 text-gray-600 duration-300 bg-gray-200 border-2 rounded-md btn btn-secondary hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
                  >
                    <ArrowUturnLeftIcon className="w-6 h-6 mr-2" />
                    <span className="flex items-center pt-1">ATRAS</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsGlobalSearchOpen(true)}
                className="flex items-center p-2 mb-4 text-gray-600 duration-300 bg-gray-200 border-2 rounded-md btn btn-secondary hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
                title="Buscar en todo el inventario"
              >
                <MagnifyingGlassIcon className="w-6 h-6 mr-2" />
                <span>Busqueda global</span>
                <kbd className="ml-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Ctrl+K
                </kbd>
              </button>

              <div>
                <div>
                  {screen === "departamentos" && (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
                  <>
                    <SedesList
                      sedes={sedes}
                      onSelect={(sede) => {
                        setSedeSelect(sede.id);
                        setScreen("tipoItem"); // cambia la pantalla a items
                      }}
                    />
                  </>
                )}

                {screen === "tipoItem" && sedeSelect && (
                  <>
                    <h1 className="text-2xl font-bold mt-5  text-gray-800 dark:text-gray-200">
                      Información general
                    </h1>
                    <StatiticsScreemItems />
                    <div>
                      <h2 className="mb-4 text-2xl md:text-3xl dark:text-white">
                        Categorías
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
                      <DeviceCard
                        title="Inventario General"
                        description="Contenido de la Sección"
                        image={TELECO}
                        icon={<Hammer className="w-8 h-8 text-gray-200" />}
                        onClick={() => {
                          setTipoItem("inventario/general");
                          setScreen("items");
                        }}
                      />
                      <DeviceCard
                        title="Televisores"
                        description="Inventario de televisores"
                        image={TELECO}
                        icon={<Tv className="w-8 h-8 text-gray-200" />}
                        onClick={() => {
                          setTipoItem("inventario/televisores");
                          setScreen("items");
                        }}
                      />
                      <DeviceCard
                        title="Celulares"
                        description="Inventario de celulares"
                        image={TELECO}
                        icon={<Smartphone className="w-8 h-8 text-gray-200" />}
                        onClick={() => {
                          setTipoItem("inventario/celulares");
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
                    onItemsUpdate={handleItemsUpdate}
                    targetItemId={targetItemId}
                  />
                )}
                <GlobalSearch
                  isOpen={isGlobalSearchOpen}
                  onClose={() => setIsGlobalSearchOpen(false)}
                  onNavigateToItem={handleNavigateToItem}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SistemaInventario;
