import { useState } from "react";
import { UpdateGroupServices } from "../Services/UpdateGroupServices";

export const useUpdateGroupService = (idRadicado: number) => {
    const [groupService, setGroupService] = useState<number>(0);
    const [errorUpdate, setErrorUpdate] = useState<string | null>(null);

    const SendGroupService = async () => {
        try {
          const response = await UpdateGroupServices(groupService, idRadicado);
    
          console.log(groupService, idRadicado);
          if (response?.status === 200 || response?.status === 201) {
            console.log("Actualizado");
            window.location.reload();
          }
        } catch (error) {
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