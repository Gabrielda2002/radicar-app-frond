import { motion } from "framer-motion";

interface ErrorMessageProps {
  children: React.ReactNode;
  duration?: number; // Prop opcional para la duración de la animación
  className?: string; // Prop opcional para clases adicionales
}

const ErrorMessage = ({
  children,
  duration = 0.3,
  className = "",
}: ErrorMessageProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration }}
    className={`text-red-500 ${className}`} // Combinamos las clases predeterminadas con las proporcionadas
  >
    {children}
  </motion.div>
);

export default ErrorMessage;
