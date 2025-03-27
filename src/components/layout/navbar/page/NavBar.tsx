//*Fuctions and Hooks
import React from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { Menu, MenuButton } from "@headlessui/react";
import { useSidebar } from "@/context/sidebarContext";
import { useTheme } from "@/context/blackWhiteContext";
import { useUserProfile } from "@/context/userProfileContext";
import ModalPausasActivas from "../components/ModalPausasActivas";
import { useState, useEffect, useCallback, useMemo } from "react";
import NotificacionBell from "@/components/NotificationBell";
//*Icons
import sun from "/assets/sun.svg";
import moon from "/assets/moon.svg";
import menu from "/assets/menu.svg";
import menu2 from "/assets/menu2.svg";
import userLogo from "/assets/user-logo.svg";
import defaultUserPicture from "/assets/icon-user.svg";
import logo from "@/assets/Layout/logo-navbar.png";
import HelpDesk from "@/featuures/HelpDesk/Components/ModalCreateTicket";
import AccordionMenu from "../components/AccordionMenu";

const Navbar: React.FC = React.memo(() => {
  const { logout, rol } = useAuth();
  const { isCollapsed, toggleSideBar } = useSidebar();
  const { userProfile } = useUserProfile();
  const { theme, toggleTheme } = useTheme();
  const [imageUrl, setImageUrl] = useState<string>(defaultUserPicture);

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

  const userNavigation = useMemo(
    () => [
      { name: "Perfil", href: "/perfil" },
      { name: "Cerrar Sesión", action: handleLogout },
    ],
    [handleLogout]
  );

  // Array de enlaces de soporte
  const supportLinks = useMemo(
    () => [
      {
        name: "Soporte de Infraestructura",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSdHshZOrObZv-CJRht81bIZCY7jUQLo1fy5D7scB-1nW_CF-g/viewform",
      },
      {
        name: "Soporte de equipos biometricos",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSe8UZprqV_FqNYIgC0rowHcVCyUDAyZxPmgRxPuHjNXrgOOag/viewform",
      },
      {
        name: "Seguridad del Paciente",
        href: "https://forms.office.com/pages/responsepage.aspx?id=h5gx0IxtRE6Nz0WYsPqRxS4uCKLheylNnxH7ATQR5cdUQkRMTFM5QkxNNlVZQTRDMUxZTlBWRkRKQiQlQCN0PWcu&route=shorturl",
      },
      {
        name: "Soporte de Sistemas",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSfZunq4zGfBLBecr_WZPenSgqnpMwRJaTSri9n2T46zW5l_qw/viewform",
      },
      {
        name: "Salud y seguridad en el trabajo",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSfXdBv2KCYylUdP8w9Lo1CoBsUEtjx7BIZkAcdBUd32QzBq4w/viewform",
      },
      {
        name: "Comite de convivencia laboral",
        href: "https://docs.google.com/forms/d/e/1FAIpQLScXdjU2mbD3bifKzEje2ypBMgdS64h1w5-_ENI9VvenoVf98g/viewform?usp=sf_link",
      },
    ],
    []
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
      <div className="flex flex-wrap items-center justify-between p-2 mx-auto border-b-2 border-black md:p-5 dark:border-white">
        {/* Left side - Logo and sidebar toggle */}
        <div className="flex items-center text-base">
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

          <NavLink to="/home">
            <img
              src={logo || "/placeholder.svg"}
              className="w-8 h-8 md:w-10 md:h-10"
              alt="Logo"
              title="Inicio"
            />
          </NavLink>
          <div className="flex items-center ml-1 md:hidden">
            <div>
              <h2
                className="w-24 text-sm font-medium text-black dark:text-white"
                style={{ maxWidth: "180px" }}
              >
                Hola, {nombreUsuario}
              </h2>
            </div>

            <div className="">
              <NotificacionBell />
            </div>

            <div className="flex text-xs">
              <ModalPausasActivas />
              <div className="mr-3">
                <HelpDesk />
              </div>
            </div>

            {/* Acordion menu responsive */}
            <AccordionMenu theme={theme}>
              <div className="p-2">
                {/* Mobile theme toggle */}
                <div className="flex items-center py-2 border-b dark:border-gray-600">
                  <button
                    onClick={handleToggleTheme}
                    className={`p-2 rounded-full ${
                      theme === "dark"
                        ? "bg-gray-600 hover:bg-gray-300 text-white"
                        : "bg-gray-200 hover:bg-gray-500 text-gray-800"
                    }`}
                  >
                    {theme === "light" ? (
                      <img
                        src={moon || "/placeholder.svg"}
                        alt="Moon Icon"
                        className="w-5 h-5"
                      />
                    ) : (
                      <img
                        src={sun || "/placeholder.svg"}
                        alt="Sun Icon"
                        className="w-5 h-5 invert"
                      />
                    )}
                  </button>
                </div>
                <hr />

                {/* soportes */}
                <Menu as="div" className="mt-2" title="Soportes">
                  <MenuButton className="p-2 mb-2 text-base duration-300 bg-gray-200 rounded-full hover:scale-105 hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:bg-teal-600 dark:bg-color">
                    Soportes
                  </MenuButton>

                  <Menu.Items
                    className={` ${
                      theme === "dark" ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className="flex-grow w-full mt-1">
                      {supportLinks.map((link) => (
                        <Menu.Item key={link.name}>
                          {({ active }) => (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${
                                active
                                  ? "bg-blue-100 text-gray-900 dark:text-white dark:bg-gray-600 hover:scale-100 shadow-none "
                                  : "text-gray-700 dark:text-gray-200"
                              } group flex items-center w-full px-2 py-2 text-sm`}
                            >
                              {link.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Menu>
                <hr />
                {/* perfil  */}
                <Menu
                  as="div"
                  className="relative mt-3 duration-300 rounded-lg dark:border-gray-800 hover:scale-105"
                  title="Perfil"
                >
                  <MenuButton className="flex items-center px-4 py-1 text-base duration-300 bg-gray-200 border-0 rounded hover:bg-gray-700 focus:outline-none dark:bg-color dark:hover:bg-teal-600 hover:text-white group">
                    <img
                      alt="Profile"
                      src={imageUrl || defaultUserPicture}
                      className="object-cover w-8 h-8 rounded-full dark:border-white"
                    />
                    <img
                      src={userLogo || "/placeholder.svg"}
                      alt="User Logo"
                      className="w-8 h-8 text-white group-hover:invert dark:invert"
                    />
                  </MenuButton>
                  <Menu.Items
                    transition
                    className={`absolute right-0 z-50 w-56 py-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
                      theme === "dark" ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {item.action ? (
                          <button
                            onClick={() => {
                              item.action();
                            }}
                            className={`block py-2 ps-2 text-sm w-full text-left ${
                              theme === "dark"
                                ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                                : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
                            } transition-colors duration-300`}
                          >
                            {item.name}
                          </button>
                        ) : (
                          <NavLink
                            to={item.href}
                            className={`block py-2 text-sm ps-2 ${
                              theme === "dark"
                                ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                                : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
                            } transition-colors duration-300`}
                          >
                            {item.name}
                          </NavLink>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
            </AccordionMenu>
          </div>
        </div>

        {/* Mobile center section - Username and quick actions */}

        {/* Desktop menu */}
        <div className="items-center justify-end hidden w-auto space-x-2 md:flex">
          {/* Desktop username display */}
          <div className="flex items-center mr-2">
            <h2 className="p-2 text-base font-medium text-black dark:text-white">
              Hola, {nombreUsuario}
            </h2>
          </div>

          {/* Theme toggle button */}
          <button
            onClick={handleToggleTheme}
            title="Modo Oscuro / Claro"
            className="relative p-2 text-gray-800 duration-300 ease-in-out bg-gray-200 border-2 rounded-full dark:border-gray-800 hover:bg-gray-700 dark:bg-color dark:hover:bg-teal-600 dark:text-gray-200 focus:outline-none group hover:translate-y-0"
          >
            {theme === "light" ? (
              <img
                src={moon || "/placeholder.svg"}
                alt="Moon Icon"
                className="w-6 h-6 group-hover:invert"
              />
            ) : (
              <img
                src={sun || "/placeholder.svg"}
                alt="Sun Icon"
                className="w-6 h-6 invert"
              />
            )}
          </button>

          {/* Help desk button (admin only) */}
          
            <div className="flex items-center">
              <HelpDesk />
            </div>

          {/* Notifications (admin only) */}
            <div className="flex items-center">
              <NotificacionBell />
            </div>

          {/* Pausas activas modal */}
          <div className="flex items-center">
            <ModalPausasActivas />
          </div>

          {/* Support links dropdown */}
          <Menu as="div" className="relative" title="Soportes">
            <MenuButton className="p-2 text-base duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:bg-teal-600 dark:bg-color">
              Soportes
            </MenuButton>

            <Menu.Items
              className={`absolute right-0 origin-top-right mt-2 z-50 w-60 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex-grow w-full py-2 mt-1">
                {supportLinks.map((link) => (
                  <Menu.Item key={link.name}>
                    {({ active }) => (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          active
                            ? "bg-blue-100 text-gray-900 dark:text-white dark:bg-gray-600"
                            : "text-gray-700 dark:text-gray-200"
                        } group flex items-center w-full px-2 py-2 text-sm`}
                      >
                        {link.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Menu>

          {/* User profile dropdown */}
          <Menu
            as="div"
            className="relative border-2 rounded-lg dark:border-gray-800"
            title="Perfil"
          >
            <MenuButton className="flex items-center px-3 py-1 text-base duration-300 bg-gray-200 border-0 rounded hover:bg-gray-700 focus:outline-none dark:bg-color dark:hover:bg-teal-600 hover:text-white group">
              <img
                alt="Profile"
                src={imageUrl || defaultUserPicture}
                className="object-cover w-8 h-8 rounded-full dark:border-white"
              />
              <img
                src={userLogo || "/placeholder.svg"}
                alt="User Logo"
                className="w-8 h-8 text-white group-hover:invert dark:invert"
              />
            </MenuButton>
            <Menu.Items
              transition
              className={`absolute right-0 z-50 w-56 py-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
                theme === "dark" ? "bg-gray-500" : "bg-white"
              }`}
            >
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {item.action ? (
                    <button
                      onClick={() => {
                        item.action();
                      }}
                      className={`block py-2 ps-2 text-sm w-full text-left ${
                        theme === "dark"
                          ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                          : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
                      } transition-colors duration-300`}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={`block py-2 text-sm ps-2 ${
                        theme === "dark"
                          ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                          : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
                      } transition-colors duration-300`}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
