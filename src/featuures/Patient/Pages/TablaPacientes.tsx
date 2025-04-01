//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchPaciente } from "@/hooks/useFetchPaciente";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
const ModalPaciente = lazy(() => import("../Components/ModalPaciente"));

const TablaPacientes = () => {
  const { data, error, getData } = useFetchPaciente();

  const [identificacion, setIdentificacion] = useState<string>("");

  const handleSearch = () => {
    getData(identificacion);
  };

  return (
    <>
      <ModalSection
        title="Módulo Pacientes"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Pacientes", path: "" },
        ]}
      />

      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-tale */}
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="container-filter">
            <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
              Buscar Paciente:
            </label>
            <div>
              <input
                type="text"
                placeholder="Buscar paciente"
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                onChange={(e) => setIdentificacion(e.target.value)}
              />
            </div>
            <div>
              <button
                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
                onClick={handleSearch}
                type="button"
              >
                Buscar
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 -mt-7 md:-mt-0">
            <Suspense fallback={<LoadingSpinner />}>
              <ModalPaciente
                id={null}
                update={false}
                tittle="Crear"
                paciente={null}
              />
            </Suspense>
          </div>
        </section>
        {/* Tabla de Pacientes */}
        <div>
          {data ? (
            <>
              <table className="hidden w-full text-sm md:table">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                    <th className=" w-[70px]">ID</th>
                    <th className="">Identificación</th>
                    <th className="">Tipo de Documento</th>
                    <th className="">Nombre Completo</th>
                    <th className=" w-[120px]">Número Celular</th>
                    <th className=" w-[130px]">Teléfono Fijo</th>
                    <th className="">Correo</th>
                    <th className="">Convenio</th>
                    <th className=" w-[90px]">Estado </th>
                    <th className=" w-[80px]">Acciones</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {data && (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.documentNumber}</td>
                      <td>{data.documentRelation.name}</td>
                      <td>{data.name}</td>
                      <td>{data.phoneNumber}</td>
                      <td>{data.landline}</td>
                      <td>{data.email}</td>
                      <td>{data.convenioRelation.name}</td>
                      <td>{data.status ? "Activo" : "Inactivo"}</td>
                      <td>
                        <ModalPaciente
                          id={data.id}
                          update={true}
                          tittle="Editar"
                          paciente={data}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <h2 className="text-lg text-center dark:text-white">{error}</h2>
          )}
        </div>
        {/* // responsive */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {data ? [data].map((data) => (
            <div
              key={data.id}
              className="p-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
             

              <div className="grid grid-cols-[35%_65%] gap-2 text-sm">
                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  ID:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {data.id}
                </div>

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Identificación:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {data.documentNumber}
                </div>     

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Tipo de Documento:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {data.documentRelation.name}
                </div>

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Nombre Completo:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {data.name}
                </div>

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Número Celular:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {data.phoneNumber}
                </div>

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Teléfono Fijo:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {data.landline}
                </div>

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Correo:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {data.email}
                </div>
                
                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Convenio:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {data.convenioRelation.name}
                </div>
                
                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Estado:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                   {data.status ? "Activo" : "Inactivo"}
                </div>

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Acciones:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  <ModalPaciente
                    id={data.id}
                    update={true}
                    tittle="Editar"
                    paciente={data}
                  />
                 </div>             
            </div>
            </div>
          )) : (
            <h2 className="text-lg text-center dark:text-white">{error}</h2>
          )}
        </div>
      </section>
    </>
  );
};

export default TablaPacientes;
