import React, { useEffect, useRef } from "react";
import EditableAutocomplete from "./EditableAutocomplete";
import { FormatDate } from "@/utils/FormatDate";

interface EditableCellProps {
  isEditing: boolean;
  value: string | number;
  onChange: (value: string) => void;
  type?:
    | "text"
    | "number"
    | "select"
    | "textarea"
    | "autocomplete-name"
    | "date";
  options?: Array<{ value: string; label: string }>;
  fieldId: string;
  typeItem?: string;
  activeFieldId: string | null;
  setActiveFieldId: (id: string | null) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  isEditing,
  value,
  onChange,
  type = "text",
  options = [],
  fieldId,
  typeItem,
  activeFieldId,
  setActiveFieldId,
}) => {
  const inputRef = useRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >(null);

  useEffect(() => {
    if (isEditing && fieldId === activeFieldId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing, fieldId, activeFieldId]);

  const handleFocus = () => {
    setActiveFieldId(fieldId);
  };

  if (!isEditing) {

    if(type === 'date'){
      return <span>{value ? FormatDate(value.toString(), false) : ''}</span> 
    }

    return <span>{value}</span>;
  }

  switch (type) {

    case "date":
      return (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="date"
          value={FormatDate(value.toString(), false)}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      );
    case "autocomplete-name":
      return (
        <EditableAutocomplete
          value={value.toString()}
          onChange={onChange}
          typeItem={typeItem || ""}
          fieldId={fieldId}
          activeFieldId={activeFieldId}
          setActiveFieldId={setActiveFieldId}
        />
      );
    case "select":
      return (
        <select
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case "textarea":
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={2}
        />
      );
    case "number":
      return (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="number"
          value={value}
          onFocus={handleFocus}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      );
    default:
      return (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={value}
          onClick={(e) => e.currentTarget.focus()}
          onFocus={handleFocus}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      );
  }
};

export default EditableCell;
