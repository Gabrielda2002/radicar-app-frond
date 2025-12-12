//*Fuctions and hooks
import React, { useEffect, useMemo } from "react";
import FileList from "@/featuures/SystemGC/Components/FileList";
import BreadCrumb from "@/featuures/SystemGC/Components/BreadCrumb";
import FolderList from "@/featuures/SystemGC/Components/FolderList";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useAuth } from "@/context/authContext";
import DropDownManu from "@/featuures/SystemGC/Components/DropDownManu";

//*Icons
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import useFileManagerStore from "../Store/FileManagerStore";

export const SECTIONS = [
  { id: "suh", name: "Sistema Único de Habilitación" },
  { id: "ci", name: "Centro de Investigación" },
  { id: "sst", name: "Seguridad y Salud en el Trabajo" },
  { id: "sgc", name: "Sistema Gestión de Calidad" },
];

const FileManager: React.FC = () => {
  const { rol } = useAuth();

  const {
    contents,
    isLoading,
    path,
    contentsError: error,
    section,
    navigateBackToFolder,
    setSection,
    fetchContents,
  } = useFileManagerStore();

  // Fetch inicial cuando monta el componente
  useEffect(() => {
    fetchContents();
  }, []);

  const isInFolder: boolean = useMemo(() => path.length > 1, [path]);

  const hasFolder = contents?.folders && contents?.folders.length > 0;
  const hasFiles = contents?.files && contents?.files.length > 0;
  const isEmpty = !hasFolder && !hasFiles;

  const activeSectionName = SECTIONS.find(s => s.id === section)?.name || "Sistema Gestión de Calidad";

  return (
    <>
      <ModalSection
        title={activeSectionName}
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: `/ ${activeSectionName}`, path: "" },
        ]}
      />

      {/* Pestañas de navegación entre secciones */}
      <div className="grid grid-cols-1 overflow-x-auto shadow-md bg-zinc-100 md:bg-white b-4 md:flex dark:bg-gray-700 md:dark:bg-gray-800 rounded-t-md">
        {SECTIONS.map(sec => (
          <button
            key={sec.id}
            className={`px-4 py-3 font-medium transition-colors whitespace-nowrap ${section === sec.id
                ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              }`}
            onClick={() => setSection(sec.id)}
          >
            {sec.name}
          </button>
        ))}
      </div>
      {isLoading ? (
        <LoadingSpinner duration={3000} />
      ) : error ? (
        <div className="flex justify-center text-lg text-red-600">{error}</div>
      ) : (
        <section className="p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 container-tabla mb-11 shadow-indigo-500/40">
          <section className="flex items-center justify-between pb-0 md:pb-6 header-tabla">
            <div className="container-filter">
              {/* Filtros si se agregan en un futuro */}
            </div>
            {[4, 1].includes(Number(rol)) && (
              <DropDownManu
                isInFolder={isInFolder}
              />
            )}
          </section>
          <div className="mb-2">
            <BreadCrumb path={path} onNavigate={navigateBackToFolder} />
          </div>
          <div>
            {isEmpty ? (
              <div>
                <p className="text-xl text-center text-gray-500 dark:text-gray-100">
                  Esta carpeta está vacía.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1">
                {hasFolder && (
                  <div>
                    <div className="flex items-center pb-3">
                      <FolderOpenIcon className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                      <h2 className="ml-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">
                        Carpetas:
                      </h2>
                    </div>
                    <FolderList
                      folders={contents?.folders || []}
                      isInFolder={isInFolder}
                    />
                  </div>
                )}
                <hr className="m-8" />
                {hasFiles && (
                  <div>
                    <div className="flex items-center pb-3">
                      <DocumentDuplicateIcon className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                      <h2 className="ml-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">
                        Archivos:
                      </h2>
                    </div>
                    <FileList
                      files={contents?.files || []}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default FileManager;
