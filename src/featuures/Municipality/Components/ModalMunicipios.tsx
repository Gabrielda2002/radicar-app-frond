//*Funciones y Hooks
import { useState } from "react";
import FormModal from "@/components/common/Ui/FormModal";
import Button from "@/components/common/Ui/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/common/Ui/Input";
import { useLazyFetchDepartment } from "@/hooks/useLazyFetchDepartment";
import Select from "@/components/common/Ui/Select";
import { useMunicipalityMutations } from "../Hooks/useMunicipalityMutations";
import { AnimatePresence } from "framer-motion";

interface ModalMunicipiosProps {
  onSuccess?: () => void;
}

const ModalMunicipios: React.FC<ModalMunicipiosProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { department, loading, error, fetchDepartments } = useLazyFetchDepartment();

  const { createMunicipio, error: errorCreating } = useMunicipalityMutations();

  const handleModalOpen = async () => {
    setIsOpen(true);
    await Promise.all([fetchDepartments()]);
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre es obligatorio")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no debe exceder los 50 caracteres"),
    municipioCode: Yup.number()
      .required("El NIT es obligatorio")
      .min(1, "El NIT debe ser un número positivo"),
    department: Yup.string().required("El departamento es obligatorio"),
  }); 

  const formik = useFormik({
    initialValues: {
      name: "",
      municipioCode: "",
      department: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      await createMunicipio(values, () => {
        onSuccess?.();
        setIsOpen(false);
        formik.resetForm();
      });

    },
  });

  return (
    <>
      <Button variant="primary" onClick={handleModalOpen}>
        Agregar Municipios
      </Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Agregar Municipio"
        onSubmit={formik.handleSubmit}
        isSubmitting={formik.isSubmitting}
        isValid={formik.isValid}
        size="lg"
        submitText="Agregar"
      >
          <div className="grid grid-cols-2 gap-4 py-3 px-4">
            <Input
              label="Nombre Municipio"
              type="text"
              placeholder="Ingrese Municipio"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
              touched={formik.touched.name}
              required
            />

            <Input
              label="NIT Municipios"
              name="municipioCode"
              value={formik.values.municipioCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.municipioCode && formik.errors.municipioCode ? formik.errors.municipioCode : undefined}
              touched={formik.touched.municipioCode}
              required
              type="number"
              placeholder="Ingrese NIT"
            />
            <Select
              label="Departamento"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.department && formik.errors.department ? formik.errors.department : error ? error : undefined}
              touched={formik.touched.department}
              required
              options={department.map((dept) => ({ value: dept.id, label: dept.name }))}
            />
             <AnimatePresence>
            {errorCreating && (
              <div>
                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                  {errorCreating}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </FormModal>
    </>
  );
};

export default ModalMunicipios;
