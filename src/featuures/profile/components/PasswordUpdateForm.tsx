import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updatePasswordUsuario } from "../services/UpdatePasswordUsuario";
import Input from "@/components/common/Ui/Input";
import Button from "@/components/common/Ui/Button";

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
      <h2 className="my-6 text-xl font-semibold text-gray-800 dark:text-gray-300">
        Cambiar contraseña
      </h2>
      <div className="mb-4">
        <Input
          label="Contraseña actual"
          type="password"
          id="currentPassword"
          name="currentPassword"
          onChange={formikPassword.handleChange}
          onBlur={formikPassword.handleBlur}
          value={formikPassword.values.currentPassword}
          error={
            formikPassword.touched.currentPassword &&
            formikPassword.errors.currentPassword
              ? formikPassword.errors.currentPassword
              : undefined
          }
          touched={formikPassword.touched.currentPassword}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Contraseña nueva"
          type="password"
          id="newPassword"
          name="newPassword"
          onChange={formikPassword.handleChange}
          onBlur={formikPassword.handleBlur}
          value={formikPassword.values.newPassword}
          error={
            formikPassword.touched.newPassword &&
            formikPassword.errors.newPassword
              ? formikPassword.errors.newPassword
              : undefined
          }
          touched={formikPassword.touched.newPassword}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Confirmar contraseña nueva"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={formikPassword.handleChange}
          onBlur={formikPassword.handleBlur}
          value={formikPassword.values.confirmPassword}
          error={
            formikPassword.touched.confirmPassword &&
            formikPassword.errors.confirmPassword
              ? formikPassword.errors.confirmPassword
              : undefined
          }
          touched={formikPassword.touched.confirmPassword}
        />
      </div>
      <div className="mt-6">
        <Button
          variant="secondary"
          disabled={!formikPassword.dirty || formikPassword.isSubmitting}
          isLoading={formikPassword.isSubmitting}
        >
          Actualizar contraseña
        </Button>
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
