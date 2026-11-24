import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import { USER_CARD } from "../config/UserManagementCard";
import Card from "@/components/common/Ui/Card";

function UserPage() {
  return (
    <>
      <HeaderPage
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "Gestión Usuario", path: "" },
        ]}
        title="Gestión de Usuario"
        description="Gestiona usuarios, áreas, cargos y la información de tu cuenta"
      />

      <div className="mb-11">
        <Card cards={USER_CARD} />
      </div>
    </>
  );
}
export default UserPage;