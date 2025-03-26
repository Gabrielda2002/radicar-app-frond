import { useCallback, useState, useMemo } from "react";
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";
import { useFetchRegisterEntries } from "../Hooks/useFetchRegisterEntries";
import { FormatDate } from "@/utils/FormatDate";
import Pagination from "@/components/common/PaginationTable/PaginationTable.tsx";
import usePagination from "@/hooks/usePagination.ts";

const RegistroUsuario = () => {

  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [documento, setDocumento] = useState<string>("");
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const  { dataRegister, loadingRegister, errorRegister, getData } = useFetchRegisterEntries();
  
  const filteredUsers = useMemo(() => {
    return usuarios.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [usuarios, searchQuery]);

  // Pagination
  const { currentPage, totalPages, paginate, currentData } = usePagination<IRegistroUsuario>(
      filteredUsers,
      itemsPerPage
  );
    []
      setItemsPerPage(Number(e.target.value));
  const handleItemsPerPageChange = useCallback(
    );

    },
    (e: React.ChangeEvent<HTMLSelectElement>) => {
  return (
    <>
      <ModalSection
        title="Registro De Usuarios"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Registro Usuarios", path: "" },
        ]}
      />
      <section className="p-5 bg-white rounded-lg shadow-lg mb-7 md:mb-10 container-table dark:bg-gray-800 shadow-indigo-500/40">
        {/* header-table */}
        <section className="flex items-end justify-between w-full mb-4">
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold text-stone-600 dark:text-stone-300">
              Buscar Registro :
            </label>
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="Documento Paciente"
              className="w-64 h-10 pl-3 border rounded-md border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <input 
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            placeholder="Fecha Inicio"
            className="w-64 h-10 pl-3 border rounded-md border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <input
            type="date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            placeholder="Fecha Fin"
            className="w-64 h-10 pl-3 border rounded-md border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button
              className="w-full text-white bg-teal-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:translate-y-1 hover:scale-100 hover:bg-emerald-700 duration-300 mt-3"
              onClick={() => getData(documento, dateStart, dateEnd)}
            >
              Buscar
            </button>
          </div>
        </section>

        {/* Filtro de búsqueda y paginación */}
        <div className="flex flex-col items-center w-full mt-4 mb-4 space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0 container-filter">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Consultar en resultados..."
            className="block ps-2 w-full h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 dark:focus:bg-gray-500 dark:focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />

          <div className="flex items-center space-x-[10px] md:ml-4 w-full md:w-auto">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="w-full h-10 border border-gray-300 rounded-md md:w-24 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
          </div>
        </div>

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
        {/* Mensaje cuando no hay resultados */}
        {filteredUsers.length === 0 && documento && (
          <div className="mt-4 text-center text-red-500">
            No se encontró usuario con el documento {documento}
          </div>
        )}
        
      </section>

      {/* responsive */}
      <div className="grid w-[95%] grid-cols-1 gap-4 m-2 mb-4 md:hidden">
        {currentData().map((usuario: IRegistroUsuario) => (
          <div
            key={usuario.documento}
            className="p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <div className="grid grid-cols-[40%_60%] gap-2 text-sm">
              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                Documento:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {usuario.documento}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                Nombre:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {usuario.nombre}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                Email:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {usuario.email}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                Telefono
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {usuario.telefono}
              </div>

              <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                Fecha de Ingreso:
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {usuario.fechaRegistro}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-4">
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
        />
      </div>
    </>
  );
};

export default RegistroUsuario;
