// src/hooks/useEditProfileForm.ts
import { useState } from "react";
import { useUserProfile } from "../context/userProfileContext";

const useEditProfileForm = () => {
  const { userProfile, updateUserProfile } = useUserProfile();
  const [formData, setFormData] = useState({
    firstName: userProfile.name.split(" ")[0],
    lastName: userProfile.name.split(" ")[1],
    email: userProfile.email,
    photo: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          photo: reader.result as string,
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedProfile = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      imageUrl: formData.photo || userProfile.imageUrl,
    };
    updateUserProfile(updatedProfile);
  };

  return {
    formData,
    handleInputChange,
    handleFileChange,
    handleSubmit,
  };
};

export default useEditProfileForm;
