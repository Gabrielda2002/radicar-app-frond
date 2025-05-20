import { Building } from "lucide-react";
import { IItemsGeneral } from "../Models/IItemsGeneral";
import { ItemStrategy } from "./ItemStrategy";
import { ReactNode } from "react";
import ModalFormGeneralItems from "../Components/Modals/ModalFormGeneralItems";
import ModalTablaSeguimientoItem from "../Components/Modals/ModalTablaSeguimientoItem";
import { FormatDate } from "@/utils/FormatDate";
import ModalItemsDetails from "../Components/Modals/ModalItemsDetails";

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

  renderDetailsButton(item: IItemsGeneral, tipoItem: string): ReactNode {
    return <ModalItemsDetails item={item} tipoItem={tipoItem} />;
  }

  renderActionButtons(
    item: IItemsGeneral,
    refreshItems: () => void
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

  renderBasicInfo(item: IItemsGeneral): ReactNode {
    return (
      <div className="space-y-2">
        <li>
          <strong>Nombre: </strong>
          {item.name}
        </li>
        <li>
          <strong>Clasificación: </strong>
          {item.classification}
        </li>
        <li>
          <strong>Activo: </strong>
          {item.asset}
        </li>
        <li>
          <strong>Material: </strong>
          {item.material}
        </li>
        <li>
          <strong>Estado: </strong>
          {item.status}
        </li>
        <li>
          <strong>Responsable: </strong>
          {item.responsable}
        </li>
        <li>
          <strong>Tipo de Área: </strong>
          {item.assetType}
        </li>
      </div>
    );
  }

  renderTechnicalDetails(item: IItemsGeneral): ReactNode {
    return (
      <div className="space-y-2">
        <li>
          <strong>Identificación: </strong>
          <ul className="ml-4">
            <li>Marca: {item.brand}</li>
            <li>Modelo: {item.model}</li>
            <li>Número de Serie: {item.serialNumber}</li>
            <li>Número de Inventario: {item.inventoryNumber}</li>
          </ul>
        </li>
        <li>
          <strong>Ubicación: </strong>
          <ul className="ml-4">
            <li>Sede: {item.headquarters}</li>
            <li>Área dependencia: {item.dependencyArea}</li>
            <li>Tipo de Área: {item.areaType}</li>
          </ul>
        </li>
        <li>
          <strong>Detalles Adicionales: </strong>
          {item.otherDetails}
        </li>
      </div>
    );
  }

  renderAdditionalInfo(item: IItemsGeneral): ReactNode {
    return (
      <div className="space-y-2">
        <li>
          <strong>Información de Compra: </strong>
          <ul className="ml-4">
            <li>
              Fecha de Adquisición: {FormatDate(item.acquisitionDate, false)}
            </li>
            <li>Valor de Compra: {item.purchaseValue}</li>
          </ul>
        </li>
        <li>
          <strong>Garantía: </strong>
          <ul className="ml-4">
            <li>Número: {item.warranty}</li>
            <li>Período: {item.warrantyPeriod}</li>
          </ul>
        </li>
        <li>
          <strong>Cantidad: </strong>
          {item.quantity}
        </li>
        <li>
          <strong>Fechas: </strong>
          <ul className="ml-4">
            <li>Creación: {FormatDate(item.createdAt, false)}</li>
            <li>Última Actualización: {FormatDate(item.updatedAt, false)}</li>
          </ul>
        </li>
      </div>
    );
  }

  renderCreateButton(
    idSede: number,
    items: IItemsGeneral,
    refreshItems: () => void
    // idItems: number,
    // tipoTtem?: string,
    // isUpdate?: boolean
  ): ReactNode {
    return (
      <ModalFormGeneralItems
        idSede={idSede}
        tipoItem={"inventario/general"}
        isUpdate={false}
        items={items}
        refreshItems={refreshItems}
      />
    );
  }
}
