export const getColorStatus = (status: string): string => {
    switch (status) {
        case "AUTORIZADO":
            return "text-gray-700 font-semibold bg-green-400 px-2 py-1 rounded";
        case "NO AUTORIZADO":
            return "text-gray-700 font-semibold bg-red-600 px-2 py-1 rounded";
        case "REDIRECCIONADO":
            return "text-gray-700 font-semibold bg-yellow-400 px-2 py-1 rounded";
        case "YA AUTORIZADO":
            return "text-gray-700 font-semibold bg-blue-400 px-2 py-1 rounded";
        case "OTRO":
            return "text-gray-700 font-semibold bg-purple-400 px-2 py-1 rounded";
        case "PENDIENTE":
            return "text-gray-700 font-semibold bg-orange-400 px-2 py-1 rounded";
        case "EN TRAMITE":
            return "text-gray-700 font-semibold bg-gray-400 px-2 py-1 rounded";
        default:
            return "text-gray-600 font-semibold bg-gray-400 px-2 py-1 rounded";
    }
}

export const getLastManagementStatusColor = (status: string): string => {
    switch (status) {
        case "Asignado":
            return "text-gray-700 font-semibold bg-green-500 px-2 py-1 rounded";
        case "Cancelado":
            return "text-gray-700 font-semibold bg-red-500 px-2 py-1 rounded";
        case "Pendiente":
            return "text-gray-700 font-semibold bg-yellow-600 px-2 py-1 rounded";
        case "Cerrado":
            return "text-gray-700 font-semibold bg-blue-500 px-2 py-1 rounded";
        case "Programado":
            return "text-gray-700 font-semibold bg-purple-500 px-2 py-1 rounded";
        case "Cumplido":
            return "text-gray-700 font-semibold bg-teal-500 px-2 py-1 rounded";
        case "Reprogramado":
            return "text-gray-700 font-semibold bg-orange-500 px-2 py-1 rounded";
        default:
            return "text-gray-600 font-semibold bg-gray-400 px-2 py-1 rounded";
    }
};