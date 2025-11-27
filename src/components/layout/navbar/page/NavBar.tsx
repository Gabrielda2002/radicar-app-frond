//*Fuctions and Hooks
import React from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/authContext";
// removed unused headlessui imports. Menus are handled inside SupportMenu/UserMenu components
import { useSidebar } from "@/context/sidebarContext";
import { useTheme } from "@/context/blackWhiteContext";
import { useUserProfile } from "@/context/userProfileContext";
import ModalPausasActivas from "../components/ModalPausasActivas";
import { useState, useEffect, useCallback, useMemo } from "react";
import NotificacionBell from "@/components/NotificationBell";
//*Icons
// sun/moon handled inside ThemeToggle component
import userLogo from "/assets/user-logo.svg";
import defaultUserPicture from "/assets/icon-user.svg";
import logo from "@/assets/Layout/logo-navbar.png";
import HelpDesk from "@/featuures/HelpDesk/Components/ModalCreateTicket";
import AccordionMenu from "../components/AccordionMenu";
import { SUPPORT_LINKS } from "../config/navBarConfig";
import SupportMenu from "../components/SupportMenu";
import UserMenu from "../components/UserMenu";
import ThemeToggle from "../components/ThemeToggle";
import MobileMenuItem from "../components/MobileMenuItem";
import ModalRequestPermission from "@/featuures/Permission/components/ModalRequestPermission";
import type { UserNavigationItem } from "../types/navigation.types";
import MyRequestsPermissions from "@/featuures/MyRequestsPermissions/page/MyRequestsPermissions";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { BookOpen } from "lucide-react";

