import { useCallback, useState } from "react";
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";
import { useFetchRegisterEntries } from "../Hooks/useFetchRegisterEntries";
import { FormatDate } from "@/utils/FormatDate";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
import useSearch from "@/hooks/useSearch.ts";
import { IRegisterUser } from "@/models/IRegisterUser.ts";
import usePagination from "@/hooks/usePagination";

const RegistroUsuario = () => {
  const ITEMS_PER_PAGE = 8;
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const [documento, setDocumento] = useState<string>("");
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");

  const { dataRegister, getData, errorRegister } = useFetchRegisterEntries();

  const { query, setQuery, filteredData } = useSearch<IRegisterUser>(
    dataRegister,
    [
      "documentNumber",
      'headquarters',
      'hourRegister',
      'registerDate'
    ]
  );

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, ITEMS_PER_PAGE);

  const handleItemsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(e.target.value));
    },
    [setItemsPerPage]
  );

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
        <section className="flex items-end justify-between w-full mb-7">
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold text-stone-600 dark:text-stone-300">
              Buscar Registro De Usuario:
            </label>
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="Documento Usuario"
              className="h-10 pl-3 border rounded-md md:w-72 w-[360px] border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <div className="grid grid-cols-1 mt-2 font-semibold text-md text-stone-600 dark:text-stone-300">
              Fecha de Inicio
            </div>
            <input
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              placeholder="Fecha Inicio"
              className="h-10 pl-3 mb-2 border rounded-md md:w-72 w-[360px] border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              title="Fecha Inicio"
            />
            <div className="grid grid-cols-1 font-semibold text-md text-stone-600 dark:text-stone-300">
              Fecha de Fin
            </div>
            <input
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              placeholder="Fecha Fin"
              className="h-10 pl-3 border rounded-md md:w-72 w-[360px] border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              title="Fecha Fin"
            />
            <button
              className="w-full text-white bg-teal-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:translate-y-1 hover:scale-100 hover:bg-emerald-700 duration-300 mt-3"
              onClick={() => getData(documento, dateStart, dateEnd)}
            >
              Buscar
            </button>
          </div>
        </section>

        {/* vista escritorio */}
        <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
          <div className="flex items-center w-full space-x-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar..."
              className="block ps-2 w-full h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 dark:focus:bg-gray-500 dark:focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="w-full h-10 border border-gray-300 rounded-md md:w-24 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="10">10 Páginas</option>
              <option value="20">20 Páginas</option>
              <option value="30">30 Páginas</option>
            </select>
          </div>
        </div>
        {filteredData.length > 0 ? (
          <>
            {/* Paginatcion y busqueda */}

            <table className="hidden w-full text-sm text-left text-gray-500 md:table rtl:text-right dark:text-gray-200">
              <thead className="text-xs text-gray-800 uppercase bg-gray-300 shadow-xl huver: dark:bg-gray-600 dark:text-gray-200">
                <tr>
                  <th className="px-6 py-3">N* Documento</th>
                  <th className="px-6 py-3">Nombre</th>
                  <th className="px-6 py-3">Apellido</th>
                  <th className="px-6 py-3">Sede</th>
                  <th className="px-6 py-3">Fecha Registro</th>
                  <th className="px-6 py-3">Hora Registro</th>
                </tr>
              </thead>
              <tbody>
                {currentData().map((u) => (
                  <tr
                    key={u.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{u.documentNumber}</td>
                    <td className="px-6 py-4">{u.userName}</td>
                    <td className="px-6 py-4">{u.userLastName}</td>
                    <td className="px-6 py-4">{u.headquarters}</td>
                    <td className="px-6 py-4">
                      {FormatDate(u.registerDate, false)}
                    </td>
                    <td className="px-6 py-4">{u.hourRegister}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* componente de paginacion */}
            <div className="justify-center hidden mt-4 md:flex">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
              />
            </div>
          </>
        ): (
          dataRegister.length > 0 && (
            <div className="p-4 text-center text-red-500 dark:text-red-300">
              No se encontraron resultados que coincidan con la búsqueda.
            </div>
          )
        )}
        {errorRegister && (
          <div className="text-red-500">
            <p>{errorRegister}</p>
          </div>
        )}

        {/* responsive*/}
        <div className="grid w-full grid-cols-1 gap-4 md:hidden">
          {currentData().map((usuario) => (
            <div
              key={usuario.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600"
            >
              <div className="grid grid-cols-[40%_60%] gap-2 text-sm">
                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  N* Documento:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {usuario.documentNumber}
                </div>

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Nombre:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {usuario.userName}
                </div>

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Apellido:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {usuario.userLastName}
                </div>

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Sede:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {usuario.headquarters}
                </div>

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Fecha Registro:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {FormatDate(usuario.registerDate, false)}
                </div>

                <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                  Hora Registro:
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                  {usuario.hourRegister}
                </div>
              </div>
            </div>
          ))}
          {/* componente de paginacion */}
          <div className="justify-center block mb-4 place-self-center w-80">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default RegistroUsuario;
