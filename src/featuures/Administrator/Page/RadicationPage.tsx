import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import { useSidebarPermissions } from "@/components/layout/sidebar/hooks/useSidebarPermissions";
import { useNavigate } from "react-router-dom";
import { RADICATION_CARD } from "../config/RadicationCards";
import Card from "@/components/common/Ui/Card";

function RadicationTablesPage(){
    const navigate = useNavigate();
  const { hasPermission } = useSidebarPermissions();

  const filteredCards = RADICATION_CARD.filter(card =>
    hasPermission(card.roles)
  );  
  
  return(  
      <>
        <HeaderPage
            breadcrumb={[
                { label: "Inicio", path: "/home" },
                { label: "Radicacion", path: "" },
            ]}
            title="Radicación"
            description='Administra catálogos clínicos, CUPS, diagnósticos, especialidades, operativos convenios y pacientes'
        />

      <div className='p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40'>
        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-4 p-5'>
          {filteredCards.length > 0 ? (
            filteredCards.map(card => (
              <Card
                key={card.id}
                icon={card.icon}
                title={card.title}
                description={card.description}
                actionLabel={card.actionLabel}
                onClick={() => navigate(card.path)}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No tienes acceso a ninguna opción de este módulo.
            </p> 
          )}
        </div>
      </div>  
      </>
    );
}

export default RadicationTablesPage;