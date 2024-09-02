import { useState } from "react";

export const useModalReport = () => {
  const [formValues, setFormValues] = useState({
    reportOptions: "",
    startDate: "",
    endDate: "",
    Numcups: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // // Función para manejar el envío del formulario
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Usuario registrado:", formValues);
  //   // Aquí se puede agregar lógica para los datos al backend
  // };

  return {
    formValues,
    handleChange,
    // handleSubmit,
  };
};
