// src/components/Navbar.tsx
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useUserProfile } from "../context/userProfileContext";
import userLogo from "/assets/user-logo.svg";

const Navbar = () => {
  const { userProfile } = useUserProfile();

  const userNavigation = [
    { name: "Perfil", href: "/Perfil" },
    { name: "Cerrar Sección", href: "/Login" },
  ];

  return (
    <header className="text-gray-900 body-font">
      <div className="mx-auto flex flex-wrap p-5 bg-white border-b-2 border-black">
        <nav className="flex flex-wrap items-center text-base">
          <NavLink to="/">
            <img src="./src/imgs/logo-navbar.png" className="w-10 h-10" />
          </NavLink>
        </nav>
        <Menu as="div" className="relative ml-auto">
          <MenuButton className="flex items-center bg-gray-900 border-0 py-1 px-3 focus:outline-none hover:bg-color rounded text-base text-white hover:text-white group">
            <img
              alt="User"
              src={userProfile.imageUrl} // Usa la imagen del contexto
              className="h-8 w-8 rounded-full mr-2"
            />
            <img src={userLogo} alt="" className="w-8 h-8 group-hover:invert" />
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0  z-50 w-56 p-2 bg-white border rounded-lg top-16 lg:top-12 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                <NavLink to={item.href}>
                  <a className="block px-4 py-2 text-sm text-gray-800 hover:bg-color hover:text-white rounded-lg transition-colors duration-300">
                    {item.name}
                  </a>
                </NavLink>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;
