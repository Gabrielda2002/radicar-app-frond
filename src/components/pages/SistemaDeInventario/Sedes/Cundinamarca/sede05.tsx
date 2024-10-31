import ModalSection from "../../../../ModalSection";

const sede05 = () => {
  return (
    <>
      <ModalSection
        title="Sede Cundinamarca - Sede 05"
        breadcrumb={[
          { label: "Inicio", path: "/inicio" },
          { label: "/ Sistema De Inventario", path: "/SistemaDeInventario" },
          {
            label: "/ Cundinamarca",
            path: "/SistemaDeInventario/Cundinamarca",
          },
          { label: "/ Sede 05", path: "" },
        ]}
      />
      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        SEDE 05C
      </div>
    </>
  );
};

export default sede05;
