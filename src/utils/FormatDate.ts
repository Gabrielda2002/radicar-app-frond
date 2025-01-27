import { format } from "date-fns";

// * funcion para formatear la fecha
export const FormatDate = (date: Date | null, withTime: boolean = true) => {
    
    const dateformat = withTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy";
    
    return date ? format(date, dateformat) : "N/A";
};
