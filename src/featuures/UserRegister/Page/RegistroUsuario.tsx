import { useState } from "react";
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";

// Simular resultados 
const mockUsers = [
  {
    documento: "1234567",
    nombre: "Juan Pérez",
    email: "juan.perez@gmail.com",
    telefono: "3001234567",
    fechaRegistro: "2024-03-25",
  },
  {
    documento: "7654321",
    nombre: "María González",
    email: "maria.gonzalez@gmail.com",
    telefono: "3109876543",
    fechaRegistro: "2024-03-20",
  },
];

const RegistroUsuario = () => {
  const [documento, setDocumento] = useState<string>("");
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const getData = (documento: string) => {
    // Simular API
    const resultados = mockUsers.filter((user) =>
      user.documento.includes(documento)
    );
    setUsuarios(resultados);
  };
  
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
        {usuarios.length > 0 && (
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase shadow-xl bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">
                  Documento
                </th>
                <th className="px-6 py-3">
                  Nombre
                </th>
                <th className="px-6 py-3">
                  Email
                </th>
                <th className="px-6 py-3">
                  Teléfono
                </th>
                <th className="px-6 py-3">
                  Fecha Registro
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{usuario.documento}</td>
                  <td className="px-6 py-4">{usuario.nombre}</td>
                  <td className="px-6 py-4">{usuario.email}</td>
                  <td className="px-6 py-4">{usuario.telefono}</td>
                  <td className="px-6 py-4">{usuario.fechaRegistro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Mensaje cuando no hay resultados */}
        {usuarios.length === 0 && documento && (
          <div className="mt-4 text-center text-red-500">
            No se encontró usuario con el documento {documento}
          </div>
        )}
      </section>
    </>
  );
};

export default RegistroUsuario;