const Navbar: React.FC = React.memo(() => {
  const { logout } = useAuth();
  const { isCollapsed, toggleSideBar } = useSidebar();
  const { userProfile } = useUserProfile();
  const { theme, toggleTheme } = useTheme();

  const [imageUrl, setImageUrl] = useState<string>(defaultUserPicture);
  const [isPermissionModalOpen, setIsPermissionModalOpen] =
    useState<boolean>(false);
  const [isMyPermissionsOpen, setIsMyPermissionsOpen] =
    useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    if (userData && userData.id) {
      const savedImage = Cookies.get(`profileImage_${userData.id}`);

      if (savedImage) {
        setImageUrl(savedImage);
      } else {
        setImageUrl(defaultUserPicture);
      }
    }
  }, [userProfile]);

  //*Using callback to save components and void unnecesary re-renders
  const handleToggleSidebar = useCallback(() => {
    toggleSideBar();
  }, [toggleSideBar]);

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleOpenPermissionModal = useCallback(() => {
    setIsPermissionModalOpen(true);
  }, []);

  const handleClosePermissionModal = useCallback(() => {
    setIsPermissionModalOpen(false);
  }, []);

  const handleOpenMyPermissions = useCallback(() => {
    setIsMyPermissionsOpen(true);
  }, []);

  const handleCloseMyPermissions = useCallback(() => {
    setIsMyPermissionsOpen(false);
  }, []);

  const handleOpenSupportMenu = useCallback(() => {
    setIsSupportMenuOpen(true);
  }, []);

  const userNavigation: UserNavigationItem[] = useMemo(
    () => [
      { name: "Perfil", href: "/perfil" },
      {
        name: "Permisos",
        submenu: [
          { name: "Solicitar Permiso", action: handleOpenPermissionModal },
          { name: "Mis Solicitudes", action: handleOpenMyPermissions },
        ],
      },
      { name: "Cerrar Sesión", action: handleLogout },
    ],
    [handleLogout, handleOpenPermissionModal]
  );

  return (
    <header
      className={`text-gray-900 body-font ${
        theme === "dark" ? "bg-gray-800 dark-mode" : "bg-white light-mode"
      }`}
    >
      <div className="flex items-center justify-between p-2 mx-auto border-b-2 border-black md:p-5 dark:border-white">
        {/* mobile menu */}
        <div className="grid items-center grid-cols-[auto,1fr,auto] max-md:w-full gap-3">
          {/* Left side - Logo and sidebar toggle */}
          <div className="w-fit">
            <button
              title="Abrir/Cerrar Sidebar"
              onClick={handleToggleSidebar}
              className="p-1 mr-2 transition-all duration-300 ease-in-out bg-gray-300 rounded-lg group hover:translate-y-0 hover:bg-gray-700 dark:text-white dark:bg-color dark:hover:bg-teal-600"
            >
              <div className="relative w-6 h-6 md:w-8 md:h-8">
                {isCollapsed ? (
                  <PanelRightClose className="w-6 h-6 md:w-8 md:h-8" />
                ) : (
                  <PanelRightOpen className="w-6 h-6 md:w-8 md:h-8" />
                )}
              </div>
            </button>
          </div>

          <div className="flex justify-start">
            <NavLink to="/home">
              <img
                src={logo || "/placeholder.svg"}
                className="w-8 h-8 md:w-10 md:h-10"
                alt="Logo"
                title="Inicio"
              />
            </NavLink>
          </div>

          {/* ? Acordion menu responsive mobile */}
          <div className="grid grid-flow-col auto-cols-fr md:hidden">
            <div className="flex justify-end items-center">
              <AccordionMenu theme={theme}>
                <div className="py-2 space-y-1">
                  <div className="px-2 py-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
                      Herramientas
                    </p>
                  </div>
                  <MobileMenuItem
                    icon={<BookOpen className="w-5 h-5" />}
                    label="Soportes"
                    onClick={handleOpenSupportMenu}
                    theme={theme as "light" | "dark"}
                  />

                  <div className="my-2 border-t border-gray-300 dark:border-gray-600" />

                  <div className="px-2 py-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
                      Configuración
                    </p>
                  </div>

                  <button
                    onClick={handleToggleTheme}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 
                      transition-all duration-200 rounded-lg
                      ${
                        theme === "dark"
                          ? "hover:bg-gray-700 active:bg-gray-600 text-white"
                          : "hover:bg-gray-100 active:bg-gray-200 text-gray-900"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 text-xl">
                        {theme === "light" ? (
                          <MoonIcon className="w-5 h-5" />
                        ) : (
                          <SunIcon className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-sm font-medium">
                        {theme === "light" ? "Modo Oscuro" : "Modo Claro"}
                      </span>
                    </div>
                  </button>

                  <div className="my-2 border-t border-gray-300 dark:border-gray-600" />

                  <div className="px-2 py-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
                      Cuenta
                    </p>
                  </div>

                  <div className="relative duration-300 rounded-lg">
                    <UserMenu
                      items={userNavigation}
                      theme={theme as "light" | "dark"}
                      avatarUrl={imageUrl || defaultUserPicture}
                      userIconUrl={userLogo}
                      buttonClassName={`
                        w-full flex items-center justify-between px-4 py-3 
                        transition-all duration-200 rounded-lg
                        ${
                          theme === "dark"
                            ? "hover:bg-gray-700 active:bg-gray-600 text-white"
                            : "hover:bg-gray-100 active:bg-gray-200 text-gray-900"
                        }
                      `}
                      itemsClassName="relative w-full mt-2"
                    />
                  </div>
                </div>
              </AccordionMenu>
            </div>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="items-center justify-end hidden w-auto space-x-2 md:flex">
          {/* Theme toggle button */}
          <ThemeToggle
            theme={theme as "light" | "dark"}
            onToggle={handleToggleTheme}
          />

          {/* Help desk button (admin only) */}
          <div className="flex items-center">
            <HelpDesk />
          </div>

          {/* Pausas activas modal */}
          <div className="flex items-center">
            <ModalPausasActivas />
          </div>

          {/* Support links dropdown */}
          <SupportMenu
            links={SUPPORT_LINKS}
            theme={theme as "light" | "dark"}
            itemsClassName="absolute right-0 origin-top-right mt-2 z-50 w-60"
          />

          {/* Notifications (admin only) */}
          <div className="flex items-center">
            <NotificacionBell />
          </div>

          {/* User profile dropdown */}
          <div className="relative border-2 rounded-lg dark:border-gray-800">
            <UserMenu
              items={userNavigation}
              theme={theme as "light" | "dark"}
              avatarUrl={imageUrl || defaultUserPicture}
              userIconUrl={userLogo}
              itemsClassName="absolute right-0 z-50 w-56 py-2"
            />
          </div>
        </div>
      </div>

      {/* Modal de Permisos */}
      <ModalRequestPermission
        isOpen={isPermissionModalOpen}
        onClose={handleClosePermissionModal}
      />
      <MyRequestsPermissions
        isOpen={isMyPermissionsOpen}
        onClose={handleCloseMyPermissions}
      />

      {/* Modal de Notificaciones en mobile */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsNotificationsOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md">
            <NotificacionBell />
          </div>
        </div>
      )}

      {/* Modal de Soportes en mobile */}
      {isSupportMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsSupportMenuOpen(false)}
          />
          <div
            className={`relative z-10 w-full max-w-sm p-6 rounded-lg shadow-xl ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Enlaces de Soporte
              </h3>
              <button
                onClick={() => setIsSupportMenuOpen(false)}
                className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <div className="space-y-2">
              {SUPPORT_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsSupportMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    theme === "dark"
                      ? "hover:bg-gray-700 text-gray-200"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

export default Navbar;
