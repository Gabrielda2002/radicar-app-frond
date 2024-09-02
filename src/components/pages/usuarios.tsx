import { Link } from "react-router-dom";
import mostrar from "/assets/mostrar.svg";
import salir from "/assets/back.svg";
import { useFetchUsuarios } from "../../hooks/useFetchUsers";
import LoadingSpinner from "../loading-spinner";

const Usuarios = () => {
  const { data, loading, error } = useFetchUsuarios();

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="p-5">
      if (loading) return <LoadingSpinner duration={500} />;
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100">
          Módulo Usuarios
        </h1>
        <nav>
          <ol className="flex mb-2">
            <li className="text-slate-400 after:mr-2">Inicio</li>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Usuarios
            </li>
          </ol>
          <div className="pb-2">
            <Link to="/inicio">
              <img src={salir} alt="Salir" className="dark:invert" />
            </Link>
          </div>
        </nav>
      </section>
      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-table */}
        <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
          Buscar Usuarios:
        </label>
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="flex items-center space-x-2 container-filter">
            <input
              placeholder="Consultar Usuarios"
              className="block w-[280px] h-10 border-2 rounded-md focus:outline-none focus:ring dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-2 pt-1-">
            <select
              name=""
              id=""
              className="border-2 h-[40px] w-[100px] rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Páginas</option>
              <option value="1">10 Páginas</option>
              <option value="2">20 Páginas</option>
              <option value="3">30 Páginas</option>
            </select>
          </div>
        </section>

        {/* Users Table Body */}
        <div>
          <table className="w-full mx-auto text-xs text-center dark:bg-gray-800 dark:text-gray-300">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">N.º Documento</th>
                <th className="px-4 py-2">Nombres</th>
                <th className="px-4 py-2">Apellidos</th>
                <th className="px-4 py-2">Tipo Documento</th>
                <th className="px-4 py-2">Mail</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Municipio</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((usuario) => (
                <tr className="border-b dark:border-gray-600">
                  <td>{usuario.id}</td>
                  <td>{usuario.dniNumber}</td>
                  <td>{usuario.name}</td>
                  <td>{usuario.lastName}</td>
                  <td>{usuario.documento}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.status ? "Activo" : "Inactivo"}</td>
                  <td>{usuario.roles}</td>
                  <td>{usuario.municipio}</td>
                  <td>
                    <button>
                      <img className="text-center" src={mostrar} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* posible pagination */}
      </section>
    </>
  );
};

export default Usuarios;
