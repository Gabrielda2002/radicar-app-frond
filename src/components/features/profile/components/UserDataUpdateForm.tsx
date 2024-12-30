import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { updateUserData } from "../../../../services/updateUserData";
import { updatePasswordUsuario } from "../../../../services/updatePasswordUsuario";
import { useUserProfile } from "../../../../context/userProfileContext";
import PasswordUpdateForm from "./PasswordUpdateForm";

interface UserDataUpdateFormProps {
  initialUserData: {
    nombre: string;
    apellido: string;
    email: string;
    id: string;
  };
}

const UserDataUpdateForm: React.FC<UserDataUpdateFormProps> = ({
  initialUserData,
}) => {
  const { updateUserProfile } = useUserProfile();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

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
  });

  const formik = useFormik({
    initialValues: {
      nombre: initialUserData.nombre,
      apellido: initialUserData.apellido,
      email: initialUserData.email,
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

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(
        "La contraseña actual es requerida"
      ),
      newPassword: Yup.string()
        .required("La nueva contraseña es requerida")
        .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
      confirmPassword: Yup.string()
        .required("La confirmación de la contraseña es requerida")
        .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("currentPassword", values.currentPassword);
        formData.append("newPassword", values.newPassword);
        formData.append("confirmPassword", values.confirmPassword);

        const response = await updatePasswordUsuario(
          formData,
          parseInt(initialUserData.id)
        );
        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setError("");
          passwordFormik.resetForm();
        }
      } catch (error) {
        setError(`Error al actualizar la contraseña del usuario. ${error}`);
      }
    },
  });

  return (
    <div className="space-y-6">
      {/* Navigation Links */}
      <div className="flex mb-6 space-x-4">
        <button
          onClick={() => setShowPasswordForm(false)}
          className={`px-4 py-2 text-sm ${
            !showPasswordForm
              ? "bg-white text-gray-800 rounded border-teal-400 border-b dark:bg-gray-600 dark:text-white"
              : "text-gray-400 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          }`}
        >
          Actualizar Datos
        </button>
        <button
          onClick={() => setShowPasswordForm(true)}
          className={`px-4 py-2 text-sm ${
            showPasswordForm
              ? "bg-white text-gray-800 rounded border-teal-400 border-b dark:bg-gray-600 dark:text-white"
              : "text-gray-400 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          }`}
        >
          Actualizar Contraseña
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!showPasswordForm ? (
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
                <label
                  htmlFor="nombre"
                  className="block mb-2 text-sm text-gray-800 dark:text-gray-300"
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                  className="w-full px-3 py-2 text-gray-800 bg-white border rounded-md dark:border-gray-600 focus:outline-none focus:border-teal-500 dark:text-gray-300 dark:bg-gray-700"
                />
              </div>

              <div>
                <label
                  htmlFor="apellido"
                  className="block mb-2 text-sm text-gray-800 dark:text-gray-300"
                >
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.apellido}
                  className="w-full px-3 py-2 text-gray-800 bg-white border rounded-md dark:border-gray-600 focus:outline-none focus:border-teal-500 dark:text-gray-300 dark:bg-gray-700"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-800 dark:text-gray-300"
                >
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full px-3 py-2 text-gray-800 bg-white border rounded-md dark:border-gray-600 focus:outline-none focus:border-teal-500 dark:text-gray-300 dark:bg-gray-700"
                />{" "}
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="flex justify-between ">
                <button
                  type="submit"
                  disabled={!formik.dirty || formik.isSubmitting}
                  className={`px-4 py-2 text-white rounded-md bg-teal-900    hover:bg-dark duration-200 
                        ${
                          !formik.dirty || formik.isSubmitting
                            ? "opacity-50 cursor-not-allowed"
                            : "active:bg-emerald-950 dark:bg-teal-600 dark:hover:bg-teal-800"
                        }`}
                >
                  Guardar Cambios
                </button>
                {success && (
                  <div className="text-green-500">
                    Cambios guardados exitosamente.
                  </div>
                )}
                {error && <div className="text-red-500">{error}</div>}
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="passwordForm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <PasswordUpdateForm userId={""} />
          </motion.div>
        )}
      </AnimatePresence>

      {error && <div className="mt-4 text-red-500">{error}</div>}
      {success && (
        <div className="mt-4 text-green-500">Actualización exitosa!</div>
      )}
    </div>
  );
};
export default UserDataUpdateForm;
