import type { SelectOption } from "@/components/common/Ui/Select";
import { api } from "@/utils/api-config";
import { IMunicipios } from "@/models/IMunicipios";
import { IDepartamentos } from "@/models/IDepartamentos";
import { ICustomSelectOption } from "@/featuures/SystemInventory/Models/ICustomSelectOption";

const cache: Record<string, unknown> = {};

const fetchJson = async <T,>(key: string, path: string): Promise<T> => {
  if (cache[key]) return cache[key] as T;
  const response = await api.get<T>(path);
  cache[key] = response.data;
  return response.data;
};

export const fetchMunicipiosAsOptions = async (): Promise<SelectOption[]> => {
  const data = await fetchJson<IMunicipios[]>("municipios", "/municipios");
  return data.map((m) => ({ value: m.id, label: m.name }));
};

export const fetchDepartamentosAsOptions = async (): Promise<SelectOption[]> => {
  const data = await fetchJson<IDepartamentos[]>(
    "departamentos",
    "/departamentos"
  );
  return data.map((d) => ({ value: d.id, label: d.name }));
};

export const fetchClassificationAsOptions = async (): Promise<SelectOption[]> => {
  const data = await fetchJson<ICustomSelectOption[]>(
    'classification',
    '/clasificaciones'
  )
  return data.map((d) => ({ value: d.id, label: d.name}))
}

export const STATUS_OPTIONS: SelectOption[] = [
  { value: 1, label: "Activo" },
  { value: 0, label: "Inactivo" },
];
