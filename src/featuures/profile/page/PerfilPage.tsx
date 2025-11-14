import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";

// External icons
import { MdDateRange } from "react-icons/md";
import { FaUserTie, FaFileContract, FaChartLine, FaRegCheckCircle } from "react-icons/fa";

// Internal components and hooks
import { usePerfil } from "@/featuures/profile/hooks/UseProfile";
import UserDataUpdateForm from "@/featuures/profile/components/UserDataUpdateForm";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { FormatDate } from "@/utils/FormatDate";

// Assets
import mail from "/assets/mail.svg";
import phone from "/assets/phone.svg";
import areas from "/assets/areas.svg";
import sede from "/assets/sede.svg";
import id from "/assets/id.svg";
import municipio from "/assets/municipio.svg";
import trash from "/assets/trash.svg";
import upload from "/assets/upload.svg";
import ProfileField from "../components/ProfileField";
import { useFetchMyBalance } from "../hooks/useFetchMyBalance";
import { VscError } from "react-icons/vsc";

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

  const { data } = useFetchMyBalance();

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

            {/* Profile Information Grid */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Información Personal
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileField
                  icon={mail}
                  label="Email"
                  value={profile.email}
                  title="Correo Electrónico"
                />

                <ProfileField
                  icon={phone}
                  label="Teléfono"
                  value={profile.phone.toString()}
                  title="Número de Teléfono"
                />

                <ProfileField
                  icon={id}
                  label="Documento"
                  value={profile.dniNumber.toString()}
                  title="Número de Documento"
                />

                <ProfileField
                  icon={MdDateRange}
                  label="Inicio Contrato"
                  value={FormatDate(profile.dateStartContract, false)}
                  title="Fecha de Inicio de Contrato"
                />

                <ProfileField
                  icon={FaFileContract}
                  label="Tipo Contrato"
                  value={profile.contractType}
                  title="Tipo de Contrato"
                />

                <ProfileField
                  icon={areas}
                  label="Área"
                  value={profile.area}
                  title="Área de Trabajo"
                />

                <ProfileField
                  icon={FaUserTie}
                  label="Cargo"
                  value={profile.position}
                  title="Cargo o Posición"
                />

                <ProfileField
                  icon={sede}
                  label="Sede"
                  value={profile.headquarters}
                  title="Sede de Trabajo"
                />

                <ProfileField
                  icon={municipio}
                  label="Municipio"
                  value={profile.municipality}
                  title="Municipio"
                />

                <ProfileField
                  icon={FaChartLine}
                  label="Jefe Inmediato"
                  value={`${profile.managerName} ${profile.managerLastName}`}
                  title="Jefe Inmediato"
                />

                {data?.data.periodos.map((p, index) => (
                  <div
                    key={index}
                  >
                    <h2 className={`text-xl font-semibold ${p.vencido ? "text-rose-600" : "text-gray-900 dark:text-white"} mb-6`}>
                      Periodo #{index + 1}
                    </h2>
                    <ProfileField
                      icon={MdDateRange}
                      label={`Fecha Inicio ${index + 1}:`}
                      value={FormatDate(p.fechaInicio, false)}
                      title={`Fecha de Inicio del Periodo ${index + 1}`}
                    />
                    <ProfileField
                      icon={MdDateRange}
                      label={`Fecha Fin ${index + 1}:`}
                      value={FormatDate(p.fechaFin, false)}
                      title={`Fecha de Fin del Periodo ${index + 1}`}
                    />
                    <ProfileField
                      icon={parseInt(p.diasDisponibles) > 0 ? FaRegCheckCircle : VscError}
                      label={`Dias disponibles ${index + 1}:`}
                      value={p.diasDisponibles}
                      title={`Días disponibles del Periodo ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

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
