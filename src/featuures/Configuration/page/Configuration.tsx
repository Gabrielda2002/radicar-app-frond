import { useState, Suspense, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { configModules, flatTableMap } from "../config/tableRegistry";
import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import Button from "@/components/common/Ui/Button";

const Configuration = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const activeTable = useMemo(
    () => (selectedTable ? flatTableMap[selectedTable] : null),
    [selectedTable]
  );

  const handleBack = () => setSelectedTable(null);

  if (activeTable) {
    const TableComponent = activeTable.component;

    return (
      <div className="space-y-4">
        <Button
          onClick={handleBack}
          variant="any"
          className="cursor-pointer"
        >
          <ArrowLeft size={16} />
          Volver a tablas del sistema
        </Button>
        <Suspense fallback={<LoadingSpinner duration={100000} />}>
          <TableComponent hidePageHeader />
        </Suspense>
      </div>
    );
  }

  return (
    <>
      <HeaderPage
        title="configuración"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "configuration", path: "" }
        ]}
      />
      <div className="space-y-8 p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {configModules.map((module) => {
          const ModuleIcon = module.icon;
          return (
            <section key={module.id}>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-md bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                  <ModuleIcon size={20} />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {module.label}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {module.tables.map((table) => {
                  const Icon = table.icon;
                  return (
                    <button
                      key={table.id}
                      type="button"
                      onClick={() => setSelectedTable(table.id)}
                      className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-teal-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-teal-600 transition-all duration-200 text-left cursor-pointer"
                    >
                      <div className="shrink-0 p-2.5 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                        <Icon size={22} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {table.label}
                        </h3>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {table.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>

  );
};

export default Configuration;
