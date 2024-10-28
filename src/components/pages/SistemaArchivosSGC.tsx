//*Fuctions and hooks
import React from "react";
import FileList from "./SSGC/FileList";
import BreadCrumb from "./SSGC/BreadCrumb";
import FolderList from "./SSGC/FolderList";
import LoadingSpinner from "../LoadingSpinner";
import { useAuth } from "../../context/authContext";
import { useFileManager } from "../../hooks/useFileManager";

//*Icons
import DropDownManu from "./SSGC/DropDownManu";

//*Properties
import ModalSection from "../ModalSection";

const FileManager: React.FC = () => {
  const {
    contents,
    loading,
    path,
    error,
    deleteItemById,
    downloadFileById,
    navigateBackToFolder,
    uploadNewFile,
    setCurrentFolderId,
    createNewFolder,
    renameItem,
  } = useFileManager();

  const currentFolderId = path[path.length - 1].id;
  const isInFolder = path.length > 1; // Si tienes más de un elemento en el path, estás dentro de una carpeta

  if (loading) return <LoadingSpinner duration={3000} />;
  if (error) return <div className="flex justify-center text-lg dark:text-white">{error}</div>;

  const hasFolder = contents?.folders && contents?.folders.length > 0;
  const hasFiles = contents?.files && contents?.files.length > 0;
  const isEmpty = !hasFolder && !hasFiles;

const { rol } = useAuth();

  return (
    <>
    <ModalSection
      title="Sistema Gestión De Calidad"
      breadcrumb={[
        {label: "Inicio", path: "/Inicio"},
        {label: "/ Sistema Gestión Calidad", path: ""}
      ]}
    />
      {/* navbar table SGC NO BORRAR*/}
      {/* <section className="p-4 mb-6 bg-white rounded-md shadow-lg dark:bg-gray-800 shadow-indigo-500/40">
        <LoadingSpinner duration={500} />
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-color dark:text-gray-200">
            Módulo Sistema de Gestión de Calidad
          </h1>
          <nav>
            <ol className="flex items-center space-x-2">
              <Link to="/inicio">
                <li className="text-slate-400 hover:underline">Inicio</li>
              </Link>
              <li className="text-slate-700 dark:text-gray-300">
                / Servicio Gestión de Calidad
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 text-gray-600 duration-300 bg-gray-200 border-2 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
          >
            <img src={salir} alt="Volver" className="w-6 h-6" />
          </button>
        </div>
      </section> */}

      <section className="p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 container-tabla mb-11 shadow-indigo-500/40">
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="container-filter">
            {/* <label className="text-xl font-bold text-stone-600 dark:text-stone-300">
              Buscar Carpeta:
            </label>
            <input
              placeholder="Buscar Elemento..."
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            /> */}
          </div>
          {[4, 1].includes(Number(rol)) && (
            <DropDownManu
              uploadNewFile={uploadNewFile}
              currentFolderId={currentFolderId}
              createNewFolder={createNewFolder}
              isInFolder={isInFolder} // Pasar el estado de si estás en una carpeta
            />
          )}
        </section>
        <div className="mb-2">
          <BreadCrumb path={path} onNavigate={navigateBackToFolder} />
        </div>
        <div>
          {isEmpty ? (
            <div>
              <p className="text-center text-gray-500 dark:text-gray-100">
                Esta carpeta está vacía.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1">
              {hasFolder && (
                <div>
                  <h2 className="pt-2 mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
                    Carpetas:
                  </h2>
                  <FolderList
                    folders={contents?.folders || []}
                    onFolderClick={setCurrentFolderId}
                    onDelete={deleteItemById}
                    renameItem={renameItem}
                  />
                </div>
              )}

              {hasFiles && (
                <div>
                  <h2 className="pt-2 mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Archivos:
                  </h2>
                  <FileList
                    files={contents?.files || []}
                    onDelete={deleteItemById}
                    onDownload={downloadFileById}
                    renameItem={renameItem}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FileManager;
