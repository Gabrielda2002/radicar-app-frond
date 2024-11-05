import ModalSection from "../../../../ModalSection";

const sede01 = () => {
  return (
    <>
      <ModalSection
        title="Sede Cúcuta - Sede 01"
        breadcrumb={[
          { label: "Inicio", path: "/inicio" },
          { label: "/ Sistema De Inventario", path: "/SistemaDeInventario" },
          {
            label: "/ Amazonas",
            path: "/SistemaDeInventario/Amazonas",
          },
          { label: "/ Sede 01", path: "" },
        ]}
      />
      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        SEDE 01A
      </div>
    </>
  );
};

export default sede01;
