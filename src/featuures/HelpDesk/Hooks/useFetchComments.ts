import { IComment } from "@/models/IComment";
import { useState } from "react";
import { getCommentsTicket } from "../Services/getCommentsTicket";

export const useFetchComments = () => {
  const [dataComments, setDataComments] = useState<IComment[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const [errorComments, setErrorComments] = useState<string | null>(null);

  const fetchComments = async (id: number) => {
    try {
      setLoadingComments(true);

      const response = await getCommentsTicket(id);

      setDataComments(response);
      setErrorComments(null);
    } catch (error: any) {
      if (error.response.status === 404) {
        setErrorComments("No se encontraron comentarios para este ticket");
      }else{
          setErrorComments("Error al obtener los comentarios del ticket. " + error);
      }
    } finally {
      setLoadingComments(false);
    }
  };
  return { dataComments, loadingComments, errorComments, fetchComments };
};
