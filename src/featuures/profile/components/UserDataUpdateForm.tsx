import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useUserProfile } from "@/context/userProfileContext";
import { updateUserData } from "../services/UpdateUserData";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";

interface UserDataUpdateFormProps {
  initialUserData: {
    name: string;
    lastname: string;
    email: string;
    id: number;
    phone: number;
  };
}

const UserDataUpdateForm: React.FC<UserDataUpdateFormProps> = ({
  initialUserData,
}) => {
  const { updateUserProfile } = useUserProfile();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(150, "El nombre debe tener como máximo 150 caracteres"),
    apellido: Yup.string()
      .required("El apellido es requerido")
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(150, "El apellido debe tener como máximo 150 caracteres"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es requerido")
      .min(10, "El correo electrónico debe tener al menos 10 caracteres")
      .max(150, "El correo electrónico debe tener como máximo 150 caracteres"),
    phone: Yup.number()
      .required("El teléfono es requerido")
      .max(10, "El teléfono debe tener 10 caracteres"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: initialUserData.name,
      apellido: initialUserData.lastname,
      email: initialUserData.email,
      phone: initialUserData.phone,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const updatedUserData = { ...initialUserData, ...values };
      updateUserProfile(updatedUserData);
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      const formDataUpdate = new FormData();
      formDataUpdate.append("name", values.nombre);
      formDataUpdate.append("lastName", values.apellido);
      formDataUpdate.append("email", values.email);
      formDataUpdate.append("phone", values.phone.toString());

      try {
        const response = await updateUserData(
          formDataUpdate,
          initialUserData.id
        );
        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setError("");
        }
      } catch (error) {
        setError(`Error al actualizar la información del usuario. ${error}`);
      }
    },
  });

  return (
    <div className="p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key="userForm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-300">
            Editar Información
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Nombre"
                id="nombre"
                name="nombre"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
                error={formik.touched.nombre && formik.errors.nombre ? formik.errors.nombre : undefined}
                touched={formik.touched.nombre}
              />
            </div>

            <div>
              <Input
                label="Apellido"
                id="apellido"
                name="apellido"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
                error={formik.touched.apellido && formik.errors.apellido ? formik.errors.apellido : undefined}
                touched={formik.touched.apellido}
              />
            </div>

            <div>
              <Input
                label="Correo Electrónico"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                touched={formik.touched.email}
              />
            </div>

            <div>
              <Input
                label="Correo Electrónico"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                touched={formik.touched.email}
              />
            </div>

            <div>
              <Input
                label="Teléfono"
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined}
                touched={formik.touched.phone}
              />
            </div>

            <div className="flex justify-between ">
              <Button
                disabled={!formik.dirty || formik.isSubmitting}
                variant="secondary"
              >
                Guardar Cambios
              </Button>
              {success && (
                <div className="text-green-500">
                  Cambios guardados exitosamente.
                </div>
              )}
              {error && <div className="text-red-500">{error}</div>}
            </div>
          </form>
        </motion.div>

      </AnimatePresence>

      {error && <div className="mt-4 text-red-500">{error}</div>}
      {success && (
        <div className="mt-4 text-green-500">Actualización exitosa!</div>
      )}
    </div>
  );
};
export default UserDataUpdateForm;
