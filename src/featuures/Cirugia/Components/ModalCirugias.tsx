//*Funciones y Hooks
import * as Yup from "yup";
import { format } from "date-fns";
import { useFormik } from "formik";
import { ICirugias } from "@/models/ICirugias";
import React, { useState, useMemo } from "react";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import useAnimation from "@/hooks/useAnimations";
import { AnimatePresence } from "framer-motion";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import { CreateCirugia } from "../Services/CreateCirugia";

//*Icons
import programar from "/assets/programar.svg";
import { useUpdateGroupService } from "../Hooks/useUpdateGroupService";

interface ModalCirugiasProps {
  data: ICirugias;
  idRadicado: number;
}

const ModalCirugias: React.FC<ModalCirugiasProps> = ({ data, idRadicado }) => {
  const [stadopen, setStadopen] = useState(false);
  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );

  // * hook para actualizar el grupo de servicios
  const {
    setGroupService,
    errorUpdate,
    SendGroupService,
  } = useUpdateGroupService(idRadicado);

  const handleUpdate = async () => {
    const success = await SendGroupService();
    if (success) {
      setStadopen(false);
      window.location.reload();
    }
  }

  const openModal = () => {
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    document.body.style.overflow = "";
    setStadopen(false);
  };
  if (stadopen) {
    openModal();
  }

  // hook para traer las ips remite

  const [submiting, setSubmiting] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState<string>("");
  const [success, setSuccess] = useState(false);
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
    fechaAnesteciologia: Yup.date().when([], {
      is:  data.idGrupoServicios === 9,
      then: (schema) =>
        schema.required("Campo requerido"),
      otherwise: (schema) => schema.optional(),
    }),
    fechaParaclinicos: Yup.date().when([], {
      is: data.idGrupoServicios === 9,
      then: (schema) =>
        schema.required("Campo requerido"),
      otherwise: (schema) => schema.optional(),
    }),
    especialista: Yup.string()
      .required("Campo requerido")
      .min(3, "El nombre del especialista debe tener al menos 3 caracteres")
      .max(255, "El nombre del especialista debe tener maximo 50 caracteres"),
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
          setSuccess(true);
          setTimeout(() => {
            setStadopen(false);
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

  // * funcion para formatear la fecha
  const formatDate = useMemo(
    () => (date: Date | null) => {
      return date ? format(date, "dd/MM/yyyy") : "N/A";
    },
    []
  );

  return (
    <>
      <button className="focus:outline-none" onClick={() => setStadopen(true)}>
        <img className="dark:invert" src={programar} alt="" />
      </button>

      {/* init-modal */}
      {stadopen && (
        <section
          className={` fixed z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 -inset-2 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section>
            <div
              className={` w-full max-w-6xl bg-white shadow-lg transform transition-transform duration-300 dark:bg-gray-800 overflow-hidden rounded ${
                showAnimation && !closing
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b-2 rounded-t-lg dark:bg-gray-800 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-white">
                  Programación Cirugía
                </h1>
                <button
                  onClick={closeModal}
                  className="text-lg text-gray-400 duration-200 rounded-lg hover:text-gray-900 hover:bg-gray-400 dark:text-gray-300 dark:hover:text-gray-800 w-7 h-7"
                >
                  &times;
                </button>
              </div>
              {/* validacion si el radicado ya tiene una cirugia programada se muestra el contenido del modal con normalidad de lo contrario se mostrara un error */}
              <div className="p-6 overflow-y-auto max-h-[80vh]">
                {data.programacionCirugia.length == 0 && (
                    <div className="w-[250px] mb-8">
                      <h5 className="mb-4 text-xl text-left text-blue-500 dark:text-white">
                        Grupo de servicios:
                      </h5>
                      <InputAutocompletado
                        label="Grupo Servicios"
                        onInputChanged={(id) => setGroupService(Number(id))}
                        apiRoute="grupo-servicios-name"
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

                      {data.idGrupoServicios === 9 && (
                        <div className="mb-6">
                          <h4 className="mb-4 text-lg text-blue-500 dark:text-white">
                            Validacion de requisitos para programacion
                          </h4>

                          <div className="space-y-4">
                            <label
                              htmlFor=""
                              className="flex items-center space-x-2"
                            >
                              <input
                                className="w-4 h-4"
                                type="checkbox"
                                checked={soporte}
                                onChange={(e) => setSoporte(e.target.checked)}
                              />
                              <span className="text-sm dark:text-gray-300">
                                1. Soportes completos (historia clínica, orden
                                de la cirugía).
                              </span>
                            </label>

                            <label
                              htmlFor=""
                              className="flex items-center space-x-2"
                            >
                              <input
                                className="w-4 h-4"
                                type="checkbox"
                                checked={paraclinicos}
                                onChange={(e) =>
                                  setParaclinicos(e.target.checked)
                                }
                              />
                              <span className="text-sm dark:text-gray-300">
                                2. Paraclínicos (resultados clínicos).
                              </span>
                            </label>

                            <label
                              htmlFor=""
                              className="flex items-center space-x-2"
                            >
                              <input
                                className="w-4 h-4"
                                checked={valoracion}
                                onChange={(e) =>
                                  setValoracion(e.target.checked)
                                }
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
                                    <h5 className="mb-2 text-base">
                                      Fecha de Orden
                                    </h5>
                                    <span className="ml-2 text-lg text-red-600">
                                      *
                                    </span>
                                  </div>
                                  <div>{formatDate(data.fechaOrden)}</div>
                                </label>
                              </div>

                              {/* Fecha Paraclinicos */}
                              <div className="">
                                <label
                                  htmlFor=""
                                  className="font-bold text-gray-700 dark:text-white"
                                >
                                  <div className="flex">
                                    <h5 className="mb-2 text-base">
                                      Fecha Paraclinicos
                                    </h5>
                                    <span className="ml-2 text-lg text-red-600">
                                      *
                                    </span>
                                  </div>
                                  <input
                                    type="date"
                                    id=""
                                    name="fechaParaclinicos"
                                    onChange={formik.handleChange}
                                    value={formik.values.fechaParaclinicos}
                                    onBlur={formik.handleBlur}
                                    disabled={data.idGrupoServicios === 6}
                                    className={` w-full px-3 py-2 mt-1 text-gray-700 border border-gray-200 rounded dark:border-gray-600 dark:text-white dark:bg-gray-800 ${
                                      formik.touched.fechaParaclinicos &&
                                      formik.errors.fechaParaclinicos
                                        ? "border-red-500 dark:border-red-500"
                                        : "border-gray-200 dark:border-gray-600"
                                    } w-full px-3 py-2 mt-1 text-gray-700 border-2 border-gray-200 rounded dark:text-white dark:bg-gray-800`}
                                  />
                                  <AnimatePresence>
                                    {formik.touched.fechaParaclinicos &&
                                    formik.errors.fechaParaclinicos ? (
                                      <ErrorMessage>
                                        {formik.errors.fechaParaclinicos}
                                      </ErrorMessage>
                                    ) : null}
                                  </AnimatePresence>
                                </label>
                              </div>

                              {/* Fecha Valoracion de Anestesiología */}
                              <div className="">
                                <label
                                  htmlFor=""
                                  className="font-bold text-gray-700 dark:text-white"
                                >
                                  <div className="flex">
                                    <h5 className="mb-2 text-base">
                                      Fecha V. Anestesiología
                                    </h5>
                                    <span className="ml-2 text-lg text-red-600">
                                      *
                                    </span>
                                  </div>
                                  <input
                                    type="date"
                                    id=""
                                    name="fechaAnesteciologia"
                                    onChange={formik.handleChange}
                                    value={formik.values.fechaAnesteciologia}
                                    onBlur={formik.handleBlur}
                                    disabled={data.idGrupoServicios === 6}
                                    className={` w-full px-3 py-2 mt-1 text-gray-700 border-2 border-gray-200 rounded dark:border-gray-600 dark:text-white dark:bg-gray-800 ${
                                      formik.touched.fechaAnesteciologia &&
                                      formik.errors.fechaAnesteciologia
                                        ? "border-red-500 dark:border-red-500"
                                        : "border-gray-200 dark:border-gray-600"
                                    }`}
                                  />
                                  <AnimatePresence>
                                    {formik.touched.fechaAnesteciologia &&
                                    formik.errors.fechaAnesteciologia ? (
                                      <ErrorMessage>
                                        {formik.errors.fechaAnesteciologia}
                                      </ErrorMessage>
                                    ) : null}
                                  </AnimatePresence>
                                </label>
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
                                  />
                                  <AnimatePresence>
                                    {formik.touched.ips && formik.errors.ips ? (
                                      <ErrorMessage>
                                        {formik.errors.ips}
                                      </ErrorMessage>
                                    ) : null}
                                  </AnimatePresence>
                                </div>

                                {/* Especialista */}
                                <div className="">
                                  <label
                                    htmlFor=""
                                    className="font-bold text-gray-700 dark:text-white"
                                  >
                                    <div className="flex">
                                      <h5 className="mb-2 text-base">
                                        Especialista:
                                      </h5>
                                      <span className="ml-2 text-lg text-red-600">
                                        *
                                      </span>
                                    </div>
                                    <input
                                      type="text"
                                      id=""
                                      name="especialista"
                                      onChange={formik.handleChange}
                                      value={formik.values.especialista}
                                      onBlur={formik.handleBlur}
                                      className={` w-full px-3 py-2 mt-1 text-gray-700 border-2 border-gray-200 rounded dark:border-gray-600 dark:text-white dark:bg-gray-800 ${
                                        formik.touched.especialista &&
                                        formik.errors.especialista
                                          ? "border-red-500 dark:border-red-500"
                                          : "border-gray-200 dark:border-gray-600"
                                      } w-full px-3 py-2 mt-1 text-gray-700 border rounded dark:text-white dark:bg-gray-800`}
                                    />
                                    <AnimatePresence>
                                      {formik.touched.especialista &&
                                      formik.errors.especialista ? (
                                        <ErrorMessage>
                                          {formik.errors.especialista}
                                        </ErrorMessage>
                                      ) : null}
                                    </AnimatePresence>
                                  </label>
                                </div>

                                <div className="">
                                  <label
                                    htmlFor=""
                                    className="font-bold text-gray-700 dark:text-white"
                                  >
                                    <div className="flex">
                                      <h5 className="mb-2 text-base">
                                        Fecha Cirugía:
                                      </h5>
                                      <span className="ml-2 text-lg text-red-600">
                                        *
                                      </span>
                                    </div>
                                    <input
                                      type="date"
                                      id=""
                                      name="fechaCirugia"
                                      onChange={formik.handleChange}
                                      value={formik.values.fechaCirugia}
                                      onBlur={formik.handleBlur}
                                      className={` w-full px-3 py-2 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                                        formik.touched.fechaCirugia &&
                                        formik.errors.fechaCirugia
                                          ? "border-red-500 dark:border-red-500"
                                          : "border-gray-200 dark:border-gray-600"
                                      }`}
                                    />
                                    <AnimatePresence>
                                      {formik.touched.fechaCirugia &&
                                      formik.errors.fechaCirugia ? (
                                        <ErrorMessage>
                                          {formik.errors.fechaCirugia}
                                        </ErrorMessage>
                                      ) : null}
                                    </AnimatePresence>
                                  </label>
                                </div>

                                {/* Hora programada */}
                                <div className="">
                                  <label
                                    htmlFor=""
                                    className="font-bold text-gray-700 dark:text-white"
                                  >
                                    <div className="flex">
                                      <h5 className="mb-2 text-base">
                                        Hora de Cirugía:
                                      </h5>
                                      <span className="ml-2 text-lg text-red-600">
                                        *
                                      </span>
                                    </div>
                                    <input
                                      type="time"
                                      id=""
                                      name="horaProgramada"
                                      onChange={formik.handleChange}
                                      value={formik.values.horaProgramada}
                                      onBlur={formik.handleBlur}
                                      className={` w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                                        formik.touched.horaProgramada &&
                                        formik.errors.horaProgramada
                                          ? "border-red-500 dark:border-red-500"
                                          : "border-gray-200 dark:border-gray-600"
                                      } w-full px-3 py-2 mt-1 text-gray-700 border-2 border-gray-200 rounded dark:text-white dark:bg-gray-800`}
                                    />
                                    <AnimatePresence>
                                      {formik.touched.horaProgramada &&
                                      formik.errors.horaProgramada ? (
                                        <ErrorMessage>
                                          {formik.errors.horaProgramada}
                                        </ErrorMessage>
                                      ) : null}
                                    </AnimatePresence>
                                  </label>
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
                          <button
                            className="w-24 h-12 text-white duration-200 border-2 rounded-md bg-color hover:bg-emerald-900 dark:bg-gray-900 dark:hover:bg-gray-700"
                            type="submit"
                            disabled={submiting}
                          >
                            <span className="text-base">
                              {submiting ? "Enviando..." : "Enviar"}
                            </span>
                          </button>
                          {errorSubmit && (
                            <div className="mt-2 text-red-500 dark:text-red-300">
                              {errorSubmit}
                            </div>
                          )}
                          {success && (
                            <div className="mt-2 text-red-500 dark:text-green-300">
                              Programacion exitosa!
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

              {/* container-footer */}
              <div className="flex items-center justify-end w-full px-4 py-4 text-sm font-semibold bg-gray-200 border-t-2 border-black shadow-md dark:border-white gap-x-2 h-14 dark:bg-gray-800">
                <button
                  className="w-24 h-8 text-blue-600 transition-colors duration-200 ease-in-out border-2 border-gray-400 rounded-md hover:text-red-500 hover:border-red-500 hover:bg-gray-100 active:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600 dark:active:bg-gray-500"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalCirugias;
