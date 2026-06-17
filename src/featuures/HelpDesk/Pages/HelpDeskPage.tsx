import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import { useSidebarPermissions } from "@/components/layout/sidebar/hooks/useSidebarPermissions";
import Card from "@/components/common/Ui/Card";
import { useNavigate } from "react-router-dom";
import { HELP_DESK_CARDS } from "../config/HelpDeskCards";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

function HelpDeskPage(){

  const navigate = useNavigate();
  const { hasPermission } = useSidebarPermissions();

  const filteredCards = HELP_DESK_CARDS.filter(card =>
    hasPermission(card.roles)
  );
  return(
    <>
      <HeaderPage
          breadcrumb={[
              { label: "Inicio", path: "/home" },
              { label: "Mesa de Ayuda", path: "" },
          ]}
          title="Mesa de Ayuda"
          description='Centraliza y da seguimiento a todas las incidencias, consultas y solicitudes de soporte'
      />

      <div className='p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40'>

        {!hasPermission ? (
            <LoadingSpinner />
        ) : filteredCards.length === 0 ? (
            <div className='flex flex-col items-center justify-center p-10 text-gray-500 dark:text-gray-400'>
                <p className='text-lg font-semibold'>No tienes acceso a ninguna opción</p>
                <p className='text-sm'>Contacta al administrador si crees que esto es un error</p>
            </div>
        ) : (
            <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-4 p-5'>
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
        )}
      </div>
    </>  
  )
}


export default HelpDeskPage;