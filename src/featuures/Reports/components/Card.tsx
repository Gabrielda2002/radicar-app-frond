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
            <div className="flex flex-col items-start p-4 border border-gray-700 rounded-lg w-2xs space-y-2.5 hover:shadow-indigo-600 shadow-lg ease-in-out duration-500">
                <span className="dark:bg-gray-700 bg-gray-300 p-2 rounded-md dark:text-white text-black ">
                    {IconComponent ? (
                        <IconComponent className="w-6 h-6" />
                    ) : (
                        <img
                            src={icon as string}
                            alt=""
                            className="w-6 h-6"
                        />
                    )}
                </span>
                <h3 className="font-medium text-lg dark:text-white text-gray-900">{title}</h3>
                <p className="text-gray-500 dark:text-gray-300 text-base text-justify hyphens-auto">{description}</p>
                {/* button action with a arrow to right */}
                <div className="flex items-center space-x-2 mt-4">
                    <span className="text-sm text-blue-500 hover:text-blue-700 font-medium">Seleccionar Filtros</span>
                    <button onClick={onClick} className="text-sm cursor-pointer text-blue-500 hover:text-blue-700 font-medium"><ArrowRight className="w-6 h-6" /></button>
                </div>
            </div>
        </>
    )
}

export default Card
