import React from "react";
import FileList from "./SSGC/FileList";
import { Link } from "react-router-dom";
import BreadCrumb from "./SSGC/BreadCrumb";
import FolderList from "./SSGC/FolderList";
import LoadingSpinner from "../LoadingSpinner";
import DropDownManu from "./SSGC/DropDownManu";
import { useFileManager } from "../../hooks/useFileManager";
import salir from "/assets/back.svg";

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
  if (error) return <div>{error}</div>;

  const hasFolder = contents?.folders && contents?.folders.length > 0;
  const hasFiles = contents?.files && contents?.files.length > 0;
  const isEmpty = !hasFolder && !hasFiles;

  return (
    <>
      {/* navbar table */}
      <section className="dark:bg-gray-900">
        <h1 className="mb-4 text-4xl text-color dark:text-gray-200">
          Módulo Sistema Gestión Calidad
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <li className="text-slate-400 after:mr-2">Inicio</li>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Sistema de Archivos SGC
            </li>
          </ol>
          <div className="w-10 pb-2">
            <Link to="/inicio">
              <img src={salir} alt="" />
            </Link>
          </div>
        </nav>
      </section>

      <section className="p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 container-tabla mb-11 shadow-indigo-500/40">
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="container-filter">
            <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
              Buscar Carpeta:
            </label>
            <input
              placeholder="Consultar"
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <DropDownManu
            uploadNewFile={uploadNewFile}
            currentFolderId={currentFolderId}
            createNewFolder={createNewFolder}
            isInFolder={isInFolder} // Pasar el estado de si estás en una carpeta
          />
        </section>
        <div>
          <BreadCrumb path={path} onNavigate={navigateBackToFolder} />
        </div>

        <div>
          {isEmpty ? (
            <div>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Esta carpeta está vacía.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1">
              {hasFolder && (
                <div>
                  <h2 className="pt-2 mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
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
