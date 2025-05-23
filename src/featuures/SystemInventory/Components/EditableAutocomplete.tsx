import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import inventoryOptions from "@/data-dynamic/inventoryOptions.json";

interface EditableAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  typeItem: string;
  fieldId: string;
  activeFieldId: string | null;
  setActiveFieldId: (id: string | null) => void;
}

const EditableAutocomplete: React.FC<EditableAutocompleteProps> = ({
  value,
  onChange,
  typeItem,
  fieldId,
  activeFieldId,
  setActiveFieldId,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (fieldId === activeFieldId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [fieldId, activeFieldId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (inputValue && typeItem) {
      const filteredSuggestions = inventoryOptions[
        typeItem.toLowerCase() as keyof typeof inventoryOptions
      ].filter((option) => 
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, typeItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    onChange(query);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    onChange(suggestion);
    setSuggestions([]);
  };

  const handleFocus = () => {
    setActiveFieldId(fieldId);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded shadow-lg dark:bg-gray-800 dark:border-gray-600 max-h-40"
          >
            {suggestions.map((suggestion) => (
              <motion.li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-stone-700 dark:text-gray-200"
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
              >
                {suggestion}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditableAutocomplete; 