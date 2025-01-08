//*Funciones y Hooks
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { FC, useRef, useState, useEffect, useCallback } from "react";
import { useSidebar } from "@/context/sidebarContext";
import ModalReporteCirugia from "../components/ModalReporteCirugia";
import ModalReporteRadicado from "../components/ModalReporteRadicado";
import Category from "../components/CategoriaSideBar";
import SubCategory from "../components/SubCategoriaSideBar";

//*Icons
import Box from "/assets/box.svg";
import home from "/assets/home.svg";
import flag from "/assets/flag.svg";
import user from "/assets/user.svg";
import user2 from "/assets/user2.svg";
import user1 from "/assets/user1.svg";
import audit from "/assets/audit.svg";
import table from "/assets/table.svg";
import folder from "/assets/folder.svg";
import report from "/assets/report.svg";
import filling from "/assets/filling.svg";
import surgery from "/assets/surgery.svg";
import userMain from "/assets/userMain.svg";
import services from "/assets/services.svg";
import taskList from "/assets/task-list.svg";

const SideBar: FC = () => {
  const { isCollapsed, toggleSideBar } = useSidebar();

  // * stado para abrir y cerrar el modal de reportes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCirugiaOpen, setIsModalCirugiaOpen] = useState(false);

  // * estado para abrir y cerrar los acordeones
  const [openAccordions, setOpenAccordions] = useState({
    services: false,
    quality: false,
    inventary: false, // * se adapta nuevo sistema de inventario
    reports: false,
    tablets: false,
    admin: false,
  });
  // * referencias para el acordeon y el sidebar
  const accordionRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  // * hook para obtener el rol del usuario autenticado
  // * y controlar los permisos de acceso a las rutas
  const { rol } = useAuth();

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const openModalCirugia = useCallback(() => setIsModalCirugiaOpen(true), []);
  const closeModalCirugia = useCallback(() => setIsModalCirugiaOpen(false), []);

  // * funcion para obtener los estilos  de los links activos
  const getLinkClass = useCallback(
    (path: string) =>
      location.pathname === path
        ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
        : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white",
    []
  );

  // * funcion para abrir y cerrar los acordeones
  // * el argumento key debe ser el nombre de la propiedad del estado openAccordions
  // * En resumen: Esta función maneja el estado de apertura/cierre
  // * de múltiples acordeones en el sidebar, permitiendo alternar individualmente cada sección mientras mantiene el estado de las demás.
  const toggleAccordion = (key: keyof typeof openAccordions) =>
    setOpenAccordions((prev) => {
      const newState = {
        services: false,
        inventary: false, // * se adapta nuevo sistema de inventario
        quality: false,
        reports: false,
        tablets: false,
        admin: false,
      };
      newState[key] = !prev[key];
      return newState;
    });

  // * efecto para controlar la altura del acordeon
  useEffect(() => {
    if (accordionRef.current)
      accordionRef.current.style.maxHeight = openAccordions.quality
        ? `${accordionRef.current.scrollHeight}px`
        : "0px";
  }, [openAccordions.quality]);

  useEffect(() => {
    const savedState = Cookies.get("sidebarState");
    if (savedState && savedState === "collapsed" && !isCollapsed)
      toggleSideBar();
  }, [isCollapsed, toggleSideBar]);

  // * efecto para guardar el estado del sidebar en las cookies
  useEffect(() => {
    Cookies.set("sidebarState", isCollapsed ? "collapsed" : "expanded");
  }, [isCollapsed]);

  // * efecto para cerrar el sidebar al hacer click fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !isCollapsed
      )
        toggleSideBar();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCollapsed, toggleSideBar]);

  return (
    <aside
      ref={sidebarRef}
      className={`z-10 flex flex-col transition-all duration-700 ease-in-out overflow-y-auto border-r border-gray-200 rtl:border-r-0 rtl:border-l bg-white dark:bg-gray-800 dark:border-gray-700 ${
        isCollapsed ? "-translate-x-full w-16 absolute" : "w-60 absolute"
      } px-4 py-8 h-full`}
    >
      <div className="flex flex-col justify-between flex-1">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-4 ">
            {!isCollapsed && (
              <label className="px-2 text-lg font-bold text-[#049AE7] uppercase">
                Servicios
              </label>
            )}
            {/* Categoria de inicio */}
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
                      className={`absolute left-8 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
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

            {/* Categoria Gestiones */}
            <Category
              title="Gestión de Calidad"
              icon={folder}
              isOpen={openAccordions.quality}
              toggle={() => toggleAccordion("quality")}
            >
              <SubCategory
                to="/SistemGestionCalidad"
                icon={flag}
                title="Norte de Santander"
                isCollapsed={isCollapsed}
              />
            </Category>

            {/* Categoria de Inventario */}
            <Category
              title="Gestión de Inventarios"
              icon={Box}
              isOpen={openAccordions.inventary}
              toggle={() => toggleAccordion("inventary")}
            >
              {[1].includes(Number(rol)) && (
                <SubCategory
                  to="/SistemaInventario"
                  icon={flag}
                  title="Inventario Tecnologico"
                  isCollapsed={isCollapsed}
                />
              )}
            </Category>

            {/* Categoria de servicios */}
            {[10, 3, 1, 15, 6].includes(Number(rol)) && (
              <Category
                title="Gestión de Servicios"
                icon={services}
                isOpen={openAccordions.services}
                toggle={() => toggleAccordion("services")}
              >
                {/* subcategoria Radicador */}
                {[10, 3, 1, 15, 6].includes(Number(rol)) && (
                  <SubCategory
                    to="/tabla-radicacion"
                    icon={taskList}
                    title="Radicador"
                    isCollapsed={isCollapsed}
                  />
                )}
                {/* subcategoria cirugias */}
                {[15, 1].includes(Number(rol)) && (
                  <SubCategory
                    to="/tabla-cirugias"
                    icon={surgery}
                    title="Cirugía"
                    isCollapsed={isCollapsed}
                  />
                )}
                {/* auditoria de radicados */}
                {[3, 1].includes(Number(rol)) && (
                  <SubCategory
                    to="/tabla-auditoria"
                    icon={audit}
                    title="Auditoría"
                    isCollapsed={isCollapsed}
                  />
                )}
              </Category>
            )}

            {/* Categoria de reportes */}
            {[6, 2, 14, 3, 15, 1].includes(Number(rol)) && (
              <Category
                title="Gestión de Reportes"
                icon={filling}
                isOpen={openAccordions.reports}
                toggle={() => toggleAccordion("reports")}
              >
                {/* boton que abre el modal de reportes excel */}
                <button
                  onClick={openModal}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                    openAccordions.quality
                      ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                      : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                  } w-full`}
                >
                  <img
                    src={report}
                    alt=""
                    className="w-5 h-5 mx-2 group-hover:invert dark:invert"
                  />
                  {!isCollapsed && (
                    <span className="text-sm font-medium whitespace-nowrap stroke-inherit">
                      Reporte de Radicación
                    </span>
                  )}
                </button>

                {/* boton que abre el modal de reportes de cirugias */}
                <button
                  onClick={openModalCirugia}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                    openAccordions.quality
                      ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                      : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                  } w-full`}
                >
                  <img
                    src={report}
                    alt=""
                    className="w-5 h-5 mx-2 group-hover:invert dark:invert"
                  />
                  {!isCollapsed && (
                    <span className="text-sm font-medium whitespace-nowrap stroke-inherit">
                      Reporte de Cirugía
                    </span>
                  )}
                </button>
              </Category>
            )}

            {/* Categoria de tablas de radicado */}
            {[1].includes(Number(rol)) && (
              <Category
                title="Tablas Radicación"
                icon={table}
                isOpen={openAccordions.tablets}
                toggle={() => toggleAccordion("tablets")}
              >
                <SubCategory
                  to="/tabla-cups"
                  icon={report}
                  title="Cups"
                  isCollapsed={isCollapsed}
                />
                <SubCategory
                  to="/tabla-pacientes"
                  icon={report}
                  title="Pacientes"
                  isCollapsed={isCollapsed}
                />
                <SubCategory
                  to="/tabla-diagnostico"
                  icon={report}
                  title="Diagnostico"
                  isCollapsed={isCollapsed}
                />
                <SubCategory
                  to="/tabla-radicadores"
                  icon={report}
                  title="Radicadores"
                  isCollapsed={isCollapsed}
                />
                <SubCategory
                  to="/tabla-municipios"
                  icon={report}
                  title="Municipios"
                  isCollapsed={isCollapsed}
                />
                <SubCategory
                  to="/tabla-convenios"
                  icon={report}
                  title="Convenios"
                  isCollapsed={isCollapsed}
                />
                <SubCategory
                  to="/tabla-tipo-documento"
                  icon={report}
                  title="Tipo Documento"
                  isCollapsed={isCollapsed}
                />
                <SubCategory
                  to="/tabla-ips-primaria"
                  icon={report}
                  title="IPS Primaria"
                  isCollapsed={isCollapsed}
                />
                <SubCategory
                  to="/tabla-lugar-radicacion"
                  icon={report}
                  title="Lugar Radicación"
                  isCollapsed={isCollapsed}
                />
                <SubCategory
                  to="/tabla-ips-remite"
                  icon={report}
                  title="IPS Remitente"
                  isCollapsed={isCollapsed}
                />
                <SubCategory
                  to="/tabla-especialidad"
                  icon={report}
                  title="Especialidad"
                  isCollapsed={isCollapsed}
                />
                <SubCategory
                  to="/tabla-tipo-servicio"
                  icon={report}
                  title="Tipo Servicio"
                  isCollapsed={isCollapsed}
                />
              </Category>
            )}

            {/* Categoria de administrador */}
            {[1].includes(Number(rol)) && (
              <div className="flex flex-col space-y-3">
                {!isCollapsed && (
                  <label className="px-2 text-lg font-bold text-[#049AE7] uppercase dark:text-[#4F9BDC]">
                    Administrador
                  </label>
                )}
                <Category
                  title="Gestión Usuarios"
                  icon={userMain}
                  isOpen={openAccordions.admin}
                  toggle={() => toggleAccordion("admin")}
                >
                  <SubCategory
                    to="/Perfil"
                    icon={user}
                    title="Mi Perfil"
                    isCollapsed={isCollapsed}
                  />
                  <SubCategory
                    to="/Usuarios"
                    icon={user1}
                    title="Usuarios"
                    isCollapsed={isCollapsed}
                  />
                  <SubCategory
                    to="/registrar-usuarios"
                    icon={user2}
                    title="Registrar Usuarios"
                    isCollapsed={isCollapsed}
                  />
                </Category>
              </div>
            )}
            {/* Modal de reportes radicador */}
            {isModalOpen && (
              <ModalReporteRadicado isOpen={isModalOpen} onClose={closeModal} />
            )}

            {/* Modal de reportes cirugias */}
            {isModalCirugiaOpen && (
              <ModalReporteCirugia
                isOpen={isModalCirugiaOpen}
                onCLose={closeModalCirugia}
              />
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
