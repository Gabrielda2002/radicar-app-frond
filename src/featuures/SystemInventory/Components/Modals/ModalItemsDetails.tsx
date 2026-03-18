import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

//*Icons
import {
  ComputerDesktopIcon,
  CpuChipIcon,
  ServerIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { AnyItem, ItemStrategyFactory } from "../../strategies/ItemStrategy";
import EditableCell from "../EditableCell";
import { useEditableRow } from "../../Hooks/useEditableRow";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmDeletePopup from "@/components/common/ConfirmDeletePopUp/ConfirmDeletePopUp";
import { useStorePeripheral } from "../../Store/useStorePeripheral";
import ModalDefault from "@/components/common/Ui/ModalDefault";

interface ModalItemsDetailsProps {
  item: AnyItem | null;
  tipoItem: string | null;
  refreshItems?: () => void;
}

const ModalItemsDetails: React.FC<ModalItemsDetailsProps> = ({
  item,
  tipoItem,
  refreshItems,
}) => {
  const [activeTab, setActiveTab] = useState("general");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { updatePeripheral, deletePeripheral, isLoading, error } = useStorePeripheral();

  const [openComfirmPop, setOpenComfirmPop] = useState<boolean>(false);

  const [itemToDelete, setItemToDelete] = useState<{
    id: number;
    type: string;
    name: string;
  } | null>(null);


  const handleDeleteClick = (id: number, type: string, name: string) => {
    setItemToDelete({ id, type, name });
    setOpenComfirmPop(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    await deletePeripheral(
      itemToDelete.id,
      itemToDelete.type,
      () => {
        setOpenComfirmPop(false);
        setItemToDelete(null);
        toast.success(`Eliminación exitosa de ${itemToDelete.name}`);
        refreshItems?.();
      }
    );
  };

  const handleCancelDelete = () => {
    setOpenComfirmPop(false);
    setItemToDelete(null);
  };

  const {
    editingRows,
    editedData,
    activeFieldId,
    setActiveFieldId,
    startEditing,
    cancelEditing,
    handleInputChange,
  } = useEditableRow();

  const handleUpdateAccesory = async (id: number, typeItem: string) => {
    // validar que los datos hayan cambiado
    if (!editedData[id]) {
      throw new Error("No hay datos para actualizar");
    }

    await updatePeripheral(id, editedData, typeItem, () => {
      cancelEditing(id);
      toast.success("Periférico actualizado correctamente");
      refreshItems?.();
    });

  };

  const hasChange = (id: number, originalData: any, typeAccesory: string) => {
    if (!editedData[id]) return false;

    const fieldsToCompare =
      typeAccesory === "periferico"
        ? [
          "name",
          "brand",
          "model",
          "serial",
          `description`,
          "status",
          "inventoryNumber",
        ]
        : typeAccesory === "hardware"
          ? [
            "name",
            "brand",
            "capacity",
            "speed",
            `description`,
            "model",
            "serial",
          ]
          : ["name", "versions", "license", "otherData", "installDate", "status"];

    return fieldsToCompare.some((field) => {
      const originalValue = originalData[field];
      const editedValue = editedData[id][field];
      return originalValue !== editedValue;
    });
  };

  const [isMobile, setIsMobile] = useState(false);

  const strategy = tipoItem ? ItemStrategyFactory.getStrategy(tipoItem) : null;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const TableWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-y-auto rounded-lg shadow-md dark:shadow-md dark:shadow-indigo-800 max-h-[60vh]">
      <div className="inline-block min-w-full overflow-x-auto align-middle">
        {children}
      </div>
    </div>
  );
  // renderizado de perifericos
  const renderPerifericosTable = () => {
    return (
      <TableWrapper>
        <table className="w-full bg-white border-collapse rounded-lg shadow-md min-w-150">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900 dark:text-white">
            <tr>
              <th className="p-2">Nombre:</th>
              <th className="p-2">Marca:</th>
              <th className="p-2">Modelo:</th>
              <th className="p-2">Serial:</th>
              <th className="p-2">Otros Datos:</th>
              <th className="p-2">Estado:</th>
              <th className="p-2">Numero Inventario:</th>
              <th className="p-2">Acciones:</th>
              <th className="p-2">Eliminar:</th>
            </tr>
          </thead>
          <tbody className="text-center dark:bg-gray-800">
            {item && "accessories" in item && item.accessories.length > 0 ? (
              <>
                {item.accessories.map((acc) => (
                  <tr key={acc.id} className="dark:text-white">
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[acc.id]}
                        value={
                          editedData[acc.id]
                            ? editedData[acc.id]["name"] ?? acc["name"]
                            : acc["name"]
                        }
                        onChange={(value) =>
                          handleInputChange(acc.id, "name", value)
                        }
                        type="autocomplete-name"
                        typeItem="periferico"
                        fieldId={`acc-${acc.id}-name`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[acc.id]}
                        value={
                          editedData[acc.id]
                            ? editedData[acc.id]["brand"] ?? acc["brand"]
                            : acc["brand"]
                        }
                        onChange={(value) =>
                          handleInputChange(acc.id, "brand", value)
                        }
                        fieldId={`acc-${acc.id}-brand`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[acc.id]}
                        value={
                          editedData[acc.id]
                            ? editedData[acc.id]["model"] ?? acc["model"]
                            : acc["model"]
                        }
                        onChange={(value) =>
                          handleInputChange(acc.id, "model", value)
                        }
                        fieldId={`acc-${acc.id}-model`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[acc.id]}
                        value={
                          editedData[acc.id]
                            ? editedData[acc.id]["serial"] ?? acc["serial"]
                            : acc["serial"]
                        }
                        onChange={(value) =>
                          handleInputChange(acc.id, "serial", value)
                        }
                        fieldId={`acc-${acc.id}-serial`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[acc.id]}
                        value={
                          editedData[acc.id]
                            ? editedData[acc.id]["description"] ??
                            acc["description"]
                            : acc["description"]
                        }
                        onChange={(value) =>
                          handleInputChange(acc.id, "description", value)
                        }
                        fieldId={`acc-${acc.id}-description`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[acc.id]}
                        value={
                          editedData[acc.id]
                            ? editedData[acc.id]["status"] ?? acc["status"]
                            : acc["status"]
                        }
                        onChange={(value) =>
                          handleInputChange(acc.id, "status", value)
                        }
                        type="select"
                        options={[
                          { value: "NUEVO", label: "Nuevo" },
                          { value: "REGULAR", label: "Regular" },
                          { value: "MALO", label: "Malo" },
                        ]}
                        fieldId={`acc-${acc.id}-status`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[acc.id]}
                        value={
                          editedData[acc.id]
                            ? editedData[acc.id]["inventoryNumber"] ??
                            acc["inventoryNumber"]
                            : acc["inventoryNumber"]
                        }
                        onChange={(value) =>
                          handleInputChange(acc.id, "inventoryNumber", value)
                        }
                        fieldId={`acc-${acc.id}-inventoryNumber`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      {editingRows[acc.id] ? (
                        <div className="flex space-x-1">
                          <button
                            onClick={() =>
                              handleUpdateAccesory(acc.id, "perifericos")
                            }
                            className={`px-2 py-1 text-xs text-white rounded ${isLoading || !hasChange(acc.id, acc, "periferico")
                              ? "bg-gray-400 hover:bg-gray-500 transition-colors duration-300 cursor-not-allowed"
                              : "hover:bg-green-600 bg-green-500 transition-colors duration-300"
                              }`}
                            title="Guardar cambios"
                            disabled={
                              isLoading || !hasChange(acc.id, acc, "periferico")
                            }
                            type="button"
                          >
                            {isLoading ? "Guardando..." : "Guardar"}
                          </button>

                          <button
                            disabled={isLoading}
                            type="button"
                            onClick={() => cancelEditing(acc.id)}
                            className={`px-2 py-1 text-xs text-white rounded ${isLoading
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600 transition-colors duration-300"
                              }`}
                            title="Cancelar edición"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditing(acc.id, acc)}
                          className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                          title="Editar este periférico"
                        >
                          Editar
                        </button>
                      )}
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                        title="Eliminar"
                        onClick={() =>
                          handleDeleteClick(acc.id, "perifericos", acc.name)
                        }
                        disabled={isLoading}
                      >
                        <MdDeleteOutline className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={10} className="p-4 text-center dark:text-white">
                  No hay Periféricos agregados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableWrapper>
    );
  };
  // renderizado de componentes
  const renderComponentesTable = () => {
    return (
      <TableWrapper>
        <table className="w-full overflow-auto bg-white border-collapse rounded-lg shadow-md min-w-150">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900 dark:text-white">
            <tr>
              <th className="p-2">Nombre:</th>
              <th className="p-2">Marca:</th>
              <th className="p-2">Capacidad:</th>
              <th className="p-2">Velocidad:</th>
              <th className="p-2">Otros Datos:</th>
              <th className="p-2">Modelo:</th>
              <th className="p-2">Serial:</th>
              <th className="p-2">Acciones:</th>
              <th className="p-2">Eliminar:</th>
            </tr>
          </thead>
          <tbody className="text-center dark:bg-gray-800">
            {item && "components" in item && item.components.length > 0 ? (
              <>
                {item.components.map((comp) => (
                  <tr key={comp.id} className="dark:text-white">
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[comp.id]}
                        value={
                          editedData[comp.id]
                            ? editedData[comp.id]["name"] ?? comp["name"]
                            : comp["name"]
                        }
                        onChange={(value) =>
                          handleInputChange(comp.id, "name", value)
                        }
                        type="autocomplete-name"
                        typeItem={"hardware"}
                        fieldId={`comp-${comp.id}-name`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[comp.id]}
                        value={
                          editedData[comp.id]
                            ? editedData[comp.id]["brand"] ?? comp["brand"]
                            : comp["brand"]
                        }
                        onChange={(value) =>
                          handleInputChange(comp.id, "brand", value)
                        }
                        fieldId={`comp-${comp.id}-brand`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[comp.id]}
                        value={
                          editedData[comp.id]
                            ? editedData[comp.id]["capacity"] ??
                            comp["capacity"]
                            : comp["capacity"]
                        }
                        onChange={(value) =>
                          handleInputChange(comp.id, "capacity", value)
                        }
                        fieldId={`comp-${comp.id}-capacity`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[comp.id]}
                        value={
                          editedData[comp.id]
                            ? editedData[comp.id]["speed"] ?? comp["speed"]
                            : comp["speed"]
                        }
                        onChange={(value) =>
                          handleInputChange(comp.id, "speed", value)
                        }
                        fieldId={`comp-${comp.id}-speed`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[comp.id]}
                        value={
                          editedData[comp.id]
                            ? editedData[comp.id]["description"] ??
                            comp["description"]
                            : comp["description"]
                        }
                        onChange={(value) =>
                          handleInputChange(comp.id, "description", value)
                        }
                        fieldId={`comp-${comp.id}-description`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[comp.id]}
                        value={
                          editedData[comp.id]
                            ? editedData[comp.id]["model"] ?? comp["model"]
                            : comp["model"]
                        }
                        onChange={(value) =>
                          handleInputChange(comp.id, "model", value)
                        }
                        fieldId={`comp-${comp.id}-model`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[comp.id]}
                        value={
                          editedData[comp.id]
                            ? editedData[comp.id]["serial"] ?? comp["serial"]
                            : comp["serial"]
                        }
                        onChange={(value) =>
                          handleInputChange(comp.id, "serial", value)
                        }
                        fieldId={`comp-${comp.id}-serial`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      {editingRows[comp.id] ? (
                        <div className="flex space-x-1">
                          <button
                            onClick={() =>
                              handleUpdateAccesory(comp.id, "hardware")
                            }
                            className={`px-2 py-1 text-xs text-white rounded ${isLoading || !hasChange(comp.id, comp, "hardware")
                              ? "bg-gray-400 hover:bg-gray-500 transition-colors duration-300 cursor-not-allowed"
                              : "hover:bg-green-600 bg-green-500 transition-colors duration-300"
                              }`}
                            title="Guardar cambios"
                            disabled={
                              isLoading || !hasChange(comp.id, comp, "hardware")
                            }
                            type="button"
                          >
                            {isLoading ? "Guardando..." : "Guardar"}
                          </button>

                          <button
                            disabled={isLoading}
                            type="button"
                            onClick={() => cancelEditing(comp.id)}
                            className={`px-2 py-1 text-xs text-white rounded ${isLoading
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600 transition-colors duration-300"
                              }`}
                            title="Cancelar edición"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditing(comp.id, comp)}
                          className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                          title="Editar este componente"
                        >
                          Editar
                        </button>
                      )}
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                        title="Eliminar"
                        onClick={() =>
                          handleDeleteClick(comp.id, "hardware", comp.name)
                        }
                        disabled={isLoading}
                      >
                        <MdDeleteOutline className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={9} className="p-4 text-center dark:text-white">
                  No hay Componentes agregados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableWrapper>
    );
  };
  // renderizado de software
  const renderSoftwareTable = () => {
    return (
      <TableWrapper>
        <table className="w-full bg-white border-collapse rounded-lg shadow-md overscroll-auto min-w-150">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900 dark:text-white">
            <tr>
              <th className="p-2">Nombre:</th>
              <th className="p-2">Version:</th>
              <th className="p-2">Licencia:</th>
              <th className="p-2">Otros datos:</th>
              <th className="p-2">Fecha Instalacion:</th>
              <th className="p-2">Estado:</th>
              <th className="p-2">Acciones:</th>
              <th className="p-2">Eliminar:</th>
            </tr>
          </thead>
          <tbody className="text-center dark:bg-gray-800">
            {item && "software" in item && item.software.length > 0 ? (
              <>
                {item.software.map((soft) => (
                  <tr key={soft.id} className="dark:text-white">
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[soft.id]}
                        value={
                          editedData[soft.id]
                            ? editedData[soft.id]["name"] ?? soft["name"]
                            : soft["name"]
                        }
                        onChange={(value) =>
                          handleInputChange(soft.id, "name", value)
                        }
                        typeItem="software"
                        type="autocomplete-name"
                        fieldId={`soft-${soft.id}-name`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[soft.id]}
                        value={
                          editedData[soft.id]
                            ? editedData[soft.id]["versions"] ??
                            soft["versions"]
                            : soft["versions"]
                        }
                        onChange={(value) =>
                          handleInputChange(soft.id, "versions", value)
                        }
                        fieldId={`soft-${soft.id}-versions`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[soft.id]}
                        value={
                          editedData[soft.id]
                            ? editedData[soft.id]["license"] ?? soft["license"]
                            : soft["license"]
                        }
                        onChange={(value) =>
                          handleInputChange(soft.id, "license", value)
                        }
                        fieldId={`soft-${soft.id}-license`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[soft.id]}
                        value={
                          editedData[soft.id]
                            ? editedData[soft.id]["otherData"] ??
                            soft["otherData"]
                            : soft["otherData"]
                        }
                        onChange={(value) =>
                          handleInputChange(soft.id, "otherData", value)
                        }
                        fieldId={`soft-${soft.id}-otherData`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[soft.id]}
                        value={
                          editedData[soft.id]
                            ? editedData[soft.id]["installDate"] ??
                            soft["installDate"]
                            : soft["installDate"]
                        }
                        onChange={(value) =>
                          handleInputChange(soft.id, "installDate", value)
                        }
                        type="date"
                        fieldId={`soft-${soft.id}-installDate`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      <EditableCell
                        isEditing={editingRows[soft.id]}
                        value={
                          editedData[soft.id]
                            ? editedData[soft.id]["status"] ?? soft["status"]
                            : soft["status"]
                        }
                        onChange={(value) =>
                          handleInputChange(soft.id, "status", value)
                        }
                        type="select"
                        options={[
                          { value: "NUEVO", label: "Nuevo" },
                          { value: "REGULAR", label: "Regular" },
                          { value: "MALO", label: "Malo" },
                        ]}
                        fieldId={`soft-${soft.id}-status`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td className="p-2">
                      {editingRows[soft.id] ? (
                        <div className="flex space-x-1">
                          <button
                            onClick={() =>
                              handleUpdateAccesory(soft.id, "software")
                            }
                            className={`px-2 py-1 text-xs text-white rounded ${isLoading || !hasChange(soft.id, soft, "software")
                              ? "bg-gray-400 hover:bg-gray-500 transition-colors duration-300 cursor-not-allowed"
                              : "hover:bg-green-600 bg-green-500 transition-colors duration-300"
                              }`}
                            title="Guardar cambios"
                            disabled={
                              isLoading || !hasChange(soft.id, soft, "software")
                            }
                            type="button"
                          >
                            {isLoading ? "Guardando..." : "Guardar"}
                          </button>

                          <button
                            disabled={isLoading}
                            type="button"
                            onClick={() => cancelEditing(soft.id)}
                            className={`px-2 py-1 text-xs text-white rounded ${isLoading
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600 transition-colors duration-300"
                              }`}
                            title="Cancelar edición"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditing(soft.id, soft)}
                          className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                          title="Editar este software"
                        >
                          Editar
                        </button>
                      )}
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                        title="Eliminar"
                        onClick={() =>
                          handleDeleteClick(soft.id, "software", soft.name)
                        }
                        disabled={isLoading}
                      >
                        <MdDeleteOutline className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={8} className="p-4 text-center dark:text-white">
                  No hay Software agregado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableWrapper>
    );
  };
  // tab navigation for mobile
  const renderTabNavigation = () => {
    if (isMobile) {
      return (
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          <select
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="general">Información General</option>
            <option value="perifericos">Periféricos</option>
            <option value="componentes">Hardware</option>
            <option value="software">Software</option>
          </select>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-2 p-2 mb-4 rounded">
        <button
          className={`flex items-center p-2 ${activeTab === "general"
            ? "bg-gray-200 dark:bg-gray-900 dark:text-white dark:shadow-md dark:shadow-indigo-800 shadow-md text-black"
            : "dark:bg-gray-900 dark:hover:bg-gray-800 duration-300 dark:text-white hover:bg-gray-300"
            } rounded`}
          onClick={() => setActiveTab("general")}
        >
          <ComputerDesktopIcon className="w-6 h-6 mr-2 dark:text-white" />
          <span>Información General</span>
        </button>
        {tipoItem === "equipments" && (
          <>
            <button
              className={`flex items-center p-2 ${activeTab === "perifericos"
                ? "bg-gray-200 dark:bg-gray-900 dark:text-white dark:shadow-md dark:shadow-indigo-800 shadow-md text-black"
                : "dark:bg-gray-900 dark:hover:bg-gray-800 duration-300 dark:text-white hover:bg-gray-300"
                } rounded`}
              onClick={() => setActiveTab("perifericos")}
            >
              <CpuChipIcon className="w-6 h-6 mr-2 dark:text-white" />
              <span>Periféricos</span>
            </button>
            <button
              className={`flex items-center p-2 ${activeTab === "componentes"
                ? "bg-gray-200 dark:bg-gray-900 dark:text-white text-black dark:shadow-md dark:shadow-indigo-800 shadow-md"
                : "dark:bg-gray-900 dark:hover:bg-gray-800 duration-300 dark:text-white hover:bg-gray-300"
                } rounded`}
              onClick={() => setActiveTab("componentes")}
            >
              <ServerIcon className="w-6 h-6 mr-2 dark:text-white" />
              <span>Hardware</span>
            </button>
            <button
              className={` flex items-center p-2 ${activeTab === "software"
                ? "bg-gray-200 dark:bg-gray-900 dark:text-white text-black dark:shadow-md dark:shadow-indigo-800 shadow-md"
                : "dark:bg-gray-900 dark:hover:bg-gray-800 duration-300 dark:text-white hover:bg-gray-300"
                } rounded `}
              onClick={() => setActiveTab("software")}
            >
              <Cog6ToothIcon className="w-6 h-6 mr-2 dark:text-white" />
              <span>Software</span>
            </button>
          </>
        )}
      </div>
    );
  };
  // renderizado de contenido dependiendo del tab activo
  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <motion.div
            key="general"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[60vh] pb-4"
          >
            {item ? (
              <>
                {/* Información Básica */}
                <div className="p-4 rounded shadow-md dark:text-white dark:shadow-md dark:shadow-indigo-800 h-fit">
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Información Básica:
                  </h3>
                  <ul className="space-y-1">
                    {strategy?.renderBasicInfo(item)}
                  </ul>
                </div>

                {/* Detalles Técnicos */}
                <div className="p-4 rounded shadow-md dark:text-white dark:shadow-md dark:shadow-indigo-800 h-fit">
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Detalles Técnicos:
                  </h3>
                  <ul className="space-y-1">
                    {strategy?.renderTechnicalDetails(item)}
                  </ul>
                </div>

                {/* Información Adicional */}
                <div className="p-4 rounded shadow-md dark:text-white dark:shadow-md dark:shadow-indigo-800 h-fit">
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Información Adicional:
                  </h3>
                  <ul className="space-y-1">
                    {strategy?.renderAdditionalInfo(item)}
                  </ul>
                </div>
              </>
            ) : (
              <p className="dark:text-white">
                No hay Información General Disponible
              </p>
            )}
          </motion.div>
        );

      case "perifericos":
        return (
          <motion.div
            key="perifericos"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            {renderPerifericosTable()}
          </motion.div>
        );
      case "componentes":
        return (
          <motion.div
            key="componentes"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            {renderComponentesTable()}
          </motion.div>
        );
      case "software":
        return (
          <motion.div
            key="software"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            {renderSoftwareTable()}
          </motion.div>
        );
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 transition-colors duration-300 bg-gray-200 rounded-md text-pretty hover:text-white hover:bg-gray-700 dark:text-white dark:bg-color dark:hover:bg-teal-600"
      >
        Ver detalles
      </button>

      <ModalDefault
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Detalles del ${tipoItem === "equipments" ? "Equipo" : tipoItem === "dispositivos-red" ? "Dispositivo de Red" : "Item"}`}
        size="xl"
      >
        <div className="max-h-[74vh] md:max-h-[70vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-200">
          {renderTabNavigation()}

          <div className="rounded md:p-4 dark:bg-gray-900">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {renderContent()}
            </motion.div>
          </div>
           <AnimatePresence>
                {error && (
                  <div>
                    <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                      {error}
                    </div>
                  </div>
                )}
              </AnimatePresence>

        </div>
      </ModalDefault>

      <ConfirmDeletePopup
        isOpen={openComfirmPop}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={itemToDelete?.name || ""}
      />
    </>
  );
};

export default ModalItemsDetails;
