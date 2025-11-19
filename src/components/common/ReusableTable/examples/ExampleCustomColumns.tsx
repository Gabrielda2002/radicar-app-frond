/**
 * EJEMPLO 2: Tabla con Columnas Personalizadas
 * 
 * Este ejemplo muestra cómo usar render functions
 * para personalizar el contenido de las celdas.
 */

import { DataTable, DataTableContainer, useTableState } from "../index";
import { IUsuarios } from "@/models/IUsuarios";
import { useUsers } from "@/featuures/Usuarios/Context/UsersContext";
import ModalActionUsuario from "@/featuures/Usuarios/Components/ModalUpdateUsers";

export const ExampleCustomColumns = () => {
  // Fetch de datos
  const { users, loading, error } = useUsers();

  // Estado de la tabla
  const tableState = useTableState({
    data: users,
    searchFields: ["id", "dniNumber", "name", "lastName", "email"],
    initialItemsPerPage: 10,
  });

  // Configuración de columnas con renders personalizados
  const columns = [
    {
      key: "id",
      header: "ID",
      accessor: (user: IUsuarios) => user.id,
    },
    {
      key: "dniNumber",
      header: "N.º Documento",
      accessor: (user: IUsuarios) => user.dniNumber,
    },
    {
      key: "name",
      header: "Nombres",
      accessor: (user: IUsuarios) => user.name,
    },
    {
      key: "lastName",
      header: "Apellidos",
      accessor: (user: IUsuarios) => user.lastName,
    },
    {
      key: "email",
      header: "Mail",
      accessor: (user: IUsuarios) => user.email,
    },
    {
      key: "status",
      header: "Estado",
      render: (user: IUsuarios) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            user.status
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
          }`}
        >
          {user.status ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      key: "roles",
      header: "Rol",
      accessor: (user: IUsuarios) => user.roles,
    },
    {
      key: "municipio",
      header: "Municipio",
      accessor: (user: IUsuarios) => user.municipio,
    },
  ];

  return (
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
        getRowKey={(user) => user.id.toString()}
        loading={loading}
        error={error}
        renderActions={(user) => (
          <ModalActionUsuario id={user.id} ususario={user} />
        )}
      />
    </DataTableContainer>
  );
};
