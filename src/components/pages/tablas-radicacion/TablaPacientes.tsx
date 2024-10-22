//*Funciones y Hooks
import { Link } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";
import ModalPaciente from "../modals/ModalPaciente";
import { useFetchPaciente } from "../../../hooks/useFetchPaciente";
//*Iconos
import salir from "/assets/back.svg";
import { useState } from "react";

const TablaPacientes = () => {
  const { data, error, getData } = useFetchPaciente();

  const [identificacion, setIdentificacion] = useState<string>("");

  const handleSearch = () => {
    getData(identificacion);
  };

  return (
    <>
      {/* nav-table */}

      <section className=" dark:bg-gray-900">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100 ">
          Módulo Pacientes
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-4">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Pacientes
            </li>
          </ol>
          <div className="w-10 pb-2">
            <img
              src={salir}
              alt=""
              onClick={() => window.history.back()}
              className="cursor-pointer"
            />
          </div>
        </nav>
      </section>

      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-tale */}

        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="container-filter">
            <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
              Buscar Paciente :
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
          <div className="flex items-center pt-1 space-x-2">
            <ModalPaciente
              id={null}
              update={false}
              tittle="Crear"
              paciente={null}
            />
          </div>
        </section>

        {/* Tabla de Pacientes */}

        <div>
          {data ? (
            <>
              <table className="w-full text-sm ">
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
            <h2 className="text-center text-lg dark:text-white">{error}</h2>
          )}
        </div>
      </section>
    </>
  );
};

export default TablaPacientes;
