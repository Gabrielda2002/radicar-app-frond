import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { CalendarRange, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useAuth } from "@/context/authContext";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { IEventos } from "@/models/IEventos";
import { useStoreEvent } from "../store/useStoreEvent";
import ModalCrearEvento from "./ModalCreateEvent";

const formatSpanishMonth = (date: moment.Moment) =>
  new Intl.DateTimeFormat("es-CO", {
    month: "short",
  })
    .format(date.toDate())
    .replace(".", "");

const formatSpanishDayMonth = (date: moment.Moment) =>
  new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
  })
    .format(date.toDate())
    .replace(",", "");

const WEEKDAY_LABELS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

const MONTH_NAMES_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const buildCalendarGrid = (currentDate: Date) => {
  const startOfMonth = moment(currentDate).startOf("month");

  const gridStart = moment(startOfMonth).startOf("week");

  const days: moment.Moment[] = [];

  for (let i = 0; i < 42; i++) {
    days.push(moment(gridStart).add(i, "days"));
  }

  return days;
};

const CalendarEvents: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<IEventos | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { data, isLoading, error, get } = useStoreEvent();
  const { rol } = useAuth();

  const canManage = [1, 18, 24, 25].includes(Number(rol));

  useEffect(() => {
    get();
  }, [get]);

  const monthEvents = data
    .filter((event) => moment(event.dateStart).isSame(currentDate, "month"))
    .sort(
      (first, second) =>
        moment(first.dateStart).valueOf() - moment(second.dateStart).valueOf(),
    );

  const eventDaysMap = useMemo(() => {
    const map = new Map<string, IEventos[]>();

    monthEvents.forEach((event) => {
      const key = moment(event.dateStart).format("YYYY-MM-DD");

      map.set(key, [...(map.get(key) || []), event]);
    });

    return map;
  }, [monthEvents]);

  const calendarGrid = useMemo(
    () => buildCalendarGrid(currentDate),
    [currentDate],
  );

  const eventsToShow = selectedDay
    ? monthEvents.filter(
      (event) => moment(event.dateStart).format("YYYY-MM-DD") === selectedDay,
    )
    : monthEvents;

  const moveMonth = (amount: number) => {
    setCurrentDate(moment(currentDate).add(amount, "month").toDate());

    setSelectedDay(null);
  };

  const handleDayClick = (day: moment.Moment) => {
    const key = day.format("YYYY-MM-DD");

    if (!eventDaysMap.has(key)) {
      return;
    }

    setSelectedDay((prev) => (prev === key ? null : key));
  };

  if (isLoading) {
    return <LoadingSpinner duration={100000} />;
  }

  if (error) {
    return <div>Hubo un error al cargar los eventos</div>;
  }

  return (
    <div className="mx-auto w-full rounded-lg bg-gray-50 p-4 dark:bg-gray-700 md:p-6">
      <div className="mb-5 flex flex-col gap-4 border-b border-gray-200 pb-5 dark:border-gray-600 sm:flex-row sm:items-center sm:justify-between">
        <div>

          <h2 className="mt-1 text-2xl font-bold capitalize text-gray-800 dark:text-white">
            {MONTH_NAMES_ES[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>

        {canManage && <ModalCrearEvento />}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(300px,1.15fr)]">
        <section
          className="min-w-0 rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-600 dark:bg-gray-800 sm:p-5"
          aria-label="Calendario mensual"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
              <CalendarRange className="h-6 w-6 text-[#008d93]" />
              Calendario mensual
            </div>

            <div className="flex items-center gap-1">
              <button
                aria-label="Mes anterior"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-[#e6f8f9] hover:text-[#008d93]"
                onClick={() => moveMonth(-1)}
                type="button"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                aria-label="Mes siguiente"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-[#e6f8f9] hover:text-[#008d93]"
                onClick={() => moveMonth(1)}
                type="button"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* DÍAS */}

          <div className="grid grid-cols-7 gap-y-2 text-center">
            {WEEKDAY_LABELS.map((label) => (
              <span
                key={label}
                className="text-base font-semibold text-gray-400 dark:text-gray-500"
              >
                {label}
              </span>
            ))}

            {calendarGrid.map((day) => {
              const key = day.format("YYYY-MM-DD");

              const isCurrentMonth = day.isSame(currentDate, "month");

              const dayEvents = eventDaysMap.get(key);

              const hasEvents = Boolean(dayEvents);

              const isToday = day.isSame(moment(), "day");

              const isSelected = selectedDay === key;

              const eventColor = dayEvents?.[0]?.color || "#008d93";

              return (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center gap-1 py-2"
                >
                  <button
                    type="button"
                    onClick={() => handleDayClick(day)}
                    disabled={!hasEvents}
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold leading-none transition-colors sm:h-10 sm:w-10 sm:text-xl",

                      isToday
                        ? "bg-emerald-500 text-white shadow-sm"
                        : !isCurrentMonth
                          ? "font-normal text-gray-300 dark:text-gray-600"
                          : hasEvents
                            ? "cursor-pointer text-gray-800 dark:text-white"
                            : "cursor-default font-normal text-gray-600 dark:text-gray-300",
                    ].join(" ")}
                    style={
                      !isToday && hasEvents && isSelected
                        ? {
                          color: eventColor,
                        }
                        : undefined
                    }
                  >
                    {day.format("D")}
                  </button>

                  <span
                    className="h-[3px] w-5 rounded-full"
                    style={{
                      backgroundColor: hasEvents ? eventColor : "transparent",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-600 dark:bg-gray-800"
          aria-labelledby="upcoming-events-title"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2
                id="upcoming-events-title"
                className="text-2xl font-bold text-gray-800 dark:text-white"
              >
                Próximos Eventos
              </h2>

              <p className="mt-1 text-base text-gray-500 dark:text-gray-400">
                {selectedDay
                  ? `Eventos del ${formatSpanishDayMonth(moment(selectedDay))}`
                  : `Actividades de ${MONTH_NAMES_ES[currentDate.getMonth()]}`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {selectedDay && (
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                >
                  <X className="h-3 w-3" />
                  Ver todos
                </button>
              )}

              <span className="rounded-full bg-gray-700 px-3 py-1 text-2xl font-bold text-[#e6f8f9]">
                {eventsToShow.length}
              </span>
            </div>
          </div>

          <div className="max-h-[340px] space-y-3 overflow-y-auto pr-1">
            {eventsToShow.length ? (
              eventsToShow.map((event) => (
                <button
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-100 p-3 text-left transition hover:border-[#8bf3f9] hover:bg-[#f4ffff] dark:border-gray-700 dark:hover:bg-gray-700"
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  type="button"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg text-white shadow-sm"
                    style={{
                      backgroundColor: event.color || "#008d93",
                    }}
                  >
                    <span className="text-[15px] font-bold uppercase">
                      {formatSpanishMonth(moment(event.dateStart))}
                    </span>

                    <span className="text-lg font-extrabold leading-none">
                      {moment(event.dateStart).locale("es").format("DD")}
                    </span>
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-base font-bold text-gray-800 dark:text-gray-100">
                      {event.title}
                    </span>

                    <span className="mt-1 block text-base text-gray-500 dark:text-gray-400">
                      {event.timeStart
                        ? moment(event.timeStart, "HH:mm").format("hh:mm A")
                        : "Todo el día"}
                    </span>
                  </span>
                </button>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400">
                {selectedDay
                  ? "No hay eventos para este día."
                  : "No hay eventos para este mes."}
              </div>
            )}
          </div>
        </section>
      </div>

      {selectedEvent && (
        <ModalCrearEvento
          initialData={selectedEvent}
          mode="view"
          autoOpen
          hideTrigger
          onSaved={() => setSelectedEvent(null)}
          onClosed={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default CalendarEvents;