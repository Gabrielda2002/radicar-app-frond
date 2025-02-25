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
      <div className="flex flex-col w-full p-6 pb-10 mb-10 border-2 rounded-lg shadow-md dark:border-color bg-gray-50 dark:bg-gray-700 dark:shadow-indigo-800">
        <div className="flex justify-start">
          <h2 className="mb-5 text-3xl font-bold dark:text-white">
            Consultar Pacientes Coosalud
          </h2>
        </div>
        <div className="flex flex-col ">
          <label
            className="w-5/6 dark:text-gray-200 text-[24px]"
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
              className="p-2 mt-3 mr-4 border-2 border-gray-400 rounded-lg b-2 w-60 dark:text-gray-700 text-[17px]"
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
        <div className="w-full mt-5">
          {patients ? (
            <table className="w-full overflow-x-auto border rounded-lg table-auto" key={patients.id}>
              <thead>
                <tr className="text-gray-700 bg-gray-400 dark:bg-gray-800 dark:text-gray-200">
                  <th  className="px-2 py-3 text-center whitespace-nowrap">Tipo Documento</th>
                  <th  className="px-2 py-3 text-center whitespace-nowrap">N* Documento</th>
                  <th  className="px-2 py-3 text-center whitespace-nowrap">1* Apellido</th>
                  <th  className="px-2 py-3 text-center whitespace-nowrap">2* Apellido</th>
                  <th  className="px-2 py-3 text-center whitespace-nowrap">1* Nombre</th>
                  <th  className="px-2 py-3 text-center whitespace-nowrap">2* Nombre</th>
                  <th  className="px-2 py-3 text-center whitespace-nowrap">Fecha Nacimiento</th>
                  <th  className="px-2 py-3 text-center whitespace-nowrap">Genero</th>
                  <th  className="px-2 py-3 text-center whitespace-nowrap">TPS RGM ID</th>
                  <th  className="px-2 py-3 text-center whitespace-nowrap">Direccion</th>
                  <th  className="px-2 py-3 text-center whitespace-nowrap">Telefono</th>
                  <th  className="px-2 py-3 text-center whitespace-nowrap">Regimen</th>
                </tr>
              </thead>
              <tbody>
                <tr  className="bg-gray-200 border-teal-700 dark:text-white dark:bg-gray-700">
                  <td className="px-6 py-3 font-medium text-center">{patients.tpsIdnId}</td>
                  <td className="px-6 py-3 font-medium text-center">{patients.hstIdnNumeroIdentificacion}</td>
                  <td className="px-6 py-3 font-medium text-center">{patients.aflPrimerApellido}</td>
                  <td className="px-6 py-3 font-medium text-center">{patients.aflSegundoApellido}</td>
                  <td className="px-6 py-3 font-medium text-center">{patients.aflPrimerNombre}</td>
                  <td className="px-6 py-3 font-medium text-center">{patients.aflSegundoNombre}</td>
                  <td className="px-6 py-3 font-medium text-center">{patients.aflFechaNacimiento}</td>
                  <td className="px-6 py-3 font-medium text-center">{patients.tpsGnrId}</td>
                  <td className="px-6 py-3 font-medium text-center">{patients.tpsRgmId}</td>
                  <td className="px-6 py-3 font-medium text-center">{patients.direccion}</td>
                  <td className="px-6 py-3 font-medium text-center">{patients.telefono}</td>
                  <td className="px-6 py-3 font-medium text-center">{patients.regimen}</td>
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
    </>
  );
};

export default FormPacientesCS;
