import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { Search } from "lucide-react";
import { useFetchPosition } from "../Hooks/useFetchPosition";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

const Position = () => {
  const { data, isLoading, error, refetch } = useFetchPosition();

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error !== null ? (
        <h1 className="flex justify-center text-lg dark:text-white">{error}</h1>
      ) : (
        <>
          <ModalSection
            title="Cargos"
            breadcrumb={[
              { label: "Inicio", path: "/" },
              { label: "Cargos", path: "/Position" },
            ]}
          />
          <div className="w-full max-w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/10">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 md:space-y-0 container-filter">
              <div className="flex flex-col w-2/5 gap-4 mb-4 space-x-2 md:flex-row md:items-center md:mb-0 md:w-full">
                <Input
                  //   value={query}
                  //   onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar"
                  icon={
                    <Search className="text-black dark:text-white"></Search>
                  }
                  className="ml-2"
                  size="md"
                />
                <Select
                  options={[
                    { value: "10", label: "10 Paginas" },
                    { value: "20", label: "20 Paginas" },
                    { value: "30", label: "30 Paginas" },
                  ]}
                  id="itemsPerPage"
                  selectSize="md"
                  //   value={ITEMS_PER_PAGE}
                  //   onChange={handleItemsPerPageChange}
                />
              </div>
              <div className="flex justify-start w-full md:justify-end">
                {/* Modal */}
              </div>
            </div>
            <table className="min-w-full overflow-hidden text-sm text-center rounded-lg shadow-lg">
              <thead>
                <tr className="text-sm text-gray-600 bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Area</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600 dark:text-gray-300">
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="text-xs transition duration-200 ease-in-out bg-white shadow-md md:text-sm dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                  >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.areaName}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>    
          </div>
        </>
      )}
    </>
  );
};

export default Position;
