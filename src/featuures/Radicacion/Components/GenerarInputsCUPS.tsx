import React, { useEffect } from "react";
import useFetchCups from "@/hooks/useFetchCups";
import Input from "@/components/common/Ui/Input";

interface ServicioFormProps {
  quantityInputs: string;
  servicios: string[];
  quantityServices: string[];
  descripciones: string[];
  onServicioChange: (index: number, value: string) => void;
  onDescripcionChange: (index: number, value: string) => void;
  onCantidadInputChange: (index: number, value: string) => void;
}

const GenerarInputsCUPS: React.FC<ServicioFormProps> = ({
  quantityInputs,
  servicios,
  quantityServices,
  descripciones,
  onServicioChange,
  onDescripcionChange,
  onCantidadInputChange,
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

  const bloques = Array.from({ length: Number(quantityInputs) }, (_, index) => (
    <React.Fragment key={index}>
      <div>
        <Input
          label={`Código Servicio N° ${index + 1}`}
          id={`servicio-${index}`}
          name={`servicio-${index}`}
          value={servicios[index]}
          onChange={(e) => onServicioChange(index, e.target.value)}
          onBlur={() => handleServicioBlur(index)} // Ejecuta la búsqueda al perder el foco
          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
          placeholder="Código"
        />
      </div>

      <div>
        <Input
          label={`Cantidad Servicio N° ${index + 1}`}
          id={`quantityServices-${index}`}
          name={`quantityServices-${index}`}
          maxLength={2}
          value={quantityServices[index]}
          onChange={(e) => onCantidadInputChange(index, e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
          placeholder="Cantidad"
        />
      </div>
      <div>
        <Input
          label={`Descripción Servicio N° ${index + 1}`}
          id={`descripcion-${index}`}
          name={`descripcion-${index}`}
          value={
            descripciones[index] || (loading ? "Esperando..." : error || "")
          }
          className="w-full px-3 py-2 text-gray-400 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-800"
          placeholder="Descripción"
          readOnly
        />
      </div>
    </React.Fragment>
  ));

  return <>{bloques}</>;
};

export default GenerarInputsCUPS;
