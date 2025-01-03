//*Fuctions and hooks
import React, { useMemo } from "react";
import FileList from "@/featuures/SystemGC/Components/FileList";
import BreadCrumb from "@/featuures/SystemGC/Components/BreadCrumb";
import FolderList from "@/featuures/SystemGC/Components/FolderList";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useAuth } from "@/context/authContext";
import { useFileManager } from "@/featuures/SystemGC/Hooks/useFileManager";
import DropDownManu from "@/featuures/SystemGC/Components/DropDownManu";

//*Icons
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";

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

  const currentFolderId = useMemo(() => path[path.length - 1].id, [path]);
  const isInFolder = useMemo(()=> path.length > 1, [path]); // Si tienes más de un elemento en el path, estás dentro de una carpeta

  if (loading) return <LoadingSpinner duration={3000} />;
  if (error)
    return (
      <div className="flex justify-center text-lg dark:text-white">{error}</div>
    );

  const hasFolder = contents?.folders && contents?.folders.length > 0;
  const hasFiles = contents?.files && contents?.files.length > 0;
  const isEmpty = !hasFolder && !hasFiles;

  const { rol } = useAuth();

  return (
    <>
      <ModalSection
        title="Sistema Gestión De Calidad"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Sistema Gestión Calidad", path: "" },
        ]}
      />
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
                    onFolderClick={setCurrentFolderId}
                    onDelete={deleteItemById}
                    renameItem={renameItem}
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
