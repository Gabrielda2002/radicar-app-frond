import { ReactNode } from "react";
import { IItemsPhone } from "../Models/IItemsPhone";
import { ItemStrategy } from "./ItemStrategy";
import { Smartphone } from "lucide-react";
import ModalFormPhones from "../Components/Modals/ModalFormPhones";
import ModalTablaSeguimientoItem from "../Components/Modals/ModalTablaSeguimientoItem";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import ModalItemsDetails from "../Components/Modals/ModalItemsDetails";

export class PhoneStrategy implements ItemStrategy<IItemsPhone> {
  getName(item: IItemsPhone): string {
    return item.name;
  }

  getTypeLabel(item: IItemsPhone): string | null {
    return item.operativeSystem;
  }

  getIcon(): ReactNode {
    return <Smartphone className="w-8 h-8 mr-2 dark:text-white" />;
  }

  renderDetailsButton(
    item: IItemsPhone,
    tipoItem: string
  ): ReactNode {
    return (
      <ModalItemsDetails
        item={item}
        tipoItem={tipoItem}
      />
    );
  }

  renderActionButtons(
    item: IItemsPhone,
    refreshItems: () => void,
    handleOpen?: (fileId: string, action: "VIEW" | "DOWNLOAD", type?: "files" | "soporte") => Promise<void>
  ): ReactNode {
    return (
      <>
        <ModalFormPhones
          sedeId={null}
          refreshItems={refreshItems}
          items={item}
        />
        <ModalTablaSeguimientoItem
          Items={item}
          tipoItem="inventario/celulares"
          refreshItems={refreshItems}
        />
        {/* falta boton para abrir actas */}
        <div className="relative group">
          <button
            type="button"
            className="p-2 duration-200 border-2 rounded-md hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
            onClick={() => handleOpen && handleOpen(item.documentId.toString(), "VIEW", "soporte")}
            aria-label="Acta de entrega"
          >
            <ClipboardDocumentCheckIcon className="w-7 h-7" />
          </button>
          {/* Tooltip */}
        </div>
      </>
    );
  }

  renderBasicInfo(item: IItemsPhone): ReactNode {
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
          <strong>Responsable: </strong>
          {item.responsableName} {item.responsableLastName || "No asignado"}
        </li>
        <li>
          <strong>Número telefónico: </strong>
          {item.phoneNumber || "No registrado"}
        </li>
        <li>
          <strong>Operador: </strong>
          {item.operador || "No registrado"}
        </li>
        <li>
          <strong>Plan: </strong>
          {item.typePlan || "No registrado"}
        </li>
      </>
    );
  }

  renderTechnicalDetails(item: IItemsPhone): ReactNode {
    return (
      <>
        <li>
          <strong>IMEI: </strong>
          {item.imei || "No registrado"}
        </li>
        <li>
          <strong>Sistema Operativo: </strong>
          {item.operativeSystem || "No especificado"}
        </li>
        <li>
          <strong>Versión SO: </strong>
          {item.versionSO || "No especificada"}
        </li>
        <li>
          <strong>Almacenamiento: </strong>
          {item.storage || "No especificado"}
        </li>
        <li>
          <strong>Memoria RAM: </strong>
          {item.storageRam || "No especificado"}
        </li>
        <li>
          <strong>MAC WiFi: </strong>
          {item.macWifi || "No registrada"}
        </li>
        <li>
          <strong>Dirección Bluetooth: </strong>
          {item.addressBluetooth || "No registrada"}
        </li>
        <li>
          <strong>Protector: </strong>
          {item.protectorCase ? "Sí" : "No"}
        </li>
        <li>
          <strong>Vidrio Templado: </strong>
          {item.temperedGlass ? "Sí" : "No"}
        </li>
      </>
    );
  }

  renderAdditionalInfo(item: IItemsPhone): ReactNode {
    return (
      <>
        <li>
          <strong>Estado: </strong>
          {item.status || "No especificado"}
        </li>
        <li>
          <strong>Fecha de compra: </strong>
          {item.purchaseDate
            ? new Date(item.purchaseDate).toLocaleDateString()
            : "No registrada"}
        </li>
        <li>
          <strong>Fecha de entrega: </strong>
          {item.deliveryDate
            ? new Date(item.deliveryDate).toLocaleDateString()
            : "No registrada"}
        </li>
        <li>
          <strong>Fecha vencimiento plan: </strong>
          {item.dueDatePlan
            ? new Date(item.dueDatePlan).toLocaleDateString()
            : "No registrada"}
        </li>
        <li>
          <strong>Garantía: </strong>
          {item.warranty ? "Sí" : "No"}
        </li>
        <li>
          <strong>Tiempo de garantía: </strong>
          {item.warrantyTime || "No especificado"}
        </li>
        <li>
          <strong>Valor de adquisición: </strong>
          {item.acquisitionValue || "No registrado"}
        </li>
        <li>
          <strong>Observaciones: </strong>
          {item.observation || "Sin observaciones"}
        </li>
        <li>
          <strong>Numero Inventario: </strong>
          {item.inventoryNumber || "Sin numero de inventario"}
        </li>
      </>
    );
  }

  renderCreateButton(
    idSede: number,
    items: IItemsPhone,
    refreshItems: () => void,
    // idItems: number,
    // tipoTtem?: string,
    // isUpdate?: boolean
  ): ReactNode {
    return (
      <ModalFormPhones
        sedeId={idSede}
        refreshItems={refreshItems} 
        items={items}
      />
    );
  }
}
