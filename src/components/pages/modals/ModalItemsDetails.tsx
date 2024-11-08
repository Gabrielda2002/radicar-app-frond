import React from "react";
import { IItems } from "../../../models/IItems";
import { IItemsNetworking } from "../../../models/IItemsNetworking";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";

interface ModalItemsDetailsProps {
  item: IItems | IItemsNetworking | null;
  onClose: () => void;
}

const ModalItemsDetails: React.FC<ModalItemsDetailsProps> = ({
  item,
  onClose,
}) => {

    const formatDate = (date: Date | null) => {
        if (!date) return 'N/A';
        const utcDate = toZonedTime(date, 'America/Bogota'); // Reemplaza con la zona horaria deseada
        return format(utcDate, 'dd/MM/yyyy');
      };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Detalles del dispositivo</h3>
        <ul>
          <li><strong>Nombre: </strong>{item?.name}</li>

          {item && ('area' in item) && (
            <li><strong>Area: </strong>{item.area}</li>
          )}

            {item && ('typeEquipment' in item) && (
                <li><strong>Tipo Equipo: </strong>{item.typeEquipment}</li>
            )}

            <li><strong>Marca: </strong>{item?.brand}</li>

            <li><strong>Modelo: </strong>{item?.model}</li>

            <li><strong>Serial: </strong>{item?.serial}</li>

            {item && ('operatuingSystem' in item) && (
                <li><strong>Sistema Operativo: </strong>{item.operatuingSystem}</li>
            )}

            <li><strong>Direccion Ip: </strong>{item?.addressIp}</li>

            <li><strong>Mac: </strong>{item?.mac}</li>

            {item && ('purchaseDate' in item) && (
                <li><strong>Fecha Compra: </strong>{formatDate(item.purchaseDate)}</li>
            )}

            {item && ('warrantyTime' in item) && (
                <li><strong>Tiempo Garantia: </strong>{item.warrantyTime}</li>
            )}

            {item && ('otherData' in item) && (
                <li><strong>Otros Datos: </strong>{item.otherData}</li>
            )}

            {item && ('warranty' in item) && (
                <li><strong>Otros Datos: </strong>{item.warranty ? "Si" : "No"}</li>
            )}
            
            {item && ('deliveryDate' in item) && (
                <li><strong>Fecha Entrega: </strong>{formatDate(item.deliveryDate)}</li>
            )}

            {item && ('status' in item) && (
                <li><strong>Estado: </strong>{item.status}</li>
            )}

            <li><strong>Numero Inventario: </strong>{item?.inventoryNumber}</li>

        </ul>
        <button onClick={onClose} className="btn btn-secondary mt-4">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalItemsDetails;
