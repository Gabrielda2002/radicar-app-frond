import { useState } from "react";

// Interfaz para definir la estructura del usuario
interface Usuario {
  municipio: string;
  rol: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombresCompletos: string;
  apellidosCompletos: string;
  correo: string;
  contraseña: string;
  permisos: string[];
}

export const useRegistrarUsuarios = () => {
  // Estado para manejar los valores del formulario
  const [formValues, setFormValues] = useState<Usuario>({
    municipio: "", // Asignar un string vacío en lugar de un array
    rol: "",
    tipoDocumento: "",
    numeroDocumento: "",
    nombresCompletos: "",
    apellidosCompletos: "",
    correo: "",
    contraseña: "",
    permisos: [],
  });

  // Arrays de opciones
  const opcionesMunicipios = [
    "Cucuta",
    "Leticia",
    "Cundinamarca",
  ];

  const opcionesRol = [
    "Administrador",
    "Gerente",
    "Auditor",
    "Calidad",
    "Auxiliar",
    "Coordinador",
  ];

  const opcionesDocumento = [
    "C.C",
    "T.I",
    "R.C",
    "C.N",
    "M.S",
    "C.E",
    "P.A",
    "P.E",
    "P.T",
    "S.C",
  ];

  const opcionesPermisos = [
    "Servicios Reportes",
    "Modulo Radicacion",
    "Modulo Auditoria",
    "Servicio Campos Tablas Radicacion",
    "Modulo Cirugia",
    "Modulo Reporte Excel",
  ];

  // Función para manejar los cambios en los inputs y selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues, // Usar `formValues` para mantener el estado actual
      [name]: value,
    });
  };

  // Función para manejar los cambios en los checkboxes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormValues((prevState) => {
      const permisos = checked
        ? [...prevState.permisos, value]
        : prevState.permisos.filter((permiso) => permiso !== value);

      return { ...prevState, permisos };
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Usuario registrado:", formValues);
    // Aquí puedes agregar la lógica para enviar los datos al backend
  };

  return {
    formValues,
    opcionesMunicipios,
    opcionesRol,
    opcionesDocumento,
    opcionesPermisos,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
  };
};
