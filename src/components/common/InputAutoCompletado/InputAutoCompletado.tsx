import React, { useEffect, useRef, useState } from "react";
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
  value?: string;
  initialId?: string; // ID del valor seleccionado para modo edición
  initialName?: string; // Nombre del valor seleccionado para modo edición
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
  value = "",
  initialId = "",
  initialName = "",
}) => {
  const [inputValue, setInputValue] = useState(initialName || value);
  const [selectedId, setSelectedId] = useState<string>(initialId);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const suggestionsRef = useRef<HTMLUListElement>(null);

  const {
    data,
    error: fetchError,
    fetchInputAtcp,
  } = useFetchEspecialidadAtcp();

  // Efecto para manejar cambios en las props iniciales
  useEffect(() => {
    if (initialName && initialName !== inputValue) {
      setInputValue(initialName);
    }
    if (initialId && initialId !== selectedId) {
      setSelectedId(initialId);
    }
  }, [initialName, initialId]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (inputValue.trim() !== "") {
        fetchInputAtcp(inputValue, apiRoute);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } else {
        setSelectedIndex(-1);
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [inputValue, apiRoute]);

  useEffect(() => {
    if (selectedIndex >= 0 && showSuggestions) {
      const suggestionElement = document.querySelector(
        `[data-suggestion-index="${selectedIndex}"]`
      ) as HTMLElement;

      const suggestionsContainer = suggestionElement?.parentElement;

      if (suggestionElement && suggestionsContainer) {

        const containerScrollTop = suggestionsContainer.scrollTop;
        const elementOffserTop = suggestionElement.offsetTop;
        const elementHeight = suggestionElement.offsetHeight;

        if (elementOffserTop < containerScrollTop) {
          suggestionsContainer.scrollTop = elementOffserTop;
        }else if (elementOffserTop + elementHeight > containerScrollTop + suggestionsContainer.clientHeight){
          suggestionsContainer.scrollTop = elementOffserTop + elementHeight - suggestionsContainer.clientHeight;
        }
      }
    }
  }, [selectedIndex, showSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Si el usuario borra todo o cambia el valor, limpiar la selección
    if (newValue !== initialName) {
      setSelectedId("");
      onInputChanged("", ""); // Notificar que no hay selección válida
    } else if (newValue === initialName && selectedId) {
      onInputChanged(selectedId, newValue); // Mantener la selección inicial si coincide
    } else {
      onInputChanged("", newValue); // Valor temporal sin ID
    }
    
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string, id?: string) => {
    setInputValue(suggestion);
    setSelectedId(id || "");
    onInputChanged(id ?? "", suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || !data || data.length === 0) {
      if (e.ctrlKey && e.code === "Space") {
        setInputValue("@");
        onInputChanged("@");
        setShowSuggestions(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && data[selectedIndex]) {
          const selectedItem = data[selectedIndex];
          setInputValue(selectedItem.name);
          setSelectedId(selectedItem.id);
          onInputChanged(selectedItem.id, selectedItem.name);
          setShowSuggestions(false);
          setSelectedIndex(-1);
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
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
        onKeyDown={handleKeyDown}
      />

      {fetchError && (
        <p className="text-red-500 dark:text-red-300">{fetchError}</p>
      )}

      {/* Mostrar sugerencias */}
      {showSuggestions && data && (
        <ul ref={suggestionsRef} className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded shadow-md dark:bg-gray-800 dark:border-gray-600 max-h-40">
          {data.map((item, index) => (
            <li
              key={item.id}
              data-suggestion-index={index}
              className={`px-3 py-2 cursor-pointer dark:text-gray-200 ${
                index === selectedIndex
                  ? "bg-blue-100 text-teal-500 dark:bg-teal-600 dark:text-white"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleSuggestionClick(item.name, item?.id)}
              onMouseEnter={() => setSelectedIndex(index)}
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
