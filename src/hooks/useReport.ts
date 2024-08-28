import { useState } from "react";

interface ModalReport {
  Numcups: string;
  reportOptions: string;
}

export const useModalReport = () => {
  // Estado para manejar el formulario
  const [formValues, setFormValues] = useState<ModalReport>({
    Numcups: "",
    reportOptions: "",
  });

  // Estado para manejar el tipo de modal
  const [currentStep, setCurrentStep] = useState(1);

  // Array de opciones modal
  const opcionesReportes = ["Autorizacion", "Radicacion"];

  // Función para manejar los cambios en los Inputs y Selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Cambiar el contenido del modal cuando se selecciona una opción
    if (name === "reportOptions") {
      setCurrentStep(value === "Autorizacion" ? 2 : 3);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Usuario registrado:", formValues);
    // Aquí se puede agregar lógica para los datos al backend
  };

  return {
    formValues,
    opcionesReportes,
    currentStep,
    handleChange,
    handleSubmit,
  };
};
