import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { api } from "@/utils/api-config";
import { IProfile } from "@/models/IProfile";

export const usePerfil = () => {
  const [profile, setProfile] = useState<IProfile>({
    id: 0,
    name: "",
    lastname: "",
    email: "",
    phone: 0,
    photo: "",
    rol: "",
    status: false,
    municipality: "",
    dniNumber: 0,
    area: "",
    position: "",
    headquarters: "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const baseUrl = `${import.meta.env.VITE_URL_BACKEND}/api/v1`;
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    if (userData) {
      setProfile(userData);
      userData.photo = userData.photo
        ? `${baseUrl}/${userData.photo}`
        : "/assets/icon-user.svg";
      // Guardar la imagen actual del usuario en cookies
      Cookies.set(`profileImage_${userData.id}`, userData.photo || "");
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formDataUpload = new FormData();
      formDataUpload.append("photo", file);

      const token = localStorage.getItem("authToken");

      try {
        const response = await api.put(
          `/upload-photo/${profile.id}`,
          formDataUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedPhoto = response.data.photo;
        setProfile({ ...profile, photo: updatedPhoto });

        Cookies.set(`profileImage_${profile.id}`, updatedPhoto);
        const updatedData = { ...profile, photo: updatedPhoto };
        localStorage.setItem("user", JSON.stringify(updatedData));
      } catch (error) {
        console.error("Error al subir la foto de perfil", error);
      }
    }
  };

  const handleDeletePhoto = async () => {
    try {
      await api.delete(`/delete-photo/${profile.id}`);

      setProfile({ ...profile, photo: "" });
      Cookies.remove(`profileImage_${profile.id}`);
      const updatedData = { ...profile, photo: "" };
      localStorage.setItem("user", JSON.stringify(updatedData));
    } catch (error) {
      console.log("Error al eliminar la foto de perfil", error);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const openDeletePopup = () => {
    setIsPopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsPopupOpen(false);
  };

  const confirmDeletePhoto = () => {
    handleDeletePhoto();
    closeDeletePopup();
  };

  return {
    profile,
    isPopupOpen,
    fileInputRef,
    handleFileChange,
    triggerFileInput,
    openDeletePopup,
    closeDeletePopup,
    confirmDeletePhoto,
  };
};
