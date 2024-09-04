import { useState } from "react";
import mostrar from "/assets/mostrar.svg";
import { useFetchUsers } from "../../../hooks/useFetchUsers";

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
  nomCiru1 = 'Radicacion',
  tipoDoc,
  nomCiru7 = 'Tipo Documento',
  numDoc,
  nomPac,
  numCel,
  nomCiru2 = 'Numero Celular',
  telFijo,
  email,
  direccion,
  nomCiru3 = 'Direccion',
  convenio,
  nomCiru4 = 'convenio',
  ipsPri,
  nomCiru5 = 'IPS Primaria',
  feOrden,
  nomCiru6 = 'Orden',
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
  profecional
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div onClick={toggleModal}>
        <img src={mostrar} alt="" />
      </div>
      {isOpen && (
        <div className="fixed z-50 flex items-center justify-center w-screen transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            onClick={toggleModal}
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-40 backdrop-blur-sm"
          ></div>

          {/* Contenido del Formulario */}

          <div className={`z-10 ${wdCondic ? 'w-[750px]' : 'w-[950px]'} p-2 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800`}>
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-semibold text-color">Servicios</h2>
              <button
                onClick={toggleModal}
                className="text-xl text-gray-500 hover-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Contenido del Formulario */}

            <div className={`max-h-[70Vh] overflow-y-auto text-sm divide-y grid ${gdCondic ? 'grid-cols-1' : 'grid-cols-2'} px-6 gap-x-4 py-2 divide-gray-200 dark:divide-gray-700 `}>
              {/* INIT-"TABLE"-COL-1 */}
              <section className=" grid grid-cols-2 gap-2">
                {numRadi && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Numero Radicado : {/*! no prop de nombre !*/}
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {feRadi && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Fecha {nomCiru1} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {tipoDoc && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      {nomCiru7} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {numDoc && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Numero Documento :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {nomPac && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Nombre Paciente :{/*! no prop nombre ! */}
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {numCel && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      {nomCiru2} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {telFijo && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Telefono Fijo :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {email && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Email :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {direccion && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      {nomCiru3} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {convenio && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      {nomCiru4} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {ipsPri && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      {nomCiru5} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {feOrden && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Fecha {nomCiru6} : {/* posible no prop nombre */}
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {lugRadi && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Lugar Radicacion :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {ipsRem && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      IPS Remite :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}
              </section>

              {/* INIT-"TABLE"-COL-2 */}
              <section className=" grid grid-cols-2 gap-2 mr-2 border-none">
                {profecional && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Profecional :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {especialidad && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Especialidad :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {codDiagn && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Cod Diagnostico :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {descripDiagn && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Descripcion Diagnostico :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {grupoServicio && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Grupo Servicio :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {tipoServicio && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Tipo Servicio :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {codCup && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Cod Cup : {/* no prop de nombre */}
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {descripCup && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Descripcion Cups : {/* no prop de nombre */}
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {auxiRadi && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Auxiliar Radicador :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {nomAuditor && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Nombre Auditor :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {feAuditoria && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Fecha Auditoria :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {unidadFunciona && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Unidad Funcional :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {justConcepto && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Justificacion Concepto :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {obserAuditoria && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start ">
                      Observacion Auditoria :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end">
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
