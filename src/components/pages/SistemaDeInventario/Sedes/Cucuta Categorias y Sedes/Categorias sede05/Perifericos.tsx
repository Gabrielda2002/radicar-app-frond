import { useState } from "react";
import { Menu } from "@headlessui/react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  PencilSquareIcon,
  InformationCircleIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import ModalSection from "../../../../../ModalSection";

type TipoPeriferico = "Entrada" | "Salida";

type Periferico = {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  serie: string;
  tipo: TipoPeriferico;
  subtipo: string;
  estado: string;
};

const Perifericos = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Periferico | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });

  const perifericos: Periferico[] = [
    {
      id: 1,
      nombre: "Mouse Óptico",
      marca: "Logitech",
      modelo: "M185",
      serie: "S/N LGT123456789",
      tipo: "Entrada",
      subtipo: "Mouse",
      estado: "activo",
    },
    {
      id: 2,
      nombre: "Teclado Mecánico",
      marca: "Corsair",
      modelo: "K70 RGB",
      serie: "S/N COR987654321",
      tipo: "Entrada",
      subtipo: "Teclado",
      estado: "activo",
    },
    {
      id: 3,
      nombre: "Monitor LED",
      marca: "Dell",
      modelo: "P2419H",
      serie: "S/N DEL246810121",
      tipo: "Salida",
      subtipo: "Pantalla",
      estado: "activo",
    },
    {
      id: 4,
      nombre: "Impresora Láser",
      marca: "HP",
      modelo: "LaserJet Pro M404dn",
      serie: "S/N HP135792468",
      tipo: "Salida",
      subtipo: "Impresora",
      estado: "inactivo",
    },
    {
      id: 5,
      nombre: "Escáner de Documentos",
      marca: "Epson",
      modelo: "WorkForce ES-400",
      serie: "S/N EPS159753147",
      tipo: "Entrada",
      subtipo: "Scanner",
      estado: "activo",
    },
  ];

  const filteredPerifericos = perifericos
    .filter((perif) => {
      const matchesCategory =
        activeTab === "todos" || perif.subtipo.toLowerCase() === activeTab;
      const matchesSearch =
        perif.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perif.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perif.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perif.serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perif.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perif.subtipo.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortConfig.key) {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  const requestSort = (key: keyof Periferico) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleCreateDevice = () => {
    console.log("Crear Dispositivo seleccionado");
    // Aquí puedes agregar la lógica para abrir un modal o navegar a la sección de creación de dispositivos
  };

  return (
    <>
      <ModalSection
        title="Modulo Inventario - Periféricos"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Sistema de Inventario", path: "/SistemaDeInventario" },
          { label: "/ Cúcuta", path: "/SistemaDeInventario/Cucuta" },
          { label: "/ Sede 05", path: "/SistemaDeInventario/Cucuta/Sede05" },
          { label: "/ Periféricos", path: "" },
        ]}
      />
      <div className="flex flex-col w-full h-full p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        <div className="flex items-center justify-end mb-4">
          <Menu as="div" className="relative inline-block text-right">
            <Menu.Button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center gap-x-1.5 rounded-md dark:text-white bg-white dark:bg-gray-500 px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Nuevo
              <PlusIcon
                className={`w-6 h-6 -mr-1 text-gray-800 dark:text-white duration-300 transform ${
                  open ? "rotate-[132deg]" : ""
                }`}
              />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 w-56 mt-2 transition origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-500 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleCreateDevice}
                    className={`${
                      active ? "bg-gray-100 dark:bg-gray-600" : ""
                    } block w-full text-left px-4 py-2 text-gray-800 dark:text-white`}
                  >
                    <div className="flex justify-between">
                      Crear Dispositivo
                      <ComputerDesktopIcon className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                    </div>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
        <div className="flex w-full gap-4 mb-4">
          <div className="flex-1">
            <label className="text-xl dark:text-white">Buscar Item:</label>
            <div className="relative mt-2">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 border-2 border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 mb-4 text-lg text-gray-900 dark:text-gray-100">
          Mostrando {filteredPerifericos.length} periféricos
        </div>
        <div className="overflow-y-auto">
          <div className="flex w-full mb-4">
            <div className="grid w-full grid-cols-6 gap-4 p-3 rounded-lg dark:text-white">
              {[
                "todos",
                "mouse",
                "teclado",
                "pantalla",
                "impresora",
                "scanner",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center justify-center p-2 duration-300 border-2 rounded-lg ${
                    activeTab === tab
                      ? "border-gray-600 bg-gray-200 dark:bg-gray-700"
                      : "hover:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <table className="min-w-full overflow-hidden text-sm text-center rounded-lg shadow-lg">
            <thead>
              <tr className="text-sm text-center bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                {[
                  "id",
                  "nombre",
                  "marca",
                  "modelo",
                  "serie",
                  "tipo",
                  "subtipo",
                  "estado",
                ].map((key) => (
                  <th
                    key={key}
                    className="p-3 cursor-pointer"
                    onClick={() => requestSort(key as keyof Periferico)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig.key === key && (
                      <span>
                        {sortConfig.direction === "asc" ? " ▲" : " ▼"}
                      </span>
                    )}
                  </th>
                ))}
                <th className="p-1">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm dark:text-gray-200">
              {filteredPerifericos.map((periferico) => (
                <tr
                  key={periferico.id}
                  className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  <td className="p-3 border-b dark:border-gray-700">
                    {periferico.id}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    {periferico.nombre}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    {periferico.marca}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    {periferico.modelo}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    {periferico.serie}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    {periferico.tipo}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    {periferico.subtipo}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        periferico.estado === "activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {periferico.estado}
                    </span>
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    <button className="p-3" title="Ver Detalles">
                      <InformationCircleIcon className="w-8 h-8 text-gray-900 dark:invert" />
                    </button>
                    <button className="p-3" title="Editar Información">
                      <PencilSquareIcon className="w-8 h-8 text-gray-900 dark:invert" />
                    </button>
                    <button className="p-3" title="Borrar Articulo">
                      <TrashIcon className="w-8 h-8 text-gray-900 dark:invert" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Perifericos;
