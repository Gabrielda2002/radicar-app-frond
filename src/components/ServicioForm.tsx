import React, { useState, useEffect } from "react";
import useFetchCups from "../hooks/useFetchCups";

interface ServicioFormProps {
  cantidad: string;
}

const ServicioForm: React.FC<ServicioFormProps> = ({ cantidad }) => {
  const [servicios, setServicios] = useState<string[]>(Array(Number(cantidad)));
  const [descripciones, setDescripciones] = useState<string[]>(Array(Number(cantidad)).fill(""));
  const { data, fetchCups, error, loading } = useFetchCups();

  // Efecto para actualizar la descripción cuando cambia `data`
  useEffect(() => {
    if (data && data.name) {
      const newDescripciones = [...descripciones];
      const index = servicios.indexOf(data.code); // Asumiendo que el objeto `data` tiene un `code`
      if (index !== -1) {
        newDescripciones[index] = data.name; // Actualiza la descripción
        setDescripciones(newDescripciones);
      }
    }
  }, [data, servicios]);

  const handleServicioChange = (index: number, value: string) => {
    const newServicios = [...servicios];
    newServicios[index] = value;
    setServicios(newServicios);
  };

  const handleServicioBlur = async (index: number) => {
    const codigoServicio = servicios[index];
    if (codigoServicio) {
      await fetchCups(codigoServicio); // Llamada al API
    }
  };

  const bloques = Array.from({ length: Number(cantidad) }, (_, index) => (
    <React.Fragment key={index}>
      <div>
        <label htmlFor={`servicio-${index}`}>
          <span className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
            Servicio Solicitado N° ({index + 1})
          </span>
          <input
            type="text"
            id={`servicio-${index}`}
            name={`servicio-${index}`}
            value={servicios[index]}
            onChange={(e) => handleServicioChange(index, e.target.value)}
            onBlur={() => handleServicioBlur(index)} // Ejecuta la búsqueda al perder el foco
            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
            placeholder="Ingrese código de servicio"
          />
        </label>
      </div>
      <div>
        <label htmlFor={`descripcion-${index}`}>
          <span className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
            Descripción Servicio N° ({index + 1})
          </span>
          <textarea
            id={`descripcion-${index}`}
            name={`descripcion-${index}`}
            value={descripciones[index] || (loading ? "Cargando..." : error || "")} // Mostrar mensaje mientras carga
            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
            placeholder="Descripción del servicio"
            readOnly
          ></textarea>
        </label>
      </div>
    </React.Fragment>
  ));

  return <>{bloques}</>;
};

export default ServicioForm;
