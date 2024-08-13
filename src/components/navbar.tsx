import { NavLink } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
const Navbar = () => {
  const btnLink =
    "inline-block py-1 text-white hover:text-lime-400 cursor-pointer mr-4";
  const activeLink = "inline-block py-1 text-accent mr-4";

  const user = {
    name: "Jostin Gomez",
    email: "jostingomez03@gmail.com",
    imageUrl: "https://unavatar.io/josting62",
  };

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  return (
    <header className="text-gray-900 body-font">
      <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center bg-white">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLink : btnLink)}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/Modulos"
            className={({ isActive }) => (isActive ? activeLink : btnLink)}
          >
            Modulos
          </NavLink>
          <NavLink
            to="/Login"
            className={({ isActive }) => (isActive ? activeLink : btnLink)}
          >
            Login
          </NavLink>
          <NavLink
            to="/Registro"
            className={({ isActive }) => (isActive ? activeLink : btnLink)}
          >
            Registro
          </NavLink>
        </nav>
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center bg-gray-900 border-0 py-1 px-3 focus:outline-none hover:bg-color rounded text-base text-white hover:text-black">
            <img
              alt=""
              src={user.imageUrl}
              className="h-8 w-8 rounded-full mr-2"
            />
            <svg
              className="w-6 h-6 hover:text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                clipRule="evenodd"
              />
            </svg>
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                <a
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-color hover:text-white hover:rounded"
                >
                  {item.name}
                </a>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;
