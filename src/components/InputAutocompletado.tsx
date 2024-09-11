import React, { useEffect, useState } from "react";
import useFetchEspecialidadAtcp from "../hooks/useFetchInputAtcp";

interface InputAutocompletadoProps {
  label: string;
  onInputChanged: (value: string) => void;
  apiRoute: string;
}

const InputAutocompletado: React.FC<InputAutocompletadoProps> = ({
  label,
  onInputChanged,
  apiRoute
}) => {
  const [inputValue, setInputValue] = useState("");
  {
    /* hook  que trae los datos de  los inputs autocompletados */
  }
  const {
    data,
    loading,
    error,
    fetchInputAtcp
  } = useFetchEspecialidadAtcp();
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (inputValue.trim() !== "") {
      fetchInputAtcp(inputValue, apiRoute);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onInputChanged(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <label>
        <span className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
          {label}
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
          placeholder={`Escribe ${label.toLowerCase()}...`}
        />
      </label>

        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}

      {/* Mostrar sugerencias */}
      {showSuggestions && data && (
        <ul className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 w-full rounded shadow-md mt-1 max-h-40 overflow-y-auto">
          {data.map((item) => (
             <li
             key={item.id}
             className="px-3 py-2 text-gray-500"
             onClick={() => handleSuggestionClick(item.name)}
         >
             {item.name}
         </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputAutocompletado;
