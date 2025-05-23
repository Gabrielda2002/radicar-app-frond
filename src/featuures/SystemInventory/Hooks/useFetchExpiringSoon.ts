import { useEffect, useState } from "react";
import { IExpiringEquipment } from "../Models/IExpiringEquipment";
import { getExpiringSoonEquipment } from "../Services/getExpiringSoonEquipment";

export const useFetchExpiringSoon = (typeItem: string) => {
    const [expiringSoon, setExpiringSoon] = useState<IExpiringEquipment>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExpiringSoon = async () =>{
            try {
                setLoading(true);

                // cambio endpoitn dependiendo del tipo de item
                const endPoint = typeItem === "equipos" 
                ? 'equipments/statics/warrantyExpiration' 
                : typeItem ==='inventario/general'
                ? 'inventario/general/statistics/warrantyExpiration'
                : typeItem === 'inventario/televisores' 
                ? 'tv/statics/warrantyExpiration'
                : 'celular/statics/warrantyExpiration';
                
                const response = await getExpiringSoonEquipment(endPoint);
    
                if (response.status === 200 || response.status === 201) {
                    setExpiringSoon(response.data);
                    setError(null);
                }
                
            } catch (error) {
                setError("An error occurred while fetching data.");
            }finally {
                setLoading(false);
            }
        }
        fetchExpiringSoon();
    }, [typeItem])
    return { expiringSoon, loading, error };
}