//*Fuctions and Hooks
import ModalSection from "../../../../ModalSection";

const sede01 = () => {
  return (
    <>
      <ModalSection
        title="Sede Cundinamarca - Sede 01"
        breadcrumb={[
          { label: "Inicio", path: "/Inicio" },
          { label: "/ Sistema de Inventario", path: "/SistemaDeInventario" },
          {
            label: "/ Cundinamarca",
            path: "/SistemaDeInventario/Cundinamarca",
          },
          { label: "/ Sede 01", path: "" },
        ]}
      />
      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        SEDE 01C
      </div>
    </>
  );
};

export default sede01;
