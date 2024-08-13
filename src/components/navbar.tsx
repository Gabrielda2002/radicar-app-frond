import { NavLink } from "react-router-dom";

const Navbar = () => {
  const btnLink =
    "inline-block py-1 text-white hover:text-lime-400 cursor-pointer mr-4";
  const activeLink = "inline-block py-1 text-accent mr-4";
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
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
        <button className="inline-flex items-center bg-gray-900 border-0 py-1 px-3 focus:outline-none hover:bg-gray-100 rounded text-base text-white hover:text-black">
          User
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
        </button>
      </div>
    </header>
  );
};

export default Navbar;
