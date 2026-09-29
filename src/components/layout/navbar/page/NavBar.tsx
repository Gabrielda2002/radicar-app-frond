// * Functions and Hooks

import React, { useCallback, useEffect, useMemo, useState } from "react";

import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

import { useAuth } from "@/context/authContext";
import { useSidebar } from "@/context/sidebarContext";
import { useTheme } from "@/context/blackWhiteContext";
import { useUserProfile } from "@/context/userProfileContext";

// * Icons
import { BookOpen, PanelRightClose, PanelRightOpen } from "lucide-react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

// * Components
import NotificacionBell from "@/components/NotificationBell";
import AccordionMenu from "../components/AccordionMenu";
import SupportMenu from "../components/SupportMenu";
import UserMenu from "../components/UserMenu";
import ThemeToggle from "../components/ThemeToggle";
import MobileMenuItem from "../components/MobileMenuItem";

import HelpDesk from "@/featuures/HelpDesk/Components/ModalCreateTicket";

import ModalRequestPermission from "@/featuures/Permission/components/ModalRequestPermission";
import MyRequestsPermissions from "@/featuures/Permission/components/ModalMyRequestsPermissions";

import { SUPPORT_LINKS } from "../config/navBarConfig";

import type { UserNavigationItem } from "../types/navigation.types";

import { api } from "@/utils/api-config";
import { useStorePermissions } from "@/featuures/Permission/store/useStorePermissions";

// * Assets
import userLogo from "/assets/user-logo.svg";
import defaultUserPicture from "/assets/icon-user.svg";
import logo from "@/assets/Layout/logo-navbar.png";
import Button from "@/components/common/Ui/Button";

