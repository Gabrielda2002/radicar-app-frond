import { ReactNode } from "react";
import { IItemsTv } from "../Models/IItemsTv";
import { ItemStrategy } from "./ItemStrategy";
import { Tv } from "lucide-react";
import ModalFormTv from "../Components/Modals/ModalFormTv";
import ModalTablaSeguimientoItem from "../Components/Modals/ModalTablaSeguimientoItem";

export class TelevisoresStrategy implements ItemStrategy<IItemsTv> {
  getName(item: IItemsTv): string {
    return item.name;
  }

  getTypeLabel(item: IItemsTv): string | null {
    return item.status;
  }

  getIcon(): ReactNode {
    return <Tv className="w-8 h-8 mr-2 dark:text-white" />;
  }

  renderDetailsButton(
    item: IItemsTv,
    handleViewDetails: (item: IItemsTv) => void
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

  renderActionButtons(item: IItemsTv, refreshItems: () => void): ReactNode {
    return (
      <>
        <ModalFormTv sedeId={null} refreshItems={refreshItems} items={item} />
        <ModalTablaSeguimientoItem
          Items={item}
          tipoItem='inventario/televisores'
          refreshItems={refreshItems}
        />
      </>
    );
  }
}
