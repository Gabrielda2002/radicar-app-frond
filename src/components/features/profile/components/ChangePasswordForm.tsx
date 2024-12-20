import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

interface ChangePasswordFormProps {
  isPasswordFormVisible: boolean;
  setIsPasswordFormVisible: (value: boolean) => void;
  errorPassword: string;
  setErrorPassword: (value: string) => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = () => {

    const [isPassowrdFormVisible, setIsPassowrdFormVisible] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);
  
    const [errorPassword, setErrorPassword] = useState<string>("");

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
          console.log(values);
    
          try {
            // validar que las contrasenas sean iguales
            if (values.newPassword !== values.confirmPassword) {
              setErrorPassword("Las contrasenas no coinciden");
              return;
            }
    
            const formData = new FormData();
            formData.append("currentPassword", values.currentPassword);
            formData.append("newPassword", values.newPassword);
            formData.append("confirmPassword", values.confirmPassword);
    
            const response = await updatePasswordUsuario(
              formData,
              parseInt(profile.id)
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
    <>
       <div className="w-[680px] p-4">
              <div className="p-8 rounded shadow-md bg-stone-200 dark:bg-gray-800">
                <div className="grid h-12 grid-cols-2 px-4 py-2">
                  <button
                    onClick={() => setIsPassowrdFormVisible(false)}
                    className={`text-gray-800 dark:text-white mr-2 border-b ${
                      !isPassowrdFormVisible
                        ? "bg-gray-500 dark:bg-gray-400 duration-500 ease-in-out rounded text-white"
                        : "dark:border-white dark:hover:text-color dark:hover:border-teal-500 border-gray-800 hover:border-teal-500 duration-500 ease-in-out hover:text-teal-600"
                    }`}
                  >
                    Actualizar Datos
                  </button>
                  <button
                    onClick={() => setIsPassowrdFormVisible(true)}
                    className={` text-gray-800 dark:text-white ml-2 border-b ${
                      isPassowrdFormVisible
                        ? "bg-gray-500 dark:bg-gray-400 duration-500 ease-in-out rounded text-white"
                        : "dark:border-white dark:hover:text-color dark:hover:border-teal-500 border-gray-800 hover:border-teal-500 duration-500 ease-in-out hover:text-teal-600"
                    }`}
                  >
                    Actualizar Contraseña
                  </button>
                </div>
                {/* Animaciones Para el Perfil */}
                <motion.div
                  key={isPassowrdFormVisible ? "password-form" : "profile-form"}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variantes}
                  className="mt-4"
                >
                  {!isPassowrdFormVisible ? (
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                      <h2 className="text-2xl">Editar Información</h2>
                      <div>
                        <label
                          htmlFor="nombre"
                          className="block text-sm text-gray-700 dark:text-gray-300"
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          value={formik.values.nombre}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                        />
                        {formik.touched.nombre && formik.errors.nombre ? (
                          <div className="text-red-500">
                            {formik.errors.nombre}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="apellido"
                          className="block text-sm text-gray-700 dark:text-gray-300"
                        >
                          Apellido
                        </label>
                        <input
                          type="text"
                          id="apellido"
                          value={formik.values.apellido}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                        />
                        {formik.touched.apellido && formik.errors.apellido ? (
                          <div className="text-red-500">
                            {formik.errors.apellido}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm text-gray-700 dark:text-gray-300"
                        >
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-red-500">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex justify-between ">
                        <button
                          type="submit"
                          disabled={!formik.dirty || formik.isSubmitting}
                          className={`px-4 py-2 text-white rounded-md bg-color hover:bg-emerald-900 duration-200 
                        ${
                          !formik.dirty || formik.isSubmitting
                            ? "opacity-50 cursor-not-allowed"
                            : "active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
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
                  ) : (
                    <form onSubmit={formikPassword.handleSubmit}>
                      <div className="flex items-center justify-between">
                        <div className="">
                          <h2 className="text-2xl">Cambiar contraseña</h2>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Contraseña actual
                          </span>
                          <input
                            type="password"
                            name="currentPassword"
                            id=""
                            onChange={formikPassword.handleChange}
                            onBlur={formikPassword.handleBlur}
                            value={formikPassword.values.currentPassword}
                            className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                          />
                          {formikPassword.touched.currentPassword &&
                          formikPassword.errors.currentPassword ? (
                            <div className="text-red-500">
                              {formikPassword.errors.currentPassword}
                            </div>
                          ) : null}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Contraseña nueva
                          </span>
                          <input
                            type="password"
                            name="newPassword"
                            onChange={formikPassword.handleChange}
                            onBlur={formikPassword.handleBlur}
                            value={formikPassword.values.newPassword}
                            id=""
                            className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                          />
                          {formikPassword.touched.newPassword &&
                          formikPassword.errors.newPassword ? (
                            <div className="text-red-500">
                              {formikPassword.errors.newPassword}
                            </div>
                          ) : null}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            comfirmar contraseña
                          </span>
                          <input
                            type="password"
                            name="confirmPassword"
                            id=""
                            onChange={formikPassword.handleChange}
                            onBlur={formikPassword.handleBlur}
                            value={formikPassword.values.confirmPassword}
                            className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                          />
                          {formikPassword.touched.confirmPassword &&
                          formikPassword.errors.confirmPassword ? (
                            <div className="text-red-500">
                              {formikPassword.errors.confirmPassword}
                            </div>
                          ) : null}
                        </label>
                      </div>

                      <div className="pt-8">
                        <button
                          type="submit"
                          className="px-5 py-2 text-white duration-200 rounded-md bg-color hover:bg-emerald-900"
                        >
                          Actualizar contraseña
                        </button>
                      </div>
                      {errorPassword && (
                        <div className="text-red-500">{errorPassword}</div>
                      )}
                      {success && (
                        <div className="text-green-500">
                          Contrasena actualizada exitosamente!
                        </div>
                      )}
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
    </>
  )
}

export default ChangePasswordForm
