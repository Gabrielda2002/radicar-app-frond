import { useFileManager } from "../../hooks/useFileManager";
import FolderList from "./SSGC/FolderList";
import FileList from "./SSGC/FileList";
import { Link } from "react-router-dom";
import salir from "/assets/back.svg";
import BreadCrumb from "./SSGC/BreadCrumb";
// import { useState } from "react";
import DropDownManu from "./SSGC/DropDownManu";


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
  } = useFileManager();

  console.log(contents);

  const currentFolderId = path[path.length - 1].id;

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  const hasFolder = contents?.folders && contents?.folders.length > 0;
  const hasFiles = contents?.files && contents?.files.length > 0;
  const isEmpty = !hasFolder && !hasFiles;


  return (
    <>
      {/* navbar table */}
      <section className="dark:bg-gray-900">
        <h1 className="mb-4 text-4xl text-color dark:text-gray-200">
          Módulo Sistema Gestion Calidad
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <li className="text-slate-400 after:mr-2">Inicio</li>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Sistema de Archivos SGC
            </li>
          </ol>
          <div className="pb-2">
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
              placeholder="Consultar registro..."
              className="block w-[280px] h-10 border-2 rounded-md focus:outline-none focus:ring dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
            />
          </div>
          <DropDownManu uploadNewFile={uploadNewFile} currentFolderId={currentFolderId}/>
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
                  <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Carpetas:
                  </h2>
                  <FolderList
                    folders={contents?.folders || []}
                    onFolderClick={setCurrentFolderId}
                    onDelete={deleteItemById}
                  />
                </div>
              )}

              {hasFiles && (
                <div>
                  <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Archivos:
                  </h2>
                  <FileList
                    files={contents?.files || []}
                    onDelete={deleteItemById}
                    onDownload={downloadFileById}
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
