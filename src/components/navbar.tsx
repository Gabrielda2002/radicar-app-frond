import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Navbar = () => {
  const user = {
    name: "Jostin Gomez",
    email: "jostingomez03@gmail.com",
    imageUrl: "https://unavatar.io/josting62",
  };

  const userNavigation = [
    { name: "Perfil", href: "#" },
    { name: "Cerrar Seccion", href: "#" },
  ];

  return (
    <header className="text-gray-900 body-font">
      <div className="mx-auto flex flex-wrap p-5 bg-white border-b-2 border-black">
        <nav className="flex flex-wrap items-center text-base">
          <img src="./src/imgs/logo-navbar.png" className="w-10 h-10" />
        </nav>
        <Menu as="div" className="relative ml-auto">
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
            className="absolute right-0  z-50 w-56 p-2 bg-white border rounded-lg top-16 lg:top-12 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                <a
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-color hover:text-white rounded-lg transition-colors duration-300"
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
