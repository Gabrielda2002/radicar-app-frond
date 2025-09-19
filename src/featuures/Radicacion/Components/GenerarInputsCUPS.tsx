import React, { useEffect, useRef } from "react";
import useFetchCups from "@/hooks/useFetchCups";
import Input from "@/components/common/Ui/Input";

interface ServicioFormProps {
  quantityInputs: string;
  servicios: string[];
  quantityServices: string[];
  descripciones: string[];
  idsServicios: string[];
  onServicioChange: (index: number, value: string) => void;
  onDescripcionChange: (index: number, value: string) => void;
  onCantidadInputChange: (index: number, value: string) => void;
  onIdServicioChange: (index: number, value: string) => void;
}

const GenerarInputsCUPS: React.FC<ServicioFormProps> = ({
  quantityInputs,
  servicios,
  quantityServices,
  descripciones,
  idsServicios,
  onServicioChange,
  onDescripcionChange,
  onCantidadInputChange,
  onIdServicioChange,
}) => {
  const { data, fetchCups, error, loading } = useFetchCups();
  const lastIndexRef = useRef<number | null>(null);
  useEffect(() => {
    if (data && data.name) {
      const index = lastIndexRef.current;
      if (index !== null && index !== undefined) {
        // Actualiza descripción si cambió
        if (descripciones[index] !== data.name) {
          onDescripcionChange(index, data.name);
        }
        // Actualiza ID si cambió
        const idAsString = String(data.id ?? "");
        if (idsServicios[index] !== idAsString) {
          onIdServicioChange(index, idAsString);
        }
      }
    }
  }, [data, servicios, descripciones, idsServicios, onDescripcionChange, onIdServicioChange]);

  const handleServicioBlur = async (index: number) => {
    const codigoServicio = servicios[index];
    if (codigoServicio) {
      lastIndexRef.current = index;
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
