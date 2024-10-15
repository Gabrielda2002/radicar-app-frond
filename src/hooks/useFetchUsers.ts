import { useEffect, useState } from "react";
import {
  fetchAuditados,
  fetchAuditoria,
  fetchCirugias,
  fetchConvenio,
  fetchCups,
  fetchDocumento,
  fetchEspecialidad,
  fetchEstados,
  fetchIpsPrimaria,
  fetchIpsRemite,
  fetchLugarRadicado,
  fetchMunicipio,
  fetchRadicador,
  fetchRoles,
  fetchServicio,
  fetchUnidadFuncional,
  fetchUsers,
  fetchUsuario,
} from "../services/apiService";
import { ICups } from "../models/ICups";
import { IRadicador } from "../models/IRadicador";
import { IMunicipios } from "../models/IMunicipios";
import { IConvenios } from "../models/IConvenios";
import { IDocumento } from "../models/IDocumento";
import { IIPSPrimaria } from "../models/IIpsPrimaria";
import { ILugarRadicacion } from "../models/ILugarRadicado";
import { IIPSRemite } from "../models/IIpsRemite";
import { IEspecialidad } from "../models/IEspecialidad";
import { IServicios } from "../models/IServicio";
import { IUsuarios } from "../models/IUsuarios";
import { IRadicados } from "../models/IRadicados";
import { IAuditar } from "../models/IAuditar";
import { IUnidadFuncional } from "../models/IUnidadFuncional";
import { IEstados } from "../models/IEstados";
import { IAuditados } from "../models/IAuditados";
import { IRol } from "../models/IRol";
import { ICirugias } from "../models/ICirugias";

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
        setError("Error al obtener los datos de los usuarios" + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

export const useFetchAuditoria = () => {
  const [data, setData] = useState<IAuditar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const auditorias = await fetchAuditoria();
        setData(auditorias);
      } catch (error) {
        setError("Error al obtener los datos por Auditar." + error);
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
        setError("Error al obtener los datos de los CUPS." + error);
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
        setErrorRadicador("Error al obtener los datos de los Radicadores." + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { dataRadicador, loading, errorRadicador };
};

export const useFetchMunicipio = () => {
  const [data, setData] = useState<IMunicipios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const municipios = await fetchMunicipio();
        setData(municipios);
      } catch (error) {
        setError("Error al obtener los datos de los municipios." + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

export const useFetchConvenio = () => {
  const [dataConvenios, setDataConvenios] = useState<IConvenios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorConvenio, setErrorConvenio] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const convenios = await fetchConvenio();
        setDataConvenios(convenios);
      } catch (error) {
        setErrorConvenio("Error al obtener los datos de los convenios." + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { dataConvenios, loading, errorConvenio };
};

export const useFetchDocumento = () => {
  const [dataDocumento, setDataDocumento] = useState<IDocumento[]>([]);
  const [loadingDocumento, setLoadingDocumento] = useState<boolean>(true);
  const [errorDocumento, setErrorDocumento] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const users = await fetchDocumento();
        setDataDocumento(users);
      } catch (error) {
        setErrorDocumento("Error al obtener los datos de los tipos de documentos." + error);
      } finally {
        setLoadingDocumento(false);
      }
    };

    getData();
  }, []);

  return { dataDocumento, loadingDocumento, errorDocumento };
};

export const useFetchIpsPrimaria = () => {
  const [dataIpsPrimaria, setDataIpsPrimaria] = useState<IIPSPrimaria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorIpsPrimaria, setErrorIpsPrimaria] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const ipsPrimaria = await fetchIpsPrimaria();
        setDataIpsPrimaria(ipsPrimaria);
      } catch (error) {
        setErrorIpsPrimaria("Error al obtener los datos de las IPS Primarias." + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

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
        setError("Error al obtener los datos de los Lugares Radicado." + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

export const useFetchIpsRemite = () => {
  const [data, setData] = useState<IIPSRemite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const ipsRemite = await fetchIpsRemite();
        setData(ipsRemite);
      } catch (error) {
        setError("Error al obtener los datos de las IPS Remitente." + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

export const useFetchEspecialidad = () => {
    const [data, setData] = useState<IEspecialidad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getData = async () => {
        try {
            const especialidad = await fetchEspecialidad();
            setData(especialidad);
        } catch (error) {
            setError("Error al obtener los datos de las especialidades." + error);
        } finally {
            setLoading(false);
        }
        };
    
        getData();
    }, []);
    
    return { data, loading, error };
}

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
            setError("Error al obtener los datos de los servicios." + error);
        } finally {
            setLoading(false);
        }
        };
    
        getData();
    }, []);
    
    return { data, loading, error };
}

export const useFetchUsuarios = () => {
    const [data, setData] = useState<IUsuarios[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getData = async () => {
        try {
            const usuarios = await fetchUsuario();
            setData(usuarios);
        } catch (error) {
            setError("Error al obtener los datos de los usuarios" + error);
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
            setError("Error al obtener las unidades funcionales." + error);
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
        setErrorEstados("Error al obtener los estados: " + error);
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
        setError("Error al obtener los datos de los registros auditados." + error);
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
export const useFetchRoles = () => {
  const [dataRol, setDataRol] = useState<IRol[]>([]);
  const [loadingRol, setLoadingRol] = useState<boolean>(true);
  const [errorRol, setErrorRol] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const roles = await fetchRoles();
        setDataRol(roles);
      } catch (error) {
        setErrorRol("Error al obtener los datos de los roles." + error);
      } finally {
        setLoadingRol(false);
      }
    };

    getData();
  }, []);

  return { dataRol, loadingRol, errorRol };
}

// * traer cirugias
export const useFetchCirugias = () => {
  const [dataCirugias, setDataCirugias] = useState<ICirugias[]>([]);
  const [loadingCirugias, setLoadingCirugias] = useState<boolean>(true);
  const [errorCirugias, setErrorCirugias] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const cirugias = await fetchCirugias();
        setDataCirugias(cirugias);
      } catch (error) {
        setErrorCirugias("Error al obtener los datos de las cirugias." + error);
      } finally {
        setLoadingCirugias(false);
      }
    }
    getData();
  }, []);
  return { dataCirugias, loadingCirugias, errorCirugias };
}