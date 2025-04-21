import { useEffect, useState } from "react"
import { getQuantityTypeItems } from "../Services/getQuantityTypeItems"
import { IQuantityTypeItems } from "../Models/IQuantityTypeItems"

export const useFetchQuantityTypeItems = (typeItem: string) => {
    const [quantity, setQuantity] = useState<IQuantityTypeItems[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        const fetchData = async () => {
            try {
                
                setLoading(true)

                const endPoint = typeItem === "equipos" ? "equipments/statics/typeEquipment" : typeItem === "dispositivos-red" ? "dispositivos-red/statistics/headquarters" : "inventario/general/statistics/headquarters"

                const response = await getQuantityTypeItems(endPoint)

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