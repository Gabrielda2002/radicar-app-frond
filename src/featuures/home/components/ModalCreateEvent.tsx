import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { format } from "date-fns";
import moment from "moment";
import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  Mail,
  FileText,
  Palette,
  Edit3,
  Trash2,
  Check,
} from "lucide-react";
import { IEventos } from "@/models/IEventos";
import { useAuth } from "@/context/authContext";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { toast } from "react-toastify";
import FormModal from "@/components/common/Ui/FormModal";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import ConfirmDeletePopup from "@/components/common/ConfirmDeletePopUp/ConfirmDeletePopUp";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import { AnimatePresence } from "framer-motion";
import { useStoreEvent } from "../store/useStoreEvent";

interface ModalCreateEventProps {
  initialData?: IEventos;
  autoOpen?: boolean;
  hideTrigger?: boolean;
  /** "form" (por defecto): crear/editar evento. "view": detalle de solo lectura,
   *  con opción de pasar a edición sin abrir un segundo modal. */
  mode?: "form" | "view";
  onSaved?: () => void;
  onClosed?: () => void;
}

const rolesCanManage = [1, 18, 24, 25];

// Paleta de colores institucional, igual a la del nuevo diseño
const COLOR_PALETTE = [
  { value: "#008d93", label: "Verde Azulado / Teal" },
  { value: "#10b981", label: "Esmeralda" },
  { value: "#6366f1", label: "Índigo" },
  { value: "#a855f7", label: "Púrpura" },
  { value: "#f43f5e", label: "Rosa / Coral" },
  { value: "#f59e0b", label: "Ámbar / Naranja" },
];

const extractFechaHora = (fechaCompleta: Date | string) => {
  const date = new Date(fechaCompleta);
  return { fecha: format(date, "yyyy-MM-dd"), hora: format(date, "HH:mm") };
};

const formatSpanishDate = (date: moment.Moment) =>
  new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  })
    .format(date.toDate())
    .replace(",", "");

// Calcula la duración legible entre fecha/hora inicio y fin
const getDuracionLegible = (
  fechaInicio: string,
  horaInicio: string,
  fechaFin: string,
  horaFin: string,
) => {
  if (!fechaInicio || !horaInicio || !fechaFin || !horaFin) return null;
  const start = new Date(`${fechaInicio}T${horaInicio}`);
  const end = new Date(`${fechaFin}T${horaFin}`);
  const diffMs = end.getTime() - start.getTime();
  if (isNaN(diffMs) || diffMs <= 0) return null;
  const totalMin = Math.round(diffMs / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

interface TimeSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1); // 1..12
const MINUTES = Array.from({ length: 60 }, (_, i) => i); // 0..59

// Convierte "HH:mm" (24h) -> { hour12, minute, meridiem }
const parseTimeValue = (value: string) => {
  if (!value) return { hour12: "", minute: "", meridiem: "AM" as "AM" | "PM" };
  const [hStr, mStr] = value.split(":");
  const h24 = parseInt(hStr, 10);
  const meridiem: "AM" | "PM" = h24 >= 12 ? "PM" : "AM";
  let hour12 = h24 % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12: String(hour12), minute: mStr ?? "00", meridiem };
};

