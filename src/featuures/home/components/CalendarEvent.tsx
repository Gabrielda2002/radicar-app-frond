//*Fuctions and Hooks
import moment from "moment";
import { useAuth } from "@/context/authContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import ModalCrearEvento from "./ModalCreateEvent";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { IEventos } from "@/models/IEventos";
import { useEffect, useState } from "react";
import { useStoreEvent } from "../store/useStoreEvent";

const localizer = momentLocalizer(moment);
moment.locale("es");

const CalendarEvents: React.FC = () => {

  const [selectedEvent, setSelectedEvent] = useState<IEventos | null>(null);

  const handleEventSelect = (event: IEventos | null) => {
    setSelectedEvent(event);
  };

  const { data, isLoading, error, get } = useStoreEvent();

  useEffect(() => {
    get();
  }, [get])

  const calendarEvents = data?.map((event) => ({
    ...event,
    title: event.title,
    start: event.dateStart && event.timeStart 
      ? new Date(`${event.dateStart.toString().split("T")[0]}T${event.timeStart}`) 
      : null,
    end: event.dateEnd && event.timeEnd 
      ? new Date(`${event.dateEnd.toString().split("T")[0]}T${event.timeEnd}`) 
      : null,
    description: event.description,
    color: event.color,
    timeStart: event.timeStart,
    timeEnd: event.timeEnd,
  }));

  const { rol } = useAuth();

  if (isLoading) return <LoadingSpinner duration={100000} />;
  if (error) return <div>Hubo un error al cargar los eventos</div>;

  const eventStyleGetter = (event: IEventos) => {
    const backgroundColor = event.color || "#3174ad";

    // Calculate luminance to determine if the background is dark or light
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      backgroundColor
    );
    const r = parseInt(rgb?.[1] || "00", 16);
    const g = parseInt(rgb?.[2] || "00", 16);
    const b = parseInt(rgb?.[3] || "00", 16);

    // Perceived luminance formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return {
      style: {
        backgroundColor: backgroundColor,
        color: luminance > 0.5 ? "#000000" : "#ffffff", // Dark text for light backgrounds, light text for dark backgrounds
        fontWeight: "500",
        opacity: "0.9",
        borderRadius: "6px",
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      },
    };
  };

    const components = {
    agenda: {
      event: ({ event }: { event: IEventos }) => {
        const backgroundColor = event.color || "#3174ad";
  
        // Calcular luminancia para determinar el color del texto
        const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
          backgroundColor
        );
        const r = parseInt(rgb?.[1] || "00", 16);
        const g = parseInt(rgb?.[2] || "00", 16);
        const b = parseInt(rgb?.[3] || "00", 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
        // Formatear la hora para mostrarla en un formato más amigable
        const formatTime = (timeString: string) => {
          if (!timeString) return "";
          return moment(timeString, "HH:mm").format("hh:mm A");
        };
  
        return (
          <div className="flex flex-col">
            <span
              className={`text-base font-medium ${
                luminance > 0.5 ? "text-black" : "text-white"
              }`}
            >
              {event.title}
            </span>
            <span
              className={`text-sm ${
                luminance > 0.5 ? "text-gray-600" : "text-gray-200"
              } truncate`}
              title={event.description}
            >
              {event.description}
            </span>
            {(event.timeStart || event.timeEnd) && (
              <div
                className={`text-xs mt-1 ${
                  luminance > 0.5 ? "text-gray-600" : "text-gray-200"
                }`}
              >
                <span>Horario: </span>
                {event.timeStart && <span>{formatTime(event.timeStart)}</span>}
                {event.timeStart && event.timeEnd && <span> - </span>}
                {event.timeEnd && <span>{formatTime(event.timeEnd)}</span>}
              </div>
            )}
          </div>
        );
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-107 sm:w-150 md:w-full mx-auto p-4 md:p-10 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white">
      <div className="w-full text-sm md:text-lg dark:text-gray-200">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          views={["month", "agenda"]}
          defaultView="month"
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 500,
            width: "100%",
            margin: "0 auto",
            padding: "10px",
          }}
          eventPropGetter={(event) => {
            return eventStyleGetter(event);
          }}
          components={components}
          onSelectEvent={(event: IEventos) => {
            const selectedEvent = {
              id: event.id,
              title: event.title,
              dateStart: event.dateStart,
              dateEnd: event.dateEnd,
              description: event.description,
              color: event.color,
              timeStart: event.timeStart,
              timeEnd: event.timeEnd,
            };
            handleEventSelect(selectedEvent);
          }}
          messages={{
            today: "Hoy",
            previous: "Anterior",
            next: "Siguiente",
            month: "Mes",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "Sin eventos.",
            allDay: "Todo el día",
          }}
          className="bg-gray-200 border-2 rounded-lg dark:bg-gray-800"
        />
      </div>
      {[1, 18, 24, 25].includes(Number(rol)) && (
       <ModalCrearEvento
        initialData={selectedEvent || undefined}
      />
      )}
    </div>
  );
};

export default CalendarEvents;
