import { ReactNode } from "react";
import { IItemsPhone } from "../Models/IItemsPhone";
import { ItemStrategy } from "./ItemStrategy";
import { Smartphone } from "lucide-react";
import ModalFormPhones from "../Components/Modals/ModalFormPhones";
import ModalTablaSeguimientoItem from "../Components/Modals/ModalTablaSeguimientoItem";

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
    handleViewDetails: (item: IItemsPhone) => void
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
    item: IItemsPhone,
    refreshItems: () => void
    // handleOpen?: (nombreSoporte: string | null, ruta: string) => void
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
      </>
    );
  }

  renderAdditionalInfo(item: IItemsPhone): ReactNode {
    return (
      <>
        <li>
          <strong>Acta de Entrega: </strong>
          {item.actaRelation?.name || "No asignada"}
        </li>
        <li>
          <strong>Sede ID: </strong>
          {item.sedeId}
        </li>
        <li>
          <strong>Fecha de Registro: </strong>
          {item.createdAt
            ? new Date(item.createdAt).toLocaleDateString()
            : "No registrada"}
        </li>
        <li>
          <strong>Última Actualización: </strong>
          {item.updatedAt
            ? new Date(item.updatedAt).toLocaleDateString()
            : "No registrada"}
        </li>
        {/* {item.seguimientoRelation && item.seguimientoRelation.length > 0 && (
          <li>
            <strong>Último Seguimiento: </strong>
            {item.seguimientoRelation[0].description || "Sin descripción"} 
            ({new Date(item.seguimientoRelation[0].eventDate).toLocaleDateString()})
          </li>
        )} */}
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
