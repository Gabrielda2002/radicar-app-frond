//*Funciones y Hooks
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./modals/ModalReporte";
import { useAuth } from "../../context/authContext";
//*Icons
import home from "/assets/home.svg";
import flag from "/assets/flag.svg";
import user from "/assets/user.svg";
import user2 from "/assets/user2.svg";
import user1 from "/assets/user1.svg";
import audit from "/assets/audit.svg";
import table from "/assets/table.svg";
import arrow from "/assets/arrow.svg";
import folder from "/assets/folder.svg";
import report from "/assets/report.svg";
import filing from "/assets/filing.svg";
import surgery from "/assets/surgery.svg";
import arrowUp from "/assets/arrow-up.svg";
import userMain from "/assets/userMain.svg";
import services from "/assets/services.svg";
import taskList from "/assets/task-list.svg";
const SideBar: FC = () => {
  //constante para slide del sidebar y funciones
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //constante para el acordion del sidebar

  //constantes y modulos
  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //constantes para los acordiones del sidebar
  const [isAccordionOpen1, setIsAccordionOpen1] = useState(false);
  const [isAccordionOpen2, setIsAccordionOpen2] = useState(false);
  const [isAccordionOpen3, setIsAccordionOpen3] = useState(false);
  const [isAccordionOpen4, setIsAccordionOpen4] = useState(false);
  const [isAccordionOpen5, setIsAccordionOpen5] = useState(false);

  const toggleAccordion1 = () => {
    setIsAccordionOpen1(!isAccordionOpen1);
  };

  const toggleAccordion2 = () => {
    setIsAccordionOpen2(!isAccordionOpen2);
  };

  const toggleAccordion3 = () => {
    setIsAccordionOpen3(!isAccordionOpen3);
  };

  const toggleAccordion4 = () => {
    setIsAccordionOpen4(!isAccordionOpen4);
  };

  const toggleAccordion5 = () => {
    setIsAccordionOpen5(!isAccordionOpen5);
  };

  //Funcion para hacer el color de los botones del sidebar
  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
      : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white";
  };
  //*Accede al rol del usuario
  const { rol } = useAuth(); // <! ITERA ROLES DESDE LOGIN !>

  return (
    <aside
      className={`flex flex-col h-full transition-transform duration-500 ease-in-out overflow-y-auto border-r border-gray-900 ${
        isCollapsed ? "w-20 translate-x-0" : "w-62"
      } h-full px-4 py-8 overflow-y-auto border-r border-gray-200 rtl:border-r-0 rtl:border-l bg-white dark:bg-gray-800 dark:border-gray-700`}
    >
      <div>
        <button
          onClick={toggleSideBar}
          className="mb-4 text-gray-600 transition-all duration-300 dark:text-gray-900 group"
        >
          <img
            src={arrow}
            alt=""
            className={`mx-1 transition-all duration-500 dark:bg-white dark:rounded-full dark:px-1 dark:py-1 bg-gray-300 px-1 py-1 rounded-full ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-4">
            {!isCollapsed && (
              <label className="px-2 text-lg font-bold text-[#049AE7] uppercase">
                Servicios
              </label>
            )}
            <NavLink to="/home">
              {({ isActive }) => (
                <div
                  className={`flex items-center px-3 py-2 transition-colors duration-500 transform rounded-lg group relative ${getLinkClass(
                    "/home"
                  )} ${
                    isActive
                      ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                      : ""
                  }`}
                >
                  <img
                    src={home}
                    alt=""
                    className="w-5 h-5 group-hover:invert dark:invert"
                  />
                  {!isCollapsed && (
                    <span
                      className={`mx-2 text-sm font-medium ${
                        isActive
                          ? "text-white dark:text-gray-200"
                          : "group-hover:text-white dark:group-hover:text-gray-200"
                      }`}
                    >
                      Inicio
                    </span>
                  )}
                </div>
              )}
            </NavLink>

            {/* Modulo de acordion 2*/}
            {/* < -- MODULO GESTION CALIDAD -- > */}
            {(rol == "1" || rol == "2" || rol == "3" || rol == "4" || rol == "5" || rol == "6") && (
              <div className="space-y-3">
                <div>
                  <button
                    onClick={toggleAccordion2}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                      isAccordionOpen2
                        ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                        : "text-gray-600 dark:text-gray-200 hover:bg-color hover:text-white"
                    } w-full`}
                  >
                    {/* Icono y texto para el segundo acordeón */}
                    <img
                      src={folder}
                      alt=""
                      className={`w-5 h-5 ${
                        isAccordionOpen2
                          ? "invert"
                          : "group-hover:invert dark:invert"
                      }`}
                    />
                    {!isCollapsed && (
                      <span
                        className={`mx-2 text-sm font-medium ${
                          isAccordionOpen2
                            ? "text-white dark:text-gray-200"
                            : ""
                        }`}
                      >
                        Gestión de Calidad
                      </span>
                    )}
                    <img
                      src={arrowUp}
                      alt=""
                      className={`w-6 h-6 ml-auto transition-transform duration-300 dark:invert ${
                        isAccordionOpen2 ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isAccordionOpen2 && (
                    <div className="mt-2 space-y-3">
                      <NavLink to="/SistemGestionCalidad">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={flag}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : ""
                                }`}
                              >
                                Norte de Santander
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Modulo de acordion 1*/}
            {/* < -- MODULO GESTION SERVICIOS -- > */}
            {(rol == "1" || rol == "3") && (
              <div>
                <button
                  onClick={toggleAccordion1}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                    isAccordionOpen1
                      ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                      : "text-gray-600 dark:text-gray-200 hover:bg-color hover:text-white"
                  } w-full`}
                >
                  <img
                    src={services}
                    alt=""
                    className={`w-5 h-5 ${
                      isAccordionOpen1
                        ? "invert"
                        : "group-hover:invert dark:invert"
                    }`}
                  />
                  {!isCollapsed && (
                    <span
                      className={`mx-2 text-sm font-medium ${
                        isAccordionOpen1 ? "text-white dark:text-gray-200" : ""
                      }`}
                    >
                      Gestión de Servicios
                    </span>
                  )}
                  <img
                    src={arrowUp}
                    alt=""
                    className={`w-6 h-6 ml-auto transition-transform duration-300 dark:invert ${
                      isAccordionOpen1 ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isAccordionOpen1 && (
                  <div className="mt-2 space-y-3">
                    <NavLink to="/tabla-radicacion">
                      {({ isActive }) => (
                        <div
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                        >
                          <img
                            src={taskList}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive
                                ? "invert"
                                : "group-hover:invert dark:invert"
                            }`}
                          />
                          {!isCollapsed && (
                            <span
                              className={`mx-2 text-sm font-medium ${
                                isActive ? "text-white dark:text-gray-200" : ""
                              }`}
                            >
                              Radicador
                            </span>
                          )}
                        </div>
                      )}
                    </NavLink>

                    <NavLink to="/tabla-cirugias">
                      {({ isActive }) => (
                        <div
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                        >
                          <img
                            src={surgery}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive
                                ? "invert"
                                : "group-hover:invert dark:invert"
                            }`}
                          />
                          {!isCollapsed && (
                            <span
                              className={`mx-2 text-sm font-medium ${
                                isActive ? "text-white dark:text-gray-200" : ""
                              }`}
                            >
                              Cirugía
                            </span>
                          )}
                        </div>
                      )}
                    </NavLink>

                    <NavLink to="/tabla-auditoria">
                      {({ isActive }) => (
                        <div
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                        >
                          <img
                            src={audit}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive
                                ? "invert"
                                : "group-hover:invert dark:invert"
                            }`}
                          />
                          {!isCollapsed && (
                            <span
                              className={`mx-2 text-sm font-medium ${
                                isActive ? "text-white dark:text-gray-200" : ""
                              }`}
                            >
                              Auditoría
                            </span>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </div>
                )}
              </div>
            )}

            {/* Modulo de acordion 3*/}
            {/* < -- MODULO GESTION REPORTES -- > */}
            {(rol == "1"|| rol == "2" || rol == "3" || rol == "6") && (
              <div className="space-y-3">
                <div>
                  <button
                    onClick={toggleAccordion3}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                      isAccordionOpen3
                        ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                        : "text-gray-600 dark:text-gray-200 hover:bg-color hover:text-white"
                    } w-full`}
                  >
                    {/* Icono y texto para el tercer acordeón */}
                    <img
                      src={filing}
                      alt=""
                      className={`w-5 h-5 ${
                        isAccordionOpen3
                          ? "invert"
                          : "group-hover:invert dark:invert"
                      }`}
                    />
                    {!isCollapsed && (
                      <span
                        className={`mx-2 text-sm font-medium ${
                          isAccordionOpen3
                            ? "text-white dark:text-gray-200"
                            : ""
                        }`}
                      >
                        Gestión de Reportes
                      </span>
                    )}
                    <img
                      src={arrowUp}
                      alt=""
                      className={`w-6 h-6 ml-auto transition-transform duration-300 dark:invert ${
                        isAccordionOpen3 ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isAccordionOpen3 && (
                    <div className="mt-2 space-y-3">
                      <button
                        onClick={openModal}
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg group dark:text-gray-200 hover:bg-color2 hover:text-white"
                      >
                        <img
                          src={report}
                          alt=""
                          className="w-5 h-5 mx-2 group-hover:invert dark:invert"
                        />
                        {!isCollapsed && (
                          <span className="mx-2 text-sm font-medium">
                            Reporte de Radicación
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* < DEBERIA IR MODAL? > */}

            {/* Modal Component */}
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              formType={"Autorizacion"}
            />

            {/* Modulo de acordion 4*/}
            {/* < -- MODULO TABLAS RADICACION -- > */}
            {(rol == "1") && (
              <div className="space-y-3">
                <div>
                  <button
                    onClick={toggleAccordion4}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                      isAccordionOpen4
                        ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                        : "text-gray-600 dark:text-gray-200 hover:bg-color hover:text-white"
                    } w-full`}
                  >
                    {/* Icono y texto para el cuarto acordeón */}
                    <img
                      src={table}
                      alt=""
                      className={`w-5 h-5 ${
                        isAccordionOpen4
                          ? "invert"
                          : "group-hover:invert dark:invert"
                      }`}
                    />
                    {!isCollapsed && (
                      <span
                        className={`mx-2 text-sm font-medium ${
                          isAccordionOpen4
                            ? "text-white dark:text-gray-200"
                            : "group-hover:text-white dark:group-hover:text-gray-200"
                        }`}
                      >
                        Tabla Radicación
                      </span>
                    )}
                    <img
                      src={arrowUp}
                      alt=""
                      className={`w-6 h-6 ml-auto transition-transform duration-300 ${
                        isAccordionOpen4 ? "rotate-180" : ""
                      } dark:invert`}
                    />
                  </button>

                  {isAccordionOpen4 && (
                    <div className="mt-2 space-y-3">
                      {/* Tabla radicación Cups */}
                      <NavLink to="/tabla-cups">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Cups
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      {/* Tabla radicación Pacientes */}
                      <NavLink to="/tabla-pacientes">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Pacientes
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      {/* Tabla radicación Radicadores */}
                      <NavLink to="/tabla-radicadores">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Radicadores
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      {/* Tabla radicación Municipios */}
                      <NavLink to="/tabla-municipios">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Municipios
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      {/* Tabla radicación Convenios */}
                      <NavLink to="/tabla-convenios">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Convenios
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      {/* Tabla radicación Tipo Documento */}
                      <NavLink to="/tabla-tipo-documento">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Tipo Documento
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      {/* Tabla radicación IPS Primaria */}
                      <NavLink to="/tabla-ips-primaria">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                IPS Primaria
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      {/* Tabla radicación Lugar Radicación */}
                      <NavLink to="/tabla-lugar-radicacion">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Lugar Radicación
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      {/* Tabla radicación IPS Remitente */}
                      <NavLink to="/tabla-ips-remite">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                IPS Remitente
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      {/* Tabla radicación Especialidad */}
                      <NavLink to="/tabla-especialidad">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Especialidad
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      {/* Tabla radicación Tipo Servicio */}
                      <NavLink to="/tabla-tipo-servicio">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Tipo Servicio
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/*Tabla Configuraciones*/}
          <div className="flex flex-col mx-3 space-y-3">
            {!isCollapsed && (
              <label className="-px-2 text-lg font-bold text-[#049AE7] uppercase dark:text-[#4F9BDC]">
                Configuraciones
              </label>
            )}

            {/* Tabla Configuraciones 1 */}
            {/* < -- MODULO ADIM (PERFIL) -- > */}
            {(rol == "1") && (
              <div className="flex flex-col -mx-3 space-y-3">
                <div>
                  <button
                    onClick={toggleAccordion5}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                      isAccordionOpen5
                        ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                        : "text-gray-600 dark:text-gray-200 hover:bg-color hover:text-white dark:hover:bg-gray-600"
                    } w-full`}
                  >
                    <img
                      src={userMain}
                      alt=""
                      className={`w-5 h-5 ${
                        isAccordionOpen5
                          ? "invert"
                          : "group-hover:invert dark:invert"
                      }`}
                    />
                    {!isCollapsed && (
                      <span
                        className={`mx-2 text-sm font-medium ${
                          isAccordionOpen5
                            ? "text-white dark:text-gray-200"
                            : "group-hover:text-white dark:group-hover:text-gray-200"
                        }`}
                      >
                        Administrador
                      </span>
                    )}
                    <img
                      src={arrowUp}
                      alt=""
                      className={`w-6 h-6 ml-auto transition-transform duration-300 ${
                        isAccordionOpen5 ? "rotate-180" : ""
                      } dark:invert`}
                    />
                  </button>
                  {isAccordionOpen5 && (
                    <div className="mt-2 space-y-3">
                      <NavLink to="/Perfil">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-600"
                            }`}
                          >
                            <img
                              src={user1}
                              alt=""
                              className={`w-5.8 h-5.5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : ""
                                }`}
                              >
                                Mi Perfil
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      <NavLink to="/Usuarios">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-600"
                            }`}
                          >
                            <img
                              src={user}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`mx-2 text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : ""
                                }`}
                              >
                                Usuarios
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>

                      <NavLink to="/registrar-usuarios">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-600"
                            }`}
                          >
                            <img
                              src={user2}
                              alt=""
                              className={`w-5.5 h-5.5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`text-sm font-medium ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : ""
                                }`}
                              >
                                Registrar Usuarios
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
