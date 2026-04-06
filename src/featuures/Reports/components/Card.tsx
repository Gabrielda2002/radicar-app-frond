import { ArrowRight } from "lucide-react";
import React from "react"
import { IconType } from "react-icons";

interface CardProps {
    icon: string | IconType;
    title: string;
    description: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ icon, title, description, onClick }) => {

    const IconComponent = typeof icon !== 'string' ? icon : null;
    return (
        <>
            <div className="relative flex flex-col items-start p-4 border border-gray-700 rounded-lg w-2xs space-y-2.5 hover:shadow-indigo-600 shadow-lg ease-in-out duration-500">

                {/* large decorative background icon */}
                <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
                    {IconComponent ? (
                        <IconComponent className="w-16 h-16 dark:text-white text-gray-900" />
                    ) : (
                        <img
                            src={icon as string}
                            alt=""
                            className="w-16 h-16"
                        />
                    )}
                </div>

                <div className=" relative z-10 flex flex-col space-y-2 w-full">
                    <span className="dark:bg-gray-700 bg-gray-300 p-2 rounded-md dark:text-white text-black w-10 h-10 flex items-center justify-center">
                        {IconComponent ? (
                            <IconComponent className="w-7 h-7" />
                        ) : (
                            <img
                                src={icon as string}
                                alt=""
                                className="w-6 h-6"
                            />
                        )}
                    </span>
                    <h3 className="font-medium text-lg dark:text-white text-gray-900">{title}</h3>
                    <p className="text-gray-500 dark:text-gray-300 text-base text-justify hyphens-auto line-clamp-4">{description}</p>
                    {/* button action with a arrow to right */}
                    <button onClick={onClick} className="flex group items-center text-sm cursor-pointer text-blue-500 font-medium">
                        <span className="text-sm text-blue-500 group-hover:text-blue-400 font-medium">Generar Reporte</span>
                        <ArrowRight className="w-6 h-6 group-hover:text-blue-400" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Card
