import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import { USER_CARD } from "../config/UserManagementCard";
import CardGrid from "@/components/common/Ui/CardGrid";

function UserCard() {
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
        
        <div className="p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
            <CardGrid cards={USER_CARD} />
        </div>
    </>
  );
}
export default UserCard;