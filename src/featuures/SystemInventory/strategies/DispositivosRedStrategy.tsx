import { IItemsNetworking } from "@/models/IItemsNetworking";
import { ItemStrategy } from "./ItemStrategy";
import { ReactNode } from "react";
import { CpuChipIcon } from "@heroicons/react/24/outline";
import ModalItemsForm from "../Components/Modals/ModalItemsForm";
import ModalTablaSeguimientoItem from "../Components/Modals/ModalTablaSeguimientoItem";
import ModalItemsDetails from "../Components/Modals/ModalItemsDetails";

export class DispositivosRedStrategy implements ItemStrategy<IItemsNetworking> {
  getName(item: IItemsNetworking): string {
    return item.name;
  }

  getTypeLabel(item: IItemsNetworking): string | null {
    return item.status;
  }

  getIcon(): ReactNode {
    return <CpuChipIcon className="w-8 h-8 mr-2 dark:text-white" />;
  }

  renderDetailsButton(item: IItemsNetworking, tipoItem: string): ReactNode {
    return <ModalItemsDetails item={item} tipoItem={tipoItem} />;
  }

  renderActionButtons(
    item: IItemsNetworking,
    refreshItems: () => void
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
          tipoItem="dispositivos-red"
          refreshItems={refreshItems}
        />
      </>
    );
  }

  renderBasicInfo(item: IItemsNetworking): ReactNode {
    return (
      <>
        <li>
          <strong>Nombre: </strong>
          {item.name}
        </li>
        <li>
          <strong>Marca: </strong>
          {item.brand}
        </li>
        <li>
          <strong>Modelo: </strong>
          {item.model}
        </li>
        <li>
          <strong>Serial: </strong>
          {item.serial}
        </li>
        <li>
          <strong>Numero de inventario: </strong>
          {item.inventoryNumber}
        </li>
      </>
    );
  }

  renderTechnicalDetails(item: IItemsNetworking): ReactNode {
    return (
      <>
        <li>
          <strong>Direccion IP: </strong>
          {item.addressIp}
        </li>
        <li>
          <strong>MAC: </strong>
          {item.mac}
        </li>
      </>
    );
  }

  renderAdditionalInfo(item: IItemsNetworking): ReactNode {
    return (
      <>
        <li>
          <strong>Estado: </strong>
          {item.status}
        </li>
        <li>
          <strong>Otros datos: </strong>
          {item.otherData}
        </li>
      </>
    );
  }

  renderCreateButton(
    idSede: number,
    items: IItemsNetworking,
    refreshItems: () => void,
    idItems: number,
    tipoTtem?: string
    // isUpdate?: boolean
  ): ReactNode {
    return (
      <ModalItemsForm
        idSede={idSede}
        tipoItem={tipoTtem || "dispositivos-red"}
        items={items}
        idItem={idItems}
        onSuccess={refreshItems}
      />
    );
  }
}
