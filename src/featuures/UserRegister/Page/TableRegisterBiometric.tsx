import { useCallback, useState } from "react";
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";
import { useFetchRegisterEntries } from "../Hooks/useFetchRegisterEntries";
import { FormatDate } from "@/utils/FormatDate";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
import useSearch from "@/hooks/useSearch.ts";
import { IRegisterUser } from "@/models/IRegisterUser.ts";
import usePagination from "@/hooks/usePagination";
import Input from "@/components/common/Ui/Input";
import Button from "@/components/common/Ui/Button";
import Select from "@/components/common/Ui/Select";

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
          <div className="flex flex-col space-y-2 w-full md:w-2/5">
            <Input
              id="documento"
              label="Buscar por Documento"
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="Ej: 123456789"
            />
            <Input
              id="fechaInicio"
              label="Fecha Inicio"
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              placeholder="Fecha Inicio"
              title="Fecha Inicio"
            />
            <Input
              type="date"
              id="fechaFin"
              label="Fecha Fin"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              placeholder="Fecha Fin"
              title="Fecha Fin"
            />
            <Button
              onClick={() => getData(documento, dateStart, dateEnd)}
            >
              Buscar
            </Button>
          </div>
        </section>

        {/* vista escritorio */}
        <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
          <div className="flex items-center w-full space-x-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar..."
            />
            <Select
              options={[
                { value: "10", label: "10 Páginas" },
                { value: "20", label: "20 Páginas" },
                { value: "30", label: "30 Páginas" },
              ]}
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            />
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
