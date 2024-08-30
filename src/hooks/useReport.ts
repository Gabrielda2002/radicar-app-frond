import { useState } from "react";

export const useModalReport = () => {
  const [formValues, setFormValues] = useState({
    reportOptions: "",
    startDate: "",
    endDate: "",
    Numcups: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return {
    formValues,
    handleChange,
    handleSubmit,
  };
};
