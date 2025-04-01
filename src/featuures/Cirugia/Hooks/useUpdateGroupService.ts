import { useState } from "react";
import { UpdateGroupServices } from "../Services/UpdateGroupServices";

export const useUpdateGroupService = (idRadicado: number) => {
    const [groupService, setGroupService] = useState<number>(0);
    const [errorUpdate, setErrorUpdate] = useState<string | null>(null);

    const SendGroupService = async () => {
        try {
          const response = await UpdateGroupServices(groupService, idRadicado);
    
          if (response?.status === 200 || response?.status === 201) {
            return response.data;
          }
        } catch (error: any) {
          if (error.response.status === 403) {
            setErrorUpdate("No tiene permisos para realizar esta acción.");
          }
          setErrorUpdate("Error al actualizar el grupo de servicios." + error);
        }
        return false;
      };

      return {
        setGroupService,
        errorUpdate,
        SendGroupService,
      }



}