import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import Tabs, { TabItem } from "@/components/common/Ui/Tabs";
import PpsConfigurationTab from "../Components/Tabs/PpsConfigurationTab";
import PpsProgrammingTab from "../Components/Tabs/PpsProgrammingTab";
import PpsMonitoringTab from "../Components/Tabs/PpsMonitoringTab";

const tabs: TabItem[] = [
  {
    id: "configuracion",
    label: "Configuración",
    content: <PpsConfigurationTab />
  },
  {
    id: "programacion",
    label: "Programación",
    content: <PpsProgrammingTab />
  },
  {
    id: "seguimiento",
    label: "Seguimiento",
    content: <PpsMonitoringTab />
  }
];

const PpsPage: React.FC = () => {
  return (
    <>
      <HeaderPage
        title="Plan de Participación Social en Salud"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "PPS", path: "/pps" }
        ]}
        duration={300}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <Tabs tabs={tabs} defaultTab="configuracion" variant="underline" />
        </div>
      </div>
    </>
  );
};

export default PpsPage;
