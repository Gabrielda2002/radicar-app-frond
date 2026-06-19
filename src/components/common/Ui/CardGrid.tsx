import { useNavigate } from "react-router-dom";
import { useSidebarPermissions } from "@/components/layout/sidebar/hooks/useSidebarPermissions";
import Card from "@/components/common/Ui/Card";
import { IconType } from "react-icons";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export interface CardItem {
  id: string;
  title: string;
  description: string;
  icon: string | IconType;
  actionLabel?: string;
  path: string;
  roles?: number[];
}

interface CardGridProps {
  cards: CardItem[];
}

function CardGrid({ cards }: CardGridProps) {
  const navigate = useNavigate();
  const { hasPermission, userRole } = useSidebarPermissions();

  const filteredCards = cards.filter(card => hasPermission(card.roles));

  if (!userRole) {
    return (
      <div className="flex items-center justify-center p-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (filteredCards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-gray-500 dark:text-gray-400">
        <p className="text-lg font-semibold">No tienes acceso a ninguna opción</p>
        <p className="text-sm">Contacta al administrador si crees que esto es un error</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 p-5">
      {filteredCards.map(card => (
        <Card
          key={card.id}
          icon={card.icon}
          title={card.title}
          description={card.description}
          actionLabel={card.actionLabel}
          onClick={() => navigate(card.path)}
        />
      ))}
    </div>
  );
}

export default CardGrid;