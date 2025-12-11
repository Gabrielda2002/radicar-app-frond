import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { ModalRenombrarItemProps } from "../Types/IFileManager";
import useFileManagerStore from "../Store/FileManagerStore";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const ModalRenombrarItem: React.FC<ModalRenombrarItemProps> = ({
  standOpen,
  toggleModal,
  nameItemOld,
  itemId,
  typeItem
}) => {

  const { renameItem, error, isLoading } = useFileManagerStore();

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
    onSubmit: async (values) => {
        await renameItem(itemId, values.folderNewName, typeItem, () => {
          toast.success("Renombrado con éxito!");
          formik.resetForm();
          toggleModal();
        });
    },
  });

  return (
    <>
      <FormModal
        isOpen={standOpen}
        onClose={toggleModal}
        title="Renombrar Carpeta"
        onSubmit={formik.handleSubmit}
        isSubmitting={formik.isSubmitting || isLoading}
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
      </FormModal>
    </>
  );
};

export default ModalRenombrarItem;
