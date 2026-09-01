//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchPatient } from "@/featuures/Patient/Hooks/useFetchPatient";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import Input from "@/components/common/Ui/Input";
import Button from "@/components/common/Ui/Button";
import { ColumnConfig, DataTable } from "@/components/common/ReusableTable";
import { IPacientes } from "@/models/IPacientes";
import ModalUploadPatients from "../Components/ModalUploadPatients";
import { useAuth } from "@/context/authContext";
const ModalPaciente = lazy(() => import("../Components/ModalPatient"));

interface TablaPatientProps {
  hidePageHeader?: boolean;
}

const TablaPatient = ({ hidePageHeader = false }: TablaPatientProps) => {
  const { data: patients, error, getData, refetch } = useFetchPatient();

  const { rol } = useAuth()

  const [identificacion, setIdentificacion] = useState<string>("");

  const handleSearch = () => {
    getData(identificacion);
  };

  const columns: ColumnConfig<IPacientes>[] = [
    {
      key: "id",
      header: "ID",
      size: "xs" as const,
      accessor: (item: IPacientes) => item.id,
    },
    {
      key: "dniNumber",
      header: "Identificación",
      size: "sm" as const,
      accessor: (item: IPacientes) => item.documentNumber,
    },
    {
      key: "dniType",
      header: "Tipo Identificación",
      size: "xs" as const,
      accessor: (item: IPacientes) => item.documentRelation.name,
    },
    {
      key: "name",
      header: "Nombre",
      size: "sm" as const,
      accessor: (item: IPacientes) => item.name,
    },
    {
      key: "numberPhone",
      header: "Teléfono",
      size: "md" as const,
      accessor: (item: IPacientes) => item.phoneNumber,
    },
    {
      key: "email",
      header: "Email",
      size: "md" as const,
      accessor: (item: IPacientes) => item.email,
    },
    {
      key: "agreement",
      header: "Convenio",
      size: "md" as const,
      accessor: (item: IPacientes) => item.convenioRelation.name,
    },
    {
      key: "status",
      header: "Estado",
      size: "sm" as const,
      render: (item: IPacientes) => (item.status ? "Activo" : "Inactivo"),
    },
    {
      key: "actions",
      header: "Acciones",
      size: "md" as const,
      render: (item) => (
        <ModalPaciente id={item.id} paciente={item} onSuccess={refetch} />
      )
    }
  ];

  return (
    <>
      {!hidePageHeader && (
        <ModalSection
          title="Módulo Pacientes"
          breadcrumb={[
            { label: "Inicio", path: "/home" },
            { label: "/ Servicio Pacientes", path: "" },
          ]}
        />
      )}

      <section className="p-5 mb-8 bg-white rounded-md shadow-lg dark:bg-gray-800 container-tabla shadow-indigo-500/40">
        <section className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div className="flex items-end gap-2 w-full md:w-96">
            <div className="flex-1">
              <Input
                label="Identificación del Paciente"
                type="text"
                placeholder="Buscar paciente"
                onChange={(e) => setIdentificacion(e.target.value)}
                helpText="Ingrese el número de identificación del paciente y presione buscar."
                error={error ? error : undefined}
                touched={!!error}
                value={identificacion}
                required
              />
            </div>
            <Button onClick={handleSearch} variant="secondary" type="button">
              Buscar
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {[1].includes(Number(rol)) && (
              <ModalUploadPatients />
            )}
            <Suspense fallback={<LoadingSpinner />}>
              <ModalPaciente id={null} paciente={null} onSuccess={refetch} />
            </Suspense>
          </div>
        </section>
        <div>
          {patients && (
            <>
              <DataTable
                data={[patients]}
                columns={columns}
                getRowKey={(item) => item.id.toString()}
                loading={false}
                error={null}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default TablaPatient;