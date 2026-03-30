export interface ReportRadicacion {
    total: number;
    data:  Datum[];
}

export interface Datum {
    Id:                               number;
    Tipo_de_documento:                string;
    Nombre_del_paciente:              string;
    Numero_documento:                 string;
    Telefono_celular:                 string;
    Telefono_fijo:                    string;
    Correo_electronico:               string;
    Direccion:                        string;
    Convenio:                         string;
    IPS_Primaria:                     string;
    Fecha_de_orden:                   Date;
    Lugar_de_radicacion:              string;
    IPS_Remitente:                    string;
    Profesional:                      string;
    Especialidad:                     string;
    codigo_diagnostico:               string;
    descripcion_diagnostico:          string;
    Grupo_de_servicios:               string;
    Servicios:                        string;
    Radicador:                        string;
    Auditora:                         string;
    Fecha_de_auditoria:               Date;
    radicadoDate:                     Date;
    Codigo_cups:                      string;
    Descripcion_cups:                 string;
    Estado_cups:                      string;
    Unidad_funcional:                 string;
    Fecha_actualizacion:              Date;
    Observacion_seguimiento_auxiliar: string;
}