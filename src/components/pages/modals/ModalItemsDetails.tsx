import { format } from "date-fns";
import React from "react";
import { toZonedTime } from "date-fns-tz";
import { IItems } from "../../../models/IItems";
import { IItemsNetworking } from "../../../models/IItemsNetworking";

interface ModalItemsDetailsProps {
  item: IItems | IItemsNetworking | null;
  onClose: () => void;
}
  
const ModalItemsDetails: React.FC<ModalItemsDetailsProps> = ({
  item,
  onClose,
}) => {
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    const utcDate = toZonedTime(date, "America/Bogota"); // Reemplaza con la zona horaria deseada
    return format(utcDate, "dd/MM/yyyy");
  };
  
  return (
    <section className="fixed inset-0 flex items-center justify-center p-56 bg-gray-800 bg-opacity-50">
      <div className="w-full p-6 bg-white rounded-md shadow-lg dark:bg-gray-700">
        <h3 className="mb-4 text-3xl font-semibold dark:text-white">
          Detalles del dispositivo
        </h3>
        <div className="grid grid-cols-3 gap-2 p-2 border-2 rounded">
          <div className="border-r-2">
            {/* Informacion general del equipo */}
            <ul className="dark:text-white">
              <h4 className="mb-2 text-xl font-semibold">
                Información general:
              </h4>
              <li>
                <strong>Nombre: </strong>
                {item?.name}
              </li>
              {item && "area" in item && (
                <li>
                  <strong>Area: </strong>
                  {item.area}
                </li>
              )}
              {item && "typeEquipment" in item && (
                <li>
                  <strong>Tipo Equipo: </strong>
                  {item.typeEquipment}
                </li>
              )}
              <li>
                <strong>Marca: </strong>
                {item?.brand}
              </li>
              <li>
                <strong>Modelo: </strong>
                {item?.model}
              </li>
              <li>
                <strong>Serial: </strong>
                {item?.serial}
              </li>
              {item && "operationalSystem" in item && (
                <li>
                  <strong>Sistema Operativo: </strong>
                  {item.operationalSystem}
                </li>
              )}
              <li>
                <strong>Direccion Ip: </strong>
                {item?.addressIp}
              </li>
              <li>
                <strong>Mac: </strong>
                {item?.mac}
              </li>
              {item && "purchaseDate" in item && (
                <li>
                  <strong>Fecha Compra: </strong>
                  {formatDate(item.purchaseDate)}
                </li>
              )}
              {item && "warrantyTime" in item && (
                <li>
                  <strong>Tiempo Garantia: </strong>
                  {item.warrantyTime}
                </li>
              )}
              {item && "otherData" in item && (
                <li>
                  <strong>Otros Datos: </strong>
                  {item.otherData}
                </li>
              )}
              {item && "warranty" in item && (
                <li>
                  <strong>Otros Datos: </strong>
                  {item.warranty ? "Si" : "No"}
                </li>
              )}
              {item && "deliveryDate" in item && (
                <li>
                  <strong>Fecha Entrega: </strong>
                  {formatDate(item.deliveryDate)}
                </li>
              )}
              {item && "status" in item && (
                <li>
                  <strong>Estado: </strong>
                  {item.status}
                </li>
              )}
              <li>
                <strong>Numero Inventario: </strong>
                {item?.inventoryNumber}
              </li>
            </ul>
          </div>

          <div className="border-r-2">
            {/* accesorios de cada equipo */}
            {item &&
              "accessoriesRelation" in item &&
              item.accessoriesRelation.length > 0 && (
                <>
                  <ul className="dark:text-white">
                    <h4 className="mb-2 text-xl font-semibold">Perifericos:</h4>
                    {item.accessoriesRelation.map((acc) => (
                      <li key={acc.id}>
                        <strong>Nombre: </strong>
                        {acc.name}
                        <br />
                        <strong>Marca: </strong>
                        {acc.brand}
                        <br />
                        <strong>Modelo: </strong>
                        {acc.model}
                        <br />
                        <strong>Serial: </strong>
                        {acc.serial}
                        <br />
                        <strong>Otros Datos: </strong>
                        {acc.otherData}
                        <br />
                        <strong>Estado: </strong>
                        {acc.status}
                        <br />
                        <strong>Numero Inventario: </strong>
                        {acc.inventoryNumber}
                      </li>
                    ))}
                  </ul>
                </>
              )}
          </div>

          <div>
            {/* software del equipo */}
            {item &&
              "softwareRelation" in item &&
              item.softwareRelation.length > 0 && (
                <>
                  <ul className="dark:text-white">
                    <h4 className="mb-2 text-xl font-semibold">Software:</h4>
                    {item.softwareRelation.map((soft) => (
                      <li key={soft.id}>
                        <strong>Nombre: </strong>
                        {soft.name}
                        <br />
                        <strong>Versión: </strong>
                        {soft.versions}
                        <br />
                        <strong>Licencia: </strong>
                        {soft.license}
                        <br />
                        <strong>Otros Datos: </strong>
                        {soft.otherData}
                        <br />
                        <strong>Fecha Instalación: </strong>
                        {formatDate(soft.installDate)}
                        <br />
                        <strong>Estado: </strong>
                        {soft.status}
                      </li>
                    ))}
                  </ul>
                </>
              )}
          </div>

          <div>
            {/* componentes del equipo */}
            {item &&
              "componentRelation" in item &&
              item.componentRelation.length > 0 && (
                <>
                  <ul>
                    <h4 className="mt-4 text-lg font-semibold">Componentes</h4>
                    {item.componentRelation.map((comp) => (
                      <li key={comp.id}>
                        <strong>Nombre: </strong>
                        {comp.name}
                        <br />
                        <strong>Marca: </strong>
                        {comp.brand}
                        <br />
                        <strong>Capacidad: </strong>
                        {comp.capacity}
                        <br />
                        <strong>Velocidad: </strong>
                        {comp.speed}
                        <br />
                        <strong>Otros Datos: </strong>
                        {comp.otherData}
                        <br />
                        <strong>Modelo: </strong>
                        {comp.model}
                        <br />
                        <strong>Serial: </strong>
                        {comp.serial}
                      </li>
                    ))}
                  </ul>
                </>
              )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 px-12 mt-4 duration-200 border rounded btn btn-secondary hover:bg-gray-300 dark:text-white dark:bg-color dark:hover:bg-teal-600"
        >
          Cerrar
        </button>
      </div>
    </section>
  );
};

export default ModalItemsDetails;
