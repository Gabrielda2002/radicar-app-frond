import React, { useEffect } from "react";
import useFetchCups from "@/hooks/useFetchCups";

interface ServicioFormProps {
  cantidad: string;
  servicios: string[];
  cantidadInput: string[];
  descripciones: string[];
  onServicioChange: (index: number, value: string) => void;
  onDescripcionChange: (index: number, value: string) => void;
  onCantidadInputChange: (index: number, value: string) => void;
}

const GenerarInputsCUPS: React.FC<ServicioFormProps> = ({
  cantidad,
  servicios,
  cantidadInput,
  descripciones,
  onServicioChange,
  onDescripcionChange,
  onCantidadInputChange
}) => {
  const { data, fetchCups, error, loading } = useFetchCups();
  useEffect(() => {
    if (data && data.name) {
      const index = servicios.indexOf(data.code); // Asumiendo que el objeto `data` tiene un `code`

      // Si el código del servicio ya existe en el array de servicios y la descripción es diferente
      if (index !== -1 && descripciones[index] !== data.name) {
        onDescripcionChange(index, data.name);
      }
    }
  }, [data, servicios, onDescripcionChange]);

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
          <span className="flex mb-2 text-base font-bold text-gray-700 dark:text-gray-200">
            Servicio Solicitado N° ({index + 1})
          </span>
          <input
            type="text"
            id={`servicio-${index}`}
            name={`servicio-${index}`}
            value={servicios[index]}
            onChange={(e) => onServicioChange(index, e.target.value)}
            onBlur={() => handleServicioBlur(index)} // Ejecuta la búsqueda al perder el foco
            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
            placeholder="Ingrese código de servicio"
          />
        </label>
      </div>
      
      <div>
        <label htmlFor={`descripcion-${index}`}>
          <span className="flex mb-2 text-base font-bold text-gray-700 dark:text-gray-200">
            Descripción Servicio N° ({index + 1})
          </span>
          <textarea
            id={`descripcion-${index}`}
            name={`descripcion-${index}`}
            value={
              descripciones[index] || (loading ? "Esperando..." : error || "")
            }
            className="w-full px-3 py-2 text-gray-400 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-800"
            placeholder="Descripción del servicio"
            readOnly
          ></textarea>
        </label>
      </div>
      <div>
        <label htmlFor={`cantidadInput-${index}`}>
          <span className="flex mb-2 text-base font-bold text-gray-700 dark:text-gray-200">
            Cantidad
          </span>
          <input
            type="text"
            id={`cantidadInput-${index}`}
            name={`cantidadInput-${index}`}
            maxLength={2}
            value={cantidadInput[index]}
            onChange={(e) => onCantidadInputChange(index, e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
            placeholder="Digite la cantidad . . . ."
          ></input>
        </label>
      </div>
    </React.Fragment>
  ));

  return <>{bloques}</>;
};

export default GenerarInputsCUPS;
