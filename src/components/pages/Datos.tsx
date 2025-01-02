// import { useEffect, useState, useRef, lazy, Suspense } from "react";
// import Cookies from "js-cookie";
// import { motion } from "framer-motion";
// import { api } from "../../utils/api-config";
// import { useUserProfile } from "../../context/userProfileContext";
// import defaultUserPicture from "../../../public/assets/icon-user.svg";
// import LoadingSpinner from "../LoadingSpinner";
// import ValidacionDatos from "./ValidacionDatos";

// // Icons
// import mail from "/assets/mail.svg";
// import phone from "/assets/phone.svg";
// import trash from "/assets/trash.svg";
// import upload from "/assets/upload.svg";

// const ConfirmDeletePopup = lazy(() => import("../ConfirmDeletePopup"));

// const Perfil = () => {
//   const { updateUserProfile } = useUserProfile();
//   const [profile, setProfile] = useState({
//     nombre: "",
//     apellido: "",
//     email: "",
//     phone: "",
//     photo: "",
//     rol: "",
//     status: "",
//     municipio: "",
//     date: "",
//     dniNumber: "",
//     id: "",
//   });

//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const baseUrl = "http://localhost:3600/api/v1";
//     const userData = JSON.parse(localStorage.getItem("user") || "{}");

//     if (userData) {
//       setProfile(userData);
//       userData.photo = userData.photo
//         ? `${baseUrl}/${userData.photo}`
//         : defaultUserPicture;

//       // Guardar la imagen actual del usuario en cookies
//       Cookies.set(`profileImage_${userData.id}`, userData.photo || "");
//     }
//   }, []);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const formDataUpload = new FormData();
//       formDataUpload.append("photo", file);

//       const token = localStorage.getItem("authToken");

//       try {
//         const response = await api.put(
//           `/upload-photo/${profile.id}`,
//           formDataUpload,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const updatedPhoto = response.data.photo;
//         setProfile({ ...profile, photo: updatedPhoto });
//         updateUserProfile({ imageUrl: updatedPhoto });

//         Cookies.set(`profileImage_${profile.id}`, updatedPhoto);
//         const updatedData = { ...profile, photo: updatedPhoto };
//         localStorage.setItem("user", JSON.stringify(updatedData));
//       } catch (error) {
//         console.error("Error al subir la foto de perfil", error);
//       }
//     }
//   };

//   const handleDeletePhoto = async () => {
//     try {
//       await api.delete(`/delete-photo/${profile.id}`);

//       setProfile({ ...profile, photo: "" });
//       localStorage.removeItem(`profileImage_${profile.id}`);
//       const updatedData = { ...profile, photo: "" };
//       localStorage.setItem("user", JSON.stringify(updatedData));
//     } catch (error) {
//       console.log("Error al eliminar la foto de perfil", error);
//     }
//   };

//   const triggerFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const openDeletePopup = () => {
//     setIsPopupOpen(true);
//   };

//   const closeDeletePopup = () => {
//     setIsPopupOpen(false);
//   };

//   const confirmDeletePhoto = () => {
//     handleDeletePhoto();
//     closeDeletePopup();
//   };

//   // Variantes para Motion
//   const variantes = {
//     hidden: { opacity: 0, x: 100 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//     exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
//   };

//   return (
//     <div className="flex items-center justify-center mb-8 bg-gray-700 rounded-lg h-1/6 dark:bg-gray-500">
//       <section className="p-10 text-gray-900 dark:text-gray-100 body-font">
//         <div className="container mx-auto">
//           <div className="flex flex-row">
//             {/* Perfil Section */}
//             <div className="w-full max-w-lg p-4">
//               <div className="min-w-[500px] max-w-full p-8 text-gray-800 rounded shadow-md sm:flex sm:space-x-6 bg-gray-300 dark:bg-gray-800 dark:text-gray-300">
//                 <div className="flex-shrink-0 w-full mb-6 sm:h-32 sm:w-32 sm:mb-0">
//                   <img
//                     src={profile.photo || defaultUserPicture}
//                     alt="User Icon"
//                     className="object-cover w-full h-full rounded-full"
//                   />
//                 </div>
//                 <div className="flex flex-col space-y-4">
//                   <div>
//                     <h2 className="text-2xl font-semibold">
//                       {profile.nombre} {profile.apellido}
//                     </h2>
//                   </div>
//                   {/* Información de Rol */}
//                   <div className="space-y-1">
//                     <span className="text-sm text-gray-800 dark:text-gray-400">
//                       Rol: {profile.rol}
//                     </span>
//                     <span className="flex items-center space-x-2">
//                       <img
//                         src={mail}
//                         alt="Mail Icon"
//                         className="w-5 h-5 dark:invert"
//                       />
//                       <span className="text-gray-800 break-words dark:text-gray-400">
//                         {profile.email}
//                       </span>
//                     </span>
//                     {/* Información de Teléfono */}
//                     <span className="flex items-center space-x-2">
//                       <img
//                         src={phone}
//                         alt="Phone Icon"
//                         className="w-5 h-5 dark:invert"
//                       />
//                       <span className="text-gray-800 dark:text-gray-400">
//                         Teléfono: {profile.phone}
//                       </span>
//                     </span>
//                   </div>
//                   <div className="flex justify-center mt-4 space-x-4">
//                     <button
//                       className="px-4 py-2 duration-200 rounded shadow bg-gray-600/20 hover:bg-color dark:hover:bg-color dark:bg-gray-700"
//                       onClick={triggerFileInput}
//                     >
//                       <img
//                         src={upload}
//                         alt="Upload Icon"
//                         className="w-6 h-6 dark:invert"
//                         title="Upload"
//                       />
//                     </button>
//                     <button
//                       className="px-4 py-2 duration-200 rounded shadow bg-gray-600/20 hover:bg-red-500 dark:hover:bg-red-600 dark:bg-gray-700"
//                       onClick={openDeletePopup}
//                     >
//                       <img
//                         src={trash}
//                         alt="Trash Icon"
//                         className="w-6 h-6 dark:invert"
//                         title="Delete"
//                       />
//                     </button>
//                   </div>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleFileChange}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Formulario Section */}
//             <div className="flex gap-4 p-4 ">
//               <div className="flex-1 p-8 rounded shadow-md bg-gray-300 dark:bg-gray-800 min-w-[500px]">
//                 <motion.div
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   variants={variantes}
//                   className="mt-3"
//                 >
//                   <ValidacionDatos initialUserData={profile} />
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Suspense fallback={<LoadingSpinner />}>
//         <ConfirmDeletePopup
//           isOpen={isPopupOpen}
//           onClose={closeDeletePopup}
//           onConfirm={confirmDeletePhoto}
//         />
//       </Suspense>
//     </div>
//   );
// };

// export default Perfil;
