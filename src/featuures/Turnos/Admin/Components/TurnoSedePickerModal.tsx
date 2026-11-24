import { useState } from "react";
import Modal from "@/components/common/Ui/Modal";
import ModalBody from "@/components/common/Ui/ModalBody";
import Select from "@/components/common/Ui/Select";
import Button from "@/components/common/Ui/Button";

export interface ITurnoSedeOption {
  id: number;
  name: string;
}

interface TurnoSedePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sedes: ITurnoSedeOption[];
  onSelect: (sede: ITurnoSedeOption) => void;
}

const TurnoSedePickerModal = ({
  isOpen,
  onClose,
  sedes,
  onSelect,
}: TurnoSedePickerModalProps) => {
  const [headquarterId, setHeadquarterId] = useState<string>("");

  const handleClose = () => {
    setHeadquarterId("");
    onClose();
  };

  const handleConfirm = () => {
    const sede = sedes.find((item) => String(item.id) === headquarterId);
    if (!sede) return;
    onSelect(sede);
    setHeadquarterId("");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="sm">
      <ModalBody>
        <div className="space-y-5 p-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Agregar sede
            </h3>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              Selecciona la sede que quieres configurar para turnos.
            </p>
          </div>

          {sedes.length === 0 ? (
            <p className="rounded-lg bg-slate-100 p-4 text-sm text-slate-600 dark:bg-gray-700 dark:text-gray-300">
              Todas las sedes del catálogo ya tienen configuración de turnos.
            </p>
          ) : (
            <Select
              name="headquarterId"
              label="Sede"
              aria-label="Sede a configurar"
              required
              options={sedes.map((sede) => ({
                value: sede.id,
                label: sede.name,
              }))}
              value={headquarterId}
              onChange={(event) => setHeadquarterId(event.target.value)}
            />
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={!headquarterId}
            >
              Continuar
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default TurnoSedePickerModal;
