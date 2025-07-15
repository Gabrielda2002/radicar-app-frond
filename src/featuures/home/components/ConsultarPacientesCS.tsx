import { useState } from "react";
import { useFetchPatientCS } from "../hooks/useFetchPatientCS";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

const FormPacientesCS = () => {
  const [identification, setIdentification] = useState<string>("");
  const { patients, loadingPatients, errorPatients, getData } =
    useFetchPatientCS();

  if (loadingPatients) return <LoadingSpinner />;

  return (
    <>
      <div className="flex flex-col w-full p-2 pb-3 mb-3">
        <div className="flex flex-col">
          <label
            className="w-5/6 dark:text-gray-200 text-[19px] md:text-[24px]"
            htmlFor="identificacion"
          >
            Ingrese Número documento del paciente:
          </label>
          <div>
            <input
              type="text"
              id="identificacion"
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
              name="identificacion"
              placeholder="Numero documento del paciente"
              className="p-2 mt-3 mr-4 border-2 border-gray-400 rounded-lg b-2 w-44 md:w-[272px] dark:text-gray-700 text-[17px]"
            />
            <button
              type="button"
              onClick={() => getData(identification)}
              className="px-5 font-bold text-white bg-teal-500 rounded-md shadow-md mt-23 py-2 hover:bg-teal-600 hover:shadow-teal-600 dark:hover:shadow-teal-500 text-[16px]"
            >
              Consultar
            </button>
          </div>
        </div>
        <div className="hidden w-full mt-5 md:flex justify-items-center dark:text-gray-200">
          {patients ? (
            <table
              className="w-full overflow-x-auto border rounded-lg table-auto"
              key={patients.id}
            >
              <thead>
                <tr className="text-gray-700 bg-gray-400 dark:bg-gray-800 dark:text-gray-200">
                  <th  className="px-2 py-3 text-center">Tipo Documento</th>
                  <th  className="px-2 py-3 text-center">N* Documento</th>
                  <th  className="px-2 py-3 text-center">1* Apellido</th>
                  <th  className="px-2 py-3 text-center">2* Apellido</th>
                  <th  className="px-2 py-3 text-center">1* Nombre</th>
                  <th  className="px-2 py-3 text-center">2* Nombre</th>
                  <th  className="px-2 py-3 text-center">Fecha Nacimiento</th>
                  <th  className="px-2 py-3 text-center">Genero</th>
                  <th  className="px-2 py-3 text-center">Direccion</th>
                  <th  className="px-2 py-3 text-center">Telefono</th>
                  <th  className="px-2 py-3 text-center">Regimen</th>
                  <th  className="px-2 py-3 text-center">Categoria/Rango</th>
                </tr>
              </thead>
              <tbody>
                <tr  className="bg-gray-200 border-teal-700 dark:text-white dark:bg-gray-700">
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.tpsIdnId}</td>
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.hstIdnNumeroIdentificacion}</td>
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.aflPrimerApellido}</td>
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.aflSegundoApellido}</td>
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.aflPrimerNombre}</td>
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.aflSegundoNombre}</td>
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.aflFechaNacimiento}</td>
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.tpsGnrId}</td>
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.direccion}</td>
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.telefono}</td>
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.regimen}</td>
                  <td className="px-2 py-3 text-sm font-medium text-center">{patients.tpsRgmId}</td>
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
