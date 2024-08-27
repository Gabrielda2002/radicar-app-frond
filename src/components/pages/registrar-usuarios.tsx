import React, { useState } from "react";
import { useRegistrarUsuarios } from "../../hooks/useRegisterUser";
import logo from "/src/imgs/logo.png";
import arrowUp from "/assets/arrow-up.svg";

const RegistrarUsuarios: React.FC = () => {
  const {
    formValues,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    opcionesMunicipios,
    opcionesRol,
    opcionesDocumento,
    opcionesPermisos,
  } = useRegistrarUsuarios();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="mb-4 text-center">
          <img
            src={logo}
            alt="Logo"
            className="mx-auto"
            style={{ width: "200px" }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Municipio */}
            <div>
              <label className="block mb-1 text-gray-700">Municipio</label>
              <select
                name="municipio"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formValues.municipio}
                onChange={handleChange}
              >
                <option value="">SELECCIONE</option>
                {opcionesMunicipios.map((municipio) => (
                  <option key={municipio} value={municipio}>
                    {municipio}
                  </option>
                ))}
              </select>
            </div>

            {/* Rol */}
            <div>
              <label className="block mb-1 text-gray-700">Rol</label>
              <select
                name="rol"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formValues.rol}
                onChange={handleChange}
              >
                <option value="">SELECCIONE</option>
                {opcionesRol.map((rol) => (
                  <option key={rol} value={rol}>
                    {rol}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de Documento */}
            <div>
              <label className="block mb-1 text-gray-700">Tipo de Documento</label>
              <select
                name="tipoDocumento"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formValues.tipoDocumento}
                onChange={handleChange}
              >
                <option value="">SELECCIONE</option>
                {opcionesDocumento.map((tipoDoc) => (
                  <option key={tipoDoc} value={tipoDoc}>
                    {tipoDoc}
                  </option>
                ))}
              </select>
            </div>

            {/* Número Documento */}
            <div>
              <label className="block mb-1 text-gray-700">Número Documento</label>
              <input
                type="text"
                name="numeroDocumento"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formValues.numeroDocumento}
                onChange={handleChange}
              />
            </div>

            {/* Nombres Completos */}
            <div>
              <label className="block mb-1 text-gray-700">Nombres Completos</label>
              <input
                type="text"
                name="nombresCompletos"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formValues.nombresCompletos}
                onChange={handleChange}
              />
            </div>

            {/* Apellidos Completos */}
            <div>
              <label className="block mb-1 text-gray-700">Apellidos Completos</label>
              <input
                type="text"
                name="apellidosCompletos"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formValues.apellidosCompletos}
                onChange={handleChange}
              />
            </div>

            {/* Correo */}
            <div>
              <label className="block mb-1 text-gray-700">Correo</label>
              <input
                type="email"
                name="correo"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formValues.correo}
                onChange={handleChange}
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block mb-1 text-gray-700">Contraseña</label>
              <input
                type="password"
                name="contraseña"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formValues.contraseña}
                onChange={handleChange}
              />
            </div>

            {/* Permisos con Acordeón */}
            <div className="col-span-2">
              <button
                type="button"
                className="flex items-center justify-between w-full text-gray-700 cursor-pointer focus:outline-none"
                onClick={toggleAccordion}
              >
                <span className="text-lg font-medium">Permisos</span>
                <img
                  src={arrowUp}
                  alt="Toggle"
                  className={`w-5 h-5 transform ${
                    isAccordionOpen ? 'rotate-180' : 'rotate-0'
                  } transition-transform duration-300`}
                />
              </button>
              {isAccordionOpen && (
                <div className="pl-4 mt-2">
                  {opcionesPermisos.map((permiso) => (
                    <div key={permiso} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        value={permiso}
                        checked={formValues.permisos.includes(permiso)}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-4 w-4 text-blue-600"
                        id={`permiso-${permiso}`}
                      />
                      <label htmlFor={`permiso-${permiso}`} className="ml-2 text-gray-700">
                        {permiso}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Botón de Envío */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarUsuarios;