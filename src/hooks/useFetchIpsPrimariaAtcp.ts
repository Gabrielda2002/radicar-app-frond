import { useState } from 'react'
import { IIPSPrimaria } from '../models/IIpsPrimaria';
import { api } from '../utils/api-config';

const useFetchInputAutocomplete = () => {
    
    const [dataIpsPrimaria, setData] = useState<IIPSPrimaria | null>(null);    
    const [loadingIpsPrimaria , setLoading] = useState<boolean>(true);
    const [errorIpsPrimaria, setError] = useState<string | null>(null);

    const fetchInputAutocomplete = async (name: string) => {
        try {

            const response = await api.post('/ips-primaria-name' , {
                name : name
            });
            if (response.data.length === 0) {
                setError("No se encontraron resultados");
                setData(null);
            }else{
                setData(response.data);
                setError(null);
            }
        } catch (error) {
            setError(`Ocurrió un errorIpsPrimaria al intentar obtener la ips primaria.`);
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    return { dataIpsPrimaria, loadingIpsPrimaria , errorIpsPrimaria, fetchInputAutocomplete }

}

export default useFetchInputAutocomplete