const Navbar: React.FC = React.memo(() => {
  const { logout } = useAuth();
  const { isCollapsed, toggleSideBar } = useSidebar();
  const { userProfile } = useUserProfile();
  const { theme, toggleTheme } = useTheme();
  const { getMyRequests } = useStorePermissions();

  const [imageUrl, setImageUrl] = useState<string>(defaultUserPicture);

  const [isPermissionModalOpen, setIsPermissionModalOpen] =
    useState<boolean>(false);

  const [isMyPermissionsOpen, setIsMyPermissionsOpen] =
    useState<boolean>(false);

  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);

  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState<boolean>(false);

  const isDark = theme === "dark";

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
    getMyRequests();
  }, [getMyRequests]);

  const handleCloseMyPermissions = useCallback(() => {
    setIsMyPermissionsOpen(false);
  }, []);

  const handleOpenSupportMenu = useCallback(() => {
    setIsSupportMenuOpen(true);
  }, []);

  const handleCloseSupportMenu = useCallback(() => {
    setIsSupportMenuOpen(false);
  }, []);

  const MoodleButtonAction = useCallback(async () => {
    try {
      const response = await api.get("/moodle/sso-token");

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Error generating SSO token");
      }

      const data = response.data;

      window.open(data.moodleUrl, "_blank");
    } catch (error) {
      console.log("Error generating SSO token:", error);
    }
  }, []);

  const userNavigation: UserNavigationItem[] = useMemo(
    () => [
      {
        name: "Perfil",
        href: "/perfil",
      },
      {
        name: "Permisos",
        submenu: [
          {
            name: "Solicitar Permiso",
            action: handleOpenPermissionModal,
          },
          {
            name: "Mis Solicitudes",
            action: handleOpenMyPermissions,
          },
        ],
      },
      {
        name: "Plataforma de Capacitación",
        action: MoodleButtonAction,
      },
      {
        name: "Configuración",
        href: "/configuration",
      },
      {
        name: "Cerrar Sesión",
        action: handleLogout,
      },
    ],
    [
      handleLogout,
      handleOpenPermissionModal,
      handleOpenMyPermissions,
      MoodleButtonAction,
    ]
  );

  return (
    <>
      <header
        className={`
          sticky top-0 z-40 w-full
          border-b
          transition-colors duration-300
          ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-[#ccebec]"
          }
          shadow-[0_2px_12px_rgba(0,141,147,0.06)]
        `}
      >
        <div
          className="
            flex items-center justify-between
            w-full
            px-3 py-2.5
            md:px-5 md:py-3
          "
        >
          <div className="flex items-center min-w-0 gap-3">
            <Button
              variant="secondary"
              title="Abrir/Cerrar Sidebar"
              aria-label="Abrir/Cerrar Sidebar"
              onClick={handleToggleSidebar}
            >
              {isCollapsed ? (
                <PanelRightOpen className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <PanelRightClose className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </Button>

            {/* Logo */}

            <NavLink
              to="/home"
              className="
                flex items-center
                transition-opacity duration-200
                hover:opacity-80
              "
            >
              <img
                src={logo || "/placeholder.svg"}
                className="object-contain w-8 h-8 md:w-10 md:h-10"
                alt="Logo"
                title="Inicio"
              />
            </NavLink>
          </div>

          <div className="flex items-center md:hidden">
            <AccordionMenu theme={theme}>
              <div className="py-3 space-y-2">
                <div className="px-4 py-2">
                  <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                    Herramientas
                  </p>
                </div>

                <div className="px-2">
                  <MobileMenuItem
                    icon={<BookOpen className="w-5 h-5" />}
                    label="Soportes"
                    onClick={handleOpenSupportMenu}
                    theme={theme as "light" | "dark"}
                  />
                </div>

                <div
                  className={`
                    my-3 border-t
                    ${isDark ? "border-gray-700" : "border-[#e2f1f1]"}
                  `}
                />

                <div className="px-4 py-2">
                  <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                    Configuración
                  </p>
                </div>

                <div className="px-2">
                  <button
                    type="button"
                    onClick={handleToggleTheme}
                    className={`
                      flex items-center w-full gap-3
                      px-4 py-3
                      rounded-xl
                      border
                      transition-all duration-200
                      ${isDark
                        ? `
                            bg-gray-800
                            border-gray-700
                            text-gray-200
                            hover:bg-gray-700
                          `
                        : `
                            bg-white
                            border-[#d8eeee]
                            text-gray-700
                            hover:bg-[#effbfb]
                            hover:border-[#b7e4e5]
                            hover:text-[#008d93]
                          `
                      }
                    `}
                  >
                    <div
                      className={`
                        flex items-center justify-center
                        w-8 h-8
                        rounded-lg
                        ${isDark ? "bg-gray-700" : "bg-[#effbfb]"}
                      `}
                    >
                      {theme === "light" ? (
                        <MoonIcon className="w-5 h-5" />
                      ) : (
                        <SunIcon className="w-5 h-5" />
                      )}
                    </div>

                    <span className="text-sm font-medium">
                      {theme === "light" ? "Modo Oscuro" : "Modo Claro"}
                    </span>
                  </button>
                </div>

                {/* Divider */}

                <div
                  className={`
                    my-3 border-t
                    ${isDark ? "border-gray-700" : "border-[#e2f1f1]"}
                  `}
                />

                <div className="px-4 py-2">
                  <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                    Cuenta
                  </p>
                </div>

                <div className="px-2">
                  <UserMenu
                    items={userNavigation}
                    theme={theme as "light" | "dark"}
                    avatarUrl={imageUrl || defaultUserPicture}
                    userIconUrl={userLogo}
                    buttonClassName="
                      w-full justify-between
                      py-3
                    "
                    itemsClassName="relative w-full mt-2"
                  />
                </div>
              </div>
            </AccordionMenu>
          </div>

          <div className="items-center justify-end hidden gap-2 md:flex">
            <ThemeToggle
              theme={theme as "light" | "dark"}
              onToggle={handleToggleTheme}
            />

            {/* Help desk */}

            <div className="flex items-center">
              <HelpDesk />
            </div>


            <div className="flex items-center">
              <SupportMenu
                links={SUPPORT_LINKS}
                theme={theme as "light" | "dark"}
                itemsClassName="
                  absolute
                  right-0
                  origin-top-right
                  mt-2
                  z-50
                  w-60
                "
              />
            </div>

            <div className="flex items-center">
              <NotificacionBell />
            </div>

            <div className="relative ml-1">
              <UserMenu
                items={userNavigation}
                theme={theme as "light" | "dark"}
                avatarUrl={imageUrl || defaultUserPicture}
                userIconUrl={userLogo}
                itemsClassName="
                  absolute
                  right-0
                  z-50
                  w-60
                  py-2
                  mt-2
                "
              />
            </div>
          </div>
        </div>
      </header>

      <ModalRequestPermission
        isOpen={isPermissionModalOpen}
        onClose={handleClosePermissionModal}
      />

      <MyRequestsPermissions
        isOpen={isMyPermissionsOpen}
        onClose={handleCloseMyPermissions}
      />

      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="
              absolute inset-0
              bg-black/50
              backdrop-blur-sm
            "
            onClick={() => setIsNotificationsOpen(false)}
          />

          <div className="relative z-10 w-full max-w-md">
            <NotificacionBell />
          </div>
        </div>
      )}

      {isSupportMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}

          <div
            className="
              absolute inset-0
              bg-black/50
              backdrop-blur-sm
            "
            onClick={handleCloseSupportMenu}
          />

          <div
            className={`
              relative z-10
              w-full max-w-sm
              overflow-hidden
              rounded-2xl
              border
              shadow-2xl
              ${isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-[#ccebec]"
              }
            `}
          >
            {/* Header */}

            <div
              className={`
                flex items-center justify-between
                px-6 py-4
                border-b
                ${isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-[#effbfb] border-[#b7e4e5]"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex items-center justify-center
                    w-9 h-9
                    rounded-lg
                    ${isDark
                      ? "bg-gray-700 text-[#008d93]"
                      : "bg-white text-[#008d93]"
                    }
                  `}
                >
                  <BookOpen className="w-5 h-5" />
                </div>

                <div>
                  <h3
                    className={`
                      text-base font-semibold
                      ${isDark ? "text-gray-100" : "text-gray-700"}
                    `}
                  >
                    Enlaces de Soporte
                  </h3>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Recursos y herramientas
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseSupportMenu}
                aria-label="Cerrar soporte"
                className={`
                  flex items-center justify-center
                  w-8 h-8
                  rounded-lg
                  transition-colors
                  ${isDark
                    ? `
                        text-gray-400
                        hover:bg-gray-700
                        hover:text-gray-200
                      `
                    : `
                        text-gray-400
                        hover:bg-white
                        hover:text-[#008d93]
                      `
                  }
                `}
              >
                <span className="text-xl leading-none">×</span>
              </button>
            </div>

            {/* Links */}

            <div className="p-4">
              <div className="space-y-2">
                {SUPPORT_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCloseSupportMenu}
                    className={`
                      flex items-center
                      w-full
                      px-4 py-3
                      rounded-xl
                      border
                      transition-all duration-200
                      ${isDark
                        ? `
                            border-gray-700
                            text-gray-200
                            hover:bg-gray-700
                            hover:border-gray-600
                          `
                        : `
                            border-[#d8eeee]
                            text-gray-700
                            hover:bg-[#effbfb]
                            hover:border-[#b7e4e5]
                            hover:text-[#008d93]
                          `
                      }
                    `}
                  >
                    <span className="text-sm font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}

            <div
              className={`
                px-6 py-3
                border-t
                ${isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-[#f5fbfb] border-[#d8eeee]"
                }
              `}
            >
              <p className="text-xs text-gray-400">
                Selecciona una opción para continuar.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
