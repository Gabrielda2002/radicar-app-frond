//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import { ICirugias } from "@/models/ICirugias";
import React, { useState } from "react";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import { AnimatePresence } from "framer-motion";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import { CreateCirugia } from "../Services/CreateCirugia";
import Input from "@/components/common/Ui/Input";

//*Icons
import programar from "/assets/programar.svg";
import { useUpdateGroupService } from "../Hooks/useUpdateGroupService";
import { FormatDate } from "@/utils/FormatDate";
import { Bounce, toast } from "react-toastify";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import Button from "@/components/common/Ui/Button";
import ModalProfessional from "@/components/common/Modals/ModalProfessinal/ModalProfessional";

interface ModalCirugiasProps {
  data: ICirugias;
  idRadicado: number;
}

const ModalCirugias: React.FC<ModalCirugiasProps> = ({ data, idRadicado }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // * hook para actualizar el grupo de servicios
  const { setGroupService, errorUpdate, SendGroupService } =
    useUpdateGroupService(idRadicado);

  const handleUpdate = async () => {
    const response = await SendGroupService();
    if (response) {
      setTimeout(() => {
        setIsOpen(false);
        window.location.reload();
      }, 3000);
    }
  };

  // hook para traer las ips remite

  const [submiting, setSubmiting] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState<string>("");
  const [isValidate, setIsValidate] = useState(false);
  const [soporte, setSoporte] = useState(false);
  const [paraclinicos, setParaclinicos] = useState(false);
  const [valoracion, setValoracion] = useState(false);
  const [error, setError] = useState<string>("");

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
    ips: Yup.string().required("Campo requerido"),
    fechaCirugia: Yup.date().required("Campo requerido"),
    horaProgramada: Yup.string().required("Campo requerido"),
    observacion: Yup.string()
      .required("Campo requerido")
      .min(5, "La observacion debe tener al menos 5 caracteres")
      .max(150, "La observacion debe tener maximo 150 caracteres"),
    fechaAnesteciologia: Yup.date().when("$idGrupoServicios", {
      is: 9,
      then: (schema) => schema.required("Campo requerido"),
      otherwise: (schema) => schema.optional(),
    }),
    fechaParaclinicos: Yup.date().when("$idGrupoServicios", {
      is: 9,
      then: (schema) => schema.required("Campo requerido"),
      otherwise: (schema) => schema.optional(),
    }),
    especialista: Yup.string()
      .required("Campo requerido")
  });

  const formik = useFormik({
    initialValues: {
      ips: "",
      fechaCirugia: "",
      horaProgramada: "",
      observacion: "",
      fechaAnesteciologia: "",
      fechaParaclinicos: "",
      especialista: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmiting(true);
      try {
        const formData = new FormData();

        formData.append("ipsRemite", values.ips);
        formData.append("surgeryDate", values.fechaCirugia);
        formData.append("scheduledTime", values.horaProgramada);
        formData.append("observation", values.observacion);
        formData.append("radicadoId", data.id.toString());
        formData.append("specialist", values.especialista);
        formData.append("anesthesiologyDate", values.fechaAnesteciologia);
        formData.append("paraclinicalDate", values.fechaParaclinicos);

        const response = await CreateCirugia(formData);

        if (response?.status === 200 || response?.status === 201) {
          toast.success("Cirugia Programada exitosamente.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          setTimeout(() => {
            setIsOpen(false);
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        setErrorSubmit("Error al programar la cirugia, intente nuevamente.");
        console.log(error);
      }
      setSubmiting(false);
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
            <div className="w-[250px] mb-8">
              <h5 className="mb-4 text-xl text-left text-blue-500 dark:text-white">
                Grupo de servicios:
              </h5>
              <InputAutocompletado
                label="Grupo Servicios"
                onInputChanged={(id) => setGroupService(Number(id))}
                apiRoute="grupo-servicios-name"
                placeholder="Ej: Cirugía Ambulatoria"
              />
              <button
                type="button"
                onClick={handleUpdate}
                className="w-24 h-12 text-white duration-200 border-2 rounded-md bg-color hover:bg-emerald-900 dark:bg-gray-900 dark:hover:bg-gray-700"
              >
                Actualizar
              </button>
              {errorUpdate && (
                <div className="mt-2 text-red-500 dark:text-red-300">
                  {errorUpdate}
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
                        <input
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
                        <input
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
                        <input
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
                          <button
                            onClick={handleValidation}
                            className="w-24 h-12 mb-8 text-white duration-200 rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-700"
                          >
                            <span className="text-base">Siguiente</span>
                          </button>
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
                            name="fechaParaclinicos"
                            onChange={formik.handleChange}
                            value={formik.values.fechaParaclinicos}
                            onBlur={formik.handleBlur}
                            disabled={data.idGrupoServicios === 6}
                            label="Fecha Paraclinicos"
                            required={true}
                            touched={formik.touched.fechaParaclinicos}
                            error={formik.errors.fechaParaclinicos}
                          />
                        </div>

                        {/* Fecha Valoracion de Anestesiología */}
                        <div className="">
                          <Input
                            type="date"
                            name="fechaAnesteciologia"
                            onChange={formik.handleChange}
                            value={formik.values.fechaAnesteciologia}
                            onBlur={formik.handleBlur}
                            disabled={data.idGrupoServicios === 6}
                            label="Fecha V. Anestesiología"
                            required={true}
                            touched={formik.touched.fechaAnesteciologia}
                            error={formik.errors.fechaAnesteciologia}
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
                                formik.setFieldValue("ips", value)
                              }
                              apiRoute="ips-remite-name"
                              placeholder="Ej: Hospital San Juan"
                              error={
                                formik.touched.ips && formik.errors.ips
                                  ? formik.errors.ips
                                  : undefined
                              }
                              touched={formik.touched.ips}
                              required={true}
                            />
                            <AnimatePresence>
                              {formik.touched.ips && formik.errors.ips ? (
                                <ErrorMessage>{formik.errors.ips}</ErrorMessage>
                              ) : null}
                            </AnimatePresence>
                          </div>

                          {/* Especialista */}
                          <div className="">
                            <InputAutocompletado
                              label="Especialista"
                              apiRoute="profesionales/buscar"
                              error={
                                formik.touched.especialista
                                  ? formik.errors.especialista
                                  : undefined
                              }
                              onInputChanged={(value) =>
                                formik.setFieldValue("especialista", value)
                              }
                              touched={formik.touched.especialista}
                              required={true}
                              placeholder="Digite nombre del profesional..."
                              helpText={`¿No encuentras el profesional?`}
                            />
                            <ModalProfessional />
                          </div>

                          <div className="">
                            <Input
                              type="date"
                              name="fechaCirugia"
                              onChange={formik.handleChange}
                              value={formik.values.fechaCirugia}
                              onBlur={formik.handleBlur}
                              label="Fecha Cirugía"
                              required={true}
                              touched={formik.touched.fechaCirugia}
                              error={formik.errors.fechaCirugia}
                            />
                          </div>

                          {/* Hora programada */}
                          <div className="">
                            <Input
                              type="time"
                              name="horaProgramada"
                              onChange={formik.handleChange}
                              value={formik.values.horaProgramada}
                              onBlur={formik.handleBlur}
                              label="Hora de Cirugía"
                              required={true}
                              touched={formik.touched.horaProgramada}
                              error={formik.errors.horaProgramada}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-bold text-gray-700 dark:text-white">
                            <div className="flex">
                              <h5 className="text-base">Observación:</h5>
                              <span className="ml-2 text-lg text-red-600">
                                *
                              </span>
                            </div>
                          </label>
                          <textarea
                            name="observacion"
                            onChange={formik.handleChange}
                            value={formik.values.observacion}
                            onBlur={formik.handleBlur}
                            className={` w-full h-40 px-3 py-2 mt-1 text-gray-700 border-2 border-gray-200 rounded dark:border-gray-600 dark:text-white dark:bg-gray-800 ${
                              formik.touched.observacion &&
                              formik.errors.observacion
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            } `}
                          ></textarea>
                          <AnimatePresence>
                            {formik.touched.observacion &&
                              formik.errors.observacion && (
                                <ErrorMessage>
                                  {formik.errors.observacion}
                                </ErrorMessage>
                              )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Boton de Envio */}

                  <div className="mt-6">
                    <Button
                      variant="primary"
                      type="submit"
                      isLoading={submiting}
                    >
                      <span className="text-base">Programar</span>
                    </Button>
                    {errorSubmit && (
                      <div className="mt-2 text-red-500 dark:text-red-300">
                        {errorSubmit}
                      </div>
                    )}
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
