//*Fuctions and Hooks
import "moment/locale/es";
import moment from "moment";
// import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer,  } from "react-big-calendar";
// import { IEventos } from "../../models/IEventos";
import { useFetchEvents } from "../../hooks/useFetchUsers";
import ModalCrearEvento from "./modals/ModalCrearEvento";
import LoadingSpinner from "../LoadingSpinner";

const localizer = momentLocalizer(moment);
moment.locale("es");


const Calendario: React.FC = () => {

  const load = true;
   const  { evetns, loadingEventos, errorEventos } = useFetchEvents(load);
   console.log(evetns)

   const calendarEvents = evetns?.map((event) => ({
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
          style={{ height: 500 }}
          eventPropGetter={(event) => ({
            style: { 
              backgroundColor: event.color,
              borderRadius: '5px'
            }
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
        <ModalCrearEvento/>
      )}
    </div>
  );
};

export default Calendario;