// Convierte { hour12, minute, meridiem } -> "HH:mm" (24h)
const buildTimeValue = (hour12: string, minute: string, meridiem: "AM" | "PM") => {
  if (!hour12 || !minute) return "";
  let h = parseInt(hour12, 10) % 12;
  if (meridiem === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const timeSelectBaseClass =
  "rounded-lg border bg-white px-2 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#008d93]/40 dark:bg-gray-800 dark:text-gray-100";

const TimeSelect: React.FC<TimeSelectProps> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required,
}) => {
  const { hour12, minute, meridiem } = parseTimeValue(value);
  const showError = Boolean(touched && error);

  const emit = (nextHour: string, nextMinute: string, nextMeridiem: "AM" | "PM") => {
    onChange(buildTimeValue(nextHour, nextMinute, nextMeridiem));
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">
        {label} {required && <span className="text-gray-700 dark:text-gray-200">*</span>}
      </label>
      <div className="flex items-center gap-1.5" onBlur={onBlur}>
        <select
          value={hour12}
          onChange={(e) => emit(e.target.value, minute || "00", meridiem)}
          className={`${timeSelectBaseClass} ${showError ? "border-[#008d93]" : "border-gray-200 dark:border-gray-600"}`}
          aria-label="Hora"
        >
          <option value="" disabled>--</option>
          {HOURS_12.map((h) => (
            <option key={h} value={h}>{String(h).padStart(2, "0")}</option>
          ))}
        </select>
        <span className="text-gray-400">:</span>
        <select
          value={minute}
          onChange={(e) => emit(hour12 || "12", e.target.value, meridiem)}
          className={`${timeSelectBaseClass} ${showError ? "border-rose-300" : "border-gray-200 dark:border-gray-600"}`}
          aria-label="Minuto"
        >
          <option value="" disabled>--</option>
          {MINUTES.map((m) => (
            <option key={m} value={String(m).padStart(2, "0")}>{String(m).padStart(2, "0")}</option>
          ))}
        </select>
        <div className="ml-1 flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
          {(["AM", "PM"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => emit(hour12 || "12", minute || "00", option)}
              className={`px-2.5 py-2 text-xs font-semibold transition-colors ${
                meridiem === option
                  ? "bg-[#008d93] text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {showError && <p className="text-xs text-gray-700 dark:text-gray-200">{error}</p>}
    </div>
  );
};
interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  variant?: "filled" | "outline";
  children: React.ReactNode;
}

const InfoCard = ({ icon: Icon, label, variant = "outline", children }: InfoCardProps) => (
  <div
    className={
      variant === "filled"
        ? "flex items-start gap-3 rounded-xl bg-[#e6f8f9] p-4 dark:bg-gray-700"
        : "flex items-start gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-600"
    }
  >
    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#008d93]" />
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
        {label}
      </p>
      <div className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-100">{children}</div>
    </div>
  </div>
);

const EventReadView = ({ event }: { event: IEventos }) => {
  const location = event.location || "No especificado";
  const responsibleName = event.responsibleName || "No especificado";
  const responsibleEmail = event.responsibleEmail || "";
  const startDate = moment(event.dateStart);
  const endDate = moment(event.dateEnd);
  const startTime = event.timeStart ? moment(event.timeStart, "HH:mm").format("hh:mm A") : "Sin hora";
  const endTime = event.timeEnd ? moment(event.timeEnd, "HH:mm").format("hh:mm A") : "";
  const sameDate = startDate.isSame(endDate, "day");

  return (
    <div className="space-y-5 p-1">
      <div className="rounded-xl border border-[#ccebec] bg-gradient-to-r from-[#effbfb] to-white p-4 dark:border-gray-600 dark:from-gray-700 dark:to-gray-800">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#008d93]">
          <CalendarDays className="h-4 w-4" />
          <span>Evento institucional</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{event.title}</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard icon={CalendarDays} label="Fecha" variant="filled">
          {sameDate ? (
            <p className="capitalize">{formatSpanishDate(startDate)}</p>
          ) : (
            <div className="space-y-1">
              <p className="capitalize">Inicio: {formatSpanishDate(startDate)}</p>
              <p className="capitalize">Fin: {formatSpanishDate(endDate)}</p>
            </div>
          )}
        </InfoCard>

        <InfoCard icon={Clock3} label="Horario" variant="filled">
          <p>
            {startTime}
            {endTime && <> - {endTime}</>}
          </p>
          <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
            Zona horaria: GMT-5
          </p>
        </InfoCard>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard icon={MapPin} label="Lugar o enlace">
          <p className="break-words">{location}</p>
        </InfoCard>
        <InfoCard icon={UserRound} label="Responsable">
          <p className="break-words">{responsibleName}</p>
        </InfoCard>
      </div>

      {responsibleEmail && (
        <InfoCard icon={Mail} label="Correo del responsable">
          <p className="break-all">{responsibleEmail}</p>
        </InfoCard>
      )}

      <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-600">
        <div className="mb-3 flex items-center gap-2 text-[#008d93]">
          <FileText className="h-4 w-4" />
          <p className="text-xs font-bold uppercase tracking-wider">Descripción y agenda</p>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {event.description || "Este evento no tiene descripción."}
        </p>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-600">
        <div className="flex items-center gap-3">
          <Palette className="h-5 w-5 text-[#008d93]" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
              Color del evento
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Identificador del calendario
            </p>
          </div>
        </div>
        <span
          className="h-7 w-7 rounded-full border-2 border-white shadow-md dark:border-gray-700"
          style={{ backgroundColor: event.color || "#008d93" }}
          title={event.color || "#008d93"}
        />
      </div>
    </div>
  );
};

const ModalCreateEvent: React.FC<ModalCreateEventProps> = ({
  initialData,
  autoOpen = false,
  hideTrigger = false,
  mode = "form",
  onSaved,
  onClosed,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState(mode === "view");
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const { create, update, remove, error, isLoading } = useStoreEvent();
  const { rol } = useAuth();
  const canManageRole = rolesCanManage.includes(Number(rol));
  const isEditing = Boolean(initialData);

  useEffect(() => {
    if (autoOpen) setIsOpen(true);
  }, [autoOpen]);

  useEffect(() => {
    setViewMode(mode === "view");
  }, [mode, initialData?.id]);

  useBlockScroll(isOpen);

  const validationSchema = Yup.object({
    titulo: Yup.string()
      .required("El título es requerido")
      .min(2, "El título debe tener al menos 2 caracteres")
      .max(200, "El título debe tener máximo 200 caracteres"),
    descripcion: Yup.string()
      .required("La descripción es requerida")
      .min(2, "La descripción debe tener al menos 2 caracteres")
      .max(300, "La descripción debe tener máximo 300 caracteres"),
    lugar: Yup.string()
      .required("El lugar es requerido")
      .max(150, "El lugar debe tener máximo 150 caracteres"),
    responsableNombre: Yup.string()
      .required("El nombre del responsable es requerido")
      .max(120, "El nombre debe tener máximo 120 caracteres"),
    responsableCorreo: Yup.string()
      .required("El correo del responsable es requerido")
      .email("El correo no es válido"),
    fechaInicio: Yup.string().required("La fecha de inicio es requerida"),
    fechaFin: Yup.string()
      .required("La fecha de fin es requerida")
      .test("fecha-posterior", "La fecha de fin no puede ser anterior", function (value) {
        return !value || !this.parent.fechaInicio || value >= this.parent.fechaInicio;
      }),
    horaInicio: Yup.string().required("La hora de inicio es requerida"),
    horaFin: Yup.string()
      .required("La hora de fin es requerida")
      .test(
        "hora-posterior",
        "La hora de fin debe ser posterior a la hora de inicio",
        function (value) {
          if (!value || !this.parent.horaInicio || this.parent.fechaFin !== this.parent.fechaInicio)
            return true;
          return value >= this.parent.horaInicio;
        },
      ),
    color: Yup.string().required("El color es requerido"),
  });

  const startValues = initialData?.dateStart ? extractFechaHora(initialData.dateStart) : { fecha: "", hora: "" };
  const endValues = initialData?.dateEnd ? extractFechaHora(initialData.dateEnd) : { fecha: "", hora: "" };

  const formik = useFormik({
    initialValues: {
      titulo: initialData?.title || "",
      descripcion: initialData?.description || "",
      lugar: initialData?.location || "",
      responsableNombre: initialData?.responsibleName || "",
      responsableCorreo: initialData?.responsibleEmail || "",
      fechaInicio: startValues.fecha,
      fechaFin: endValues.fecha,
      horaInicio: initialData?.timeStart || startValues.hora,
      horaFin: initialData?.timeEnd || endValues.hora,
      color: initialData?.color || "#008d93",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.titulo);
      formData.append("description", values.descripcion);
      formData.append("location", values.lugar);
      formData.append("responsibleName", values.responsableNombre);
      formData.append("responsibleEmail", values.responsableCorreo);
      formData.append("dateStart", `${values.fechaInicio}T${values.horaInicio}`);
      formData.append("dateEnd", `${values.fechaFin}T${values.horaFin}`);
      formData.append("timeStart", values.horaInicio);
      formData.append("timeEnd", values.horaFin);
      formData.append("color", values.color);

      const onSuccess = () => {
        toast.success(isEditing ? "Evento actualizado exitosamente" : "Evento creado exitosamente");
        formik.resetForm();
        setIsOpen(false);
        onSaved?.();
      };

      if (initialData) await update(initialData.id, formData, onSuccess);
      else await create(formData, onSuccess);
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    onClosed?.();
  };

  const handleDelete = () => {
    if (!initialData) return;
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!initialData) return;

    remove(initialData.id, () => {
      toast.success("Evento eliminado exitosamente");
      setIsConfirmDeleteOpen(false);
      setIsOpen(false);
      onClosed?.();
    });
  };

  // En modo formulario, el gate de rol sigue aplicando (solo quien puede
  // gestionar eventos ve el botón/trigger). En modo vista, cualquiera
  // puede abrir el detalle; el gate solo oculta las acciones de editar/eliminar.
  if (mode === "form" && !canManageRole) return null;

  const fieldProps = (name: keyof typeof formik.values) => ({
    name,
    value: formik.values[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.errors[name],
    touched: formik.touched[name],
    size: "full" as const,
    requiredClassName: "text-gray-700 dark:text-gray-200",
    errorClassName: "text-gray-700 dark:text-gray-200",
  });

  const duracion = getDuracionLegible(
    formik.values.fechaInicio,
    formik.values.horaInicio,
    formik.values.fechaFin,
    formik.values.horaFin,
  );

  if (viewMode && initialData) {
    const footerExtra = canManageRole ? (
      <>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => setViewMode(false)}
          icon={<Edit3 className="h-4 w-4" />}
          className="rounded-lg border border-[#b7e4e5] bg-[#e6f8f9] px-4 py-2.5 text-sm font-semibold text-[#00776f] shadow-sm transition hover:border-[#8bd9dc] hover:bg-[#d3f1f2] hover:shadow dark:border-[#008d93]/40 dark:bg-[#008d93]/15 dark:text-[#4fd1d9] dark:hover:border-[#008d93]/60 dark:hover:bg-[#008d93]/25"
        >
          Editar evento
        </Button>
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={handleDelete}
          isLoading={isLoading}
          icon={<Trash2 className="h-4 w-4" />}
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:border-red-300 hover:bg-red-100 hover:shadow dark:border-red-500/40 dark:bg-red-500/15 dark:text-red-400 dark:hover:border-red-500/60 dark:hover:bg-red-500/25"
        >
          {isLoading ? "Eliminando..." : "Eliminar evento"}
        </Button>
      </>
    ) : null;

    return (
      <>
        <ModalDefault
          isOpen={isOpen}
          onClose={handleClose}
          title="Detalle del evento"
          size="md"
          cancelText="Cerrar"
          footerExtra={footerExtra}
        >
          <EventReadView event={initialData} />
        </ModalDefault>

        <ConfirmDeletePopup
          isOpen={isConfirmDeleteOpen}
          onClose={() => setIsConfirmDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
          itemName={initialData.title}
          isDeleting={isLoading}
        />
      </>
    );
  }

  return (
    <>
      {!hideTrigger && (
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          {isEditing ? "Editar Evento" : "Crear Evento"}
        </Button>
      )}
      <FormModal
        isOpen={isOpen}
        onClose={handleClose}
        title={isEditing ? "Editar Evento" : "Crear Evento"}
        onSubmit={formik.handleSubmit}
        isSubmitting={isLoading}
        isValid={formik.isValid && formik.dirty}
        submitText={isEditing ? "Actualizar" : "Crear"}
        size="xl"
        className="rounded-2xl border border-[#ccebec] shadow-2xl"
        headerClassName="border-b border-[#b7e4e5] bg-[#effbfb] dark:border-gray-600 dark:bg-gray-700"
        footerClassName="border-t border-[#ccebec] bg-[#f5fbfb] dark:border-gray-600 dark:bg-gray-700"
      >
        <div className="grid grid-cols-1 gap-6 bg-gradient-to-b from-[#fbffff] to-white p-2 sm:p-5 lg:grid-cols-12 dark:from-gray-800 dark:to-gray-800">
          <div className="space-y-5 lg:col-span-7">
            <section className="rounded-2xl border border-[#d8eeee] bg-white p-5 shadow-sm dark:border-gray-600 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between border-b border-[#e2f1f1] pb-3 dark:border-gray-600">
                <div className="flex items-center gap-2 text-base font-semibold uppercase tracking-wider text-[#008d93]">
                  <CalendarDays className="h-4 w-4" />
                  <span>Detalles Principales</span>
                </div>
                <span className="text-[15px] font-medium text-gray-700 dark:text-gray-200">
                  Campos requeridos (<span className="text-gray-700 dark:text-gray-200">*</span>)
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                      Título del evento <span className="text-gray-700 dark:text-gray-200">*</span>
                    </label>
                    <span className="text-[15px] text-gray-400">{formik.values.titulo.length} / 200</span>
                  </div>
                  <Input type="text" placeholder="" required {...fieldProps("titulo")} />
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-1 text-base font-semibold text-gray-700 dark:text-gray-200">
                    <MapPin className="h-3.5 w-3.5 text-[#008d93]" />
                    Lugar o Enlace de reunión <span className="text-gray-700 dark:text-gray-200">*</span>
                  </label>
                  <Input type="text" placeholder="" required {...fieldProps("lugar")} />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                      Descripción y Agenda <span className="text-gray-700 dark:text-gray-200">*</span>
                    </label>
                    <span className="text-[15px] text-gray-400">{formik.values.descripcion.length} / 300</span>
                  </div>
                  <Input type="text" placeholder="" required {...fieldProps("descripcion")} />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#d8eeee] bg-white p-5 shadow-sm dark:border-gray-600 dark:bg-gray-800">
              <div className="mb-4 flex items-center gap-2 border-b border-[#e2f1f1] pb-3 text-base font-semibold uppercase tracking-wider text-[#008d93] dark:border-gray-600">
                <Clock3 className="h-4 w-4" />
                <span>Fechas y Horario</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input type="date" label="Fecha de inicio:" required {...fieldProps("fechaInicio")} />
                <Input type="date" label="Fecha de fin:" required {...fieldProps("fechaFin")} />
                <TimeSelect
                  label="Hora de inicio:"
                  required
                  value={formik.values.horaInicio}
                  onChange={(val) => formik.setFieldValue("horaInicio", val)}
                  onBlur={() => formik.setFieldTouched("horaInicio", true)}
                  error={formik.errors.horaInicio}
                  touched={formik.touched.horaInicio}
                />
                <TimeSelect
                  label="Hora de fin:"
                  required
                  value={formik.values.horaFin}
                  onChange={(val) => formik.setFieldValue("horaFin", val)}
                  onBlur={() => formik.setFieldTouched("horaFin", true)}
                  error={formik.errors.horaFin}
                  touched={formik.touched.horaFin}
                />
              </div>

              <div className="mt-3 flex items-center justify-between px-1 text-[15px] text-gray-400">
                <span>Zona horaria: GMT-5</span>
                {duracion && <span className="font-medium text-[#008d93]">Duración: {duracion}</span>}
              </div>
            </section>
          </div>

          <div className="space-y-5 lg:col-span-5">
            <section className="rounded-2xl border border-[#d8eeee] bg-white p-5 shadow-sm dark:border-gray-600 dark:bg-gray-800">
              <div className="mb-4 flex items-center gap-2 border-b border-[#e2f1f1] pb-3 text-base font-semibold uppercase tracking-wider text-[#008d93] dark:border-gray-600">
                <UserRound className="h-4 w-4" />
                <span>Responsable / Anfitrión</span>
              </div>
              <div className="space-y-4">
                <Input type="text" label="Nombre:" placeholder="Ej. Ana Perez" required {...fieldProps("responsableNombre")} />
                <Input type="email" label="Correo corporativo:" placeholder="correo@empresa.com" required {...fieldProps("responsableCorreo")} />
              </div>
            </section>

            <section className="rounded-2xl border border-[#d8eeee] bg-white p-5 shadow-sm dark:border-gray-600 dark:bg-gray-800">
              <div className="mb-4 flex items-center gap-2 border-b border-[#e2f1f1] pb-3 text-base font-semibold uppercase tracking-wider text-[#008d93] dark:border-gray-600">
                <Check className="h-4 w-4" />
                <span>Color en Calendario</span>
              </div>
              <label className="mb-2.5 block text-base font-semibold text-gray-700 dark:text-gray-200">
                Selecciona el color identificador <span className="">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#e2f1f1] bg-[#f7fdfd] p-2 dark:border-gray-600 dark:bg-gray-700">
                {COLOR_PALETTE.map((c) => {
                  const selected = formik.values.color === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      title={c.label}
                      onClick={() => formik.setFieldValue("color", c.value)}
                      className="relative p-1"
                    >
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm transition-all hover:scale-105"
                        style={{
                          backgroundColor: c.value,
                          boxShadow: selected ? `0 0 0 2px white, 0 0 0 4px ${c.value}` : undefined,
                        }}
                      >
                        {selected && <Check className="h-4 w-4 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              {formik.errors.color && formik.touched.color && (
                <p className="mt-1.5 text-base text-gray-700 dark:text-gray-200">{formik.errors.color}</p>
              )}
            </section>
          </div>

          <AnimatePresence>
            {error && (
              <div className="col-span-full rounded-lg bg-black p-4 text-white shadow-lg">{error}</div>
            )}
          </AnimatePresence>
        </div>
      </FormModal>
    </>
  );
};

export default ModalCreateEvent;