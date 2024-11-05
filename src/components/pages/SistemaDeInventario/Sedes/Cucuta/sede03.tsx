import ModalSection from "../../../../ModalSection";

const sede03 = () => {
  return (
    <>
      <ModalSection
        title="Sede Cúcuta - Sede 03"
        breadcrumb={[
          { label: "Inicio", path: "/inicio" },
          { label: "/ Sistema De Inventario", path: "/SistemaDeInventario" },
          { label: "/ Cúcuta", path: "/SistemaDeInventario/Cucuta" },
          { label: "/ Sede 03", path: "" },
        ]}
      />
      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        SEDE 03
      </div>
    </>
  );
};

export default sede03;
