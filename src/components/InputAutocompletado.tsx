import React, { useEffect, useState } from "react";
import useFetchEspecialidadAtcp from "../hooks/useFetchInputAtcp";

interface InputAutocompletadoProps {
  label: string;
  onInputChanged: (value: string, id?: string) => void;
  apiRoute: string;
  error?: boolean; //*Nueva propiedad para manejar el error
}

const InputAutocompletado: React.FC<InputAutocompletadoProps> = ({
  label,
  onInputChanged,
  apiRoute,
  error = false, //*Establece un valor por defecto
}) => {
  const [inputValue, setInputValue] = useState("");
  const {
    data,
    error: fetchError,
    fetchInputAtcp,
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

  const handleSuggestionClick = (suggestion: string, id?: string) => {
    setInputValue(suggestion);
    onInputChanged(id ?? "", suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <label>
        <span className="flex mb-3 text-base font-bold text-gray-700 dark:text-gray-200">
          {label}
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border-2 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
            error ? "border-red-500 dark:border-red-500" : "border-gray-200"
          }`}
          placeholder={`Escribe ${label.toLowerCase()}...`}
        />
      </label>

        {error && <p className="text-red-500 dark:text-red-300">{error}</p>}

      {/* Mostrar sugerencias */}
      {showSuggestions && data && (
        <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded shadow-md dark:bg-gray-800 dark:border-gray-600 max-h-40">
          {data.map((item) => (
            <li
              key={item.id}
              className="px-3 py-2 text-gray-500"
              onClick={() => handleSuggestionClick(item.name, item?.id)}
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
