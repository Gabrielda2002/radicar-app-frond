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
import menu from "/assets/menu.svg";
import menu2 from "/assets/menu2.svg";
import userLogo from "/assets/user-logo.svg";
import defaultUserPicture from "/assets/icon-user.svg";
import logo from "@/assets/Layout/logo-navbar.png";
import HelpDesk from "@/featuures/HelpDesk/Components/ModalCreateTicket";
import AccordionMenu from "../components/AccordionMenu";
import { SUPPORT_LINKS } from "../config/navBarConfig";
import SupportMenu from "../components/SupportMenu";
import UserMenu from "../components/UserMenu";
import ThemeToggle from "../components/ThemeToggle";
import ModalRequestPermission from "@/featuures/Permission/components/ModalRequestPermission";
import type { UserNavigationItem } from "../types/navigation.types";

const Navbar: React.FC = React.memo(() => {
  const { logout } = useAuth();
  const { isCollapsed, toggleSideBar } = useSidebar();
  const { userProfile } = useUserProfile();
  const { theme, toggleTheme } = useTheme();
  const [imageUrl, setImageUrl] = useState<string>(defaultUserPicture);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState<boolean>(false);

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

  const userNavigation: UserNavigationItem[] = useMemo(
    () => [
      { name: "Perfil", href: "/perfil" },
      { 
        name: "Permisos",
        submenu: [
          { name: "Solicitar Permiso", action: handleOpenPermissionModal },
          { name: "Mis Solicitudes", href: "/mis-solicitudes" }
        ]
      },
      { name: "Cerrar Sesión", action: handleLogout },
    ],
    [handleLogout, handleOpenPermissionModal]
  );

  const toUpperCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const user = localStorage.getItem("user");
  const nombreUsuario = user ? toUpperCamelCase(JSON.parse(user).name) : "";

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
              className="p-1 mr-2 transition-all duration-300 ease-in-out bg-gray-300 rounded-lg group hover:translate-y-0 hover:bg-gray-700 dark:bg-color dark:hover:bg-teal-600"
            >
              <div className="relative w-6 h-6 md:w-8 md:h-8">
                <img
                  src={menu || "/placeholder.svg"}
                  alt="Menu Icon"
                  className={`top-0 left-0 w-6 h-6 md:w-8 md:h-8 transition-opacity duration-300 group-hover:invert dark:invert ${
                    isCollapsed ? "opacity-100" : "opacity-0"
                  }`}
                />
                <img
                  src={menu2 || "/placeholder.svg"}
                  alt="Menu2 Icon"
                  className={`absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 transition-opacity duration-300 group-hover:invert dark:invert ${
                    isCollapsed ? "opacity-0" : "opacity-100"
                  }`}
                />
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

          <div className="grid grid-flow-col auto-cols-fr md:hidden">

            <div className="flex items-center justify-end">
              <ModalPausasActivas />
            </div>

            <div className="flex items-center justify-start">
              <HelpDesk />
            </div>

            <div className="flex items-center justify-end">
              <NotificacionBell />
            </div>

            {/* Acordion menu responsive */}
            <div className="flex justify-end items-center">
              <AccordionMenu theme={theme}>
                <div className="p-2">
                  {/* Mobile theme toggle */}
                  <div className="flex items-center py-2 border-b dark:border-gray-600">
                    <ThemeToggle theme={theme as "light" | "dark"} onToggle={handleToggleTheme} size="sm" />
                  </div>
                  <hr />

                  {/* soportes */}
                  <div className="mt-2">
                    <SupportMenu links={SUPPORT_LINKS} theme={theme as "light" | "dark"} />
                  </div>
                  <hr />
                  {/* perfil  */}
                  <div className="relative mt-3 duration-300 rounded-lg dark:border-gray-800 hover:scale-105">
                    <UserMenu
                      items={userNavigation}
                      theme={theme as "light" | "dark"}
                      avatarUrl={imageUrl || defaultUserPicture}
                      userIconUrl={userLogo}
                    />
                  </div>
                </div>
              </AccordionMenu>
            </div>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="items-center justify-end hidden w-auto space-x-2 md:flex">
          {/* Desktop username display */}
          <div className="flex items-center mr-2">
            <h2 className="p-2 text-base font-medium text-black dark:text-white">
              Hola, {nombreUsuario}
            </h2>
          </div>

          {/* Theme toggle button */}
          <ThemeToggle theme={theme as "light" | "dark"} onToggle={handleToggleTheme} />

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
    </header>
  );
});

export default Navbar;
