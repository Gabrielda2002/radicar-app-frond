// src/context/UserProfileContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserProfile {
  name: string;
  lastName: string;
  email: string;
  imageUrl: string;
  phone: string;
  role: string;
}

interface UserProfileContextType {
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: " ",
    lastName: " ",
    email: " ",
    imageUrl: "https://via.placeholder.com/150",
    phone: "",
    role: "",
  });

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prevProfile) => ({ ...prevProfile, ...profile }));
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};