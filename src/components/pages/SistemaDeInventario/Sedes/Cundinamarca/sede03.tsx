import ModalSection from "../../../../ModalSection";

const sede03 = () => {
  return (
    <>
      <ModalSection
        title="Sede Cundinamarca - Sede 03"
        breadcrumb={[
          { label: "Inicio", path: "/inicio" },
          { label: "/ Sistema De Inventario", path: "/SistemaDeInventario" },
          {
            label: "/ Cundinamarca",
            path: "/SistemaDeInventario/Cundinamarca",
          },
          { label: "/ Sede 03", path: "" },
        ]}
      />
      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        SEDE 03C
      </div>
    </>
  );
};

export default sede03;
