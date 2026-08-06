import { useState } from "react";
import { api } from "@/utils/api-config";
import { toast } from "react-toastify";
import Input from "@/components/common/Ui/Input";
import Button from "@/components/common/Ui/Button";
import { IdCard, Search } from "lucide-react";
import { IPacientes } from "@/models/IPacientes";

interface BuscadorPacienteProps {
  onPatientFound: (patient: IPacientes) => void;
  disabled?: boolean;
  renderPatientInfo?: (patient: IPacientes) => React.ReactNode;
}

const BuscadorPaciente: React.FC<BuscadorPacienteProps> = ({
  onPatientFound,
  disabled = false,
  renderPatientInfo,
}) => {
  const [documento, setDocumento] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [paciente, setPaciente] = useState<IPacientes | null>(null);

  const handleSearch = async () => {
    if (!documento.trim()) {
      toast.error("Ingrese un número de documento");
      return;
    }

    setIsSearching(true);

    try {
      const response = await api.post("/pacientes-documento", {
        documentNumber: documento.trim(),
      });

      if (response.status === 200 && response.data) {
        const patientData: IPacientes = response.data;
        setPaciente(patientData);
        onPatientFound(patientData);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error("Paciente no encontrado");
      } else {
        toast.error("Error al buscar el paciente");
      }
      setPaciente(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const defaultPatientInfo = (patient: IPacientes) => (
    <>
      <p className="text-sm font-medium text-green-800 dark:text-green-200">
        Paciente encontrado:{" "}
        <span className="font-semibold">{patient.name}</span>
      </p>
      <p className="text-xs text-green-600 dark:text-green-300">
        Documento: {patient.documentNumber}
      </p>
    </>
  );

  return (
    <div className="space-y-3">
      <h5 className="text-xl font-semibold text-blue-500 dark:text-gray-200">
        Datos del Paciente:
      </h5>

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <Input
            type="text"
            id="documentoPaciente"
            name="documentoPaciente"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ingrese número de documento"
            label="Documento del Paciente"
            required={true}
            icon={<IdCard className="w-5 h-5" />}
            iconPosition="left"
            disabled={disabled}
          />
        </div>
        <Button
          type="button"
          variant="primary"
          size="md"
          icon={<Search className="w-5 h-5" />}
          iconPosition="left"
          onClick={handleSearch}
          isLoading={isSearching}
          disabled={disabled || !documento.trim()}
        >
          Buscar
        </Button>
      </div>

      {paciente && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800">
          {renderPatientInfo ? renderPatientInfo(paciente) : defaultPatientInfo(paciente)}
        </div>
      )}
    </div>
  );
};

export default BuscadorPaciente;
