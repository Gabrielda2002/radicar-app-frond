import React, { useState } from "react";

type ModalRenombrarItemProps = {
  standOpen: boolean;
  toggleModal: () => void;
  renameItem: (newName: string) => void;
};

const ModalRenombrarItem: React.FC<ModalRenombrarItemProps> = ({standOpen, toggleModal, renameItem}) => {

    const [ Error, setError ] = useState('');
    const [ folderNewName, setFolderNewName ] = useState('');
  
    const handleRename = () => {
        if (folderNewName.trim()) {
            renameItem(folderNewName);
            toggleModal();
        }else{
            alert('El nombre de la carpeta es requerido');
        }
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const regex = /^[a-zA-Z0-9\s]{1,60}$/;
    
        const inputValue = e.target.value;
    
        if (!regex.test(inputValue)) {
          setError('Solo se permiten 60 caracteres alfanuméricos, sin caracteres especiales');
        } else {
          setError('');
        }
        console.log(Error)
        setFolderNewName(inputValue);
      }

  return (
    <div>
      
      {standOpen && (
        <div className="fixed z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-50 backdrop-blur-sm "
            onClick={toggleModal}
          ></div>

          {/* Contenido del formulario */}

          <div className="z-10 w-[800px] p-4 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-color">
                Renombrar.
              </h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* formulario con dos columnas */}

            <div className="grid grid-cols-1 gap-10 mb-4">
              <div>
                <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                  Nombre :
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el nombre..."
                  className={`w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white ${
                    Error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onChange={handleInputChange}
                />
                {Error && <p className="text-red-500">{Error}</p>}
              </div>
            </div>

            {/* Botones */}

            <div className="flex justify-end space-x-3">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cerrar
              </button>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-800"
                onClick={handleRename}
                disabled={!!Error || !folderNewName.trim()}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalRenombrarItem
