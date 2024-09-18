//*Funciones y Hooks
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../../LoadingSpinner";
//*Icons
import back from "/assets/back.svg";
import {
  useFetchEstados,
  useFetchUnidadFuncional,
} from "../../../hooks/useFetchUsers";

const FormularioAutorizacion = () => {
  const [fechaAuditoria, setFechaAuditoria] = useState<Date | null>(null);

  const location = useLocation();
  const CUPS = location.state.CUPS;

  const { data, error, loading } = useFetchUnidadFuncional();

  const { dataEstados, errorEstados } = useFetchEstados();

  if (error) return <h2>{error}</h2>;
  if (loading) return <LoadingSpinner duration={500} />;
  if (errorEstados) return <h2>{errorEstados}</h2>;

  return (
    <>
      <section className=" dark:bg-gray-900">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100">
          Autorización
        </h1>
        <nav>
          <ol className="flex mb-2 text-gray-700 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-2">Inicio</li>
            </Link>
            <Link to="/tabla-auditoria">
              <li className="text-slate-400 before:content-['/'] before:mr-2 after:mr-2 before:text-slate-400">
                Servicio Auditoría
              </li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Autorización Servicios
            </li>
          </ol>
          <div className="w-10 pb-2">
            <Link to="/inicio">
              <img src={back} alt="Back" />
            </Link>
          </div>
        </nav>
      </section>

      {/* Formulario */}
      <div className="w-full p-6 mb-8 bg-white rounded-md shadow-lg dark:bg-gray-800 shadow-indigo-500/40">
        <h2 className="mb-6 text-xl font-semibold text-stone-600 dark:text-stone-300">
          Crear autorización
        </h2>
        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Auditora */}
          <div className="flex flex-col">
            <label
              htmlFor="auditora"
              className="mb-2 font-medium text-stone-600 dark:text-stone-300"
            >
              Auditora:
            </label>
            <input
              id="auditora"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Nombre de la auditora"
            />
          </div>

          {/* Fecha Auditoría */}
          <div className="flex flex-col">
            <label
              htmlFor="fechaAuditoria"
              className="mb-2 font-medium text-stone-600 dark:text-stone-300"
            >
              Fecha Auditoría:
            </label>
            <DatePicker
              selected={fechaAuditoria}
              onChange={(date) => setFechaAuditoria(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholderText="dd/mm/aaaa"
            />
          </div>

          {/* Justificación Concepto Auditor */}
          <div className="flex flex-col">
            <label
              htmlFor="justificacion"
              className="mb-2 font-medium text-stone-600 dark:text-stone-300"
            >
              Justificación:
            </label>
            <input
              id="justificacion"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {CUPS.map((cups) => (
            <div>
              <div className="flex flex-col">
                <label
                  htmlFor="codigoCups"
                  className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                >
                  Código CUPS:
                </label>
                <input
                  id="codigoCups"
                  type="text"
                  value={cups.code}
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Código CUPS"
                />
              </div>

              {/* Descripción CUPS */}
              <div className="flex flex-col">
                <label
                  htmlFor="descripcionCups"
                  className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                >
                  Descripción CUPS:
                </label>
                <textarea
                  id="descripcionCups"
                  value={cups.description}
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Descripción CUPS"
                  rows={3} // Valor predeterminado
                />
              </div>

              {/* Observación CUPS */}
              <div className="flex flex-col">
                <label
                  htmlFor="observacionCups"
                  className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                >
                  Observación CUPS:
                </label>
                <input
                  id="observacionCups"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Observación CUPS"
                />
              </div>

              {/* Unidad Funcional */}
              <div className="flex flex-col">
                <label
                  htmlFor="unidadFuncional"
                  className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                >
                  Unidad funcional:
                </label>

                <select
                  id="unidadFuncional"
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">SELECT</option>
                  {data.map((unidad) => (
                    <option value={unidad.id}>{unidad.name}</option>
                  ))}
                </select>
              </div>

              {/* Estado CUPS */}
              <div className="flex flex-col">
                <label
                  htmlFor="estadoCups"
                  className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                >
                  Estado CUPS:
                </label>
                <select
                  id="estadoCups"
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">SELECT</option>
                  {dataEstados.map((estado) => (
                    <option value={estado.id}>{estado.name}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </form>

        {/* Botón Enviar */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export default FormularioAutorizacion;
