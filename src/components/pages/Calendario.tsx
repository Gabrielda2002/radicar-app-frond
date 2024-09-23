import React, { useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configuración de moment.js para el calendario
const localizer = momentLocalizer(moment);

interface MyEvent extends Event {
  description: string;
  images: string[];
}

const events: MyEvent[] = [
  {
    title: "Reunión Médica",
    start: new Date(2024, 8, 25, 10, 0),
    end: new Date(2024, 8, 25, 12, 0),
    description: "Revisión de casos clínicos con el equipo médico.",
    images: ["/images/reunion-medica.jpg"],
  },
  {
    title: "Generando Conciencia",
    start: new Date(2024, 8, 28, 9, 0),
    end: new Date(2024, 8, 28, 15, 0),
    description: "Seminario abierta al público.",
    images: ["/src/imgs/Seminario.jpg"],
  },
];

const Calendario: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);

  const handleSelectEvent = (event: MyEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex flex-col items-center w-full p-10 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white">
      <div className="w-full dark:text-white">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500,  }}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {/* Detalles del Evento Seleccionado */}
      {selectedEvent && (
        <div className="w-5/6 p-10 mt-6 bg-gray-50 dark:bg-gray-700 dark:text-white">
          <h3 className="text-xl font-bold dark:text-white">
            {selectedEvent.title}
          </h3>
          <p className="text-gray-600 dark:text-white">
            {selectedEvent.description}
          </p>
          {selectedEvent.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${selectedEvent.title} - Imagen ${index + 1}`}
              className="h-full p-2 mt-4 w-[800px]"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendario;
