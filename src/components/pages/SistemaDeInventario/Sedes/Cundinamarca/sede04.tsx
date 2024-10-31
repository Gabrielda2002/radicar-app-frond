import ModalSection from "../../../../ModalSection";

const sede04 = () => {
  return (
    <>
      <ModalSection
        title="Sede Cundinamarca - Sede 04"
        breadcrumb={[
          { label: "Inicio", path: "/inicio" },
          { label: "/ Sistema De Inventario", path: "/SistemaDeInventario" },
          {
            label: "/ Cundinamarca",
            path: "/SistemaDeInventario/Cundinamarca",
          },
          { label: "/ Sede 04", path: "" },
        ]}
      />
      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        SEDE 04C
      </div>
    </>
  );
};

export default sede04;
