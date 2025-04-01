import { format, parseISO } from "date-fns";

// * funcion para formatear la fecha
export const FormatDate = (date: Date | null, withTime: boolean = true) => {
    if (!date) return "N/A";
    
    const dateformat = withTime ? "yyyy/MM/dd HH:mm" : "yyyy-MM-dd";

    try {
        if (typeof date === "string") {
            return format(parseISO(date), dateformat);
        }

        return format(date, dateformat)
    } catch (error) {
        // console.log('Error al formatear la fecha:', error, 'valor recibido:', date)
        return "N/A";
    }
    
};
