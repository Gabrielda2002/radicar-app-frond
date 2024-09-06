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
      <button onClick={toggleModal} className="focus:outline-none">
        <img className="dark:invert" src={mostrar} alt="" />
      </button>
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
            }  bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800`}
          >
            <div className="flex items-center justify-between  px-2 py-2">
              <h2 className="text-xl font-semibold text-color dark:text-gray-200">
                Servicios
              </h2>
              <button
                onClick={toggleModal}
                className="text-xl text-gray-500 hover-gray-700 pr-2"
              >
                &times;
              </button>
            </div>

            {/* Contenido del Formulario */}

            <div
              className={`max-h-[70Vh] overflow-y-auto text-sm  grid ${
                gdCondic ? "grid-cols-1" : "grid-cols-2"
              } px-6 gap-x-4 py-2  `}
            >
              {/* INIT-"TABLE"-COL-1 */}
              <section className=" grid grid-cols-2 gap-2 ">
                {numRadi && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      Numero Radicado : {/* ! POSIBLE dark:text-slate-200 ! */}
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {feRadi && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      Fecha {nomCiru1} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {tipoDoc && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      {nomCiru7} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {numDoc && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      Numero Documento :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {nomPac && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      Nombre Paciente :{/*! no prop nombre ! */}
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {numCel && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      {nomCiru2} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {telFijo && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      Telefono Fijo :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {email && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      Email :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {direccion && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      {nomCiru3} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {convenio && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      {nomCiru4} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {ipsPri && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      {nomCiru5} :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {feOrden && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      Fecha {nomCiru6} : {/* posible no prop nombre */}
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end  dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {lugRadi && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      Lugar Radicacion :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {ipsRem && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500 dark:border-slate-500">
                      IPS Remite :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}
              </section>

              {/* INIT-"TABLE"-COL-2 */}
              <section className="grid grid-cols-2 gap-2 mr-2 border-none ">
                {profecional && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Profecional :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {especialidad && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Especialidad :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {codDiagn && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Cod Diagnostico :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {descripDiagn && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Descripcion Diagnostico :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {grupoServicio && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Grupo Servicio :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {tipoServicio && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Tipo Servicio :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {codCup && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Cod Cup : {/* no prop de nombre */}
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {descripCup && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Descripcion Cups : {/* no prop de nombre */}
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {auxiRadi && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Auxiliar Radicador :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {nomAuditor && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Nombre Auditor :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {feAuditoria && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Fecha Auditoria :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {unidadFunciona && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Unidad Funcional :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {justConcepto && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Justificacion Concepto :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}

                {obserAuditoria && (
                  <>
                    <div className="text-left font-bold bg-slate-200 border ps-2 h-8 flex items-center justify-start dark:text-slate-900 dark:bg-slate-500  dark:border-slate-500">
                      Observacion Auditoria :
                    </div>
                    <div className="text-right border pr-2 h-8 flex items-center justify-end dark:border-slate-700">
                      ...texto alusivo
                    </div>
                  </>
                )}
              </section>
            </div>

            {/* Botones */}

            <div className="flex  items-center justify-end w-full h-12 gap-2 px-4 py-4 text-sm font-semibold  bg-white dark:bg-gray-800">
              <button
                onClick={toggleModal}
                className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:bg-gray-900"
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
