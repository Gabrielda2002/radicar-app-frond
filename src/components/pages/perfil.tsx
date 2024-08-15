import React from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
  document: string;
  email: string;
  registrationDate: string;
  status: string;
  city: string;
  role: string;
  imageSrc: string;
}

const Profile: React.FC<UserProfile> = ({
  firstName,
  lastName,
  document,
  email,
  registrationDate,
  status,
  city,
  role,
  imageSrc,
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-center">
          <img
            className="w-24 h-24 rounded-full shadow-lg"
            src={imageSrc}
            alt={`${firstName} ${lastName}`}
          />
        </div>
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-600">{role}</p>
        </div>
        <div className="mt-6">
          <p>
            <span className="font-bold">Documento:</span> {document}
          </p>
          <p>
            <span className="font-bold">Email:</span> {email}
          </p>
          <p>
            <span className="font-bold">Fecha de Registro:</span>{" "}
            {registrationDate}
          </p>
          <p>
            <span className="font-bold">Estado:</span> {status}
          </p>
          <p>
            <span className="font-bold">Ciudad:</span> {city}
          </p>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded shadow">
            Editar Perfil
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded shadow">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
