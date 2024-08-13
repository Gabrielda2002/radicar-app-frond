import { NavLink } from "react-router-dom";

const Navbar = () => {
  const btnLink =
    "block inline-block py-1 text-white hover:text-lime-400 cursor-pointer mr-4";
  const activeLink = "block inline-blocl py-1 text-accent mr-4";
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl font-semibold text-white">
            Nordvital
          </span>
        </a>
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
        </nav>
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
        <button className="inline-flex items-center bg-gray-900 border-0 py-1 px-3 focus:outline-none hover:bg-gray-100 rounded text-base mt-4 md:mt-0 text-white hover:text-black">
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
              fill-rule="evenodd"
              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};
export default Navbar;
