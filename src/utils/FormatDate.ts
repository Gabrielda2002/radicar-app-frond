import { parseISO, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

/**
 * Formatea una fecha a la zona horaria de Colombia (America/Bogota)
 * @param date - Fecha a formatear (Date, string o null)
 * @param withTime - Si es true incluye la hora, si es false solo la fecha
 * @param onlyTime - Si es true muestra solo la hora
 * @returns String formateado con la fecha/hora o "N/A" si no hay fecha
 */
export const FormatDate = (
  date: Date | string | null,
  withTime: boolean = true,
  onlyTime: boolean = false
): string => {
  if (!date) return "N/A";
  
  const timeZone = 'America/Bogota';
  
  // Selecciona el formato adecuado según los parámetros
  let dateformat: string;
  if (onlyTime) {
    dateformat = "HH:mm";
  } else {
    dateformat = withTime ? "yyyy/MM/dd HH:mm" : "yyyy-MM-dd";
  }

  try {
    // Convertir a objeto Date si es un string
    let dateObj: Date;
    if (typeof date === "string") {
      // Intenta parsear fechas ISO
      dateObj = parseISO(date);
      // Si la fecha resultó inválida, lanza error para capturarlo en el catch
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date");
      }
    } else {
      dateObj = date;
    }
    
    // Convertir a la zona horaria de Colombia y formatear
    const zonedDate = toZonedTime(dateObj, timeZone);
    return format(zonedDate, dateformat);
  } catch (error) {
    console.warn('Error al formatear fecha:', error, 'valor:', date);
    return "N/A";
  }
};