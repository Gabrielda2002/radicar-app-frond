import React, { useEffect, useState } from "react";
import useFetchEspecialidadAtcp from "../../../hooks/useFetchInputAtcp";
import Input from "../Ui/Input";

interface InputAutocompletadoProps {
  label: string;
  onInputChanged: (value: string, id?: string) => void;
  apiRoute: string;
  error?: string; 
  touched?: boolean;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
}

const InputAutocompletado: React.FC<InputAutocompletadoProps> = ({
  label,
  onInputChanged,
  apiRoute,
  error,
  touched,
  required = false,
  placeholder = "",
  helpText = "",
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
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          touched={touched}
          error={error}
          required={required}
          label={label}
          helpText={helpText}
        />

      {fetchError && (
        <p className="text-red-500 dark:text-red-300">{fetchError}</p>
      )}

      {/* Mostrar sugerencias */}
      {showSuggestions && data && (
        <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded shadow-md dark:bg-gray-800 dark:border-gray-600 max-h-40">
          {data.map((item) => (
            <li
              key={item.id}
              className="px-3 py-2 text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
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
