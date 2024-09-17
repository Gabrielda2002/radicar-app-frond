import { useEffect, useState } from "react";
import {
  fetchAuditoria,
  fetchConvenio,
  fetchCups,
  fetchDocumento,
  fetchEspecialidad,
  fetchIpsPrimaria,
  fetchIpsRemite,
  fetchLugarRadicado,
  fetchMunicipio,
  fetchRadicador,
  fetchServicio,
  fetchUsers,
  fetchUsuario,
} from "../services/apiService";
import { IAuditoria } from "../models/IAuditoria";
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
  const [data, setData] = useState<IAuditoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const auditorias = await fetchAuditoria();
        setData(auditorias);
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
        setError("Error al obtener los datos de los usuarios" + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

export const useFetchRadicador = () => {
  const [data, setData] = useState<IRadicador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const radicadores = await fetchRadicador();
        setData(radicadores);
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
        setError("Error al obtener los datos de los usuarios" + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

export const useFetchConvenio = () => {
  const [data, setData] = useState<IConvenios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const convenios = await fetchConvenio();
        setData(convenios);
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

export const useFetchDocumento = () => {
  const [data, setData] = useState<IDocumento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const users = await fetchDocumento();
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

export const useFetchIpsPrimaria = () => {
  const [data, setData] = useState<IIPSPrimaria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const ipsPrimaria = await fetchIpsPrimaria();
        setData(ipsPrimaria);
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
        setError("Error al obtener los datos de los usuarios" + error);
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
        setError("Error al obtener los datos de los usuarios" + error);
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
            setError("Error al obtener los datos de los usuarios" + error);
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
            setError("Error al obtener los datos de los usuarios" + error);
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
