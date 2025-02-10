import { IPacientesCoosalud } from "@/models/IPacientesCoosalud";
import { useState } from "react";
import { fetchPatientCSEp } from "../services/fetchPatientCS";

export const useFetchPatientCS = () => {
    const [patients, setPatients] = useState<IPacientesCoosalud | null>(null);
    const [loadingPatients, setLoadingPatients] = useState(false);
    const [errorPatients, setErrorPatients] = useState<string | null>(null);
  
    const getData = async (identification: string) => {
      try {
        
        const response = await fetchPatientCSEp(identification);
  
        if (!response) {
          setErrorPatients("Patient not found.");
          setPatients(null);
          
        }
        setPatients(response);
        setErrorPatients(null);
  
      } catch (error) {
        setPatients(null);
        setErrorPatients(`Patient not found ${error}` )
      }finally{
        setLoadingPatients(false);
      }
    }
    return { patients, loadingPatients, errorPatients, getData };
}