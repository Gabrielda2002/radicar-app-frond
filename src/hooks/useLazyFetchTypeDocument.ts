import { IDocumento } from "@/models/IDocumento";
import { api } from "@/utils/api-config";
import { useCallback, useState } from "react";

type UseLazyFetchTypeDocumentResult = {
  dataDocument: IDocumento[];
  loadingDocument: boolean;
  errorDocument: string | null;
  fetchDocument: () => Promise<void>;
};

export const useLazyFetchTypeDocument = (): UseLazyFetchTypeDocumentResult => {
  const [dataDocument, setDataDocument] = useState<IDocumento[]>([]);
  const [loadingDocument, setLoadingDocument] = useState<boolean>(false);
  const [errorDocument, setErrorDocument] = useState<string | null>(null);

  const fetchDocument = useCallback(async () => {
    if (dataDocument.length > 0) return;

    setLoadingDocument(true);

    try {
      const response = await api.get("/documento");
      if (response.status === 200 || response.status === 201) {
        setDataDocument(response.data);
        setErrorDocument(null);
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        setErrorDocument(
          "Error del servidor. Por favor, inténtelo de nuevo más tarde."
        );
      } else {
        setErrorDocument(error.response?.data?.message);
      }
    } finally {
      setLoadingDocument(false);
    }
  }, [dataDocument.length]);

  return {
    dataDocument,
    loadingDocument,
    errorDocument,
    fetchDocument,
  };
};
