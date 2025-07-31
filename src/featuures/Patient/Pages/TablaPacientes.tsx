//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchPaciente } from "@/hooks/useFetchPaciente";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import Input from "@/components/common/Ui/Input";
import Button from "@/components/common/Ui/Button";
const ModalPaciente = lazy(() => import("../Components/ModalPaciente"));

const TablaPacientes = () => {
  const { data: patients, error, getData } = useFetchPaciente();

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

      <section className="p-5 mb-8 bg-white rounded-md shadow-lg dark:bg-gray-800 container-tabla shadow-indigo-500/40">
        {/* header-table */}
        <section className="flex items-end md:justify-between w-full mb-4">
          <div className="flex md:flex-col flex-wrap w-80">
            <Input
              label="Identificación del Paciente"
              type="text"
              placeholder="Buscar paciente"
              onChange={(e) => setIdentificacion(e.target.value)}
              helpText="Ingrese el número de identificación del paciente y presione buscar."
              error={error ? error : undefined}
              touched={!!error}
              value={identificacion}
              required
            />
            <Button onClick={handleSearch} variant="secondary" type="button">
              Buscar
            </Button>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <ModalPaciente id={null} paciente={null} />
          </Suspense>
        </section>
        {/* Tabla de Pacientes */}
        <div>
          {patients && (
            <>
              <table className="hidden w-full text-sm md:table">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                    <th className=" w-[70px]">ID</th>
                    <th className="">Número de Identificación</th>
                    <th className="">Tipo de Identificación</th>
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
                  {patients && (
                    <tr key={patients.id}>
                      <td>{patients.id}</td>
                      <td>{patients.documentNumber}</td>
                      <td>{patients.documentRelation.name}</td>
                      <td>{patients.name}</td>
                      <td>{patients.phoneNumber}</td>
                      <td>{patients.landline}</td>
                      <td>{patients.email}</td>
                      <td>{patients.convenioRelation.name}</td>
                      <td>{patients.status ? "Activo" : "Inactivo"}</td>
                      <td>
                        <ModalPaciente id={patients.id} paciente={patients} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
        {/* // responsive */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {patients ? (
            [patients].map((patients) => (
              <div
                key={patients.id}
                className="p-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <div className="grid grid-cols-[35%_65%] gap-2 text-sm">
                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    ID:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {patients.id}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Identificación:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {patients.documentNumber}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Tipo de Documento:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {patients.documentRelation.name}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Nombre Completo:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {patients.name}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Número Celular:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {patients.phoneNumber}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Teléfono Fijo:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {patients.landline}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Correo:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {patients.email}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Convenio:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {patients.convenioRelation.name}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Estado:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {patients.status ? "Activo" : "Inactivo"}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Acciones:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    <ModalPaciente id={patients.id} paciente={patients} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-lg text-center dark:text-white">{error}</h2>
          )}
        </div>
      </section>
    </>
  );
};

export default TablaPacientes;
