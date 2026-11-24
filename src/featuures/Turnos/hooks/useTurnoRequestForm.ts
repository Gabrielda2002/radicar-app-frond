import { useEffect, useRef, useState } from "react";
import { useFormik, type FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import type { ITurnoRequestForm } from "@/models/ITurnos";
import { getTurnoError } from "../services/turnos.service";
import { useStoreTurnoRequest } from "../store/useStoreTurnoRequest";
import { TURNO_CLASSIFICATION_VALUES } from "../constants/turnoClassification";

const identitySchema = Yup.object({
  documentTypeId: Yup.string().required("Selecciona un tipo de documento"),
  documentNumber: Yup.string()
    .trim()
    .matches(/^\d+$/, "Ingresa solo números")
    .min(5, "Ingresa al menos 5 dígitos")
    .max(20, "Ingresa máximo 20 dígitos")
    .required("Ingresa tu número de documento"),
});

const detailsSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Ingresa tu nombre completo")
    .max(250, "Ingresa máximo 250 caracteres")
    .required("Ingresa tu nombre completo"),
  phoneNumber: Yup.string()
    .trim()
    .matches(/^\d+$/, "Ingresa solo números")
    .max(10, "Ingresa máximo 10 dígitos")
    .required("Ingresa tu número de celular"),
});

const classificationSchema = Yup.object({
  classification: Yup.string()
    .oneOf(TURNO_CLASSIFICATION_VALUES, "Selecciona una clasificación válida")
    .required("Selecciona el trámite que vas a realizar"),
});

const serviceSchema = Yup.object({
  serviceId: Yup.string().required("Selecciona el servicio que necesitas"),
});

const prioritySchema = Yup.object({
  priority: Yup.string()
    .oneOf(["GENERAL", "PRIORITARIO"])
    .required("Responde si requieres atención prioritaria"),
});

const getLocation = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      return reject(
        new Error(
          "Tu navegador no permite obtener la ubicación. Intenta desde otro dispositivo.",
        ),
      );
    navigator.geolocation.getCurrentPosition(
      resolve,
      (error) => {
        const messages: Record<number, string> = {
          1: "Autoriza el acceso a tu ubicación en los permisos del navegador y vuelve a intentar.",
          2: "No pudimos obtener tu ubicación. Comprueba que esté activada y vuelve a intentar.",
          3: "La ubicación tardó más de lo esperado. Vuelve a intentar desde la sede.",
        };
        reject(
          new Error(
            messages[error.code] ||
              "No pudimos obtener tu ubicación. Vuelve a intentar.",
          ),
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  });

export const useTurnoRequestForm = (slug: string) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const skipLocation = useRef(false);
  const active = useRef(true);
  const verify = useStoreTurnoRequest((state) => state.verify);
  const submit = useStoreTurnoRequest((state) => state.submit);
  const clearVerification = useStoreTurnoRequest(
    (state) => state.clearVerification,
  );
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);

  const identify = async (
    values: ITurnoRequestForm,
    helpers: FormikHelpers<ITurnoRequestForm>,
  ) => {
    const result = await verify({
      documentNumber: values.documentNumber.trim(),
      documentType: Number(values.documentTypeId),
    });
    if (!result || !active.current) return;
    if (result.activeTurn)
      return navigate(
        `/turnos/ticket/${encodeURIComponent(result.activeTurn.ticketToken)}`,
      );
    await helpers.setValues(
      {
        ...values,
        name: result.patient?.fullName ?? "",
        phoneNumber: result.patient?.phoneNumber ?? "",
      },
      false,
    );
    helpers.setTouched({});
    setStep(1);
  };

  const issue = async (values: ITurnoRequestForm) => {
    try {
      if (!values.classification || !values.serviceId || !values.priority)
        return;
      const skip = import.meta.env.DEV && skipLocation.current;
      setIsLocating(!skip);
      const position = skip ? null : await getLocation();
      if (!active.current) return;
      setIsLocating(false);
      const token = await submit({
        slug,
        serviceId: Number(values.serviceId),
        classification: values.classification,
        documentNumber: values.documentNumber.trim(),
        documentTypeId: Number(values.documentTypeId),
        name: values.name.trim(),
        phoneNumber: values.phoneNumber.trim(),
        priority: values.priority,
        ...(position
          ? {
              userLatitude: position.coords.latitude,
              userLongitude: position.coords.longitude,
            }
          : { skipGeolocation: true }),
      });
      if (token) navigate(`/turnos/ticket/${encodeURIComponent(token)}`);
    } catch (error: unknown) {
      if (active.current) setLocationError(getTurnoError(error));
    } finally {
      if (active.current) setIsLocating(false);
      skipLocation.current = false;
    }
  };

  const formik = useFormik<ITurnoRequestForm>({
    initialValues: {
      documentTypeId: "",
      documentNumber: "",
      name: "",
      phoneNumber: "",
      classification: "",
      serviceId: "",
      priority: "",
    },
    validationSchema:
      step === 0
        ? identitySchema
        : step === 1
          ? detailsSchema
          : step === 2
            ? classificationSchema
            : step === 3
              ? serviceSchema
              : step === 4
                ? prioritySchema
                : classificationSchema
                    .concat(serviceSchema)
                    .concat(prioritySchema),
    onSubmit: async (values, helpers) => {
      setLocationError(null);
      if (step === 0) return identify(values, helpers);
      if (step > 0 && step < 5) {
        helpers.setTouched({});
        setStep((current) => current + 1);
        return;
      }
      await issue(values);
    },
  });

  const goBack = () => {
    setLocationError(null);
    formik.setTouched({});
    setStep((current) => Math.max(0, current - 1));
  };

  const submitWithoutLocation = () => {
    if (!import.meta.env.DEV || formik.isSubmitting) return;
    skipLocation.current = true;
    void formik.submitForm();
  };

  const goToClassification = () => setStep(2);
  const goToService = () => setStep(3);
  const goToPriority = () => setStep(4);

  return {
    formik,
    step,
    goBack,
    goToClassification,
    goToService,
    goToPriority,
    isLocating,
    locationError,
    submitWithoutLocation,
    clearVerification,
  };
};
