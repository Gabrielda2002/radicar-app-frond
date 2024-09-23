//*Functions and Hooks
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Menu, MenuButton } from "@headlessui/react";
import { useSidebar } from "../context/sidebarContext";
import { useTheme } from "../context/blackWhiteContext";
import { useUserProfile } from "../context/userProfileContext";
//*Icons
import sun from "/assets/sun.svg";
import moon from "/assets/moon.svg";
import userLogo from "/assets/user-logo.svg";
import menu from "/assets/menu.svg";
import menu2 from "/assets/menu2.svg";
import defaultUserPicture from "/assets/icon-user.svg";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
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

  const userNavigation = [
    { name: "Perfil", href: "/perfil" },
    { name: "Cerrar Sesión", action: logout },
  ];

  return (
    <header
      className={`text-gray-900 body-font ${
        theme === "dark" ? "bg-gray-800 dark-mode" : "bg-white light-mode"
      }`}
    >
      <div className="flex flex-wrap p-5 mx-auto border-b-2 border-black dark:border-white">
        <nav className="z-50 flex flex-wrap items-center text-base">
          <NavLink to="/home">
            <img
              src="./src/imgs/logo-navbar.png"
              className="w-10 h-10"
              alt="Logo"
            />
          </NavLink>
        </nav>

        <button
          onClick={toggleSideBar}
          className="z-10 px-1 py-1 mx-1 ml-12 transition-all duration-300 ease-in-out bg-gray-300 rounded-lg hover:-translate-y-2 group hover:bg-gray-700 dark:bg-indigo-700"
        >
          <div className="relative w-8 h-8">
            <img
              src={menu}
              alt="Menu Icon"
              className={`top-0 left-0 w-8 h-8 transition-opacity duration-300 group-hover:invert dark:invert ${
                isCollapsed ? "opacity-100" : "opacity-0"
              }`}
            />
            <img
              src={menu2}
              alt="Menu2 Icon"
              className={`absolute top-0 left-0 w-8 h-8 transition-opacity duration-300 group-hover:invert dark:invert ${
                isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
            <span className="absolute p-2 text-xs text-white transition-opacity duration-300 -translate-y-8 bg-gray-700 dark:bg-indigo-600 rounded-lg opacity-0 left-[49px] w-max group-hover:opacity-100 ">
              {isCollapsed ? "Abrir Sidebar" : "Cerrar Sidebar"}
              <span className="absolute w-0 h-0 -translate-x-[45px] -translate-y-[2px] -rotate-90 border-b-4 border-l-4 border-r-4 border-transparent left-10 top-1/2 border-b-gray-700"></span>
            </span>
          {/* ToolTip */}
        </button>

        {/* Botón de Modo Oscuro */}
        <button
          onClick={toggleTheme}
          className="p-2 ml-auto mr-4 text-gray-800 duration-300 ease-in-out bg-gray-200 rounded-full hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none group hover:-translate-y-2"
        >
          {theme === "light" ? (
            <img
              src={moon}
              alt="Moon Icon"
              className="w-6 h-6 group-hover:invert"
            />
          ) : (
            <img src={sun} alt="Sun Icon" className="w-6 h-6 invert" />
          )}
        </button>

        <Menu as="div" className="relative">
          <MenuButton className="flex items-center px-3 py-1 text-base text-white bg-gray-900 border-0 rounded focus:outline-none hover:bg-gray-700 hover:text-white group">
            <img
              alt="Profile"
              src={imageUrl || defaultUserPicture}
              className="object-cover w-8 h-8 border-2 rounded-full"
            />
            <img
              src={userLogo}
              alt="User Logo"
              className="w-8 h-8 group-hover:invert"
            />
          </MenuButton>
          <Menu.Items
            transition
            className={`absolute right-0 z-50 w-56 p-2 border rounded-lg top-16 lg:top-12 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
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
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      theme === "dark"
                        ? "text-gray-200 hover:bg-gray-700"
                        : "text-gray-800 hover:bg-gray-200"
                    } rounded-lg transition-colors duration-300`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <NavLink
                    to={item.href}
                    className={`block px-4 py-2 text-sm ${
                      theme === "dark"
                        ? "text-gray-200 hover:bg-gray-700"
                        : "text-gray-800 hover:bg-gray-200"
                    } rounded-lg transition-colors duration-300`}
                  >
                    {item.name}
                  </NavLink>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;
