import { useState, useEffect } from "react";

const useAnimation = (isOpen: boolean, onClose: () => void, delay: number = 300) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [closing, setClosing] = useState(false); // Nuevo estado para manejar el cierre

  useEffect(() => {
    if (isOpen) {
      setShowAnimation(true);
      setClosing(false); // Al abrir, aseguramos que no esté en estado de cierre
    } else {
      setClosing(true); // Inicia el estado de cierre
      setTimeout(() => {
        setShowAnimation(false);
        onClose();
      }, delay); // Espera la duración de la animación para cerrar completamente
    }
  }, [isOpen, onClose, delay]);

  return { showAnimation, closing };
};

export default useAnimation;