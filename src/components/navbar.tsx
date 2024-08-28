import { Menu, MenuButton } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/blackWhiteContext"; // Importa el hook useTheme
import userLogo from "/assets/user-logo.svg";
import { useAuth } from '../context/authContext';
import { useUserProfile } from '../context/userProfileContext';

const Navbar: React.FC = () => {
  const { userProfile } = useUserProfile(); // Suponiendo que tienes un contexto para el perfil del usuario
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Desestructura theme y toggleTheme

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
      <div className="flex flex-wrap p-5 mx-auto border-b-2 border-black dark:border-gray-700">
        <nav className="flex flex-wrap items-center text-base">
          <NavLink to="/">
            <img src="./src/imgs/logo-navbar.png" className="w-10 h-10" alt="Logo" />
          </NavLink>
        </nav>

        {/* Botón de Modo Oscuro */}
        <button
          onClick={toggleTheme}
          className="p-2 ml-auto mr-4 text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200 focus:outline-none"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <Menu as="div" className="relative">
          <MenuButton className="flex items-center px-3 py-1 text-base text-white bg-gray-900 border-0 rounded focus:outline-none hover:bg-gray-700 hover:text-white group">
            {userProfile?.imageUrl && (
              <img alt="User" src={userProfile.imageUrl} className="w-8 h-8 mr-2 rounded-full" />
            )}
            <img src={userLogo} alt="User Logo" className="w-8 h-8 group-hover:invert" />
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
                    className={`block px-4 py-2 text-sm ${
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
