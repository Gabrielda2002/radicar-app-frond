import { ArrowRight } from "lucide-react";
import React from "react"
import { IconType } from "react-icons";

interface CardProps {
    icon: string | IconType;
    title: string;
    description: string;
    onClick?: () => void;
    actionLabel?: string
}

const Card: React.FC<CardProps> = ({ icon, title, description, onClick, actionLabel = 'Generar Reporte'}) => {

    const IconComponent = typeof icon !== 'string' ? icon : null;
    return (
        <div className="relative group">

            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
                <div className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 text-xs text-justify hyphens-auto line-clamp-4 rounded-lg p-5 shadow-xl leading-relaxed border border-gray-200 dark:border-gray-700">
                    {description}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-gray-800" />
                </div>
            </div>

            <div
                role="button"
                aria-label={`Generar reporte: ${title}`}
                onClick={onClick}
                onKeyDown={(e) => e.key === "Enter" ? onClick?.() : null}
                tabIndex={0}
                className="relative flex flex-col items-start p-4 border border-gray-700 rounded-lg w-2xs min-h-30 space-y-2.5 hover:shadow-indigo-600 shadow-lg ease-in-out duration-500 translate-y-1 hover:scale-105">

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
                    
                    {/* Imagen de encabezado 
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
                    */}
                    <h3 className="font-medium text-lg dark:text-white text-gray-900">{title}</h3>

                    {/*Texto plano descriptivo 
                    <p className="text-gray-500 dark:text-gray-300 text-base text-justify hyphens-auto line-clamp-4" title={description}>
                        {description}
                    </p> 
                    */}

                    {/* button action with a arrow to right */}
                     <div className="flex items-center text-blue-500">
                        <span className="text-sm text-blue-500 group-hover:text-blue-400 font-medium">{actionLabel}</span>
                        <ArrowRight className="w-6 h-6 group-hover:text-blue-400" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
