import ProfileField from "./ProfileField"
import { FormatDate } from "@/utils/FormatDate";

// Assets
import mail from "/assets/mail.svg";
import phone from "/assets/phone.svg";
import areas from "/assets/areas.svg";
import sede from "/assets/sede.svg";
import id from "/assets/id.svg";
import municipio from "/assets/municipio.svg";

import { VscError } from "react-icons/vsc";
import { MdDateRange } from "react-icons/md";
import { FaUserTie, FaFileContract, FaChartLine, FaRegCheckCircle } from "react-icons/fa";
import { usePerfil } from "../hooks/UseProfile";
import { useFetchMyBalance } from "../hooks/useFetchMyBalance";


const InformationPerfil = () => {

  const {
    profile,
  } = usePerfil();

  const { data } = useFetchMyBalance();


  return (
    <>
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


      </div>
    </>
  )
}

export default InformationPerfil
