import { FC, useState } from "react";
import { NavLink } from "react-router-dom";

import taskList from "/assets/task-list.svg";
import table from "/assets/table.svg";
import arrowUp from "/assets/arrow-up.svg";
import settings from "/assets/settings.svg";
import home from "/assets/home.svg";

const SideBar: FC = () => {
  //constante para slide del sidebar
  const [isCollapsed, setIsCollapsed] = useState(false);
  //constante para el acordion del sidebar

  //constantes y modulos
  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  //constantes para los acordiones del sidebar
  const [isAccordionOpen1, setIsAccordionOpen1] = useState(false);
  const [isAccordionOpen2, setIsAccordionOpen2] = useState(false);
  const [isAccordionOpen3, setIsAccordionOpen3] = useState(false);
  const [isAccordionOpen4, setIsAccordionOpen4] = useState(false);

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

  return (
    <aside
      className={`flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      } h-full px-4 py-8 overflow-y-auto border-r  rtl:border-r-0 rtl:border-l bg-white dark:border-gray-700 transition-all duration-300`}
    >
      <button
        onClick={toggleSideBar}
        className="text-gray-600 dark:text-gray-900 mb-4"
      >
        {isCollapsed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12h18m-6-6l6 6m0 0l-6 6"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12H3m6-6l-6 6m0 0l6 6"
            />
          </svg>
        )}
      </button>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            {!isCollapsed && (
              <label className="px-3 text-semibold text-gray-900 uppercase dark:text-gray-900">
                analytics
              </label>
            )}
            <NavLink to="/">
              <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-900 hover:bg-color group">
                <img src={home} alt="" className="w-5 h-5 group-hover:invert" />
                {!isCollapsed && (
                  <span className="mx-2 text-sm font-medium group-hover:text-white">
                    Inicio
                  </span>
                )}
              </a>
            </NavLink>
            {/* Modulo de acordion 1*/}
            <div>
              <button
                onClick={toggleAccordion1}
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-900 hover:bg-color hover:text-white w-full group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                  />
                </svg>
                {!isCollapsed && (
                  <span className="mx-2 text-sm font-medium">
                    Gestion de Servicios
                  </span>
                )}
                <img
                  src={arrowUp}
                  alt=""
                  className={`w-6 h-6 ml-auto transition-transform duration-300 group-hover:invert group-hover:text-white ${
                    isAccordionOpen1 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isAccordionOpen1 && (
                <div className="mt-2 space-y-3">
                  <NavLink to="/Registro">
                    <a
                      className="flex items-center px-3 py-2 text-gray-600 rounded-lg dark:text-gray-900 hover:bg-color hover:text-white group"
                      href="#"
                    >
                      <img
                        src={taskList}
                        alt=""
                        className="w-5 h-5 mx-2 group-hover:invert"
                      />
                      {!isCollapsed && (
                        <span className="mx-2 text-sm font-medium">
                          Radicador
                        </span>
                      )}
                    </a>
                  </NavLink>

                  <NavLink to="/Registro">
                    <a
                      className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-900 hover:bg-color hover:text-white"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 4.5l-9 15M3.75 14.25h16.5"
                        />
                      </svg>
                      {!isCollapsed && (
                        <span className="mx-2 text-sm font-medium">
                          Auditoria
                        </span>
                      )}
                    </a>
                  </NavLink>

                  <NavLink to="/Registro">
                    <a
                      className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-900 hover:bg-color hover:text-white"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 4.5l-9 15M3.75 14.25h16.5"
                        />
                      </svg>
                      {!isCollapsed && (
                        <span className="mx-2 text-sm font-medium">
                          Auditoria
                        </span>
                      )}
                    </a>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Modulo de acordion 2*/}
            <div className="space-y-3">
              <div>
                <button
                  onClick={toggleAccordion2}
                  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-900 hover:bg-color hover:text-white w-full group"
                >
                  {/* Icono y texto para el segundo acordeón */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072c0 .355-.14.696-.389.948l-5.25 5.25a1.312 1.312 0 000 1.856l1.79 1.79zm0 0L5.67 18.92a1.5 1.5 0 01.707-2.636l5.88.588a.75.75 0 00.713-.713l.588-5.88a1.5 1.5 0 00-2.636-.707L6.75 12.75zM12.75 12.75l4.5-4.5a3 3 0 010 4.5l-4.5 4.5a3 3 0 01-4.5-4.5l4.5-4.5"
                    />
                  </svg>
                  {!isCollapsed && (
                    <span className="mx-2 text-sm font-medium">
                      Gestion de calidad
                    </span>
                  )}
                  <img
                    src={arrowUp}
                    alt=""
                    className={`w-6 h-6 ml-auto transition-transform duration-300 group-hover:invert ${
                      isAccordionOpen2 ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isAccordionOpen2 && (
                  <div className="mt-2 space-y-3">
                    <NavLink to="/ContentPage1">
                      <a
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-900 hover:bg-color hover:text-white"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 4.5l-9 15M3.75 14.25h16.5"
                          />
                        </svg>
                        {!isCollapsed && (
                          <span className="mx-2 text-sm font-medium">
                            Norte de Santander
                          </span>
                        )}
                      </a>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>

            {/* Modulo de acordion 3*/}
            <div className="space-y-3">
              <div>
                <button
                  onClick={toggleAccordion3}
                  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-900 hover:bg-color hover:text-white w-full group"
                >
                  {/* Icono y texto para el tercer acordeón */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072c0 .355-.14.696-.389.948l-5.25 5.25a1.312 1.312 0 000 1.856l1.79 1.79zm0 0L5.67 18.92a1.5 1.5 0 01.707-2.636l5.88.588a.75.75 0 00.713-.713l.588-5.88a1.5 1.5 0 00-2.636-.707L6.75 12.75zM12.75 12.75l4.5-4.5a3 3 0 010 4.5l-4.5 4.5a3 3 0 01-4.5-4.5l4.5-4.5"
                    />
                  </svg>
                  {!isCollapsed && (
                    <span className="mx-2 text-sm font-medium">
                      Gestion de Reportes
                    </span>
                  )}
                  <img
                    src={arrowUp}
                    alt=""
                    className={`w-6 h-6 ml-auto transition-transform duration-300 group-hover:invert ${
                      isAccordionOpen3 ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isAccordionOpen3 && (
                  <div className="mt-2 space-y-3">
                    <NavLink to="/ContentPage1">
                      <a
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-900 hover:bg-color hover:text-white"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 4.5l-9 15M3.75 14.25h16.5"
                          />
                        </svg>
                        {!isCollapsed && (
                          <span className="mx-2 text-sm font-medium">
                            Reporte de Radicacion
                          </span>
                        )}
                      </a>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>

            {/* Modulo de acordion 4*/}
            <div className="space-y-3">
              <div>
                <button
                  onClick={toggleAccordion4}
                  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-900 hover:bg-color hover:text-white w-full group"
                >
                  {/* Icono y texto para el cuarto acordeón */}
                  <img
                    src={table}
                    alt=""
                    className="w-5 h-5 group-hover:invert"
                  />
                  {!isCollapsed && (
                    <span className="mx-2 text-sm font-medium group-hover:text-white">
                      Tabla Radicacion
                    </span>
                  )}
                  <img
                    src={arrowUp}
                    alt=""
                    className={`w-6 h-6 ml-auto transition-transform duration-300 group-hover:invert ${
                      isAccordionOpen4 ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isAccordionOpen4 && (
                  <div className="mt-2 space-y-3">
                    <NavLink to="/ContentPage1">
                      <a
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-900 hover:bg-color hover:text-white"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 4.5l-9 15M3.75 14.25h16.5"
                          />
                        </svg>
                        {!isCollapsed && (
                          <span className="mx-2 text-sm font-medium">
                            Reporte de Radicacion
                          </span>
                        )}
                      </a>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-3 space-y-3">
            {!isCollapsed && (
              <label className="px-3 text-semibold text-gray-900 uppercase dark:text-gray-900">
                settings
              </label>
            )}
            <div className="flex flex-col -mx-3 space-y-3">
              <NavLink to="/Inicio">
                <a
                  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-900 hover:bg-color hover:text-white group"
                  href="#"
                >
                  <img
                    src={settings}
                    alt=""
                    className="w-5 h-5 group-hover:invert"
                  />
                  {!isCollapsed && (
                    <span className="mx-2 text-sm font-medium group-hover:text-white">
                      Setting
                    </span>
                  )}
                </a>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
