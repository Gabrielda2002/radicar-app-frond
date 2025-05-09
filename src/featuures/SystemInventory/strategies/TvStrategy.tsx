import { ReactNode } from "react";
import { IItemsTv } from "../Models/IItemsTv";
import { ItemStrategy } from "./ItemStrategy";
import { Tv } from "lucide-react";
import ModalFormTv from "../Components/Modals/ModalFormTv";
import ModalTablaSeguimientoItem from "../Components/Modals/ModalTablaSeguimientoItem";
import { FormatDate } from "@/utils/FormatDate";

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

  renderBasicInfo(item: IItemsTv): ReactNode {
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
          <strong>Estado: </strong>
          {item.status}
        </li>
        <li>
          <strong>Número de inventario: </strong>
          {item.inventoryNumber}
        </li>
        <li>
          <strong>Ubicación: </strong>
          {item.location}
        </li>
        <li>
          <strong>Responsable: </strong>
          {item.responsableName} {item.responsableLastName || "No asignado"}
        </li>
        <li>
          <strong>Utilidad: </strong>
          {item.utility || "No especificada"}
        </li>
      </>
    );
  }

  renderTechnicalDetails(item: IItemsTv): ReactNode {
    return (
      <>
        <li>
          <strong>Pulgadas: </strong>
          {item.pulgadas}
        </li>
        <li>
          <strong>Tipo de pantalla: </strong>
          {item.screenType}
        </li>
        <li>
          <strong>Resolución: </strong>
          {item.resolution}
        </li>
        <li>
          <strong>Smart TV: </strong>
          {item.smartTv ? "Sí" : "No"}
        </li>
        <li>
          <strong>Sistema operativo: </strong>
          {item.operativeSystem || "N/A"}
        </li>
        <li>
          <strong>Conectividad: </strong>
          {item.connectivity || "N/A"}
        </li>
        <li>
          <strong>Dirección IP: </strong>
          {item.addressIp || "No configurada"}
        </li>
        <li>
          <strong>MAC: </strong>
          {item.mac || "No registrada"}
        </li>
        <li>
          <strong>Número de puertos HDMI: </strong>
          {item.numPuertosHdmi}
        </li>
        <li>
          <strong>Número de puertos USB: </strong>
          {item.numPuertosUsb}
        </li>
        <li>
          <strong>Control remoto: </strong>
          {item.controlRemote ? "Sí" : "No"}
        </li>
      </>
    );
  }

  renderAdditionalInfo(item: IItemsTv): ReactNode {
    return (
      <>
        <li>
          <strong>Fecha de compra: </strong>
          {FormatDate(item.purchaseDate, false)}
        </li>
        <li>
          <strong>Fecha de entrega: </strong>
          {FormatDate(item.deliveryDate, false)}
        </li>
        <li>
          <strong>Garantía: </strong>
          {item.warranty === true ? "Sí" : "No"}
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
          {item.observations || "Sin observaciones"}
        </li>
      </>      
    );
  }
}
