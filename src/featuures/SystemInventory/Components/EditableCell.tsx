import React, { useEffect, useRef } from "react";

interface EditableCellProps {
  isEditing: boolean;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number" | "select" | "textarea";
  options?: Array<{ value: string; label: string }>;
  fieldId: string;
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
  activeFieldId,
  setActiveFieldId,
}) => {

  console.log(value)

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
    return <span>{value}</span>;
  }

  switch (type) {
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
