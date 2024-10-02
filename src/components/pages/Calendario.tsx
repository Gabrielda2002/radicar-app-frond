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
    color: "#00776f",
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
      color: "#00776f", //*Restablecer color por defecto
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
          className="px-4 py-2 mb-4 text-black duration-300 ease-in-out bg-gray-300 rounded-md hover:bg-gray-700 hover:text-white dark:text-white active:bg-emerald-950 dark:bg-color dark:hover:bg-teal-600"
        >
          Agregar Evento
        </button>
      )}

      {/* Modal para mostrar eventos y agregar uno nuevo */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center pt-10 bg-black bg-opacity-50 backdrop-blur-sm">
          <section>
            <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 bg-white rounded-md shadow-md sm:py-8 sm:px-12 dark:bg-gray-800 dark:text-white">
              <button
                onClick={() => setShowModal(false)} // Cerrar modal al hacer clic en "X"
                className="absolute top-2 right-2"
              >
                <div className="pr-2 text-xl text-gray-500 hover-gray-700">
                  &times;
                </div>
              </button>

              {selectedEvent ? (
                <>
                  <h2 className="text-2xl font-semibold leading-tight tracking-wide text-stone-600 dark:text-stone-400">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-stone-400 dark:text-gray-200">
                    {selectedEvent.description}
                  </p>
                  {[1, 2].includes(Number(rol)) && (
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(selectedEvent)} //*Eliminar evento
                      className="h-12 px-10 font-semibold text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    >
                      Eliminar Evento
                    </button>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <h2 className="mb-4 text-xl font-semibold text-color dark:text-gray-200">
                      Agregar Nuevo Evento
                    </h2>
                    <input
                      type="text"
                      placeholder="Título"
                      value={newEvent.title?.toString() || ""}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      className="w-full p-2 px-3 mb-4 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                    />
                    <textarea
                      placeholder="Descripción"
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 px-3 mb-4 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
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
                      className="w-full p-2 px-3 mb-4 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
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
                      className="w-full p-2 px-3 mb-4 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                    />
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 ml-2 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleAddEvent}
                      className="px-4 py-2 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                    >
                      Guardar Evento
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Calendario;
