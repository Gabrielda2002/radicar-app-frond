export const getStatusColor = (status: string): string => {
    switch (status) {
        case "Cerrado":
            return " p-1 bg-red-800/60 rounded-lg dark:text-gray-300 text-gray-700";
        case "Abierto":
            return " p-1 bg-green-500/60 rounded-lg dark:text-gray-300 text-gray-700";
        case "Pendiente":
            return " p-1 bg-blue-500/60 rounded-lg text-gray-300";
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
        default:
            return "";
    }
};