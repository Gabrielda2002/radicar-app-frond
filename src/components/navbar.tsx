import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import userLogo from "/assets/user-logo.svg";
import { useAuth } from '../context/authContext';
import { useUserProfile } from '../context/userProfileContext';

const Navbar: React.FC = () => {
  const { userProfile } = useUserProfile(); // Suponiendo que tienes un contexto para el perfil del usuario
  const { logout } = useAuth();

  const userNavigation = [
    { name: "Perfil", href: "/perfil" },
    { name: "Cerrar Sesión", action: logout },
  ];

  return (
    <header className="text-gray-900 body-font">
      <div className="mx-auto flex flex-wrap p-5 bg-white border-b-2 border-black">
        <nav className="flex flex-wrap items-center text-base">
          <NavLink to="/">
            <img src="./src/imgs/logo-navbar.png" className="w-10 h-10" alt="Logo" />
          </NavLink>
        </nav>
        <Menu as="div" className="relative ml-auto">
          <MenuButton className="flex items-center bg-gray-900 border-0 py-1 px-3 focus:outline-none hover:bg-color rounded text-base text-white hover:text-white group">
            {userProfile?.imageUrl && (
              <img alt="User" src={userProfile.imageUrl} className="h-8 w-8 rounded-full mr-2" />
            )}
            <img src={userLogo} alt="User Logo" className="w-8 h-8 group-hover:invert" />
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 z-50 w-56 p-2 bg-white border rounded-lg top-16 lg:top-12 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                {item.action ? (
                  <button
                    onClick={() => {
                      item.action();
                      // Opcionalmente, puedes redirigir al login después del logout
                      // navigate('/login');
                    }}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-color hover:text-white rounded-lg transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                ) : (
                  <NavLink
                    to={item.href}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-color hover:text-white rounded-lg transition-colors duration-300"
                  >
                    {item.name}
                  </NavLink>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;
