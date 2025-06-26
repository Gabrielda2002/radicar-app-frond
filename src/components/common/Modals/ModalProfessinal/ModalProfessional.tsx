import Button from "../../Ui/Button";
import ModalDefault from "../../Ui/ModalDefault";
import ErrorMessage from "../../ErrorMessageModal/ErrorMessageModals";
import { useUpdateProfessional } from "@/hooks/useUpdateProfessional";
import Input from "../../Ui/Input";

const ModalProfessional = () => {

    const { isOpenMedic,
        setIsOpenMedic,
        newMedic,
        setNewMedic,
        addMedicError,
        setAddMedicError,
        handleUpdateProfessional } = useUpdateProfessional();

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="xs"
        className="w-full mt-2"
        onClick={() => {
          setIsOpenMedic(true);
          setNewMedic("");
          setAddMedicError(null);
        }}
      >
        Agregalo Aqui.
      </Button>
      <ModalDefault
        isOpen={isOpenMedic}
        onClose={() => {
          setIsOpenMedic(false);
          setNewMedic("");
          setAddMedicError(null);
        }}
        title="Registrar Nuevo Profesional"
        showSubmitButton={true}
        funtionClick={handleUpdateProfessional}
        submitText="Agregar"
        size="sm"
        isValid={!!newMedic.trim()}
      >
        <div>
          <Input
            type="text"
            value={newMedic}
            onChange={(e) => {
              setNewMedic(e.target.value);
              setAddMedicError(null);
            }}
            placeholder="Nombre del profesional"
            label="Nuevo Profesional"
            required={true}
            error={addMedicError ? addMedicError : undefined}
            helpText="Ingrese el nombre completo del profesional, con los apellidos y nombres que tenga."
          />
          {addMedicError && <ErrorMessage>{addMedicError}</ErrorMessage>}
        </div>
      </ModalDefault>
    </>
  );
};

export default ModalProfessional;
