import { useState } from "react";

export const useUploadFile = (uploadingNewFile: (formData: FormData, id: number | string ) => Promise<void>, folderId: number | string) => {

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [ uploading , setUploading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setSelectedFiles(e.target.files);
        }
      };

      const handleUpload = async () => {
        if (selectedFiles) {
            setUploading(true);
            const formData = new FormData();
            Array.from(selectedFiles).forEach((file) => { 
              formData.append("files", file);
            });
            try {

                await uploadingNewFile(formData, folderId);
                setSelectedFiles(null);

            } catch (error) {
                console.log(error);
            }finally{
                setUploading(false);
            }
        }
      };

      return {
        selectedFiles
        , handleFileChange
        , handleUpload
        , uploading
      }


};
