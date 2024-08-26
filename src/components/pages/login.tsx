import React, { useState } from "react";
import { api } from "../../utils/api-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login: React.FC = () => {
  const [dniNumber, setDniNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Utiliza el hook useAuth para acceder a la función login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Hacer la solicitud al servidor para el login
      const response = await api.post('/login', { dniNumber, password });

      // Si la autorización es correcta, guardar el token en el contexto de autenticación y el rol en localStorage
      const { token, rol } = response.data;

      localStorage.setItem('rol', rol); // Guardar el rol en localStorage

      login(token, rol) // Llamar a la función login del contexto para actualizar el estado de autenticación

      // Redirigir al usuario según su rol
      if (rol == 1) {
        navigate('/home');
      }else if(rol == 5) navigate('/home');

    } catch (error) {
      setError("Error al iniciar sesión, verifica tus credenciales" + error);
    }
  };

  return (
    <div className="w-full bg-slate-400">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="https://nordvitalips.com/Pagina-nordvitalips/index.php"
          className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-8 h-8 mr-2"
            src="src/imgs/logo-navbar.png"
            alt="Nordvital IPS"
          />
          Nordvital IPS
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-400">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-zinc-600 md:text-2xl dark:text-zinc">
              Inicia Sesión con tu cuenta
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="number-document"
                  className="block mb-2 text-lg font-medium text-zinc-600 dark:text-zinc"
                >
                  Número de Documento:
                </label>
                <input
                  type="text"
                  name="dniNumber"
                  onChange={(e) => setDniNumber(e.target.value)}
                  className="bg-gray-300 border border-gray-300 text-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="tu-nombre@nordvital.com"
                  id="number-document"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium text-zinc-600 dark:text-zinc"
                >
                  Contraseña:
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-300 border border-gray-300 text-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="**********"
                  id="password-login"
                />
              </div>
              
              <button
                type="submit"
                className="w-full text-white bg-color hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Iniciar Sesión
              </button>
              
              <p className="text-sm font-light text-gray-800 dark:text-gray-800">
                ¿No tienes una cuenta?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Contáctanos
                </a>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
