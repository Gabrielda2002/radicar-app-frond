import { useState } from "react";
import mostrar from "/assets/mostrar.svg";

interface ThProps {
  wdCondic?: false;
  gdCondic?: false;
  // Table Col 1
  numRadi?: boolean;
  feRadi?: boolean;
  nomCiru1?: string;
  tipoDoc?: boolean;
  nomCiru7?: string;
  numDoc?: boolean;
  nomPac?: boolean;
  numCel?: boolean;
  nomCiru2?: string;
  telFijo?: boolean;
  email?: boolean;
  direccion?: boolean;
  nomCiru3?: string;
  convenio?: boolean;
  nomCiru4?: string;
  ipsPri?: boolean;
  nomCiru5?: string;
  feOrden?: boolean;
  nomCiru6?: string;
  lugRadi?: boolean;
  ipsRem?: boolean;
  // Table Col 2
  obserAuditoria?: boolean;
  justConcepto?: boolean;
  unidadFunciona?: boolean;
  feAuditoria?: boolean;
  nomAuditor?: boolean;
  auxiRadi?: boolean;
  descripCup?: boolean;
  codCup?: boolean;
  tipoServicio?: boolean;
  grupoServicio?: boolean;
  descripDiagn?: boolean;
  codDiagn?: boolean;
  especialidad?: boolean;
  profecional?: boolean;
}

const ModalMostarDatos: React.FC<ThProps> = ({
  wdCondic = true,
  gdCondic = true,
  // Table Col 1
  numRadi,
  feRadi,
  nomCiru1 = "Radicacion",
  tipoDoc,
  nomCiru7 = "Tipo Documento",
  numDoc,
  nomPac,
  numCel,
  nomCiru2 = "Numero Celular",
  telFijo,
  email,
  direccion,
  nomCiru3 = "Direccion",
  convenio,
  nomCiru4 = "convenio",
  ipsPri,
  nomCiru5 = "IPS Primaria",
  feOrden,
  nomCiru6 = "Orden",
  lugRadi,
  ipsRem,
  // Table Col 2
  obserAuditoria,
  justConcepto,
  unidadFunciona,
  feAuditoria,
  nomAuditor,
  auxiRadi,
  descripCup,
  codCup,
  tipoServicio,
  grupoServicio,
  descripDiagn,
  codDiagn,
  especialidad,
  profecional,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div onClick={toggleModal}>
        <img className="dark:invert" src={mostrar} alt="" />
      </div>
      {isOpen && (
        <div className="fixed z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            onClick={toggleModal}
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-40 backdrop-blur-sm"
          ></div>

          {/* Contenido del Formulario */}

          <div
            className={`z-10 ${
              wdCondic ? "w-[750px]" : "w-[950px]"
            } p-2 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800`}
          >
            <div className="flex items-center justify-between px-2 mb-4">
              <h2 className="text-lg font-semibold text-color">Servicios</h2>
              <button
                onClick={toggleModal}
                className="text-xl text-gray-500 hover-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Contenido del Formulario */}

            <div
              className={`max-h-[70Vh] overflow-y-auto text-sm divide-y grid ${
                gdCondic ? "grid-cols-1" : "grid-cols-2"
              } px-6 gap-x-4 py-2 divide-gray-200 dark:divide-gray-700 `}
            >
              {/* INIT-"TABLE"-COL-1 */}
              <section className="grid grid-cols-2 gap-2 ">
                {numRadi && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Numero Radicado : {/*! no prop de nombre !*/}
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {feRadi && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Fecha {nomCiru1} :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {tipoDoc && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      {nomCiru7} :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {numDoc && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Numero Documento :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {nomPac && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Nombre Paciente :{/*! no prop nombre ! */}
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {numCel && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      {nomCiru2} :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {telFijo && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Telefono Fijo :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {email && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Email :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {direccion && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      {nomCiru3} :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {convenio && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      {nomCiru4} :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {ipsPri && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      {nomCiru5} :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {feOrden && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Fecha {nomCiru6} : {/* posible no prop nombre */}
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {lugRadi && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Lugar Radicacion :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {ipsRem && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      IPS Remite :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}
              </section>

              {/* INIT-"TABLE"-COL-2 */}
              <section className="grid grid-cols-2 gap-2 mr-2 border-none ">
                {profecional && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Profecional :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {especialidad && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Especialidad :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {codDiagn && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Cod Diagnostico :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {descripDiagn && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Descripcion Diagnostico :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {grupoServicio && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Grupo Servicio :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {tipoServicio && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Tipo Servicio :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {codCup && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Cod Cup : {/* no prop de nombre */}
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {descripCup && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Descripcion Cups : {/* no prop de nombre */}
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {auxiRadi && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Auxiliar Radicador :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {nomAuditor && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Nombre Auditor :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {feAuditoria && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Fecha Auditoria :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {unidadFunciona && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Unidad Funcional :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {justConcepto && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Justificacion Concepto :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {obserAuditoria && (
                  <>
                    <div className="flex items-center justify-start h-8 font-bold text-left border bg-slate-200 ps-2 ">
                      Observacion Auditoria :
                    </div>
                    <div className="flex items-center justify-end h-8 pr-2 text-right border">
                      ...texto alusivo
                    </div>
                  </>
                )}
              </section>
            </div>

            {/* Botones */}

            <div className="flex justify-end mt-6 space-x-3 text-sm">
              <button
                onClick={toggleModal}
                className="px-6 py-3 text-white bg-gray-500 rounded-lg round hover:bg-gray-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalMostarDatos;
