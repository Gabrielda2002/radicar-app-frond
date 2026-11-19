export interface ITurnoSedeConfigAdmin {
  id: number;
  headquarterId: number;
  headquarterName: string;
  slug: string;
  latitude: number;
  longitude: number;
  geoRadiusMeters: number;
  isEnabled: boolean;
  averageServiceMinutes: number;
  updatedAt: string;
}

export interface ITurnoSedeConfigInput {
  headquarterId: number;
  slug: string;
  latitude: number;
  longitude: number;
  geoRadiusMeters: number;
  isEnabled: boolean;
  averageServiceMinutes: number;
}

export interface ITurnoModuloAdmin {
  id: number;
  headquarterId: number;
  headquarterName?: string;
  code: string;
  name: string;
  isActive: boolean;
}

export interface ITurnoModuloInput {
  headquarterId: number;
  code: string;
  name: string;
}

export interface ITurnoModuloUpdate {
  code?: string;
  name?: string;
  isActive?: boolean;
}

export interface ITurnoSedeServicios {
  headquarterId: number;
  assignedServiceIds: number[];
  services: { id: number; name: string; isAssigned: boolean }[];
}
