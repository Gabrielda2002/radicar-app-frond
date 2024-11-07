import React, { useState } from "react";
import { useFetchDepartment } from "../../../hooks/useFetchUsers";
import DepartamentosList from "./DepartamentosList";
import useFetchSedes from "../../../hooks/useFetchSedes";
import SedesList from "./sedesList";
import useFetchItems from "../../../hooks/useFetchItems";
import ItemsList from "./ItemsList";

const SistemaInventario: React.FC = () => {
  const {
    department: departments,
    loading: loadingDepartment,
    errordepartment,
  } = useFetchDepartment();
  const [departmentSelect, setDepartmentSelect] = useState<number | null>(null);
  const { sedes } = useFetchSedes(departmentSelect);
  const [sedeSelect, setSedeSelect] = useState<number | null>(null);
  const { items, loadingItems, errorItems } = useFetchItems(sedeSelect);

  // estado para manejar la pantalla actual
  const [screen, setScreen] = useState<"departamentos" | "sedes" | "items">(
    "departamentos"
  );

  // funcion ir al componente anterior
  const handleBack = () => {
    if (screen === "items") {
      setScreen("sedes");
      setSedeSelect(null);
    } else if (screen === "sedes") {
      setScreen("departamentos");
      setDepartmentSelect(null);
    }
  };

  return (

      <div>
        {/* si scree en diferente a departamentos se muestra la flecha */}
      {screen !== 'departamentos' && (
        <button
          onClick={handleBack}
          className="btn btn-secondary"
        >
          Atras
        </button>
      )}

      {screen === 'departamentos' && (
        loadingDepartment ? (
          <p>Cargando departamentos...</p>
        ) : errordepartment ? (
          <p>{errordepartment}</p>
        ) : (
          <DepartamentosList
            departamentos={departments}
            onSelected={(departamento) => {
              setDepartmentSelect(departamento.id);
              setScreen('sedes'); // cambia la pantalla a sedes
            }}
          />
        )
      )}

      { screen === 'sedes' && departmentSelect && (
        <SedesList
          sedes={sedes}
          onSelect={(sede) => {
            setSedeSelect(sede.id);
            setScreen('items'); // cambia la pantalla a items
          }}
        />
      )}

      { screen === 'items' && sedeSelect && (
        <ItemsList invetario={items} sede={sedeSelect.toString()} />
      )}
    </div>
  );
};

export default SistemaInventario;
