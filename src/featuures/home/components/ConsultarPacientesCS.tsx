import { useState } from "react";
import { useFetchPatientCS } from "../hooks/useFetchPatientCS";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import Input from "@/components/common/Ui/Input";
import Button from "@/components/common/Ui/Button";

const FormPacientesCS = () => {
  const [identification, setIdentification] = useState<string>("");
  const { patients, loadingPatients, errorPatients, getData } =
    useFetchPatientCS();

  if (loadingPatients) return <LoadingSpinner />;

  return (
    <>
      <div className="flex flex-col w-full p-2 pb-3 mb-3">
        <div className="flex flex-wrap w-full">
          <Input
            label="Número documento del paciente"
            type="text"
            id="identificacion"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            name="identificacion"
            placeholder="Ej: 10123456789"
            required
          />
          <Button
            onClick={() => getData(identification)}
            variant="secondary"
            className="h-10 mt-6 ml-2 md:mt-8"
            isLoading={loadingPatients}
          >
            Consultar
          </Button>
        </div>
        <div className="hidden w-full mt-5 md:flex justify-items-center dark:text-gray-200">
          {patients ? (
            <table
              className="w-full overflow-x-auto border rounded-lg table-auto"
              key={patients.id}
            >
              <thead>
                <tr className="text-gray-700 bg-gray-400 dark:bg-gray-800 dark:text-gray-200">
                  <th className="px-2 py-3 text-center">Tipo Documento</th>
                  <th className="px-2 py-3 text-center">N* Documento</th>
                  <th className="px-2 py-3 text-center">1* Apellido</th>
                  <th className="px-2 py-3 text-center">2* Apellido</th>
                  <th className="px-2 py-3 text-center">1* Nombre</th>
                  <th className="px-2 py-3 text-center">2* Nombre</th>
                  <th className="px-2 py-3 text-center">Fecha Nacimiento</th>
                  <th className="px-2 py-3 text-center">Genero</th>
                  <th className="px-2 py-3 text-center">Direccion</th>
                  <th className="px-2 py-3 text-center">Telefono</th>
                  <th className="px-2 py-3 text-center">Regimen</th>
                  <th className="px-2 py-3 text-center">Categoria/Rango</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-200 border-teal-700 dark:text-white dark:bg-gray-700">
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.tpsIdnId}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.hstIdnNumeroIdentificacion}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.aflPrimerApellido}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.aflSegundoApellido}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.aflPrimerNombre}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.aflSegundoNombre}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.aflFechaNacimiento}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.tpsGnrId}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.direccion}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.telefono}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.regimen}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-center">
                    {patients.tpsRgmId}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div>
              <p className="text-red-500">{errorPatients}</p>
            </div>
          )}
        </div>
      </div>

      {/* // responsive */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {patients ? (
          <div
            key={patients.tpsIdnId}
            className="w-[95%] place-self-center p-3 bg-gray-200 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600"
          >
            <div className="grid grid-cols-[40%_60%] gap-3 text-sm">
              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                Tipo de Documento:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.tpsIdnId}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                N° de Documento:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.hstIdnNumeroIdentificacion}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                1* Apellido:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.aflPrimerApellido}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                2* Apellido:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.aflSegundoApellido}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                1* Nombre:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.aflPrimerNombre}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                2* Nombre:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.aflSegundoNombre}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                Fecha Nacimiento:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.aflFechaNacimiento}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                Genero:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.tpsGnrId}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                TPS RGM ID:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.tpsRgmId}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                Direccion:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.direccion}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                Telefono:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.telefono}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                Regimen:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {patients.regimen}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-red-500">{errorPatients}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FormPacientesCS;
