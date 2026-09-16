import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  Edit3,
  Trash2,
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
import { useEventForm } from "../hooks/useEventForm";
import { COLOR_PALETTE, rolesCanManage } from "../utils/eventConstants";
import EventReadView from "./EventReadView";
import TimeSelect from "./TimeSelect";
import Textarea from "@/components/common/Ui/Textarea";

interface ModalCreateEventProps {
  initialData?: IEventos;
  autoOpen?: boolean;
  hideTrigger?: boolean;
  mode?: "form" | "view";
  onSaved?: () => void;
  onClosed?: () => void;
}

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
  const { remove, error, isLoading } = useStoreEvent();
  const { rol } = useAuth();
  const canManageRole = rolesCanManage.includes(Number(rol));

  const { formik, isEditing, fieldProps, duracion } = useEventForm({
    initialData,
    onSuccess: () => {
      setIsOpen(false);
      onSaved?.();
    },
  });

  useEffect(() => {
    if (autoOpen) setIsOpen(true);
  }, [autoOpen]);

  useEffect(() => {
    setViewMode(mode === "view");
  }, [mode, initialData?.id]);

  useBlockScroll(isOpen);

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

  if (mode === "form" && !canManageRole) return null;

  if (viewMode && initialData) {
    const footerExtra = canManageRole ? (
      <>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setViewMode(false)}
          icon={<Edit3 className="h-4 w-4" />}
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
      >
        <div className="grid grid-cols-1 gap-6 bg-linear-to-b from-[#fbffff] to-white p-2 sm:p-5 lg:grid-cols-12 dark:from-gray-800 dark:to-gray-800">
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
                  <Input type="text" label="Titulo" required {...fieldProps("title")} />
                </div>

                <div>
                  <Input label="Lugar" type="text" required {...fieldProps("place")} />
                </div>

                <div>
                  <Textarea showCharCount maxLength={300} label="Descripción" required {...fieldProps("description")} />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#d8eeee] bg-white p-5 shadow-sm dark:border-gray-600 dark:bg-gray-800">
              <div className="mb-4 flex items-center gap-2 border-b border-[#e2f1f1] pb-3 text-base font-semibold uppercase tracking-wider text-[#008d93] dark:border-gray-600">
                <Clock3 className="h-4 w-4" />
                <span>Fechas y Horario</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input type="date" label="Fecha de inicio:" required {...fieldProps("dateStart")} />
                <Input type="date" label="Fecha de fin:" required {...fieldProps("dateEnd")} />
                <TimeSelect
                  label="Hora de inicio:"
                  required
                  value={formik.values.timeStart}
                  onChange={(val) => formik.setFieldValue("timeStart", val)}
                  onBlur={() => formik.setFieldTouched("timeStart", true)}
                  error={formik.errors.timeStart}
                  touched={formik.touched.timeStart}
                />
                <TimeSelect
                  label="Hora de fin:"
                  required
                  value={formik.values.timeEnd}
                  onChange={(val) => formik.setFieldValue("timeEnd", val)}
                  onBlur={() => formik.setFieldTouched("timeEnd", true)}
                  error={formik.errors.timeEnd}
                  touched={formik.touched.timeEnd}
                />
              </div>

              <div className="mt-3 flex items-center justify-between px-1 text-[15px] text-gray-400">
                <span>Zona horaria: GMT-5</span>
                {duracion && <span className="font-medium text-[#008d93]">Duración: {duracion}</span>}
              </div>
            </section>
          </div>

          <div className="space-y-5 lg:col-span-5">
            {/* <section className="rounded-2xl border border-[#d8eeee] bg-white p-5 shadow-sm dark:border-gray-600 dark:bg-gray-800">
              <div className="mb-4 flex items-center gap-2 border-b border-[#e2f1f1] pb-3 text-base font-semibold uppercase tracking-wider text-[#008d93] dark:border-gray-600">
                <UserRound className="h-4 w-4" />
                <span>Responsable / Anfitrión</span>
              </div> */}
              {/* <div className="space-y-4">
                <Input type="text" label="Nombre:" placeholder="Ej. Ana Perez" required {...fieldProps("responsableNombre")} />
                <Input type="email" label="Correo corporativo:" placeholder="correo@empresa.com" required {...fieldProps("responsableCorreo")} />
              </div> */}
            {/* </section> */}

            <section className="rounded-2xl border border-[#d8eeee] bg-white p-5 shadow-sm dark:border-gray-600 dark:bg-gray-800">
              <div className="mb-4 flex items-center gap-2 border-b border-[#e2f1f1] pb-3 text-base font-semibold uppercase tracking-wider text-[#008d93] dark:border-gray-600">
                <Check className="h-4 w-4" />
                <span>Color en Calendario</span>
              </div>
              <label className="mb-2.5 block text-base font-semibold text-gray-700 dark:text-gray-200">
                Selecciona el color identificador <span className="ml-2 text-red-600 after:content-['*']"></span>
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
                        {selected && <Check className="h-4 w-4 stroke-3" />}
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