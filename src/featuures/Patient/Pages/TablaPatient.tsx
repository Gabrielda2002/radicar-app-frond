//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchPatient } from "@/featuures/Patient/Hooks/useFetchPatient";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import Input from "@/components/common/Ui/Input";
import Button from "@/components/common/Ui/Button";
import { DataTable } from "@/components/common/ReusableTable";
import { IPacientes } from "@/models/IPacientes";
const ModalPaciente = lazy(() => import("../Components/ModalPatient"));

const TablaPatient = () => {
  const { data: patients, error, getData, refetch } = useFetchPatient();

  const [identificacion, setIdentificacion] = useState<string>("");

  const handleSearch = () => {
    getData(identificacion);
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "20%",
      accessor: (item: IPacientes) => item.id,
    },
    {
      key: "dniNumber",
      header: "Identificación",
      width: "20%",
      accessor: (item: IPacientes) => item.documentNumber,
    },
    {
      key: "dniType",
      header: "Tipo Identificación",
      width: "20%",
      accessor: (item: IPacientes) => item.documentRelation.name,
    },
    {
      key: "name",
      header: "Nombre",
      width: "20%",
      accessor: (item: IPacientes) => item.name,
    },
    {
      key: "numberPhone",
      header: "Teléfono",
      width: "20%",
      accessor: (item: IPacientes) => item.phoneNumber,
    },
    {
      key: "email",
      header: "Email",
      width: "20%",
      accessor: (item: IPacientes) => item.email,
    },
    {
      key: "agreement",
      header: "Convenio",
      width: "20%",
      accessor: (item: IPacientes) => item.convenioRelation.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "20%",
      render: (item: IPacientes) => (item.status ? "Activo" : "Inactivo"),
    },
  ];

  return (
    <>
      <ModalSection
        title="Módulo Pacientes"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Pacientes", path: "" },
        ]}
      />

      <section className="p-5 mb-8 bg-white rounded-md shadow-lg dark:bg-gray-800 container-tabla shadow-indigo-500/40">
        {/* header-table */}
        <section className="flex items-end md:justify-between w-full mb-4">
          <div className="flex md:flex-col flex-wrap w-80">
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
            <Button onClick={handleSearch} variant="secondary" type="button">
              Buscar
            </Button>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <ModalPaciente id={null} paciente={null} onSuccess={refetch} />
          </Suspense>
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
                renderActions={(item) => (
                  <Suspense fallback={<LoadingSpinner />}>
                    <ModalPaciente id={item.id} paciente={item} onSuccess={refetch} />
                  </Suspense>
                )}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default TablaPatient;
