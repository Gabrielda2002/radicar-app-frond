import { useEffect, useState } from "react";
import { IExpiringEquipment } from "../Models/IExpiringEquipment";
import { getExpiringSoonEquipment } from "../Services/getExpiringSoonEquipment";

export const useFetchExpiringSoon = () => {
    const [expiringSoon, setExpiringSoon] = useState<IExpiringEquipment>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExpiringSoon = async () =>{
            try {
                setLoading(true);
                
                const response = await getExpiringSoonEquipment();
    
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
    }, [])
    return { expiringSoon, loading, error };
}