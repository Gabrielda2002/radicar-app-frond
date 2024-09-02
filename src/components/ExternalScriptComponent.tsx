import { useEffect } from "react";

// Script para agregar el script de Elfsight en el Inicio para que se muestre el instagram
const ExternalScriptComponent = () => {
  useEffect(() => {
    // Crear el script y agregarlo al documento
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.dataset.useServiceCore = "true";
    script.defer = true;
    document.body.appendChild(script);

    // Limpiar el script cuando el componente se desmonte
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="elfsight-app-c90bcdd4-e72b-4b3b-b1b3-ef1fb91ea085"
      data-elfsight-app-lazy
    ></div>
  );
};

export default ExternalScriptComponent;
