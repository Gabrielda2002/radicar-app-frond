import { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../../loading-spinner";

import back from "/assets/back.svg";

const FormularioAutorizacion = () => {
  const [fechaAuditoria, setFechaAuditoria] = useState<Date | null>(null);

  return (
    <>
      <section className="p-4 dark:bg-gray-900">
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
                Servicio Auditoria
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

          {/* Código CUPS */}
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
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Código CUPS"
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
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Descripción CUPS"
              rows={3} // Valor predeterminado
            />
          </div>

          {/* Concepto Auditoría */}
          <div className="flex flex-col">
            <label
              htmlFor="conceptoAuditoria"
              className="mb-2 font-medium text-stone-600 dark:text-stone-300"
            >
              Concepto Auditoría:
            </label>
            <select
              id="conceptoAuditoria"
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="" disabled selected>
                SELECCIONE
              </option>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
            </select>
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

          {/* Justificación Concepto Auditor */}
          <div className="flex flex-col">
            <label
              htmlFor="justificacion"
              className="mb-2 font-medium text-stone-600 dark:text-stone-300"
            >
              Justificación concepto auditor:
            </label>
            <input
              id="justificacion"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              <option value="" disabled selected>
                SELECCIONE
              </option>
              <option value="unidad1">Unidad 1</option>
              <option value="unidad2">Unidad 2</option>
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
              <option value="" disabled selected>
                SELECCIONE
              </option>
              <option value="estado1">Estado 1</option>
              <option value="estado2">Estado 2</option>
            </select>
          </div>
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
