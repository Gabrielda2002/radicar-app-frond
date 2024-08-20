import { useState } from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  photo: string;
}

const useProfile = () => {
  // Estado para el perfil del usuario
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Jostin",
    lastName: "Gomez",
    email: "jostingomez03@gmail.com",
    phone: "+57 3008929774",
    role: "Software Developer",
    photo: " ",
  });

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    photo: "",
  });

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  // Manejar el cambio de la foto de perfil
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          photo: reader.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Actualizar solo los campos que no están vacíos
    setProfile((prevProfile) => ({
      ...prevProfile,
      firstName: formData.firstName || prevProfile.firstName,
      lastName: formData.lastName || prevProfile.lastName,
      email: formData.email || prevProfile.email,
      phone: formData.phone || prevProfile.phone,
      role: formData.role || prevProfile.role,
      photo: formData.photo || prevProfile.photo, // Mantener la foto actual si no se cambia
    }));

    // Limpiar el formulario después de la actualización
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      photo: "",
    });
  };

  return {
    profile,
    formData,
    handleInputChange,
    handleFileChange,
    handleSubmit,
  };
};

export default useProfile;
