import React, { useState } from "react";
import { useFetchDepartment } from "../../../hooks/useFetchUsers";
import DepartamentosList from "./DepartamentosList";
import useFetchSedes from "../../../hooks/useFetchSedes";
import SedesList from "./sedesList";
import useFetchItems from "../../../hooks/useFetchItems";
import ItemsList from "./ItemsList";
import ModalSection from "../../ModalSection";

const SistemaInventario: React.FC = () => {
  const {
    department: departments,
    loading: loadingDepartment,
    errordepartment,
  } = useFetchDepartment();
  const [departmentSelect, setDepartmentSelect] = useState<number | null>(null);
  const { sedes } = useFetchSedes(departmentSelect);
  const [sedeSelect, setSedeSelect] = useState<number | null>(null);

  const [tipoItem, setTipoItem] = useState<
    "equipos" | "dispositivos-red" | null
  >(null);
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

  return (
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
          <button onClick={handleBack} className="btn btn-secondary">
            Atras
          </button>
        )}

        {screen === "departamentos" &&
          (loadingDepartment ? (
            <p>Cargando departamentos...</p>
          ) : errordepartment ? (
            <p>{errordepartment}</p>
          ) : (
            <DepartamentosList
              departamentos={departments}
              onSelected={(departamento) => {
                setDepartmentSelect(departamento.id);
                setScreen("sedes"); // cambia la pantalla a sedes
              }}
            />
          ))}

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
          <div>
            <h2>Selecciona el tipo de item</h2>
            <button
              onClick={() => {
                setTipoItem("equipos");
                setScreen("items");
              }}
            >
              Computadores
            </button>
            <button
              onClick={() => {
                setTipoItem("dispositivos-red");
                setScreen("items");
              }}
            >
              Dispositivos de red
            </button>
          </div>
        )}

        {screen === "items" && sedeSelect && tipoItem && (
          <ItemsList invetario={items} tipoItem={tipoItem} />
        )}
      </div>
    </div>
  );
};

export default SistemaInventario;
