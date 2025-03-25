import { useState } from "react";
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";
import { useFetchRegisterEntries } from "../Hooks/useFetchRegisterEntries";
import { FormatDate } from "@/utils/FormatDate";

const RegistroUsuario = () => {

  const [documento, setDocumento] = useState<string>("");

  const  { dataRegister, loadingRegister, errorRegister, getData } = useFetchRegisterEntries();
  
  return (
    <>
      <ModalSection
        title="Registro De Usuarios"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Registro Usuarios", path: "" },
        ]}
      />
      <section className="p-5 bg-white rounded-lg shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-table */}
        <section className="flex items-end justify-between w-full mb-4">
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold text-stone-600 dark:text-stone-300">
              Buscar Registro De Usuario:
            </label>
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="Documento Usuario"
              className="w-64 h-10 pl-3 border rounded-md border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button
              className="w-full text-white bg-teal-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:translate-y-1 hover:scale-100 hover:bg-emerald-700 duration-300 mt-3"
              onClick={() => getData(documento)}
            >
              Buscar
            </button>
          </div>
        </section>

        {/* Tabla de resultados */}
        {dataRegister.length > 0 && (
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase shadow-xl bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">
                  N* Documento
                </th>
                <th className="px-6 py-3">
                  Nombre
                </th>
                <th className="px-6 py-3">
                  Apellido
                </th>
                <th className="px-6 py-3">
                  Sede
                </th>
                <th className="px-6 py-3">
                  Fecha Registro
                </th>
                <th className="px-6 py-3">
                  Hora Registro
                </th>
              </tr>
            </thead>
            <tbody>
              {dataRegister.map((u) => (
                <tr
                  key={u.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{u.documentNumber}</td>
                  <td className="px-6 py-4">{u.userName}</td>
                  <td className="px-6 py-4">{u.userLastName}</td>
                  <td className="px-6 py-4">{u.headquarters}</td>
                  <td className="px-6 py-4">{FormatDate(u.registerDate, false)}</td>
                  <td className="px-6 py-4">{u.hourRegister}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {errorRegister && (
          <div className="text-red-500">
            <p>{errorRegister}</p>
          </div>
        )}
        
      </section>
    </>
  );
};

export default RegistroUsuario;
