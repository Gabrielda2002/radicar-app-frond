import {parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

// * funcion para formatear la fecha
export const FormatDate = (date: Date | null, withTime: boolean = true) => {
    if (!date) return "N/A";
    
    const timeZone = 'America/Bogota';
    const dateformat = withTime ? "yyyy/MM/dd HH:mm" : "yyyy-MM-dd";

    try {
        if (typeof date === "string") {
            return formatInTimeZone(parseISO(date), timeZone,dateformat);
        }

        return formatInTimeZone(date, timeZone,dateformat)
    } catch (error) {
        // console.log('Error al formatear la fecha:', error, 'valor recibido:', date)
        return "N/A";
    }
    
};
