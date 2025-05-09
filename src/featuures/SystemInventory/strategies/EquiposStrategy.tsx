import { ComputerDesktopIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { ItemStrategy } from './ItemStrategy';
import { IItems } from '@/models/IItems';
import ModalItemsForm from '../Components/Modals/ModalItemsForm';
import ModalTablaseguimientoItem from '../Components/Modals/ModalTablaSeguimientoItem';
import ModalAccesorioItem from '../Components/Modals/ModalAccesorioItem';
import { ReactNode } from "react";
import { FormatDate } from "@/utils/FormatDate";

export class EquiposStrategy implements ItemStrategy<IItems> {
  getName(item: IItems): string {
    return item.nameEquipment;
  }
  
  getTypeLabel(item: IItems): string {
    return item.typeEquipment;
  }
  
  getIcon() {
    return <ComputerDesktopIcon className="w-8 h-8 mr-2 dark:text-white" />;
  }
  
  renderDetailsButton(item: IItems, handleViewDetails: (item: IItems) => void) {
    return (
      <button
        onClick={() => handleViewDetails(item)}
        className="px-3 py-1 transition-colors duration-300 bg-gray-200 rounded-md text-pretty hover:text-white hover:bg-gray-700 dark:text-white dark:bg-color dark:hover:bg-teal-600"
      >
        Ver detalles
      </button>
    );
  }
  
  renderActionButtons(item: IItems, refreshItems: () => void, handleOpen: (nombreSoporte: string | null, ruta: string) => void) {
    // Aquí puedes usar hooks customizados si lo necesitas
    
    return (
      <>
        <ModalItemsForm
          idSede={null}
          tipoItem="equipos"
          items={item}
          idItem={item.id}
          onSuccess={refreshItems}
        />
        <ModalTablaseguimientoItem
          Items={item}
          tipoItem="equipos"
          refreshItems={refreshItems}
        />
        <ModalAccesorioItem id={item.id} />
        <div className="relative group">
          <button
            type="button"
            className="p-2 duration-200 border-2 rounded-md hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
            onClick={() => handleOpen(item.nameDocument || "", "ActasEntrega")}
            aria-label="Acta de entrega"
          >
            <ClipboardDocumentCheckIcon className="w-7 h-7" />
          </button>
          {/* Tooltip */}
        </div>
      </>
    );
  }

  renderBasicInfo(item: IItems): ReactNode {
    return (
      <div className="space-y-2">
        <li>
          <strong>Nombre: </strong>
          {item.nameEquipment}
        </li>
        <li>
          <strong>Tipo: </strong>
          {item.typeEquipment}
        </li>
        <li>
          <strong>Marca: </strong>
          {item.brandEquipment}
        </li>
        <li>
          <strong>Modelo: </strong>
          {item.modelEquipment}
        </li>
        <li>
          <strong>Responsable: </strong>
          {item.nameUser} {item.lastNameUser}
        </li>
        <li>
          <strong>Candado: </strong>
          {item.lock ? "Si" : "No"}
        </li>
        <li>
          <strong>Clave: </strong>
          {item.lockKey}
        </li>
      </div>
    );
  }

  renderTechnicalDetails(item: IItems): ReactNode {
    return (
      <div className="space-y-2">
        <li>
          <strong>Serial: </strong>
          {item.serialEquipment}
        </li>
        <li>
          <strong>DHCP: </strong>
          {item.dhcp ? "Sí" : "No"}
        </li>
        <li>
          <strong>Direccion IP: </strong>
          {item.addressIp}
        </li>
        <li>
          <strong>MAC: </strong>
          {item.mac}
        </li>
        <li>
          <strong>Sistema Operativo: </strong>
          {item.operationalSystem}
        </li>
      </div>
    );
  }

  renderAdditionalInfo(item: IItems): ReactNode {
    return (
      <div className="space-y-2">
        <li>
          <strong>Area: </strong>
          {item.area}
        </li>
        <li>
          <strong>Fecha de Adquisición: </strong>
          {FormatDate(item.purchaseDate, false)}
        </li>
        <li>
          <strong>Garantía: </strong>
          {item.warranty ? "Sí" : "No"}
        </li>
        <li>
          <strong>Timepo de Garantia: </strong>
          {item.warrantyTime}
        </li>
        <li>
          <strong>Fecha de entrega: </strong>
          {FormatDate(item.deliveryDate, false)}
        </li>
        <li>
          <strong>Numero de inventario: </strong>
          {item.inventoryNumberEquipment}
        </li>
      </div>
    );
  }
}

// Implementa de manera similar las demás estrategias