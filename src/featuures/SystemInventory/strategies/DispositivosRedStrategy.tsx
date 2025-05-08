import { IItemsNetworking } from "@/models/IItemsNetworking";
import { ItemStrategy } from "./ItemStrategy";
import { ReactNode } from "react";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import ModalItemsForm from "../Components/Modals/ModalItemsForm";
import ModalTablaSeguimientoItem from "../Components/Modals/ModalTablaSeguimientoItem";

export class DispositivosRedStrategy implements ItemStrategy<IItemsNetworking> {
  getName(item: IItemsNetworking): string {
    return item.name;
  }

  getTypeLabel(item: IItemsNetworking): string | null {
    return item.status;
  }

  getIcon(): ReactNode {
    return <ListBulletIcon className="w-8 h-8 mr-2 dark:text-white" />;
  }

  renderDetailsButton(
    item: IItemsNetworking,
    handleViewDetails: (item: IItemsNetworking) => void
  ): ReactNode {
    return (
      <button
        onClick={() => handleViewDetails(item)}
        className="px-3 py-1 transition-colors duration-300 bg-gray-200 rounded-md text-pretty hover:text-white hover:bg-gray-700 dark:text-white dark:bg-color dark:hover:bg-teal-600"
      >
        Ver detalles
      </button>
    );
  }

  renderActionButtons(
    item: IItemsNetworking,
    refreshItems: () => void,
  ): ReactNode {
    return (
      <>
        <ModalItemsForm
          idSede={null}
          tipoItem="dispositivos-red"
          items={item}
          idItem={item.id}
          onSuccess={refreshItems}
        />
        <ModalTablaSeguimientoItem
          Items={item}
          tipoItem='dispositivos-red'
          refreshItems={refreshItems}
        />
      </>
    );
  }
}
