import { ArrowRight } from "lucide-react";
import React from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useSidebarPermissions } from "@/components/layout/sidebar/hooks/useSidebarPermissions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export interface CardItem {
  id: string;
  icon: string | IconType;
  title: string;
  description: string;
  actionLabel?: string;
  roles?: number[];
  onClick?: () => void;
  path?: string;
}

interface CardProps {
  icon?: string | IconType;
  title?: string;
  description?: string;
  onClick?: () => void;
  actionLabel?: string;
  roles?: number[];
  // modo array (nuevo)
  cards?: CardItem[];
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  onClick,
  actionLabel = "Generar Reporte",
  roles,
  cards,
}) => {
  const { hasPermission, userRole } = useSidebarPermissions();
  const navigate = useNavigate();

  // ---- MODO ARRAY ----
  if (cards) {
    if (!userRole) {
      return (
        <div className="flex items-center justify-center p-10">
          <LoadingSpinner />
        </div>
      );
    }

    const filteredCards = cards.filter((card) => hasPermission(card.roles));

    if (filteredCards.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-10 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-semibold">No tienes acceso a ninguna opción</p>
          <p className="text-sm">Contacta al administrador si crees que esto es un error</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
            actionLabel={card.actionLabel}
            roles={card.roles}
            onClick={card.onClick ?? (card.path ? () => navigate(card.path!) : undefined)}
          />
        ))}
      </div>
    );
  }

  // ---- MODO SINGLE (igual que antes, + chequeo de roles) ----
  if (roles && !hasPermission(roles)) return null;

  const IconComponent = typeof icon !== "string" ? icon : null;

  return (
    <div className="relative group h-full">
      <div
        role="button"
        aria-label={`Generar reporte: ${title}`}
        onClick={onClick}
        onKeyDown={(e) => (e.key === "Enter" ? onClick?.() : null)}
        tabIndex={0}
        className="relative flex flex-col justify-between items-start p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg w-full h-full min-h-36 space-y-2.5 hover:shadow-indigo-600/30 shadow-md ease-in-out duration-300 hover:-translate-y-1 hover:scale-[1.02]"
      >
        <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
          {IconComponent ? (
            <IconComponent className="w-16 h-16 dark:text-white text-gray-900" />
          ) : (
            <img src={icon as string} alt="" className="w-16 h-16" />
          )}
        </div>

        <div className="relative z-10 flex flex-col space-y-2 w-full flex-1">
          <span className="dark:bg-gray-700 bg-gray-100 p-2 rounded-md dark:text-white text-gray-800 w-10 h-10 flex items-center justify-center">
            {IconComponent ? (
              <IconComponent className="w-7 h-7" />
            ) : (
              <img src={icon as string} alt="" className="w-6 h-6" />
            )}
          </span>

          <h3 className="font-medium text-lg dark:text-white text-gray-900">{title}</h3>

          <p
            className="text-gray-500 dark:text-gray-300 text-sm sm:text-base leading-relaxed text-justify hyphens-auto line-clamp-4 flex-1"
            title={description}
          >
            {description}
          </p>

          <div className="flex items-center text-blue-500 pt-2 mt-auto">
            <span className="text-sm text-blue-500 group-hover:text-blue-400 font-medium">
              {actionLabel}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:text-blue-400 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;