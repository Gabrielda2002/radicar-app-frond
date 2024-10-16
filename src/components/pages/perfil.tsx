//*Funciones y Hooks
import Cookies from "js-cookie";
import { api } from "../../utils/api-config";
import { useEffect, useState, useRef } from "react";
import ConfirmDeletePopup from "../ConfirmDeletePopup";
import defaultUserPicture from "../../../public/assets/icon-user.svg";
import { useUserProfile } from "../../context/userProfileContext";
import * as Yup from "yup";
//*Icons
import mail from "/assets/mail.svg";
import phone from "/assets/phone.svg";
import trash from "/assets/trash.svg";
import upload from "/assets/upload.svg";
import { useFormik } from "formik";
import { updateUserData } from "../../services/updateUserData";
import { updatePasswordUsuario } from "../../services/updatePasswordUsuario";

const Perfil = () => {
  const { updateUserProfile } = useUserProfile();
  const [profile, setProfile] = useState({
    nombre: "",
    apellido: "",
    email: "",
    phone: "",
    photo: "",
    rol: "",
    status: "",
    municipio: "",
    date: "",
    dniNumber: "",
    id: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const [errorPassword, setErrorPassword] = useState<string>("");

  const [formData, setFormData] = useState(profile);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // useEffect(() => {
  //   const isFormChanged = Object.keys(profile).some(
  //     (key) =>
  //       formData[key as keyof typeof formData] !==
  //       profile[key as keyof typeof profile]
  //   );
  //   setIsButtonDisabled(!isFormChanged);
  // }, [formData, profile]);

  useEffect(() => {
    const baseUrl = "http://localhost:3600/api/v1";
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    if (userData) {
      setProfile(userData);
      userData.photo = userData.photo
        ? `${baseUrl}/${userData.photo}`
        : defaultUserPicture;
      setFormData(userData);

      // Guardar la imagen actual del usuario en cookies
      Cookies.set(`profileImage_${userData.id}`, userData.photo || "");
    }
  }, []);

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

  const validationSchemaPassword = Yup.object({
    currentPassword: Yup.string().required("La contraseña actual es requerida"),
    newPassword: Yup.string()
      .required("La nueva contraseña es requerida")
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
      .matches(/[0-9]/, "La nueva contraseña debe tener al menos un número")
      .matches(/[A-Z]/, "La nueva contraseña debe tener al menos una letra mayúscula")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "La nueva contraseña debe tener al menos un carácter especial"),
    confirmPassword: Yup.string()
      .required("La confirmación de la contraseña es requerida")
      .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden")
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

        const response = await updatePasswordUsuario(formData, parseInt(profile.id));

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

  const formik = useFormik({
    initialValues: {
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
    },
    enableReinitialize: true, // ? Habilita la re-inicialización de los valores del formulario, para que en dado caso los datos del localStorage llegan vacios, al momento de que se actualicen los valores, se actualicen en el formulario
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setFormData({ ...formData, ...values });
      updateUserProfile({ ...formData, ...values });
      localStorage.setItem("user", JSON.stringify({ ...formData, ...values }));
      setProfile({ ...formData, ...values });

      const formDataUpdate = new FormData();

      formDataUpdate.append("name", values.nombre);
      formDataUpdate.append("lastName", values.apellido);
      formDataUpdate.append("email", values.email);

      try {
        const response = await updateUserData(formDataUpdate, profile.id);

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setError("");
        }
      } catch (error) {
        setError(`Error al actualizar la información del usuario. ${error}`);
      }
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formDataUpload = new FormData();
      formDataUpload.append("photo", file);

      const token = localStorage.getItem("authToken");

      try {
        const response = await api.put(
          `/upload-photo/${profile.id}`,
          formDataUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedPhoto = response.data.photo;
        setFormData({ ...formData, photo: updatedPhoto });
        setProfile({ ...profile, photo: updatedPhoto });
        updateUserProfile({ imageUrl: updatedPhoto });

        Cookies.set(`profileImage_${profile.id}`, updatedPhoto);
        const updatedData = { ...profile, photo: updatedPhoto };
        localStorage.setItem("user", JSON.stringify(updatedData));
      } catch (error) {
        console.error("Error al subir la foto de perfil", error);
      }
    }
  };

  const handleDeletePhoto = async () => {
    try {
      await api.delete(`/delete-photo/${profile.id}`);

      setFormData({ ...formData, photo: "" });
      setProfile({ ...profile, photo: "" });
      localStorage.removeItem(`profileImage_${profile.id}`);
      const updatedData = { ...profile, photo: "" };
      localStorage.setItem("user", JSON.stringify(updatedData));
    } catch (error) {
      console.log("Error al eliminar la foto de perfil", error);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const openDeletePopup = () => {
    setIsPopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsPopupOpen(false);
  };

  const confirmDeletePhoto = () => {
    handleDeletePhoto();
    closeDeletePopup();
  };

  return (
    <div className="flex items-center justify-center min-h-screen mb-8 bg-gray-700 rounded-lg dark:bg-gray-500">
      <section className="p-10 text-gray-900 dark:text-gray-100 body-font">
        <div className="container mx-auto">
          <div className="flex flex-row">
            {/* Perfil Section */}
            <div className="w-full max-w-lg p-4">
              <div className="min-w-[300px] max-w-full p-8 text-gray-800 rounded shadow-md sm:flex sm:space-x-6 bg-stone-200 dark:bg-gray-800 dark:text-gray-300">
                <div className="flex-shrink-0 w-full mb-6 sm:h-32 sm:w-32 sm:mb-0">
                  <img
                    src={profile.photo || defaultUserPicture}
                    alt="User Icon"
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {profile.nombre} {profile.apellido}
                    </h2>
                  </div>
                  {/* Información de Rol */}
                  <div className="space-y-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Rol: {profile.rol}
                    </span>
                    <span className="flex items-center space-x-2">
                      <img
                        src={mail}
                        alt="Mail Icon"
                        className="w-5 h-5 dark:invert"
                      />
                      <span className="text-gray-600 break-words dark:text-gray-400">
                        {profile.email}
                      </span>
                    </span>
                    {/* Información de Teléfono */}
                    <span className="flex items-center space-x-2">
                      <img
                        src={phone}
                        alt="Phone Icon"
                        className="w-5 h-5 dark:invert"
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        Teléfono: {profile.phone}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-center mt-4 space-x-4">
                    <button
                      className="px-4 py-2 rounded shadow hover:bg-color dark:hover:bg-color dark:bg-gray-700"
                      onClick={triggerFileInput}
                    >
                      <img
                        src={upload}
                        alt="Upload Icon"
                        className="w-6 h-6 dark:invert"
                      />
                    </button>
                    <button
                      className="px-4 py-2 rounded shadow hover:bg-red-500 dark:hover:bg-red-600 dark:bg-gray-700"
                      onClick={openDeletePopup}
                    >
                      <img
                        src={trash}
                        alt="Trash Icon"
                        className="w-6 h-6 dark:invert"
                      />
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            {/* formulario para actualizar la contrasena del usuario */}

            <div className="p-8 rounded shadow-md bg-stone-200 dark:bg-gray-800">
              <form onSubmit={formikPassword.handleSubmit}>
                <div>
                  <h2>Cambiar contrasena</h2>
                </div>

                <div>
                  <label htmlFor="">
                    Contrasena actual
                    <input
                      type="password"
                      name="currentPassword"
                      id=""
                      onChange={formikPassword.handleChange}
                      onBlur={formikPassword.handleBlur}
                      value={formikPassword.values.currentPassword}
                      className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                    />
                    {
                      formikPassword.touched.currentPassword && formikPassword.errors.currentPassword ? (
                        <div className="text-red-500">{formikPassword.errors.currentPassword}</div>
                      ) : null
                    }
                  </label>
                </div>
                <div>
                  <label htmlFor="">
                    Contrasena nueva
                    <input
                      type="password"
                      name="newPassword"
                      onChange={formikPassword.handleChange}
                      onBlur={formikPassword.handleBlur}
                      value={formikPassword.values.newPassword}
                      id=""
                      className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                    />
                    {
                      formikPassword.touched.newPassword && formikPassword.errors.newPassword ? (
                        <div className="text-red-500">{formikPassword.errors.newPassword}</div>
                      ) : null
                    }
                  </label>
                </div>
                <div>
                  <label htmlFor="">
                    comfirmar contrasena
                    <input
                      type="password"
                      name="confirmPassword"
                      id=""
                      onChange={formikPassword.handleChange}
                      onBlur={formikPassword.handleBlur}
                      value={formikPassword.values.confirmPassword}
                      className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                    />
                    {
                      formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword ? (
                        <div className="text-red-500">{formikPassword.errors.confirmPassword}</div>
                      ) : null
                    }
                  </label>
                </div>

                <div>
                  <button type="submit" className="`px-4 py-2 text-white rounded-md bg-color hover:bg-emerald-900">Actualizar contrasena</button>
                </div>
                {
                  errorPassword && <div className="text-red-500">{errorPassword}</div>
                }
                {
                  success && <div className="text-green-500">Contrasena actualizada exitosamente!</div>
                }
              </form>
            </div>

            {/* Formulario Section */}
            <div className="w-[480px] p-4">
              <div className="p-8 rounded shadow-md bg-stone-200 dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-semibold">
                  Editar Información
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                      <div className="text-red-500">{formik.errors.nombre}</div>
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
                      <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!formik.dirty || formik.isSubmitting}
                      className={`px-4 py-2 text-white rounded-md bg-color hover:bg-emerald-900 
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <ConfirmDeletePopup
        isOpen={isPopupOpen}
        onClose={closeDeletePopup}
        onConfirm={confirmDeletePhoto}
      />
    </div>
  );
};

export default Perfil;
