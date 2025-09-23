import { useEffect, useState } from "react"
import { IQuantityTypeItems } from "../Models/IQuantityTypeItems"
import { api } from "@/utils/api-config";

type FetchQuantityTypeItemsReturn = {
    quantity: IQuantityTypeItems[];
    loading: boolean;
    error: string | null;
}

export const useFetchQuantityTypeItems = (typeItem: string, idHeadquarters?: number): FetchQuantityTypeItemsReturn => {
    const [quantity, setQuantity] = useState<IQuantityTypeItems[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                setLoading(true)

                const endPoint = typeItem === "equipos" ? "equipments/statics/typeEquipment" : typeItem === "dispositivos-red" ? "dispositivos-red/statistics/headquarters" : "inventario/general/statistics/headquarters"

                const response = await api.get(`${endPoint}/${idHeadquarters}`);

                if (response.status === 200 || response.status === 201) {
                    setQuantity(response.data)
                    setError(null)
                }

            } catch (error) {
                setError("Error al cargar los datos de cantidad de items.")
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    }, []);

    return { quantity, loading, error }
}