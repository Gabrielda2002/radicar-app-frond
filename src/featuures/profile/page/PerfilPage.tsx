import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
// Internal components and hooks
import { usePerfil } from "@/featuures/profile/hooks/UseProfile";
import UserDataUpdateForm from "@/featuures/profile/components/UserDataUpdateForm";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import trash from "/assets/trash.svg";
import upload from "/assets/upload.svg";


import InformationPerfil from "../components/InformationPerfil";

const ConfirmDeletePopup = lazy(
  () => import("@/components/common/ConfirmDeletePopUp/ConfirmDeletePopUp")
);

// Animation variants
const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
};

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


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Profile Information Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Header with profile photo and basic info */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6">
              <div className="flex items-center gap-6">
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="text-white">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {profile.name} {profile.lastname}
                  </h1>
                  <p className="text-teal-100 text-lg mt-1">{profile.rol}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-teal-100 text-sm">
                      ID: {profile.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <InformationPerfil/>
            {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105"
                  onClick={triggerFileInput}
                >
                  <img
                    src={upload}
                    alt="Upload"
                    className="w-5 h-5 filter invert"
                  />
                  Subir Foto
                </button>

                <button
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105"
                  onClick={openDeletePopup}
                >
                  <img
                    src={trash}
                    alt="Delete"
                    className="w-5 h-5 filter invert"
                  />
                  Eliminar Foto
                </button>
              </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          {/* User Data Update Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={ANIMATION_VARIANTS}
            >
              <UserDataUpdateForm initialUserData={profile} />
            </motion.div>
          </div>
        </div>
      </div>

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
