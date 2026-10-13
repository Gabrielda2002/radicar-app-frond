export type CargaAccion = "crear" | "actualizar";

export interface PreviewData {
    ok:                boolean;
    totalRows:         number;
    validRows:         number;
    invalidRows:       number;
    duplicateRows:     any[];
    alreadyExistsRows?: string[];
    notFoundRows?:     string[];
    ambiguousRows?:    string[];
    columns?:          string[];
    rows:              Row[];
}

export interface Row {
    row:    number;
    data:   Data;
    valid:  boolean;
    errors: Error[];
}

export interface Data {
    tipo_documento:   string;
    numero_documento: string;
    nombre_completo:  string;
    celular:          string;
    celular_2:        string;
    telefono_fijo:    string;
    email:            string;
    direccion:        string;
    convenio:         string;
    ips_primaria:     string;
    regimen:          string;
}

export interface Error {
    column:  string;
    message: string;
}

export interface UploadResult {
    ok: boolean;
    message: string;
    inserted?: number;
    updated?: number;
    alreadyExists?: string[];
    duplicates?: string[];
    notFound?: string[];
    ambiguous?: string[];
}
