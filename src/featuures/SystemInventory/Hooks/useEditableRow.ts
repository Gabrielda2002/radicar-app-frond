import { useState } from "react";

export const useEditableRow = () => {
      const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
      const [editedData, setEditedData] = useState<Record<string, any>>({});
      const [activeFieldId, setActiveFieldId] = useState<string | null>(null);


        const startEditing = (id: string | number, originalData: any) => {
    setEditingRows((prev) => ({ ...prev, [id]: true }));
    setEditedData((prev) => ({ ...prev, [id]: { ...originalData } }));
  };
  
  const cancelEditing = (id: string | number) => {
    setEditingRows((prev) => ({ ...prev, [id]: false }));
    setEditedData((prev) => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
  };

  const handleInputChange = (
    id: string | number,
    field: string,
    value: any
  ) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  return {
      editingRows,
      editedData,
      activeFieldId,
      setActiveFieldId,
      startEditing,
      cancelEditing,
      handleInputChange,
  }

}