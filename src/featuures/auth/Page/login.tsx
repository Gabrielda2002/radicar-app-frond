import React, { useState } from "react";
import { api } from "@/utils/api-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify"; // Asegúrate de tener react-toastify instalado
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import Input from "@/components/common/Ui/Input";
import Button from "@/components/common/Ui/Button";
import { AnimatePresence } from "framer-motion";

const Login: React.FC = () => {
  const [dniNumber, setDniNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    setIsLoading(true); // Activar estado de carga

    try {
      // Hacer la solicitud al servidor para el login
      const response = await api.post("/login", { dniNumber, password });

      // Extraer datos de la respuesta (accessToken en lugar de token)
      const { accessToken, rol, user, Municipio, message } = response.data;

      // Usar la función login actualizada del contexto
      // Ya no necesitas guardar manualmente en localStorage, el contexto lo hace
      login(accessToken, rol, Municipio, user);

      // Mostrar mensaje de éxito
      toast.success(message || "¡Bienvenido! Has iniciado sesión correctamente.", {
        position: "top-center",
        autoClose: 3000,
      });

      // Verificar si hay una ruta guardada para redireccionar
      const redirectPath = sessionStorage.getItem('redirectPath');

      if (redirectPath) {
        // Si había una ruta guardada, ir ahí
        sessionStorage.removeItem('redirectPath');
        navigate(redirectPath);
      } else {
        // Redirigir según el rol o a la página principal
        navigate("/home");
      }

    } catch (error: any) {
      console.error("Error en login:", error);

      // Manejo específico de errores
      if (error.response?.status === 401) {
        const errorMessage = error.response?.data?.message || "Credenciales incorrectas";
        setError(errorMessage);
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
        });
      } else if (error.response?.status >= 500) {
        const serverError = "Error del servidor. Inténtalo más tarde.";
        setError(serverError);
        toast.error(serverError, {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        const genericError = "Error al iniciar sesión. Verifica tu conexión e inténtalo nuevamente.";
        setError(genericError);
        toast.error(genericError, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } finally {
      setIsLoading(false); // Desactivar estado de carga
    }
  };

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-gray-300 rounded-lg shadow-lg shadow-gray-500/50 sm:max-w-md xl:p-0 dark:bg-gray-900">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="">
              <div className="flex justify-center mb-6">
                <BuildingOffice2Icon className="w-12 h-12 p-2 text-white rounded-full bg-color" />
              </div>
              <a
                href="https://nordvitalips.com"
                className="flex items-center justify-center text-3xl font-semibold text-black dark:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1>Nordvital IPS</h1>
              </a>
              <p className="text-sm text-center text-gray-500 dark:text-gray-300">
                Accede a tu cuenta para continuar
              </p>
            </div>

            {/* Mostrar error si existe */}
            <AnimatePresence>
              {error && (
                <div>
                  <div className="p-4 text-white bg-red-800 rounded-lg">
                    {error}
                  </div>
                </div>
              )}
            </AnimatePresence>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <Input
                  label="Número de Documento"
                  type="text"
                  name="dniNumber"
                  value={dniNumber}
                  onChange={(e) => setDniNumber(e.target.value)}
                  placeholder="Ingresa tú documento"
                  id="number-document"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Input
                  label="Contraseña"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-300 dark:bg-gray-800 border border-gray-300 text-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Ingresa tú contraseña"
                  id="password-login"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={isLoading || !dniNumber || !password}
                  className=""
                  variant="primary"
                  isLoading={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;