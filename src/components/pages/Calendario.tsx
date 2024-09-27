//*Fuctions and Hooks
import "moment/locale/es";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";

const localizer = momentLocalizer(moment);
moment.locale("es");

interface MyEvent extends Event {
  description: string;
  images: string[];
  color: string;
}

const Calendario: React.FC = () => {
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<MyEvent>({
    title: "",
    start: new Date(),
    end: new Date(),
    description: "",
    images: [],
    color: "#000000",
  });

  const { rol } = useAuth();

  //*Cargar los eventos desde el localStorage al cargar la página
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  //*Función para agregar nuevos eventos y guardarlos en localStorage
  const handleAddEvent = () => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setShowModal(false); //*Cerrar el modal
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      description: "",
      images: [],
      color: "#000000", //*Restablecer color por defecto
    });
  };

  //*Función para eliminar un evento
  const handleDeleteEvent = (eventToDelete: MyEvent) => {
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setSelectedEvent(null); //*Restablecer el evento seleccionado
  };

  const handleSelectEvent = (event: MyEvent) => {
    setSelectedEvent(event);
    setShowModal(true); //*Mostrar modal al seleccionar un evento
  };

  const handleAddEventClick = () => {
    setSelectedEvent(null);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center w-full p-10 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white">
      <div className="w-full dark:text-gray-200">
        <Calendar
          localizer={localizer}
          events={events}
          views={["month", "agenda"]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={(event) => ({
            style: { backgroundColor: event.color }, //*Asignar color al evento
          })}
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
            noEventsInRange: "No hay eventos en este rango.",
            allDay: "Todo el día",
          }}
          className="bg-white border-2 rounded-lg dark:bg-gray-800 dark:text-white dark:border-color"
        />
      </div>
      <br />
      {[1, 2].includes(Number(rol)) && (
        <button
          onClick={handleAddEventClick}
          className="px-4 py-2 mb-4 text-white duration-300 ease-in-out bg-blue-500 rounded hover:bg-blue-700 hover:-translate-y-1"
        >
          Agregar Evento
        </button>
      )}

      {/* Modal para mostrar eventos y agregar uno nuevo */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 text-gray-100 bg-gray-900 border-2 rounded-md shadow-md sm:py-8 sm:px-12 dark:bg-gray-800 dark:text-white dark:border-indigo-500">
            <button
              onClick={() => setShowModal(false)} // Cerrar modal al hacer clic en "X"
              className="absolute w-8 h-8 rounded-full top-2 right-2 hover:bg-gray-50"
            >
              <div className="text-2xl text-red-600">&times;</div>
            </button>

            {selectedEvent ? (
              <>
                <h2 className="text-2xl font-semibold leading-tight tracking-wide text-white dark:text-gray-50">
                  {selectedEvent.title}
                </h2>
                <p className="text-gray-400 dark:text-gray-50">
                  {selectedEvent.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(selectedEvent)} //*Eliminar evento
                  className="px-8 py-3 font-semibold bg-red-500 rounded-full text-gray-50 dark:bg-red-600 dark:hover:bg-red-700 hover:bg-red-700 dark:text-white"
                >
                  Eliminar Evento
                </button>
              </>
            ) : (
              <>
                <div>
                  <h2 className="mb-4 text-xl">Agregar Nuevo Evento</h2>
                  <input
                    type="text"
                    placeholder="Título"
                    value={newEvent.title?.toString() || ""}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="w-full p-2 mb-4 text-black border rounded"
                  />
                  <textarea
                    placeholder="Descripción"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    className="w-full p-2 mb-4 text-black border rounded"
                  />
                  <label>Color del evento</label>
                  <input
                    type="color"
                    value={newEvent.color}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, color: e.target.value })
                    }
                    className="w-full px-4 mb-4 border rounded cursor-pointer"
                  />
                  <label>Fecha de Inicio</label>
                  <input
                    type="datetime-local"
                    value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        start: new Date(e.target.value),
                      })
                    }
                    className="w-full p-2 mb-4 text-black border rounded cursor-pointer"
                  />
                  <label>Fecha de Fin</label>
                  <input
                    type="datetime-local"
                    value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        end: new Date(e.target.value),
                      })
                    }
                    className="w-full p-2 mb-4 text-black border rounded cursor-pointer"
                  />
                  <button
                    onClick={handleAddEvent}
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
                  >
                    Guardar Evento
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 ml-2 text-white bg-red-500 rounded hover:bg-red-700"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
