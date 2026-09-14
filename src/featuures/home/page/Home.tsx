//*Fuctions and Hooks
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

//*Icons
import cookieX from "/assets/cookie-X.svg";
import { FolderKanban, ChevronDown } from "lucide-react";
// import FormPacientesCS from "../components/ConsultarPacientesCS";
import ConsultarSvContratados from "../components/ConsultarSvContratados";
import DocumentCard from "../components/DocumentCard";
import { useAuth } from "@/context/authContext";

import REGLEMENTO_PDF_URL from "@/assets/pdf/Regalmento_interno.pdf?url";
import { HOME_CONFIG_PDF } from "../utils/homeConfig";

// const IndicadoresSalud = lazy(() => import("./HealthIndicators"));
const Calendario = lazy(() => import("../components/CalendarEvent"));
const PdfViewer = lazy(() => import("@/components/common/PDFViewer/PdfViewer"));

const Home = () => {
  const [isLoading, setisLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showAlert, setShowAlert] = useState(() => !localStorage.getItem("alertClosed"));
  const [alertFadeOut, setAlertFadeOut] = useState(false);
  const [pdfSelected, setPdfSelected] = useState<string | null>(null);

  const handleCloseAlert = () => {
    setAlertFadeOut(true);
    setTimeout(() => {
      setShowAlert(false);
      localStorage.setItem("alertClosed", "true");
    }, 300);
  };

  const handleFinishLoading = () => {
    setisLoading(false);
    setShowContent(true);
  };

  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const { user } = useAuth();
  const [isServicesPanelOpen, setIsServicesPanelOpen] = useState(false);
  const userName = `${user?.name ?? ""} ${user?.lastname ?? ""}`.trim() || "colaborador";
  const userCity = user?.municipality || "sede principal";

  const floatingModules = HOME_CONFIG_PDF.slice(0, 2);

  const [openModuleCode, setOpenModuleCode] = useState<string | null>(null);
  const modulesWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openModuleCode) return;
    function handleClickOutside(e: MouseEvent) {
      if (modulesWrapperRef.current && !modulesWrapperRef.current.contains(e.target as Node)) {
        setOpenModuleCode(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openModuleCode]);

  useEffect(() => {
    if (!openModuleCode) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenModuleCode(null);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [openModuleCode]);

  const handleOpenPdf = (pdfUrl: string) => {
    setPdfSelected(pdfUrl);
    setIsPdfOpen(true);
    setOpenModuleCode(null);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner duration={200} onFinish={handleFinishLoading} />
      ) : (
        <section
          className={`text-gray-600 body-font transition-opacity duration-1000 ease-in-out ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto space-y-6">
            {/* BEGIN: Header institucional con gradiente */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-900 via-teal-800 to-teal-950 p-6 shadow-lg sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -bottom-16 -right-12 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -top-20 right-1/4 h-60 w-60 rounded-full bg-teal-400/10 blur-2xl" />
              <div className="relative z-10 max-w-2xl space-y-2">
                <span className="inline-flex items-center gap-2 rounded-md border border-teal-400/25 bg-teal-500/15 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-teal-200">
                  SOMOS NORDVITAL IPS
                </span>
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Bienvenidos a Nordvital IPS | Sede {userCity}
                </h1>
                <p className="pt-1 text-sm leading-relaxed text-teal-100/90 sm:text-base">
                  ¡Buenos días, {userName}! — Panel de Gestión y Consultas de Nordvital IPS ({userCity})
                </p>
              </div>
            </div>
            {/* END: Header institucional con gradiente */}

            {/* BEGIN: Consulta de servicios contratados */}
            <div className="overflow-hidden rounded-xl border border-teal-100 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-700">
              <button
                type="button"
                onClick={() => setIsServicesPanelOpen((prev) => !prev)}
                aria-expanded={isServicesPanelOpen}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-teal-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500 dark:hover:bg-gray-600 sm:p-5"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
                    <FolderKanban className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-2xl font-semibold text-gray-800 dark:text-gray-100">Consultar Servicios Contratados</span>
                    <span className="block text-base text-gray-500 dark:text-gray-400">Consulta la información de un servicio por su código.</span>
                  </span>
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-teal-700 transition-transform duration-200 dark:text-teal-300 ${isServicesPanelOpen ? "rotate-180" : ""}`} />
              </button>
              {isServicesPanelOpen && (
                <div className="border-t border-teal-100 p-4 dark:border-gray-600 sm:p-5">
                  <ConsultarSvContratados />
                </div>
              )}
            </div>
            {/* END: Consulta de servicios contratados */}

            {/* BEGIN: Calendario de actividades */}
            <div className="rounded-xl bg-gray-50 pb-5 shadow-sm dark:bg-gray-700">
              <h1 className="pl-6 md:pl-10 pt-5 mx-auto text-gray-700 [28px] font-bold md:text-5xl dark:text-white">
                Calendario de Actividades:
              </h1>
              <Suspense fallback={<LoadingSpinner />}>
                <Calendario />
              </Suspense>
            </div>
            {/* END: Calendario de actividades */}
          </div>

          {/* Alerta de contraseña */}
          {showAlert && (
            <section
              className={`absolute z-50 flex items-center justify-between max-w-4xl p-4 mx-auto border border-gray-200 shadow-md bg-amber-500 dark:bg-gray-900 left-12 bottom-16 dark:shadow-gray-900 shadow-gray-100 md:gap-x-4 dark:border-gray-700 rounded-2xl transition-opacity duration-300 ${
                alertFadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              <p className="text-sm text-gray-50 dark:text-gray-300">
                Recuerde actualizar su contraseña cada 3 meses para mantener la
                seguridad de su cuenta.
              </p>
              <button
                className="flex items-center justify-center text-gray-700 transition-colors duration-300 rounded-full shrink-0 dark:text-gray-200 dark:hover:bg-red-500 w-7 h-7 focus:outline-none hover:bg-gray-100"
                onClick={handleCloseAlert}
              >
                <img src={cookieX} alt="" className="w-5 h-5 dark:invert" />
              </button>
            </section>
          )}

          <Suspense fallback={null}>
            {isPdfOpen && (
              <PdfViewer
                pdfFile={pdfSelected || REGLEMENTO_PDF_URL}
                isOpen={isPdfOpen}
                onClose={() => setIsPdfOpen(false)}
              />
            )}
          </Suspense>

          {/* BEGIN: Botones flotantes — un módulo por botón */}
          <div ref={modulesWrapperRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {floatingModules.map((doc) => {
              const isOpen = openModuleCode === doc.code;
              return (
                <div key={doc.code} className="group relative">
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute bottom-full right-0 mb-3 w-[calc(100vw-3rem)] max-w-sm origin-bottom-right"
                      >
                        <DocumentCard
                          onOpen={() => handleOpenPdf(doc.pdfUrl)}
                          title={doc.title}
                          subTitle={doc.subTitle}
                          description={doc.description}
                          category={doc.category}
                          badgeClassName={doc.badgeClassName}
                          meta={doc.meta}
                          confidential={doc.confidential}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isOpen && (
                    <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:bg-gray-700">
                      {doc.title}
                    </span>
                  )}

                  <motion.button
                    type="button"
                    onClick={() => setOpenModuleCode((prev) => (prev === doc.code ? null : doc.code))}
                    whileTap={{ scale: 0.94 }}
                    aria-expanded={isOpen}
                    aria-label={doc.title}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg shadow-teal-900/30 transition hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
                  >
                    <FolderKanban size={22} strokeWidth={2} />
                  </motion.button>
                </div>
              );
            })}
          </div>
          {/* END: Botones flotantes — un módulo por botón */}
        </section>
      )}
    </>
  );
};

export default Home;