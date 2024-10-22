//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Cup } from "../../../models/ICirugias";
import useAnimation from "../../../hooks/useAnimations";
import InputAutocompletado from "../../InputAutocompletado";
import { createCirugia } from "../../../services/createCirugia";

//*Icons
import programar from "/assets/programar.svg";

interface ModalCirugiasProps {
  name: string;
  phonneNumber: string;
  email: string;
  landline: string;
  cups: Cup[];
  speciality: string;
  diagnostic: string;
  idGroupService: number;
  idRadicado: number;
  idCirugia: number[];
}

const ModalCirugias: React.FC<ModalCirugiasProps> = ({
  name,
  phonneNumber,
  email,
  landline,
  cups,
  speciality,
  diagnostic,
  idGroupService,
  idRadicado,
  idCirugia,
}) => {
  const [stadopen, setStadopen] = useState(false);
  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );

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
    if (idGroupService === 6) {
      setError("");
      setIsValidate(true);
      return;
    }

    if (idGroupService === 9) {
      console.log("entro a la segunda condicion");
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
    fechaOrdenamiento: Yup.date().required("Campo requerido"),
    ips: Yup.string().required("Campo requerido"),
    fechaCirugia: Yup.date().required("Campo requerido"),
    horaProgramada: Yup.string().required("Campo requerido"),
    observacion: Yup.string()
      .required("Campo requerido")
      .min(5, "La observacion debe tener al menos 5 caracteres")
      .max(150, "La observacion debe tener maximo 150 caracteres"),
  });

  const formik = useFormik({
    initialValues: {
      fechaOrdenamiento: "",
      ips: "",
      fechaCirugia: "",
      horaProgramada: "",
      observacion: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmiting(true);
      try {
        const formData = new FormData();

        formData.append("orderingDate", values.fechaOrdenamiento);
        formData.append("ipsRemite", values.ips);
        formData.append("surgeryDate", values.fechaCirugia);
        formData.append("scheduledTime", values.horaProgramada);
        formData.append("observation", values.observacion);
        formData.append("radicadoId", idRadicado.toString());

        const response = await createCirugia(formData);

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
                  Programacion Cirugia
                </h1>
                <button
                  onClick={() => setStadopen(false)}
                  className="text-lg text-gray-400 duration-200 rounded-lg hover:text-gray-900 hover:bg-gray-400 dark:text-gray-300 dark:hover:text-gray-800 w-7 h-7"
                >
                  &times;
                </button>
              </div>
              {/* validacion si el radicado ya tiene una cirugia programada se muestra el contenido del modal con normalidad de lo contrario se mostrara un error */}
              <div className="p-6 overflow-y-auto max-h-[80vh]">
                {idCirugia.length == 0 ? (
                  // validacion de datos del paciente para programacion
                  <div className="">
                    <div>
                      <h5 className="mb-4 text-xl text-left text-blue-500 dark:text-white">
                        Datos del Paciente:
                      </h5>
                      <table className="w-full mb-12 text-sm border-collapse">
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
                            <td className="p-2">{name}</td>
                            <td className="p-2">{landline}</td>
                            <td className="p-2">{phonneNumber}</td>
                            <td className="p-2">{email}</td>
                            <td className="p-2">{speciality}</td>
                            <td className="p-2">{diagnostic}</td>
                          </tr>
                        </tbody>
                      </table>

                      <h5 className="mb-4 text-xl text-left text-blue-500 dark:text-white">
                        CUPS del radicado:
                      </h5>

                      <table className="w-full mb-12 text-sm border-collapse">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                          <tr>
                            <th className="p-2">Codigo</th>
                            <th className="p-2">Descripcion</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cups.map((cup) => (
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

                      {idGroupService === 9 && (
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
                                2. Preclínicos (resultados clínicos).
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
                                3. Valoracion para anestesiologia.
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

                    {idGroupService === 6 || isValidate ? (
                      // formulario de programacion de cirugias
                      <form
                        onSubmit={formik.handleSubmit}
                        className="max-h-[70Vh] overflow-y-auto p-5 bg-white dark:bg-gray-800 rounded-lg"
                      >
                        <div className="grid grid-cols-2 gap-10">
                          <div className="">
                            <div>
                              <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
                                Información Cirugía
                              </h5>
                            </div>

                            <section className="grid grid-cols-2 text-sm gap-y-12 gap-x-4">
                              <div className="">
                                <label
                                  htmlFor=""
                                  className="font-bold text-gray-700 dark:text-white"
                                >
                                  <div className="flex">
                                    <h5 className="mb-2 text-base">
                                      Fecha Ordenamiento de Cirugía
                                    </h5>
                                    <span className="ml-2 text-lg text-red-600">
                                      *
                                    </span>
                                  </div>
                                  <input
                                    type="date"
                                    id=""
                                    name="fechaOrdenamiento"
                                    onChange={formik.handleChange}
                                    value={formik.values.fechaOrdenamiento}
                                    onBlur={formik.handleBlur}
                                    className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-200 rounded dark:border-gray-600 dark:text-white dark:bg-gray-800"
                                  />
                                  {formik.touched.fechaOrdenamiento &&
                                  formik.errors.fechaOrdenamiento ? (
                                    <div className="mt-1 text-red-600">
                                      {formik.errors.fechaOrdenamiento}
                                    </div>
                                  ) : null}
                                </label>
                              </div>
                              {/* IPS Remite */}
                              <div className="">
                                <InputAutocompletado
                                  label="IPS Remite Cirugía"
                                  onInputChanged={(value) =>
                                    formik.setFieldValue("ips", value)
                                  }
                                  apiRoute="ips-remite-name"
                                />
                                {formik.touched.ips && formik.errors.ips ? (
                                  <div className="mt-1 text-red-600">
                                    {formik.errors.ips}
                                  </div>
                                ) : null}
                              </div>

                              {/* Fecha Cirugia */}

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
                                    className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                                  />
                                  {formik.touched.fechaCirugia &&
                                  formik.errors.fechaCirugia ? (
                                    <div className="text-red-600">
                                      {formik.errors.fechaCirugia}
                                    </div>
                                  ) : null}
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
                                      Hora Programada:
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
                                    className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                                  />
                                  {formik.touched.horaProgramada &&
                                  formik.errors.horaProgramada ? (
                                    <div className="mt-1 text-red-600">
                                      {formik.errors.horaProgramada}
                                    </div>
                                  ) : null}
                                </label>
                              </div>
                            </section>
                          </div>

                          {/* Sección Observación */}
                          <div>
                            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
                              Observación:
                            </h5>
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
                                className="w-full h-40 px-3 py-2 mt-1 text-gray-700 border border-gray-200 rounded dark:border-gray-600 dark:text-white dark:bg-gray-800"
                              ></textarea>
                              {formik.touched.observacion &&
                                formik.errors.observacion && (
                                  <div className="mt-1 text-base text-red-500 dark:text-red-400">
                                    {formik.errors.observacion}
                                  </div>
                                )}
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
                  onClick={() => setStadopen(false)}
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
