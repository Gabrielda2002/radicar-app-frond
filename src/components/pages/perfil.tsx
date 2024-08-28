import { useState } from "react";
import useEditProfileForm from "../../hooks/useEditProfile";
import mail from "/assets/mail.svg";
import phone from "/assets/phone.svg";
import trash from "/assets/trash.svg";
import upload from "/assets/upload.svg";

const Perfil = () => {
  const { formData, handleInputChange, handleFileChange, handleSubmit } =
    useEditProfileForm();

  const [profile, setProfile] = useState({
    firstName: "User",
    lastName: "Default",
    email: "userdefault@example.com",
    phone: "123-456-7890",
    role: "User",
    photo: "https://via.placeholder.com/150", // Imagen por defecto
  });

  // Actualiza el perfil con los cambios del formulario
  const handleSaveChanges = () => {
    setProfile({
      ...profile,
      ...formData,
      photo: formData.photo || profile.photo,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <section className="p-10 text-gray-900 dark:text-gray-300 body-font">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            {/* Perfil Section */}
            <div className="w-full p-4 lg:w-1/2">
              <div className="max-w-md p-8 text-gray-800 rounded shadow-md sm:flex sm:space-x-6 bg-stone-200 dark:bg-gray-800 dark:text-gray-300">
                <div className="flex-shrink-0 w-full mb-6 sm:h-32 sm:w-32 sm:mb-0">
                  <img
                    src={profile.photo}
                    alt="User Icon"
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {profile.firstName} {profile.lastName}
                    </h2>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {profile.role}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="flex items-center space-x-2">
                      <img src={mail} alt="Mail Icon" className="w-5 h-5" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {profile.email}
                      </span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <img src={phone} alt="Phone Icon" className="w-5 h-5" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {profile.phone}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-center mt-4 space-x-4">
                    <button className="px-4 py-2 rounded shadow hover:bg-red-500 dark:hover:bg-red-600">
                      <img src={upload} alt="Upload Icon" className="w-6 h-6" />
                    </button>
                    <button className="px-4 py-2 rounded shadow hover:bg-blue-500 dark:hover:bg-blue-600">
                      <img src={trash} alt="Trash Icon" className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario Section */}
            <div className="w-full p-4 lg:w-1/2">
              <div className="p-8 rounded shadow-md bg-stone-200 dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-semibold">
                  Editar Información
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: "firstName", label: "Nombre", type: "text" },
                    { id: "lastName", label: "Apellido", type: "text" },
                    { id: "email", label: "Correo Electrónico", type: "email" },
                    { id: "phone", label: "Teléfono", type: "text" },
                    { id: "role", label: "Rol", type: "text" },
                  ].map((input) => (
                    <div key={input.id}>
                      <label
                        htmlFor={input.id}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {input.label}
                      </label>
                      <input
                        type={input.type}
                        id={input.id}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        value={
                          formData[input.id as keyof typeof formData] || ""
                        }
                        onChange={handleInputChange}
                        aria-label={input.label}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Foto de Perfil
                    </label>
                    <input
                      type="file"
                      id="photo"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      onChange={handleFileChange}
                      aria-label="Foto de Perfil"
                    />
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      onClick={handleSaveChanges}
                      className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
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
    </div>
  );
};

export default Perfil;
