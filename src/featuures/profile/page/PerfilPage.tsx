import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";

// Icons
import mail from "/assets/mail.svg";
import phone from "/assets/phone.svg";
import id_ from "/assets/id_.svg";
import areas from "/assets/areas.svg";
import cargo from "/assets/cargo.svg";
import sede from "/assets/sede.svg";
import id from "/assets/id.svg";
import municipio from "/assets/municipio.svg";
import estado from "/assets/estado.svg";
import trash from "/assets/trash.svg";
import upload from "/assets/upload.svg";
import { usePerfil } from "@/featuures/profile/hooks/UseProfile";
import UserDataUpdateForm from "@/featuures/profile/components/UserDataUpdateForm";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

const ConfirmDeletePopup = lazy(
  () => import("@/components/common/ConfirmDeletePopUp/ConfirmDeletePopUp")
);

const Perfil: React.FC = () => {
  const {
    profile,
    isPopupOpen,
    fileInputRef,
    handleFileChange,
    triggerFileInput,
    openDeletePopup,
    closeDeletePopup,
    confirmDeletePhoto,
  } = usePerfil();
  // Variantes para Motion
  const variantes = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex items-center justify-center mb-8 bg-gray-700 rounded-lg h-1/6 dark:bg-gray-500">
      <section className="p-10 text-gray-900 dark:text-gray-100 body-font">
        <div className="container mx-auto">
          <div className="flex flex-row">
            {/* Perfil Section */}
            <div className="flex w-full max-w-xl gap-4 p-4">
              <div className="overflow-hidden bg-gray-300 shadow-xl rounded-2xl dark:bg-gray-800">
                <div className="p-4 space-y-4 bg-gray-300 shadow-xl dark:bg-gray-800 rounded-xl">
                  {/* Sección de perfil */}
                  <div className="flex items-center space-y-1 text-2xl bg-gray-200 center text- rounded-xl dark:bg-gray-700">
                    {/* Foto de perfil */}
                    <img
                      src={profile.photo}
                      alt="User profile"
                      className="object-cover transition-transform transform border-4 border-teal-500 rounded-full shadow-lg w-28 h-28 hover:scale-110"
                    />

                    <div className="flex flex-col justify-center text-lg">
                      <div>
                        {/* Nombre del usuario */}
                        <h2 className="px-4 mt-3 font-semibold text-gray-800 text-start dark:text-white">
                          {profile.name} {profile.lastname}
                        </h2>
                      </div>

                      <div className="flex flex-col items-start mt-2 text-gray-800 dark:text-gray-200">
                        {/* Rol del usuario
                        <span className="flex px-4 space-y-2 text-sm font-normal text-gray-800 dark:text-gray-200">
                          Rol: {profile.rol}
                        </span> */}

                        {/* ID del usuario */}
                        <div className="flex px-4 mb-4">
                          <img
                            src={id_}
                            alt="Ide Icon"
                            className="flex w-6 text-gray-600 h-7 dark:text-gray-300 dark:filter dark:invert"
                          />
                          <span className="px-2 mt-1 text-sm font-normal">{profile.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex bg-gray-200 flex-col-2 rounded-3xl dark:bg-gray-700">
                    <div className="mt-4 ml-5 mr-4 space-x-4 space-y-2">
                      <div className="grid grid-cols-2 gap-20">
                        <div className="flex flex-col items-start -space-x-2 space-y-2 text-gray-800 dark:text-gray-200">
                          <h2>Información Personal</h2>
                          {/* Email */}
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <img
                              src={mail}
                              alt="Mail Icon"
                              className="w-6 h-6 text-gray-600 dark:text-gray-300 dark:filter dark:invert"
                            />
                            <span className="text-sm font-normal break-words w-60">
                              {profile.email}
                            </span>
                          </div>

                          {/* Teléfono */}
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <img
                              src={phone}
                              alt="Phone Icon"
                              className="w-6 h-6 text-gray-600 dark:text-gray-300 dark:filter dark:invert"
                            />
                            <span className="text-sm font-normal">
                              {profile.phone}
                            </span>
                          </div>

                          {/* Numero de Documento */}
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <img
                              src={id}
                              alt="Dni Icon"
                              className="w-6 h-6 text-gray-600 dark:text-gray-300 dark:filter dark:invert"
                            />
                            <span className="text-sm font-normal">
                              {profile.dniNumber}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-start space-y-2 text-gray-800 dark:text-gray-200 ">
                          <h2>Información Laboral</h2>
                          {/* Area */}
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <img
                              src={areas}
                              alt="Area Icon"
                              className="w-5 h-6 text-gray-600 dark:text-gray-300 dark:filter dark:invert"
                            />
                            <span className="text-sm font-normal">
                              {profile.area}
                            </span>
                          </div>
                          {/* Actualizar datos */}
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <img
                              src={cargo}
                              alt="Position Icon"
                              className="w-5 text-gray-600 h-7 dark:text-gray-300 dark:filter dark:invert"
                            />
                            <span className="w-56 text-sm font-normal">
                              {profile.position}
                            </span>
                          </div>

                          {/* Sede */}
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <img
                              src={sede}
                              alt="Headquearters Icon"
                              className="w-5 h-6 text-gray-600 dark:text-gray-300 dark:filter dark:invert"
                            />
                            <span className="text-sm font-normal">
                              {profile.headquarters}
                            </span>
                          </div>

                          {/* Municipio */}
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <img
                              src={municipio}
                              alt="Municipality Icon"
                              className="w-6 h-6 text-gray-600 dark:text-gray-300 dark:filter dark:invert"
                            />
                            <span className="mt-2 text-sm font-normal">
                              {profile.municipality}
                            </span>
                          </div>
                          {/* Estado */}
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <img
                              src={estado}
                              alt="Status Icon"
                              className="w-6 h-6 mb-3 text-gray-600 dark:text-gray-300 dark:filter dark:invert"
                            />
                            <span className="mb-3 text-sm font-normal">
                              {profile.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex justify-center px-6 py-4 space-x-3 bg-gray-200 rounded-xl dark:bg-gray-700">
                    <button
                      className="flex items-center px-4 py-2 text-sm font-medium text-white transition duration-300 bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 hover:scale-105"
                      onClick={triggerFileInput}
                    >
                      <img
                        src={upload}
                        alt="Upload Icon"
                        className="inline-block w-6 h-6 mr-2 dark:filter dark:invert"
                      />
                      Subir
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-sm font-medium text-white transition duration-300 bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:scale-105"
                      onClick={openDeletePopup}
                    >
                      <img
                        src={trash}
                        alt="Trash Icon"
                        className="inline-block w-6 h-6 mr-2 dark:filter dark:invert"
                      />
                      Eliminar
                    </button>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Formulario Section */}
            <div className="flex gap-4 p-4 ">
              <div className="flex-1 p-8 bg-gray-300 shadow-md rounded-2xl dark:bg-gray-800 w-fit h-fit">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variantes}
                  className="mt-3"
                >
                  <UserDataUpdateForm initialUserData={profile} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<LoadingSpinner />}>
        <ConfirmDeletePopup
          isOpen={isPopupOpen}
          onClose={closeDeletePopup}
          onConfirm={confirmDeletePhoto}
        />
      </Suspense>
    </div>
  );
};

export default Perfil;
