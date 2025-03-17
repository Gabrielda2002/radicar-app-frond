import { useCallback } from 'react';

/**
 * Hook personalizado para abrir soportes en una nueva ventana
 * @returns Una función para abrir soportes
 */
export const useOpenSupport = () => {

  const handleOpen =  useCallback((nombreSoporte: string | null, ruta: string = 'Soportes') => {
    if (!nombreSoporte) {
      alert("No hay soporte para mostrar.");
      return;
    }

    window.open(
      `${import.meta.env.VITE_URL_BACKEND}/api/v1/uploads/${ruta}/${nombreSoporte}`,
      "_blank"
    );
  }, []);
  return {handleOpen};
};