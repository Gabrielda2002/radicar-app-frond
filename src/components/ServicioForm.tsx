{/* <- ! IMPORTE EL IMPORT REACT YA QUE CON ESTE FUNCIONA LOS FRAGMENT ! -> */}
import React from "react";


interface ServicioFormProps{
    cantidad: string;
}

const ServicioForm: React.FC<ServicioFormProps> = ({ cantidad }) => {
  const bloques = Array.from({ length:Number (cantidad) }, (_, index) => (
    <React.Fragment key={index}>
      <div>
        <label htmlFor={`servicio-${index}`}>
          <span className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
            Servicio Solicitado N° ({index + 1 })
          </span>
          <input
            type="text"
            id={`servicio-${index}`}
            name={`servicio-${index}`}
            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
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
            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
          ></textarea>
        </label>
      </div>
    </React.Fragment>
  ));

  return <>{bloques}</>;
};

export default ServicioForm;
