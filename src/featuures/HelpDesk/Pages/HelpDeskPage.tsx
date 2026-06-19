import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import { HELP_DESK_CARDS } from "../config/HelpDeskCards";
import CardGrid from "@/components/common/Ui/CardGrid";

function HelpDeskPage(){

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

        <div className="p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
            <CardGrid cards={HELP_DESK_CARDS} />
        </div>
    </>  
  )
}


export default HelpDeskPage;