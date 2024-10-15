//*Funciones y Hooks
import React, { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import * as Yup from "yup";

//*Icons
import programar from "/assets/programar.svg";
import { Cup } from "../../../models/ICirugias";
import InputAutocompletado from "../../InputAutocompletado";
import { useFormik } from "formik";
import { createCirugia } from "../../../services/createCirugia";

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
          className={` fixed z-50 flex justify-center pt-14 transition-opacity duration-300 bg-black bg-opacity-50 -inset-2 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section>
            <div
              className={` w-auto bg-white shadow-lg transform transition-transform duration-300  dark:bg-gray-800 overflow-hidden rounded ${
                showAnimation && !closing
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between px-2 py-2 dark:bg-gray-800">
                <h1 className="text-xl font-semibold text-color dark:text-gray-200  ">
                  Programacion Cirugia
                </h1>
                <button
                  onClick={() => setStadopen(false)}
                  className="text-xl text-gray-500 hover-gray-700 pr-2"
                >
                  &times;
                </button>
              </div>
              {/* validacion si el radicado ya tiene una cirugia programada se muestra el contenido del modal con normalidad de lo contrario se mostrara un error */}
              {idCirugia.length == 0 ? (
                // validacion de datos del paciente para programacion
                <div>
                  <div>
                    <h5>Datos del Paciente</h5>
                    <table className="">
                      <thead>
                        <tr>
                          <td>Nombre</td>
                          <td>Telefono Fijo</td>
                          <td>Celular</td>
                          <td>Email</td>
                          <td>Especialidad</td>
                          <td>Diagnostico</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{name}</td>
                          <td>{landline}</td>
                          <td>{phonneNumber}</td>
                          <td>{email}</td>
                          <td>{speciality}</td>
                          <td>{diagnostic}</td>
                        </tr>
                      </tbody>
                    </table>

                    <h5>CUPS del radicado</h5>

                    <table>
                      <thead>
                        <tr>
                          <th>Codigo</th>
                          <th>Descripcion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cups.map((cup) => (
                          <tr key={cup.id}>
                            <td>{cup.code}</td>
                            <td>{cup.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {idGroupService === 9 && (
                      <div>
                        <h4>Validacion de requisitos para programacion</h4>

                        <label htmlFor="">
                          <input
                            type="checkbox"
                            checked={soporte}
                            onChange={(e) => setSoporte(e.target.checked)}
                          />
                          1. Soportes completos (historia clínica, orden de la
                          cirugía).
                        </label>
                        <label htmlFor="">
                          <input
                            type="checkbox"
                            checked={paraclinicos}
                            onChange={(e) => setParaclinicos(e.target.checked)}
                          />
                          2. Preclínicos (resultados clínicos).
                        </label>
                        <label htmlFor="">
                          <input
                            checked={valoracion}
                            onChange={(e) => setValoracion(e.target.checked)}
                            type="checkbox"
                          />
                          3. Valoracion para anestesiologia.
                        </label>
                        {!isValidate && (
                        <div>
                          <button
                            onClick={handleValidation}
                            className="w-20 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover-gray-600  dark:hover:bg-gray-700"
                          >
                            Siguiente
                          </button>
                        </div>
                        ) }
                        {error && (
                          <div className="text-red-500 dark:text-red-300">
                            {error}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {idGroupService === 6 || isValidate ? (
                    // formulario de programacion de cirugias
                    <form
                      onSubmit={formik.handleSubmit}
                      className="max-h-[70Vh] overflow-y-auto dark:bg-gray-800"
                    >
                      <div className="px-5">
                        <div>
                          <h5 className="flex mb-2 text-xl font-normal text-blue-500 dark:text-gray-200">
                            Información Cirugía
                          </h5>
                        </div>

                        <section className="grid grid-cols-2 mb-6 gap-x-20 gap-y-4 ms-2 text-sm">
                          <div className="">
                            <label htmlFor="">
                              <span className="flex mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                                Fecha Ordenamiento de Cirugía
                              </span>
                              <input
                                type="date"
                                id=""
                                name="fechaOrdenamiento"
                                onChange={formik.handleChange}
                                value={formik.values.fechaOrdenamiento}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                              />
                              {formik.touched.fechaOrdenamiento &&
                              formik.errors.fechaOrdenamiento ? (
                                <div className="text-red-600">
                                  {formik.errors.fechaOrdenamiento}
                                </div>
                              ) : null}
                            </label>
                          </div>
                          <div className="">
                            <InputAutocompletado
                              label="IPS Remite"
                              onInputChanged={(value) =>
                                formik.setFieldValue("ips", value)
                              }
                              apiRoute="ips-remite-name"
                            />
                            {formik.touched.ips && formik.errors.ips ? (
                              <div className="text-red-600">
                                {formik.errors.ips}
                              </div>
                            ) : null}
                          </div>
                          <div className="">
                            <label htmlFor="">
                              <span className=" flex mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                                Fecha Cirugía
                              </span>
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
                          <div className="">
                            <label htmlFor="">
                              <span className=" flex mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                                Hora Programada
                              </span>
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
                                <div className="text-red-600">
                                  {formik.errors.horaProgramada}
                                </div>
                              ) : null}
                            </label>
                          </div>
                        </section>

                        <div>
                          <h5 className="flex mb-2 text-xl font-normal text-blue-500 dark:text-gray-200">
                            Observacion
                          </h5>
                        </div>

                        <section className="flex justify-center text-sm">
                          <div className="">
                            <label htmlFor="">
                              <span className="flex justify-center mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                                Observación
                              </span>
                              <textarea
                                name="observacion"
                                onChange={formik.handleChange}
                                value={formik.values.observacion}
                                onBlur={formik.handleBlur}
                                id=""
                                className="block w-[500px] h-28 px-3 pt-2 mb-4 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                              ></textarea>
                              {formik.touched.observacion &&
                              formik.errors.observacion ? (
                                <div className="text-red-600">
                                  {formik.errors.observacion}
                                </div>
                              ) : null}
                            </label>
                          </div>
                        </section>
                      </div>
                      <div>
                        <button
                          className="w-20 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover-gray-600  dark:hover:bg-gray-700"
                          type="submit"
                          disabled={submiting}
                        >
                          {submiting ? "Enviando..." : "Enviar"}
                        </button>
                        {errorSubmit && (
                          <div className="text-red-500 dark:text-red-300">
                            {errorSubmit}
                          </div>
                        )}
                        {success && (
                          <div className="text-red-500 dark:text-green-300">
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

              {/* container-footer */}
              <div className="flex items-center justify-end w-full px-4 py-4 text-sm font-semibold bg-white gap-x-2 h-14 dark:bg-gray-800">
                <button
                  className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200  dark:hover:bg-gray-700"
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
