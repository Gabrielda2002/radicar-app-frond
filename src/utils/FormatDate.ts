import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export const FormatDate = (date: Date | string | null, withTime: boolean = true) => {
    if (!date) return "N/A";
    
    const timeZone = 'America/Bogota';
    const dateformat = withTime ? "yyyy/MM/dd HH:mm" : "yyyy-MM-dd";

    console.log("date", date)

    try {
        // Si es string (formato ISO), usar directamente parseISO
        if (typeof date === "string") {
            console.log("string", date)
            console.log('lo que retorna', new Date(date));
            return formatInTimeZone(parseISO(date), timeZone, dateformat);
        }
        
        // Si es un objeto Date, convertirlo primero a formato ISO y luego formatearlo
        // Esto evita problemas con la zona horaria local
        const isoString = date.toISOString();
        return formatInTimeZone(parseISO(isoString), timeZone, dateformat);
    } catch (error) {
        return "N/A";
    }
};