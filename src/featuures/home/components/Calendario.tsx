//*Fuctions and Hooks
import "moment/locale/es";
import moment from "moment";
import { useAuth } from "@/context/authContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer,  } from "react-big-calendar";
import ModalCrearEvento from "./ModalCrearEvento";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { IEventos } from "@/models/IEventos";
import { useFetchEvents } from "../hooks/UseFetchEvents";
import { useEventModal } from "../hooks/UseEventModal";

const localizer = momentLocalizer(moment);
moment.locale("es");


const Calendario: React.FC = () => {

    const {
      selectedEvent,
      isModalOpen,
      handleEventSelect,
      handleCloseModal
    } = useEventModal();

  const load = true;
   const  { evetns, loadingEventos, errorEventos } = useFetchEvents(load);

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


  return (
    <div className="flex flex-col items-center w-full p-10 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white">
      <div className="w-full dark:text-gray-200">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          views={["month", "agenda"]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: "100%", margin: "0 auto", padding: "10px" }}
          eventPropGetter={(event) => ({
            style: { 
              backgroundColor: event.color,
              borderRadius: '6px',
            }
          })}
          onSelectEvent={(event: IEventos) => {
            const selectedEvent = {
              id: event.id,
              title: event.title,
              dateStart: event.dateStart,
              dateEnd: event.dateEnd,
              description: event.description,
              color: event.color,
            }
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
