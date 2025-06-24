import React, { useState, useRef, useEffect } from "react";
import Input from "./Input";

interface InputAutoCompleteJsonProps {
  label: string;
  data: string[];
  onSelect: (value: string) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const InputAutoCompleteJson: React.FC<InputAutoCompleteJsonProps> = ({
  label,
  data,
  onSelect,
  error,
  touched,
  required = false,
  placeholder,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [inputValue, data]);

  // Cerrar sugerencias al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onSelect(""); // Limpiar selección previa
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    onSelect(suggestion);
  };

  return (
    <div className="relative" ref={containerRef}>
      <Input
        label={label}
        value={inputValue}
        onChange={handleChange}
        error={error}
        touched={touched}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
      {showSuggestions && (
        <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded shadow-md dark:bg-gray-800 dark:border-gray-600 max-h-40">
          {suggestions.map((item) => (
            <li
              key={item}
              className="px-3 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
              onClick={() => handleSuggestionClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputAutoCompleteJson;
