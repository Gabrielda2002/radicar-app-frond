import { useEffect, useState } from "react";
import {
  fetchAuditados,
  fetchConvenio,
  fetchCups,
  fetchDocumento,
  fetchEstados,
  fetchIpsPrimaria,
  fetchLugarRadicado,
  fetchMonthRadicacionEp,
  fetchMunicipio,
  fetchRadicador,
  fetchRoles,
  fetchServicio,
  fetchUnidadFuncional,
  fetchUsers,
} from "../services/apiService";
import { ICups } from "../models/ICups";
import { IRadicador } from "../models/IRadicador";
import { IMunicipios } from "../models/IMunicipios";
import { IConvenios } from "../models/IConvenios";
import { IDocumento } from "../models/IDocumento";
import { IIPSPrimaria } from "../models/IIpsPrimaria";
import { ILugarRadicacion } from "../models/ILugarRadicado";
import { IServicios } from "../models/IServicio";
import { IRadicados } from "../models/IRadicados";
import { IUnidadFuncional } from "../models/IUnidadFuncional";
import { IEstados } from "../models/IEstados";
import { IAuditados } from "../models/IAuditados";
import { IRol } from "../models/IRol";
import { IEstadisticaCups } from "../models/IMonthDataRadicacion";

export const useFetchUsers = () => {
  const [data, setData] = useState<IRadicados[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const users = await fetchUsers();
        setData(users);
      } catch (error) {
        setError("Error al obtener los datos de la tabla radicación o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};


export const useFetchCups = () => {
  const [data, setData] = useState<ICups[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const cups = await fetchCups();
        setData(cups);
      } catch (error) {
        setError("Error al obtener los datos de los CUPS o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

export const useFetchRadicador = () => {
  const [dataRadicador, setDataRadicador] = useState<IRadicador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorRadicador, setErrorRadicador] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const radicadores = await fetchRadicador();
        setDataRadicador(radicadores);
      } catch (error) {
        setErrorRadicador("Error al obtener los datos de la tabla radicadores o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { dataRadicador, loading, errorRadicador };
};

export const useFetchMunicipio = (shouldFetch: boolean) => {
  const [municipios, setMunicipios] = useState<IMunicipios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMunicipios, setErrorMunicipios] = useState<string | null>(null);

  useEffect(() => {
    
    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const municipios = await fetchMunicipio();
        setMunicipios(municipios);
      } catch (error) {
        setErrorMunicipios("Error al obtener los datos de la tabla municipios o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [shouldFetch]);

  return { municipios, loading, errorMunicipios };
};

export const useFetchConvenio = (shouldFetch: boolean) => {
  const [dataConvenios, setDataConvenios] = useState<IConvenios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorConvenio, setErrorConvenio] = useState<string | null>(null);

  useEffect(() => {

    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const convenios = await fetchConvenio();
        setDataConvenios(convenios);
      } catch (error) {
        setErrorConvenio("Error al obtener los datos de la tabla convenios o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [shouldFetch]);

  return { dataConvenios, loading, errorConvenio };
};

export const useFetchDocumento = (shouldFetch: boolean) => {
  const [dataDocumento, setDataDocumento] = useState<IDocumento[]>([]);
  const [loadingDocumento, setLoadingDocumento] = useState<boolean>(true);
  const [errorDocumento, setErrorDocumento] = useState<string | null>(null);

  useEffect(() => {

    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const users = await fetchDocumento();
        setDataDocumento(users);
      } catch (error) {
        setErrorDocumento("Error al obtener los datos de los datos de la tabla tipo documento o no tienes los permisos necesarios. " + error);
      } finally {
        setLoadingDocumento(false);
      }
    };

    getData();
  }, [shouldFetch]);

  return { dataDocumento, loadingDocumento, errorDocumento };
};

export const useFetchIpsPrimaria = (shouldFetch: boolean) => {
  const [dataIpsPrimaria, setDataIpsPrimaria] = useState<IIPSPrimaria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorIpsPrimaria, setErrorIpsPrimaria] = useState<string | null>(null);

  useEffect(() => {

    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const ipsPrimaria = await fetchIpsPrimaria();
        setDataIpsPrimaria(ipsPrimaria);
      } catch (error) {
        setErrorIpsPrimaria("Error al obtener los datos de la tabla IPS primaria o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [shouldFetch]);

  return { dataIpsPrimaria, loading, errorIpsPrimaria };
};

export const useFetchLugarRadicado = () => {
  const [data, setData] = useState<ILugarRadicacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const lugarRadicado = await fetchLugarRadicado();
        setData(lugarRadicado);
      } catch (error) {
        setError("Error al obtener los datos de la tabla lugar radicacion o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

export const useFetchServicios = () => {
    const [data, setData] = useState<IServicios[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getData = async () => {
        try {
            const servicios = await fetchServicio();
            setData(servicios);
        } catch (error) {
            setError("Error al obtener los datos de la tabla servicios o no tienes los permisos necesarios. " + error);
        } finally {
            setLoading(false);
        }
        };
    
        getData();
    }, []);
    
    return { data, loading, error };
}

export const useFetchUnidadFuncional = () => {
    const [data, setData] = useState<IUnidadFuncional[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getData = async () => {
        try {
            const unidadFuncional = await fetchUnidadFuncional();
            setData(unidadFuncional);
        } catch (error) {
            setError("Error al obtener los datos de la tabla unidad funcional o no tienes los permisos necesarios. " + error);
        } finally {
            setLoading(false);
        }
        };
    
        getData();
    }, []);
    
    return { data, loading, error };
}
  // Asumiendo que fetchEstados es la función que hace la solicitud
export const useFetchEstados = (shouldFetch: boolean) => {
  const [dataEstados, setDataEstados] = useState<IEstados[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorEstados, setErrorEstados] = useState<string | null>(null);

  useEffect(() => {
    // * si shouldFetch es false, no se hace la solicitud ya que le modal aun no esta abierto
    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const estados = await fetchEstados();
        setDataEstados(estados);
      } catch (error) {
        setErrorEstados("Error al obtener los estados o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [shouldFetch]); // Se ejecuta solo cuando shouldFetch cambia a true

  return { dataEstados, loading, errorEstados };
};


// traer datos para los registros auditados de auditoria

export const useFetchAuditados = () => {
  const [data, setData] = useState<IAuditados[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
  
    const getData = async () => {
      try {
        const auditados = await fetchAuditados();
        if (isMounted) {
          setData(auditados);
        }
      } catch (error) {
        setError("Error al obtener los datos de la tabla auditados o no tienes los permisos necesarios. " + error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
  
    getData();
  
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}

// * traer roles
export const useFetchRoles = (shouldFetch: boolean) => {
  const [dataRol, setDataRol] = useState<IRol[]>([]);
  const [loadingRol, setLoadingRol] = useState<boolean>(true);
  const [errorRol, setErrorRol] = useState<string | null>(null);

  useEffect(() => {

    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const roles = await fetchRoles();
        setDataRol(roles);
      } catch (error) {
        setErrorRol("Error al obtener los datos de la tabla roles o no tienes los permisos necesarios. " + error);
      } finally {
        setLoadingRol(false);
      }
    };

    getData();
  }, [ shouldFetch ]);

  return { dataRol, loadingRol, errorRol };
}
// traer datos 
export const useFetchMonth = () => {
  const [dataMonth, setDataMonth] = useState<IEstadisticaCups[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [errorDataMonth, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const cirugias = await fetchMonthRadicacionEp();
        setDataMonth(cirugias);
        setError(null);
      } catch (error) {
        setError("Error al obtener los departamentos o no tienes los permisos necesarios. " + error);
        setDataMonth(null);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);
  return { dataMonth, loading, errorDataMonth };
}

 
