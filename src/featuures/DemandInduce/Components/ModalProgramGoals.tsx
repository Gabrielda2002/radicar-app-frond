import Button from "@/components/common/Ui/Button";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import { useState } from "react";
import { useProgramsGoals } from "../Hooks/useProgramsGoals";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import EditableCell from "@/featuures/SystemInventory/Components/EditableCell";
import { useEditableRow } from "@/featuures/SystemInventory/Hooks/useEditableRow";
import { useAuth } from "@/context/authContext";
import ModalCreateGoalProgram from "./ModalCreateGoalProgram";

const ModalProgramGoals = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, error, loading, handleUpdateGoal, refetch } = useProgramsGoals();

  const { rol } = useAuth();

  const {
    editingRows,
    editedData,
    activeFieldId,
    setActiveFieldId,
    startEditing,
    cancelEditing,
    handleInputChange,
  } = useEditableRow();

  const handleUpdate = async (goalId: number) => {
    await handleUpdateGoal(goalId.toString(), editedData);
    cancelEditing(goalId); // Limpiar el estado de edición después de actualizar
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Ver Metas del Programa
      </Button>

      {error ? (
        <div className="flex items-center justify-center min-h-fit">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <ModalDefault
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Metas"
          size="lg"
        >
          <div className="flex flex-col space-y-4 p-5">
            {[1].includes(Number(rol)) && (
              <ModalCreateGoalProgram onGoalCreated={refetch} />
            )}
            <table className="min-w-full overflow-hidden text-sm text-center rounded-lg shadow-lg">
              <thead>
                <tr className="text-sm text-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  <th>Programa</th>
                  <th>Meta</th>
                  {[1].includes(Number(rol)) && <th>Actualizar estado</th>}
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600 dark:text-gray-300">
                {data.map((p) => (
                  <tr
                    key={p.id}
                    className="text-xs md:text-sm transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                  >
                    <td>{p.program}</td>
                    <td>
                      <EditableCell
                        isEditing={editingRows[p.id]}
                        value={
                          editedData[p.id]
                            ? editedData[p.id]["goal"] ?? p["goal"]
                            : p["goal"]
                        }
                        onChange={(value) =>
                          handleInputChange(p.id, "goal", value)
                        }
                        fieldId={`p-${p.id}-goal`}
                        activeFieldId={activeFieldId}
                        setActiveFieldId={setActiveFieldId}
                      />
                    </td>
                    <td>
                      {editingRows[p.id] ? (
                        <>
                          <Button
                            variant="success"
                            onClick={() => handleUpdate(p.id)}
                            title="Guardar cambios"
                            disabled={
                              !editedData[p.id] || !editedData[p.id]["goal"]
                            }
                            isLoading={loading}
                          >
                            Guardar
                          </Button>
                          <Button
                            variant="closed"
                            onClick={() => cancelEditing(p.id)}
                            title="Cancelar edición"
                            disabled={loading}
                          >
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => startEditing(p.id, p)}
                          title="Editar meta"
                          variant="secondary"
                        >
                          Editar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ModalDefault>
      )}
    </>
  );
};

export default ModalProgramGoals;
