import { api } from "@/utils/api-config";
import { useState } from "react";
import { toast } from "react-toastify";

export const useUpdateProfessional = () => {
  const [isOpenMedic, setIsOpenMedic] = useState<boolean>(false);
  const [newMedic, setNewMedic] = useState<string>("");
  const [addMedicError, setAddMedicError] = useState<string | null>(null);

  const handleUpdateProfessional = async () => {
    try {
      const response = await api.post<{ status: number }>("/profesionales", {
        name: newMedic,
      });

      if (response.status === 201) {
        setIsOpenMedic(false);
        setNewMedic("");
        setAddMedicError(null);
        toast.success("Profesional agregado exitosamente", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      console.error("Error al agregar el profesional:", error);
      if (error.response && error.response.status === 400) {
        setAddMedicError("El profesional ya existe.");
      } else {
        setAddMedicError(
          "Error al agregar el profesional. Inténtalo de nuevo."
        );
      }
    }
  };

    return {
        isOpenMedic,
        setIsOpenMedic,
        newMedic,
        setNewMedic,
        addMedicError,
        setAddMedicError,
        handleUpdateProfessional,
    };

};
