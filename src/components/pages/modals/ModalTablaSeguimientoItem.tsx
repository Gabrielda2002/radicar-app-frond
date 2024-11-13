//*Funciones y Hooks
import React, { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import { IItems } from "../../../models/IItems";
import { IItemsNetworking } from "../../../models/IItemsNetworking";
import { format } from "date-fns";
import ModalSeguimientoItem from "./ModalSeguimientoItem";

interface ModalTablaseguimientoItemProps {
  Items: IItems | IItemsNetworking | null;
  tipoItem: "equipos" | "dispositivos-red" | null;
}

const ModalTablaseguimientoItem: React.FC<ModalTablaseguimientoItemProps> = ({ Items, tipoItem }) => {
  const [stadopen, setStadopen] = useState(false);
  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );

  const formatDate = (date: Date | null) => {
    return date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
  };

  return (
    <>
      <button className="focus:outline-none" onClick={() => setStadopen(true)}>
        Seguimiento
      </button>

      {/* init event modal */}
      {stadopen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm">
        <section className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className={`w-[80vw] h-[80vh] overflow-auto bg-white rounded shadow-lg dark:bg-gray-600 transition-transform transform ${
              showAnimation && !closing ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
              {/* container-header */}
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                  Módulos
                </h1>
                <button
                  onClick={() => setStadopen(false)}
                  className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>
              
              <div>
                <ModalSeguimientoItem
                    id={(Items as IItemsNetworking).id || (Items as IItems).id} 
                    tipoItem={tipoItem}
                />
              </div>
              
              {Items && "seguimientoEquipos" in Items ? (
                <div>
                    {Items.seguimientoEquipos.map((s, key) => {
                        return (
                            <div key={key}>
                                <p>{formatDate(s.eventDate)}</p>
                                <p>{s.eventType}</p>
                                <p>{s.description}</p>
                                <p>{s.userRelation.name}</p>
                            </div>
                        )
                    })}
                </div>
              ): null}

              {Items && "seguimientoDispositivosRedRelation" in Items ? (
                <div>
                    {Items.seguimientoDispositivosRedRelation.map((s, key) => {
                        return (
                            <div key={key}>
                                <p>{formatDate(s.eventDate)}</p>
                                <p>{s.eventType}</p>
                                <p>{s.description}</p>
                                <p>{s.userRelation.name}</p>
                            </div>
                        )
                    })}
                </div>
              ):null}

            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ModalTablaseguimientoItem;
