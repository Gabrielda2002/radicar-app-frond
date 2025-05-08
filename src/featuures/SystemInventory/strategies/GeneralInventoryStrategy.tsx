import { Building } from "lucide-react";
import { IItemsGeneral } from "../Models/IItemsGeneral";
import { ItemStrategy } from "./ItemStrategy";
import { ReactNode } from "react";
import ModalFormGeneralItems from "../Components/Modals/ModalFormGeneralItems";
import ModalTablaSeguimientoItem from "../Components/Modals/ModalTablaSeguimientoItem";

export class GeneralInventoryStrategy implements ItemStrategy<IItemsGeneral> {
  getName(item: IItemsGeneral): string {
    return item.name;
  }

  getTypeLabel(item: IItemsGeneral): string | null {
    return item.status;
  }

  getIcon() {
    return <Building className="w-8 h-8 mr-2 dark:text-white" />;
  }

  renderDetailsButton(
    item: IItemsGeneral,
    handleViewDetails: (item: IItemsGeneral) => void
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
    item: IItemsGeneral,
    refreshItems: () => void,
  ): ReactNode {
    return (
      <>
        <ModalFormGeneralItems
          idSede={null}
          tipoItem="inventario/general"
          isUpdate={true}
          items={item}
          refreshItems={refreshItems}
        />

        <ModalTablaSeguimientoItem
          Items={item}
          tipoItem="inventario/general"
          refreshItems={refreshItems}
        />
      </>
    );
  }
}
