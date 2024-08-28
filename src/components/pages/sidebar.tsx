import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./modals/modal-reportes";

import folder from "/assets/folder.svg";
import user2 from "/assets/user2.svg";
import user1 from "/assets/user1.svg";
import userMain from "/assets/userMain.svg";
import user from "/assets/user.svg";
import report from "/assets/report.svg";
import filing from "/assets/filing.svg";
import surgery from "/assets/surgery.svg";
import audit from "/assets/audit.svg";
import flag from "/assets/flag.svg";
import taskList from "/assets/task-list.svg";
import table from "/assets/table.svg";
import arrowUp from "/assets/arrow-up.svg";
import arrow from "/assets/arrow.svg";
import home from "/assets/home.svg";
import services from "/assets/services.svg";

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

  return (
    <aside
      className={`flex flex-col test-sm ${
        isCollapsed ? "w-20" : "w-64"
      } h-full px-4 py-8 overflow-y-auto border-r border-gray-200 rtl:border-r-0 rtl:border-l bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-200`}
    >
      <button
        onClick={toggleSideBar}
        className="mb-4 text-gray-600 transition-all duration-300 dark:text-gray-900"
      >
        {isCollapsed ? (
          <img
            src={arrow}
            alt=""
            className="mx-1 transition-all duration-500 rotate-180 w-7 h-7"
          />
        ) : (
          <img
            src={arrow}
            alt=""
            className="mx-1 transition-all duration-500 w-7 h-7"
          />
        )}
      </button>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-4">
            {!isCollapsed && (
              <label className="px-4 text-lg font-bold text-[#049AE7] uppercase">
                Servicios
              </label>
            )}
            <NavLink to="/home">
              {({ isActive }) => (
                <a
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg group ${getLinkClass(
                    "/"
                  )} ${
                    isActive
                      ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                      : ""
                  }`}
                >
                  <img
                    src={home}
                    alt=""
                    className="w-5 h-5 group-hover:invert"
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
                </a>
              )}
            </NavLink>

            {/* Modulo de acordion 2*/}
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
                      isAccordionOpen2 ? "invert" : "group-hover:invert"
                    }`}
                  />
                  {!isCollapsed && (
                    <span
                      className={`mx-2 text-sm font-medium ${
                        isAccordionOpen2 ? "text-white dark:text-gray-200" : ""
                      }`}
                    >
                      Gestión de Calidad
                    </span>
                  )}
                  <img
                    src={arrowUp}
                    alt=""
                    className={`w-6 h-6 ml-auto transition-transform duration-300 ${
                      isAccordionOpen2 ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isAccordionOpen2 && (
                  <div className="mt-2 space-y-3">
                    <NavLink to="/perfil">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={flag}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
                            }`}
                          />
                          {!isCollapsed && (
                            <span
                              className={`mx-2 text-sm font-medium ${
                                isActive ? "text-white dark:text-gray-200" : ""
                              }`}
                            >
                              Norte de Santander
                            </span>
                          )}
                        </a>
                      )}
                    </NavLink>
                  </div>
                )}
              </div>
            </div>

            {/* Modulo de acordion 1*/}
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
                    isAccordionOpen1 ? "invert" : "group-hover:invert"
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
                  className={`w-6 h-6 ml-auto transition-transform duration-300 ${
                    isAccordionOpen1 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isAccordionOpen1 && (
                <div className="mt-2 space-y-3">
                  <NavLink to="/tabla">
                    {({ isActive }) => (
                      <a
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
                            isActive ? "invert" : "group-hover:invert"
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
                      </a>
                    )}
                  </NavLink>

                  <NavLink to="/tabla-cirugias">
                    {({ isActive }) => (
                      <a
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
                            isActive ? "invert" : "group-hover:invert"
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
                      </a>
                    )}
                  </NavLink>

                  <NavLink to="/tabla-auditoria">
                    {({ isActive }) => (
                      <a
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
                            isActive ? "invert" : "group-hover:invert"
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
                      </a>
                    )}
                  </NavLink>
                </div>
              )}
            </div>

            {/* Modulo de acordion 3*/}
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
                      isAccordionOpen3 ? "invert" : "group-hover:invert"
                    }`}
                  />
                  {!isCollapsed && (
                    <span
                      className={`mx-2 text-sm font-medium ${
                        isAccordionOpen3 ? "text-white dark:text-gray-200" : ""
                      }`}
                    >
                      Gestión de Reportes
                    </span>
                  )}
                  <img
                    src={arrowUp}
                    alt=""
                    className={`w-6 h-6 ml-auto transition-transform duration-300 ${
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
                        className="w-5 h-5 mx-2 group-hover:invert"
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

            {/* Modal Component */}
            <Modal isOpen={isModalOpen} onClose={closeModal} />
            {/* Modulo de acordion 4*/}
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
                      isAccordionOpen4 ? "invert" : "group-hover:invert"
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
                    } group-hover:invert`}
                  />
                </button>

                {isAccordionOpen4 && (
                  <div className="mt-2 space-y-3">
                    {/* Tabla radicación Cups */}
                    <NavLink to="/tabla-cups">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={report}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
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
                        </a>
                      )}
                    </NavLink>

                    {/* Tabla radicación Pacientes */}
                    <NavLink to="/tabla-pacientes">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={report}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
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
                        </a>
                      )}
                    </NavLink>

                    {/* Tabla radicación Radicadores */}
                    <NavLink to="/tabla-radicadores">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={report}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
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
                        </a>
                      )}
                    </NavLink>

                    {/* Tabla radicación Municipios */}
                    <NavLink to="/tabla-municipios">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={report}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
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
                        </a>
                      )}
                    </NavLink>

                    {/* Tabla radicación Convenios */}
                    <NavLink to="/tabla-convenios">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={report}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
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
                        </a>
                      )}
                    </NavLink>

                    {/* Tabla radicación Tipo Documento */}
                    <NavLink to="/tabla-tipo-documento">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={report}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
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
                        </a>
                      )}
                    </NavLink>

                    {/* Tabla radicación IPS Primaria */}
                    <NavLink to="/tabla-ips-primaria">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={report}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
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
                        </a>
                      )}
                    </NavLink>

                    {/* Tabla radicación Lugar Radicación */}
                    <NavLink to="/tabla-lugar-radicacion">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={report}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
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
                        </a>
                      )}
                    </NavLink>

                    {/* Tabla radicación IPS Remitente */}
                    <NavLink to="/tabla-ips-remite">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={report}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
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
                        </a>
                      )}
                    </NavLink>

                    {/* Tabla radicación Especialidad */}
                    <NavLink to="/tabla-especialidad">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={report}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
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
                        </a>
                      )}
                    </NavLink>

                    {/* Tabla radicación Tipo Servicio */}
                    <NavLink to="/tabla-tipo-servicio">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                          href="#"
                        >
                          <img
                            src={report}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
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
                        </a>
                      )}
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/*Tabla Configuraciones*/}
          <div className="flex flex-col mx-3 space-y-3">
            {!isCollapsed && (
              <label className="px-1 text-lg font-bold text-[#049AE7] uppercase dark:text-[#4F9BDC]">
                Configuraciones
              </label>
            )}

            {/* Tabla Configuraciones 1 */}
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
                      isAccordionOpen5 ? "invert" : "group-hover:invert"
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
                    } group-hover:invert`}
                  />
                </button>
                {isAccordionOpen5 && (
                  <div className="mt-2 space-y-3">
                    <NavLink to="/Perfil">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-600"
                          }`}
                          href="#"
                        >
                          <img
                            src={user1}
                            alt=""
                            className={`w-5.8 h-5.5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
                            }`}
                          />
                          {!isCollapsed && (
                            <span
                              className={`mx-2 text-sm font-medium ${
                                isActive ? "text-white dark:text-gray-200" : ""
                              }`}
                            >
                              Mi Perfil
                            </span>
                          )}
                        </a>
                      )}
                    </NavLink>

                    <NavLink to="/Usuarios">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-600"
                          }`}
                          href="#"
                        >
                          <img
                            src={user}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
                            }`}
                          />
                          {!isCollapsed && (
                            <span
                              className={`mx-2 text-sm font-medium ${
                                isActive ? "text-white dark:text-gray-200" : ""
                              }`}
                            >
                              Usuarios
                            </span>
                          )}
                        </a>
                      )}
                    </NavLink>

                    <NavLink to="/RegistrarUsuarios">
                      {({ isActive }) => (
                        <a
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-600"
                          }`}
                          href="#"
                        >
                          <img
                            src={user2}
                            alt=""
                            className={`w-5.5 h-5.5 mx-2 ${
                              isActive ? "invert" : "group-hover:invert"
                            }`}
                          />
                          {!isCollapsed && (
                            <span
                              className={`text-sm font-medium ${
                                isActive ? "text-white dark:text-gray-200" : ""
                              }`}
                            >
                              Registrar Usuarios
                            </span>
                          )}
                        </a>
                      )}
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
