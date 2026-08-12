export const getStatusColor = (status: string): string => {

    const statusUpper = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    switch (statusUpper ) {
        case "Cerrado":
            return "p-1 bg-gray-400 rounded-lg dark:bg-gray-500 dark:text-gray-400 text-gray-700";
        case "Abierto":
            return "p-1 bg-green-400 rounded-lg dark:bg-green-700 dark:text-green-400 text-green-700";
        case "Pendiente":
            return "p-1 bg-blue-400 rounded-lg dark:bg-blue-700 dark:text-blue-400 text-blue-700";
        case "En_gestion":
            return "p-1 bg-yellow-700 rounded-lg dark:bg-yellow-700 dark:text-yellow-400 text-gray-700";
        default:
            return "";
    }
};

// Función para obtener el color de fondo según la prioridad del ticket
export const getPriorityColor = (priority: string): string => {
    switch (priority) {
        case "Baja":
            return " p-1 bg-yellow-500/60 rounded-lg dark:text-gray-300 text-gray-700";
        case "Media":
            return " p-1 bg-orange-500/60 rounded-lg dark:text-gray-300 text-gray-700";
        case "Alta":
            return " p-1 bg-red-800/60 rounded-lg dark:text-gray-300 text-gray-700";
        case "Urgente":
            return " p-1 bg-red-900/80 rounded-lg dark:text-gray-300 text-gray-700";
        case "Pendiente":
            return " p-1 bg-blue-500/60 rounded-lg dark:text-gray-300 text-gray-700";
        default:
            return "";
    }
};