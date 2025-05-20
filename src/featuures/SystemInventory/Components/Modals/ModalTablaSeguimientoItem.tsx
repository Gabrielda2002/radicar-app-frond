import React, { useState, useMemo } from "react";
import { IItems } from "@/models/IItems";
import useAnimation from "@/hooks/useAnimations";
import ModalSeguimientoItem from "./ModalSeguimientoItem";
import { IItemsNetworking } from "@/models/IItemsNetworking";
import { IItemsGeneral } from "../../Models/IItemsGeneral";
import { IItemsTv } from "../../Models/IItemsTv";
//*Icons
import {
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { FormatDate } from "@/utils/FormatDate";
import { AnyItem } from "../../strategies/ItemStrategy";
import { IItemsPhone } from "../../Models/IItemsPhone";

interface ModalTablaseguimientoItemProps {
  Items: AnyItem;
  tipoItem:
    | "equipos"
    | "dispositivos-red"
    | "inventario/general"
    | "inventario/televisores"
    | "inventario/celulares"
    | null;
  refreshItems: () => void;
}

const ModalTablaSeguimientoItem: React.FC<ModalTablaseguimientoItemProps> = ({
  Items,
  tipoItem,
  refreshItems,
}) => {
  const [stadopen, setStadopen] = useState(false);
  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );
  useBlockScroll(stadopen);

  // Método para obtener los datos de seguimiento según el tipo de item
  const getSeguimientoData = useMemo(() => {
    if (!Items) return [];

    switch (tipoItem) {
      case "equipos":
        return (Items as IItems).processEquipment || [];
      case "dispositivos-red":
        return (Items as IItemsNetworking).seguimiento || [];
      case "inventario/general":
        return (Items as IItemsGeneral).seguimiento || [];
      case "inventario/televisores":
        return (Items as IItemsTv).seguimiento || [];
      case "inventario/celulares":
        return (Items as IItemsPhone).seguimientoRelation || [];
      default:
        return [];
    }
  }, [Items, tipoItem]);

  // ID del item
  const itemId = useMemo(() => {
    if (!Items) return 0;
    return Items.id;
  }, [Items]);

  const renderTrackingTable = (trackingData: any[]) => {
    if (trackingData.length === 0) {
      return (
        <div className="flex items-center justify-center p-4 text-xl text-gray-900 dark:text-gray-300">
          No hay seguimientos para asignar o no hay asignados.
        </div>
      );
    }

    return (
      <div className="p-4">
        <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow-md">
          <thead className="bg-gray-100 dark:bg-gray-900 dark:text-white">
            <tr>
              <th className="flex items-center p-3 text-left">
                <ClockIcon className="w-8 h-8 mr-2" /> Fecha
              </th>
              <th className="p-3 text-left">
                <DocumentTextIcon className="inline-block w-8 h-8 mr-2" /> Tipo
                de Evento
              </th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left">
                <UserIcon className="inline-block w-8 h-8 mr-2" /> Usuario
              </th>
            </tr>
          </thead>
          <tbody className=" dark:bg-gray-800">
            {trackingData.map((s, key) => (
              <tr
                key={key}
                className="truncate transition-colors border-b last:border-b-0 hover:bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                <td className="p-3 text-gray-600 dark:text-white">
                  {FormatDate(s.eventDate, false)}
                </td>
                <td className="p-3 font-medium dark:text-white">
                  {s.typeEvent}
                </td>
                <td
                  className="p-3 overflow-hidden text-gray-700 truncate whitespace-normal dark:text-white max-h-12 text-ellipsis"
                  title={s.description}
                >
                  {s.description}
                </td>

                <td className="p-3 text-gray-500 dark:text-white">
                  {s.responsableName} {s.responsableLastName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="relative group">
        <button
          className="p-2 duration-200 border rounded-md hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
          onClick={() => setStadopen(true)}
        >
          <WrenchScrewdriverIcon className="w-7 h-7" />
        </button>
        {/* Tooltip */}
        <div className="absolute z-10 px-2 py-1 text-sm text-white transition-opacity duration-200 transform -translate-x-1/2 translate-y-1 bg-gray-800 rounded-md opacity-0 pointer-events-none left-1/2 group-hover:opacity-100 dark:bg-gray-900">
          Seguimientos
          {/* Flechita indicativa */}
          <div className="absolute z-0 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-gray-800 bottom-[22px] left-1/2 dark:bg-gray-900"></div>
        </div>
      </div>

      {stadopen && (
        <div
          className={`fixed inset-0 z-40 flex justify-center p-16 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section className="">
            <div
              className={`w-[90vw] h-[60vh] overflow-hidden bg-white rounded shadow-lg dark:bg-gray-600 transition-transform duration-300 transform ${
                showAnimation && !closing ? "translate-y-0" : "translate-y-10"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 border-b-gray-900 dark:bg-gray-600 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                  Seguimiento de Items
                </h1>
                <button
                  onClick={() => setStadopen(false)}
                  className="text-xl text-gray-400 duration-200 rounded-md h-7 w-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900 dark:text-gray-100 "
                >
                  &times;
                </button>
              </div>

              <div className=" h-full overflow-y-auto dark:bg-gray-800 dark:text-gray-200">
                <div className="px-2 py-3">
                  <ModalSeguimientoItem
                    id={itemId}
                    tipoItem={tipoItem}
                    refreshItems={refreshItems}
                  />
                </div>

                <div>{renderTrackingTable(getSeguimientoData)}</div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ModalTablaSeguimientoItem;
