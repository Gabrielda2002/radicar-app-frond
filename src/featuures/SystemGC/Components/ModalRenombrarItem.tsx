import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

type ModalRenombrarItemProps = {
  standOpen: boolean;
  toggleModal: () => void;
  renameItem: (newName: string) => void;
  nameItemOld: string;
};

const ModalRenombrarItem: React.FC<ModalRenombrarItemProps> = ({
  standOpen,
  toggleModal,
  renameItem,
  nameItemOld,
}) => {

  const SCHEMA_VALIDATION = Yup.object({
    folderNewName: Yup.string()
      .required("El nombre de la carpeta es requerido")
      .max(60, "El nombre de la carpeta no debe exceder los 60 caracteres")
      .matches(
        /^[a-zA-Z0-9\s]+$/,
        "Solo se permiten caracteres alfanuméricos y espacios"
      ),
  });

  const formik = useFormik({
    initialValues: { folderNewName: nameItemOld || "" },
    validationSchema: SCHEMA_VALIDATION,
    onSubmit: (values) => {
      try {
        renameItem(values.folderNewName);
        setTimeout(() => {
          formik.resetForm();
          toggleModal();
        }, 1000);
      } catch (error) {
        console.error("Error renombrando la carpeta:", error);
      }
    },
  });

  return (
    <>
      <FormModal
        isOpen={standOpen}
        onClose={toggleModal}
        title="Renombrar Carpeta"
        onSubmit={formik.handleSubmit}
        isSubmitting={formik.isSubmitting}
        isValid={formik.isValid}
        submitText="Renombrar"
        cancelText="Cerrar"
        size="lg"
      >
        <div className="grid grid-cols-1 gap-10 mb-4">
          <div className="p-4">
            <Input
              label="Nombre"
              type="text"
              value={formik.values.folderNewName}
              placeholder="Ingrese el nombre..."
              onChange={formik.handleChange}
              error={formik.errors.folderNewName ? formik.errors.folderNewName : undefined}
              touched={formik.touched.folderNewName ? formik.touched.folderNewName : undefined}
              name="folderNewName"
              required
            />
          </div>
        </div>
      </FormModal>
    </>
  );
};

export default ModalRenombrarItem;
