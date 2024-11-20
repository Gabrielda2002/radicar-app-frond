//*Fuctions and Hooks
import React from "react";
import { IItems } from "../../../models/IItems";
import ModalItemsForm from "../modals/ModalItemsForm";
import ModalItemsDetails from "../modals/ModalItemsDetails";
import ModalAccesorioItem from "../modals/ModalAccesorioItem";
import { IItemsNetworking } from "../../../models/IItemsNetworking";
import ModalTablaseguimientoItem from "../modals/ModalTablaSeguimientoItem";

interface ItemsListProps {
  invetario: IItems[] | IItemsNetworking[] | null;
  tipoItem: "equipos" | "dispositivos-red" | null;
  idSede: number | null;
}

const ItemsList: React.FC<ItemsListProps> = ({
  invetario,
  tipoItem,
  idSede,
}) => {
  const [selected, setSelected] = React.useState<
    IItems | IItemsNetworking | null
  >(null);

  const handleViewDetails = (item: IItems | IItemsNetworking) => {
    setSelected(item);
  };

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <>
      <div className="flex justify-between mb-8">
        <h2 className="flex text-2xl dark:text-white">
          Inventario de {tipoItem}
        </h2>
        <div>
          <ModalItemsForm
            idSede={idSede}
            tipoItem={tipoItem}
            items={null}
            idItem={null}
          />
        </div>
      </div>

      {invetario && invetario.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {invetario?.map((item) => (
            <div key={item.id} className="relative p-4 border-2 rounded-md">
              <h3 className="mb-2 text-2xl font-semibold dark:text-white">
                {tipoItem === "equipos"
                  ? (item as IItems).name
                  : (item as IItemsNetworking).name}
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {/* Add some item details here */}
                {item.model}
              </p>
              <div className="flex flex-wrap justify-between gap-2">
                <button
                  onClick={() => handleViewDetails(item)}
                  className="px-3 py-1 text-sm transition-colors duration-300 bg-gray-300 border rounded-full hover:text-white hover:bg-gray-700 dark:text-white dark:bg-color dark:hover:bg-teal-600"
                >
                  Ver detalles
                </button>
                <div className="flex flex-wrap gap-2">
                  <ModalItemsForm
                    idSede={null}
                    tipoItem={tipoItem}
                    items={item}
                    idItem={item.id}
                  />
                  <ModalTablaseguimientoItem Items={item} tipoItem={tipoItem} />
                  {tipoItem === "equipos" && (
                    <ModalAccesorioItem id={(item as IItems).id} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-xl font-bold text-center text-gray-600 dark:text-white">
          No hay ningún artículo incluido o creado
        </p>
      )}
      {selected && <ModalItemsDetails item={selected} onClose={closeModal} />}
    </>
  );
};

export default ItemsList;
