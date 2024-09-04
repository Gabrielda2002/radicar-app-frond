//*Funciones y Hooks
import { api } from "../../utils/api-config";
import { useEffect, useState, useRef } from "react";
import ConfirmDeletePopup from "../ConfirmDeletePopup";
import defaultUserPicture from "../../../public/assets/icon-user.svg";
//*Icons
import mail from "/assets/mail.svg";
import phone from "/assets/phone.svg";
import trash from "/assets/trash.svg";
import upload from "/assets/upload.svg";

const Perfil = () => {
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

  const [formData, setFormData] = useState(profile);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const baseUrl = "http://localhost:3600/api/v1";
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData) {
      setProfile(userData);

      if (userData.photo) userData.photo = `${baseUrl}/${userData.photo}`;

      setFormData(userData);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, photo: URL.createObjectURL(file) });

      const formDataUpload = new FormData();
      formDataUpload.append("photo", file);

      try {
        const response = await api.put(
          `/upload-photo/${profile.id}`,
          formDataUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const updatedPhoto = response.data.photo;
        setFormData({ ...formData, photo: updatedPhoto });
        setProfile({ ...profile, photo: updatedPhoto });

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

      const updatedData = { ...profile, photo: "" };
      localStorage.setItem("user", JSON.stringify(updatedData));
    } catch (error) {
      console.log("Error al eliminar la foto de perfil", error);
    }
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    setProfile(formData);
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
                      className="px-4 py-2 rounded shadow hover:bg-blue-500 dark:hover:bg-blue-600 dark:bg-gray-700"
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

            {/* Formulario Section */}
            <div className="w-[480px] p-4">
              <div className="p-8 rounded shadow-md bg-stone-200 dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-semibold">
                  Editar Información
                </h2>
                <form onSubmit={handleSaveChanges} className="space-y-4">
                  {[
                    { id: "nombre", label: "Nombre", type: "text" },
                    { id: "apellido", label: "Apellido", type: "text" },
                    { id: "email", label: "Correo Electrónico", type: "email" },
                  ].map((input) => (
                    <div key={input.id}>
                      <label
                        htmlFor={input.id}
                        className="block text-sm text-gray-700 dark:text-gray-300"
                      >
                        {input.label}
                      </label>
                      <input
                        type={input.type}
                        id={input.id}
                        value={(formData as any)[input.id]}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                      />
                    </div>
                  ))}

                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                      Guardar Cambios
                    </button>
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
