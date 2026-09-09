import { motion } from "framer-motion";

interface ErrorMessageProps {
  children: React.ReactNode;
  duration?: number; // Prop opcional para la duración de la animación
  className?: string; // Prop opcional para clases adicionales
  textClassName?: string;
}

const ErrorMessage = ({
  children,
  duration = 0.3,
  className = "",
  textClassName = "text-red-500",
}: ErrorMessageProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration }}
    className={`${textClassName} ${className}`}
  >
    {children}
  </motion.div>
);

export default ErrorMessage;
