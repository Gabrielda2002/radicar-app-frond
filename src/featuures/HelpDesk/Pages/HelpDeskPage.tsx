import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import { HELP_DESK_CARDS } from "../config/HelpDeskCards";
import Card from "@/components/common/Ui/Card";

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

        <div className="mb-11">
            <Card cards={HELP_DESK_CARDS} />
        </div>
    </>  
  )
}


export default HelpDeskPage;