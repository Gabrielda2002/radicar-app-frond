//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import { ICirugias } from "@/models/ICirugias";
import React, { useState } from "react";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import Input from "@/components/common/Ui/Input";

//*Icons
import programar from "/assets/programar.svg";
import { useMutationSurgery } from "../Hooks/useMutationSurgery";
import { FormatDate } from "@/utils/FormatDate";
import { toast } from "react-toastify";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import Button from "@/components/common/Ui/Button";
import ModalProfessional from "@/components/common/Modals/ModalProfessinal/ModalProfessional";
import { AnimatePresence } from "framer-motion";

interface ModalCirugiasProps {
  data: ICirugias;
  idRadicado: number;
  onSuccess?: () => void;
}

const ModalCirugias: React.FC<ModalCirugiasProps> = ({ data, idRadicado, onSuccess }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // * hook para actualizar el grupo de servicios
  const { createSurgery, updateGroupService, error: errorMutation, isLoading } =
    useMutationSurgery();

  const [isValidate, setIsValidate] = useState(false);
  const [soporte, setSoporte] = useState(false);
  const [paraclinicos, setParaclinicos] = useState(false);
  const [valoracion, setValoracion] = useState(false);
  const [error, setError] = useState<string>("");

  const [groupServiceId, setGroupServiceId] = useState<number>(data.idGrupoServicios);

  const handleUpdateGroupService = async () => {
    await updateGroupService(groupServiceId, idRadicado, () => {
      toast.success("Grupo de servicios actualizado con éxito");
      onSuccess?.();
    });
  }

  const handleValidation = () => {
    if (data.idGrupoServicios === 6) {
      setError("");
      setIsValidate(true);
      return;
    }

    if (data.idGrupoServicios === 9) {
      if (soporte && paraclinicos && valoracion) {
        setIsValidate(true);
        setError("");
      } else {
        setError(
          "El paciente no cuenta con todos los requisitos para la programacion."
        );
      }
    }
  };

  const validationSchema = Yup.object({
    ipsRemite: Yup.string().required("Campo requerido"),
    surgeryDate: Yup.date().required("Campo requerido"),
    scheduledTime: Yup.string().required("Campo requerido"),
    observation: Yup.string()
      .required("Campo requerido")
      .min(5, "La observacion debe tener al menos 5 caracteres")
      .max(150, "La observacion debe tener maximo 150 caracteres"),
    anesthesiologyDate: Yup.date().when("$idGrupoServicios", {
      is: 9,
      then: (schema) => schema.required("Campo requerido"),
      otherwise: (schema) => schema.optional(),
    }),
    paraclinicalDate: Yup.date().when("$idGrupoServicios", {
      is: 9,
      then: (schema) => schema.required("Campo requerido"),
      otherwise: (schema) => schema.optional(),
    }),
    specialist: Yup.string().required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      ipsRemite: "",
      surgeryDate: "",
      scheduledTime: "",
      observation: "",
      anesthesiologyDate: "",
      paraclinicalDate: "",
      specialist: "",
      radicadoId: idRadicado
    },
    validationSchema,
    onSubmit: async (values) => {
      await createSurgery(
        values, () => {
          toast.success("Cirugía programada con éxito");
          formik.resetForm();
          onSuccess?.()
        }
      )
    },
  });

  return (
    <>
      <Button
        icon={<img className="h-10 dark:invert w-7" src={programar} alt="" />}
        onClick={() => setIsOpen(true)}
        type="button"
        variant="any"
        size="xs"
      ></Button>

      {/* validacion si el radicado ya tiene una cirugia programada se muestra el contenido del modal con normalidad de lo contrario se mostrara un error */}
      <ModalDefault
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Programar Cirugía"
        footerVariant="default"
        size="lg"
      >
        <div className="p-6">
          {data.programacionCirugia.length == 0 && (
            <div className="flex flex-wrap items-center justify-between mb-6">
              <InputAutocompletado
                label="Grupo Servicios"
                onInputChanged={(id) => setGroupServiceId(Number(id))}
                apiRoute="grupo-servicios-name"
                placeholder="Ej: Cirugía Ambulatoria"
                helpText="Cambia el grupo de servicios si es necesario. No es obligatorio llenar este campo para programar la cirugía."
              />
              <Button
                variant="secondary"
                onClick={handleUpdateGroupService}
                className="mt-4"
              >
                Actualizar
              </Button>
              {errorMutation && (
                <div className="mt-2 text-red-500 dark:text-red-300">
                  {errorMutation}
                </div>
              )}
            </div>
          )}
          {/* datos paciente a programar */}
          {data.programacionCirugia.length == 0 ? (
            // validacion de datos del paciente para programacion
            <div className="">
              <div>
                <h5 className="mb-4 text-xl text-left text-blue-500 dark:text-white">
                  Datos del Paciente:
                </h5>
                <table className="w-full mb-8 text-sm border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="p-2">Nombre</th>
                      <th className="p-2">Telefono Fijo</th>
                      <th className="p-2">Celular</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Especialidad</th>
                      <th className="p-2">Diagnostico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center border-t dark:border-gray-600">
                      <td className="p-2">{data.nombrePaciente}</td>
                      <td className="p-2">{data.telefonoFijo}</td>
                      <td className="p-2">{data.numeroPaciente}</td>
                      <td className="p-2">{data.email}</td>
                      <td className="p-2">{data.especialidad}</td>
                      <td className="p-2">{data.diagnostico}</td>
                    </tr>
                  </tbody>
                </table>

                <h5 className="mb-4 text-xl text-left text-blue-500 dark:text-white">
                  CUPS del radicado:
                </h5>

                <table className="w-full mb-8 text-sm border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="p-2">Codigo</th>
                      <th className="p-2">Descripcion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.cups.map((cup) => (
                      <tr
                        key={cup.id}
                        className="text-center border-t dark:border-gray-600"
                      >
                        <td className="p-2">{cup.code}</td>
                        <td className="p-2">{cup.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* validar soportes antes de programar para grupo de servicios 9 */}
                {data.idGrupoServicios === 9 && (
                  <div className="mb-6">
                    <h4 className="mb-4 text-lg text-blue-500 dark:text-white">
                      Validacion de requisitos para programacion
                    </h4>

                    <div className="space-y-4">
                      <label htmlFor="" className="flex items-center space-x-2">
                        <Input
                          variant="checkbox"
                          className="w-4 h-4"
                          type="checkbox"
                          checked={soporte}
                          onChange={(e) => setSoporte(e.target.checked)}
                        />
                        <span className="text-sm dark:text-gray-300">
                          1. Soportes completos (historia clínica, orden de la
                          cirugía).
                        </span>
                      </label>

                      <label htmlFor="" className="flex items-center space-x-2">
                        <Input
                          variant="checkbox"
                          className="w-4 h-4"
                          type="checkbox"
                          checked={paraclinicos}
                          onChange={(e) => setParaclinicos(e.target.checked)}
                        />
                        <span className="text-sm dark:text-gray-300">
                          2. Paraclínicos (resultados clínicos).
                        </span>
                      </label>

                      <label htmlFor="" className="flex items-center space-x-2">
                        <Input
                          variant="checkbox"
                          className="w-4 h-4"
                          checked={valoracion}
                          onChange={(e) => setValoracion(e.target.checked)}
                          type="checkbox"
                        />
                        <span className="text-sm dark:text-gray-300">
                          3. Valoracion para anestesiología.
                        </span>
                      </label>

                      {!isValidate && (
                        <div>
                          <Button
                            variant="secondary"
                            onClick={handleValidation}
                          >
                            <span className="text-base">Siguiente</span>
                          </Button>
                        </div>
                      )}
                      {error && (
                        <span className="text-lg text-red-500 dark:text-red-400">
                          {error}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* form cirugias grupo de servicios 6 y ya esten validados los soportes */}
              {data.idGrupoServicios === 6 || isValidate ? (
                // formulario de programacion de cirugias
                <form
                  onSubmit={formik.handleSubmit}
                  className="max-h-[70Vh] overflow-y-auto p-5 bg-white dark:bg-gray-800 rounded-lg border-2"
                >
                  <div className="grid grid-cols-1 gap-8">
                    <div className="">
                      <div>
                        <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
                          Información Pre Quirúrgica:
                        </h5>
                      </div>

                      <section className="grid grid-cols-3 text-sm gap-y-8 gap-x-4">
                        {/* Fecha Ordenamiento */}
                        <div className="">
                          <label
                            htmlFor=""
                            className="font-bold text-gray-700 dark:text-white"
                          >
                            <div className="flex">
                              <h5 className="mb-2 text-base">Fecha de Orden</h5>
                              <span className="ml-2 text-lg text-red-600">
                                *
                              </span>
                            </div>
                            <div>{FormatDate(data.fechaOrden, false)}</div>
                          </label>
                        </div>

                        {/* Fecha Paraclinicos */}
                        <div className="">
                          <Input
                            type="date"
                            name="paraclinicalDate"
                            onChange={formik.handleChange}
                            value={formik.values.paraclinicalDate}
                            onBlur={formik.handleBlur}
                            disabled={data.idGrupoServicios === 6}
                            label="Fecha Paraclinicos"
                            required={true}
                            touched={formik.touched.paraclinicalDate}
                            error={formik.errors.paraclinicalDate}
                          />
                        </div>

                        {/* Fecha Valoracion de Anestesiología */}
                        <div className="">
                          <Input
                            type="date"
                            name="anesthesiologyDate"
                            onChange={formik.handleChange}
                            value={formik.values.anesthesiologyDate}
                            onBlur={formik.handleBlur}
                            disabled={data.idGrupoServicios === 6}
                            label="Fecha V. Anestesiología"
                            required={true}
                            touched={formik.touched.anesthesiologyDate}
                            error={formik.errors.anesthesiologyDate}
                          />
                        </div>
                      </section>
                    </div>

                    {/* Sección Observación */}
                    <div className="grid grid-cols-1">
                      <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
                        Información Cirugía:
                      </h5>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="grid grid-cols-2 gap-8">
                          {/* Lugar Cirugia */}
                          <div className="">
                            <InputAutocompletado
                              label="Lugar de Cirugía"
                              onInputChanged={(value) =>
                                formik.setFieldValue("ipsRemite", value)
                              }
                              apiRoute="ips-remite-name"
                              placeholder="Ej: Hospital San Juan"
                              error={
                                formik.touched.ipsRemite && formik.errors.ipsRemite
                                  ? formik.errors.ipsRemite
                                  : undefined
                              }
                              touched={formik.touched.ipsRemite}
                              required={true}
                            />
                          </div>

                          {/* Especialista */}
                          <div className="">
                            <InputAutocompletado
                              label="Especialista"
                              apiRoute="profesionales/buscar"
                              error={
                                formik.touched.specialist
                                  ? formik.errors.specialist
                                  : undefined
                              }
                              onInputChanged={(value) =>
                                formik.setFieldValue("specialist", value)
                              }
                              touched={formik.touched.specialist}
                              required={true}
                              placeholder="Digite nombre del profesional..."
                              helpText={`¿No encuentras el profesional?`}
                            />
                            <ModalProfessional />
                          </div>

                          <div className="">
                            <Input
                              type="date"
                              name="surgeryDate"
                              onChange={formik.handleChange}
                              value={formik.values.surgeryDate}
                              onBlur={formik.handleBlur}
                              label="Fecha Cirugía"
                              required={true}
                              touched={formik.touched.surgeryDate}
                              error={formik.errors.surgeryDate}
                            />
                          </div>

                          {/* Hora programada */}
                          <div className="">
                            <Input
                              type="time"
                              name="scheduledTime"
                              onChange={formik.handleChange}
                              value={formik.values.scheduledTime}
                              onBlur={formik.handleBlur}
                              label="Hora de Cirugía"
                              required={true}
                              touched={formik.touched.scheduledTime}
                              error={formik.errors.scheduledTime}
                            />
                          </div>
                        </div>
                        <div>
                          <Input
                            label="Observación"
                            name="observation"
                            onChange={formik.handleChange}
                            value={formik.values.observation}
                            onBlur={formik.handleBlur}
                            error={
                              formik.errors.observation &&
                                formik.touched.observation
                                ? formik.errors.observation
                                : undefined
                            }
                            touched={formik.touched.observation}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Boton de Envio */}

                  <div className="mt-6">
                    <Button
                      variant="primary"
                      type="submit"
                      isLoading={isLoading || formik.isSubmitting}
                    >
                      <span className="text-base">Programar</span>
                    </Button>
                    <AnimatePresence>
                      {errorMutation && (
                        <div>
                          <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                            {errorMutation}
                          </div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              ) : null}
            </div>
          ) : (
            <div className="text-red-500 dark:text-red-300">
              Ya se programo una cirugia a este radicado.
            </div>
          )}
        </div>
      </ModalDefault>
    </>
  );
};

export default ModalCirugias;
