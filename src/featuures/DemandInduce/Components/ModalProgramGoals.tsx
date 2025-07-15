import Button from "@/components/common/Ui/Button";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import { useState } from "react";
import { useProgramsGoals } from "../Hooks/useProgramsGoals";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

const ModalProgramGoals = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, error, loading } = useProgramsGoals();

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Ver Metas del Programa
      </Button>

      {error ? (
        <div className="flex items-center justify-center h-screen">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <ModalDefault
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Metas"
          size="md"
        >
          <div>
            <table className="min-w-full overflow-hidden text-sm text-center rounded-lg shadow-lg">
              <thead>
                <tr className="text-sm text-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  <th>Programa</th>
                  <th>Meta</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600 dark:text-gray-300">
                {data.map((p) => (
                  <tr
                    key={p.id}
                    className="text-xs md:text-sm transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                  >
                    <td>{p.program}</td>
                    <td>{p.goal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ModalDefault>
      )}
    </>
  );
};

export default ModalProgramGoals;
