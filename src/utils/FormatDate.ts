import { format } from "date-fns";

// * funcion para formatear la fecha
export const FormatDate = (date: Date | null, withTime: boolean = true) => {
    
    const dateformat = withTime ? "yyyy/MM/dd HH:mm" : "yyyy-MM-dd";
    
    return date ? format(date, dateformat) : "N/A";
};
