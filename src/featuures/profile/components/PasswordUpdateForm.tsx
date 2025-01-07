import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updatePasswordUsuario } from "../services/UpdatePasswordUsuario";

interface PasswordUpdateFormProps {
  userId: string;
}

const PasswordUpdateForm: React.FC<PasswordUpdateFormProps> = ({ userId }) => {
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const validationSchemaPassword = Yup.object({
    currentPassword: Yup.string().required("La contraseña actual es requerida"),
    newPassword: Yup.string()
      .required("La nueva contraseña es requerida")
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
      .matches(/[0-9]/, "La nueva contraseña debe tener al menos un número")
      .matches(
        /[A-Z]/,
        "La nueva contraseña debe tener al menos una letra mayúscula"
      )
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "La nueva contraseña debe tener al menos un carácter especial"
      ),
    confirmPassword: Yup.string()
      .required("La confirmación de la contraseña es requerida")
      .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden"),
  });

  const formikPassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaPassword,
    onSubmit: async (values) => {
      try {
        if (values.newPassword !== values.confirmPassword) {
          setErrorPassword("Las contraseñas no coinciden");
          return;
        }

        const formData = new FormData();
        formData.append("currentPassword", values.currentPassword);
        formData.append("newPassword", values.newPassword);
        formData.append("confirmPassword", values.confirmPassword);

        const response = await updatePasswordUsuario(
          formData,
          parseInt(userId)
        );

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setErrorPassword("");
        }
      } catch (error) {
        setErrorPassword(`Error al actualizar la contraseña del usuario.`);
        console.log(error);
      }
    },
  });

  return (
    <form onSubmit={formikPassword.handleSubmit}>
      <h2 className="mb-4 text-2xl">Cambiar contraseña</h2>
      <div className="mb-4">
        <label
          htmlFor="currentPassword"
          className="block mb-1 text-sm text-gray-700 dark:text-gray-300"
        >
          Contraseña actual
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          onChange={formikPassword.handleChange}
          onBlur={formikPassword.handleBlur}
          value={formikPassword.values.currentPassword}
          className="w-full px-3 py-2 text-gray-900 bg-white rounded-md dark:bg-gray-700 dark:text-gray-300"
        />
        {formikPassword.touched.currentPassword &&
          formikPassword.errors.currentPassword && (
            <div className="mt-1 text-sm text-red-500">
              {formikPassword.errors.currentPassword}
            </div>
          )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="newPassword"
          className="block mb-1 text-sm text-gray-800 dark:text-gray-300"
        >
          Contraseña nueva
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          onChange={formikPassword.handleChange}
          onBlur={formikPassword.handleBlur}
          value={formikPassword.values.newPassword}
          className="w-full px-3 py-2 text-gray-900 bg-white rounded-md dark:bg-gray-700 dark:text-gray-300"
        />
        {formikPassword.touched.newPassword &&
          formikPassword.errors.newPassword && (
            <div className="mt-1 text-sm text-red-500">
              {formikPassword.errors.newPassword}
            </div>
          )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block mb-1 text-sm text-gray-800 dark:text-gray-300"
        >
          Confirmar contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={formikPassword.handleChange}
          onBlur={formikPassword.handleBlur}
          value={formikPassword.values.confirmPassword}
          className="w-full px-3 py-2 text-gray-900 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
        />
        {formikPassword.touched.confirmPassword &&
          formikPassword.errors.confirmPassword && (
            <div className="mt-1 text-sm text-red-500">
              {formikPassword.errors.confirmPassword}
            </div>
          )}
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md bg-teal-900    hover:bg-dark duration-200 
                        ${
                          !formikPassword.dirty || formikPassword.isSubmitting
                            ? "opacity-50 cursor-not-allowed"
                            : "active:bg-emerald-950 dark:bg-teal-600 dark:hover:bg-teal-800"
                        }`}
        >
          Actualizar contraseña
        </button>
      </div>
      {errorPassword && (
        <div className="mt-2 text-red-500">{errorPassword}</div>
      )}
      {success && (
        <div className="mt-2 text-green-500">
          Contraseña actualizada exitosamente!
        </div>
      )}
    </form>
  );
};

export default PasswordUpdateForm;
