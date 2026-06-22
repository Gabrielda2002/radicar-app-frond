import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import { RADICATION_CARD } from "../config/RadicationCards";
import CardGrid from "@/components/common/Ui/CardGrid";

function RadicationTablesPage(){
  
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
        <div className="p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
            <CardGrid cards={RADICATION_CARD} />
        </div>

      </>
    );
}

export default RadicationTablesPage;