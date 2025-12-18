//*Funciones y Hooks
import { Suspense } from "react";
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { IUsuarios } from "@/models/IUsuarios";

//*Properties
import ModalActionUsuario from "../Components/ModalUpdateUsers";
import { useUsers } from "@/featuures/Usuarios/Context/UsersContext.tsx";
import { ColumnConfig, DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";


const Usuarios = () => {
  const { users: data, loading, error } = useUsers();

  const tableState = useTableState({
    data: data,
    searchFields: [
      "id",
      "dniNumber",
      "name",
      "lastName",
      "documento",
      "email",
      "status",
      "roles",
      "municipio",
    ],
    initialItemsPerPage: 10
  });

  const columns: ColumnConfig<IUsuarios>[] = [
    {
      key: "id",
      header: "ID",
      accessor: (item: IUsuarios) => item.id,
    },
    {
      key: "dniNumber",
      header: "N.º Documento",
      accessor: (item: IUsuarios) => item.dniNumber,
    },
    {
      key: "documento",
      header: "Tipo Documento",
      accessor: (item: IUsuarios) => item.documento,
    },
    {
      key: "name",
      header: "Nombres",
      accessor: (item: IUsuarios) => item.name,
    },
    {
      key: "lastName",
      header: "Apellidos",
      accessor: (item: IUsuarios) => item.lastName,
    },
    {
      key: "municipio",
      header: "Municipio",
      accessor: (item: IUsuarios) => item.municipio,
    },
    {
      key: "email",
      header: "Mail",
      accessor: (item: IUsuarios) => item.email,
    },
    {
      key: "status",
      header: "Estado",
      render: (item: IUsuarios) => (
        <span className={item.status ? "text-green-500 dark:text-green-600" : "text-red-500 dark:text-red-600"}>{item.status ? "Activo" : "Inactivo"}</span>
      ),
    },
    {
      key: "roles",
      header: "Rol",
      accessor: (item: IUsuarios) => item.roles,
    },
  ]

  return (
    <>
      <ModalSection
        title="Módulo Usuarios"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Usuarios", path: "" },
        ]}
      />
      <DataTableContainer
        searchValue={tableState.searchQuery}
        onSearchChange={tableState.setSearchQuery}
        itemsPerPage={tableState.itemsPerPage}
        onItemsPerPageChange={tableState.setItemsPerPage}
        currentPage={tableState.currentPage}
        totalPages={tableState.totalPages}
        onPageChange={tableState.paginate}
      >
        <DataTable
          data={tableState.currentData()}
          columns={columns}
          getRowKey={(item) => item.id.toString()}
          loading={loading}
          error={error}
          renderActions={(item) => (
            <Suspense fallback={<LoadingSpinner />}>
              <ModalActionUsuario
                ususario={item}
                id={item.id}
              />
            </Suspense>
          )}
        />
      </DataTableContainer>
    </>
  );
};

export default Usuarios;
