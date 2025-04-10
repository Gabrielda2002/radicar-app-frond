//*Fuctions and Hooks
import "moment/locale/es";
import moment from "moment";
import { useAuth } from "@/context/authContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import ModalCrearEvento from "./ModalCrearEvento";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { IEventos } from "@/models/IEventos";
import { useFetchEvents } from "../hooks/UseFetchEvents";
import { useEventModal } from "../hooks/UseEventModal";
import { useState } from "react";

const localizer = momentLocalizer(moment);
moment.locale("es");

const Calendario: React.FC = () => {
  const { selectedEvent, isModalOpen, handleEventSelect, handleCloseModal } =
    useEventModal();

  const load = true;
  const { evetns, loadingEventos, errorEventos } = useFetchEvents(load);

  const calendarEvents = evetns?.map((event) => ({
    ...event,
    title: event.title,
    start: new Date(event.dateStart),
    end: new Date(event.dateEnd),
    description: event.description,
    color: event.color,
  }));

  const { rol } = useAuth();

  if (loadingEventos) return <LoadingSpinner duration={100000} />;
  if (errorEventos) return <div>Hubo un error al cargar los eventos</div>;

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

    // Calculate luminance to determine if the background is dark or light
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      backgroundColor
    );
    const r = parseInt(rgb?.[1] || "00", 16);
    const g = parseInt(rgb?.[2] || "00", 16);
    const b = parseInt(rgb?.[3] || "00", 16);

    // Perceived luminance formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
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
              luminance > 0.5 ? "text-gray-300" : "text-gray-300"
            } truncate`}
            title={event.description}
          >
            {event.description}
          </span>
        </div>

    )

      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full p-10 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white">
      <div className="w-full dark:text-gray-200">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          views={["month", "agenda"]}
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
            };
            handleEventSelect(selectedEvent);
          }}
          messages={{
            today: "Hoy",
            previous: "Anterior",
            next: "Siguiente",
            month: "Mes",
            week: "Semana",
            day: "Día",
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
      {[1, 18].includes(Number(rol)) && (
        <button
          onClick={() => handleEventSelect(null)}
          className="mt-4 btn-primary"
        >
          Crear Evento
        </button>
      )}
      <ModalCrearEvento
        isOpen={isModalOpen}
        initialData={selectedEvent || undefined}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Calendario;
