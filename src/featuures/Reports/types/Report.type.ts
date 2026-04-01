// Generic preview data structure for any report
export interface ReportPreviewData<T = any> {
    total: number;
    data: T[];
}

// Specific report type for Radicacion
export interface ReportRadicacion {
    total: number;
    data:  Datum[];
}

// Configuration for dynamic filter fields
export interface FilterFieldConfig {
    name: string;
    label: string;
    type: 'text' | 'date' | 'select' | 'number';
    required?: boolean;
    options?: { value: string; label: string }[];
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

export interface ReportCirugias {
    Fecha_ordenamiento:   Date;
    Fecha_cirugia:        Date;
    Hora_programada:      string;
    IPS_Remitente:        string;
    Observaciones:        string;
    diagnostico_name:     string;
    diagnostico_code:     string;
    especialista:         string;
    fecha_paraclinico:    Date;
    fecha_anesteciologia: Date;
    Fecha_registro:       Date;
    Codigo_cups:         string;
    Descripcion_cups:    string;
    Observacionesgestion: string;
    Estado:               string;
}

export interface assistantReportData {
    id_radicado:      number;
    radicadoDate:     Date;
    numero_documento: string;
    nombre_paciente:  string;
    codigo_cups:      string;
    descripcion_cups: string;
    estado_gestion:   string;
    observacion:      string;
    fecha_registro:   Date;
    usuario_registro: string;
}

export interface breaksRecordData {
    fecha_creacion:    Date;
    observacion:       string;
    nombre_usuario:    string;
    apellidos_usuario: string;
    area:              string;
    cargo:             string;
    sede:              string;
    numero_documento:  number;
}

export interface biometricRecordData {
    numero_documento: number;
    nombre_usuario:   string;
    apellidos:        string;
    fecha_registro:   Date;
    hora_registro:    string;
    sede:             string;
    area:             string;
}

export interface helpdeskTicketData {
    fecha_registro:          Date;
    descripcion:             string;
    categoria:               string;
    titulo:                  string;
    usuario_solicitante:     string;
    sede_solicitante:        string;
    usuario_responsable:     string;
    ultimo_estado:           string;
    ultimo_comentario:       string;
    fecha_ultimo_comentario: Date;
}

export interface demandaInducidaData {
    tipo_documento:            string;
    numero_identificacion:     string;
    fecha_actividad:           string;
    elemento_demanda:          string;
    tipo_elemento:             string;
    objetivo:                  string;
    numero_telefono_contacto:  string;
    clasificacion_seguimiento: string;
    persona_recibe_llamada:    string;
    relacion_usuario:          string;
    fecha_llamada:             string;
    hora_llamada:              string;
    texto_llamada:             string;
    barreras_acceso:           string;
    area_dificultad:           string;
    area_eps:                  string;
    resumen_actividades:       string;
    soportes_recuperados:      string;
    departamento:              string;
    municipio:                 string;
    barrio_vereda:             string;
    numero_telefono:           string;
    correo_electronico:        string;
    resultado_llamada:         string;
    fecha_envio:               string;
    hora_envio:                string;
    texto_mensaje:             string;
    fecha_visita:              string;
    resumen_visita:            string;
    motivo_visita_no_efectiva: string;
    persona_seguimiento:       string;
    area_persona:              string;
    programa:                  string;
    fecha_asignacion_cita:     string;
    Profesional:               string;
}

export interface EquipmentReportData {
    headquarters:               string;
    name:                       string;
    typeEquipment:              string;
    brand:                      string;
    model:                      string;
    serial:                     string;
    systemOperating:            string;
    mac:                        string;
    purchaseDate:               Date;
    warrantyTime:               string;
    warranty:                   boolean | string;
    deliveryDate:               Date;
    inventoryNumber:            string;
    dateCreated:                Date;
    dateUpdate:                 Date;
    dhcp:                       string;
    ipAddress:                  string;
    userResponsable:            string;
    lock:                       string;
    lockPassword:               string;
    peripheralsName:            string;
    peripheralsBrand:           string;
    peripheralsModel:           string;
    peripheralsSerial:          string;
    peripheralsOtherData:       string;
    peripheralsStatus:          string;
    peripheralsInventoryNumber: string;
    peripheralsDateCreated:     string;
    peripheralsDateUpdate:      string;
    softwareName:               string;
    softwareVersion:            string;
    softwareLicense:            string;
    softwareOtherData:          string;
    softwareInstallationDate:   string;
    softwareStatus:             string;
    softwareDateCreated:        string;
    softwareDateUpdated:        string;
    componentName:              string;
    componentBrand:             string;
    componentCapacity:          string;
    componentSpeed:             string;
    componentOtherData:         string;
    componentModel:             string;
    componentDateCreated:       string;
    componentDateUpdated:       string;
}

export interface deviceReportData {
    name:            string;
    brand:           string;
    model:           string;
    addressIp:       string;
    mac:             string;
    serial:          string;
    otherData:       string;
    status:          string;
    headquarters:    string;
    inventoryNumber: string;
    createdAt:       Date;
    updatedAt:       Date;
}


export interface generalInventoryReportData {
    createdAt:       Date;
    classification:  string;
    asset:           string;
    material:        string;
    status:          string;
    responsible:     string;
    areaType:        string;
    dependencyArea:  string;
    assetType:       string;
    headquarters:    string;
    name:            string;
    brand:           string;
    model:           string;
    serial:          string;
    location:        string;
    inventoryNumber: string;
    quantity:        number;
    otherData:       string;
    acquisitionDate: Date;
    purchaseValue:   string;
    warranty:        string;
    warrantyPeriod:  string;
    dateUpdate:      Date;
}

export interface tvReportData {
    createdAt:        Date;
    name:             string;
    location:         string;
    headquarters:     string;
    responsible:      string;
    brand:            string;
    model:            string;
    serial:           string;
    screenSize:       number;
    screenType:       string;
    resolution:       string;
    smartTv:          string;
    operativeSystem:  string;
    addressIp:        string;
    mac:              string;
    numHdmi:          number;
    numUSB:           number;
    connectivity:     string;
    purchaseDate:     Date;
    warrantyTime:     string;
    warranty:         string;
    deliveryDate:     Date;
    otherData:        string;
    status:           string;
    inventoryNumber:  string;
    acquisitionValue: string;
    controlRemote:    string;
    utility:          string;
    updatedAt:        Date;
}

export interface phoneReportData {
    createdAt:        Date;
    name:             string;
    brand:            string;
    model:            string;
    serial:           string;
    imei:             string;
    operativeSystem:  string;
    version:          string;
    storage:          string;
    storageRam:       string;
    phoneNumber:      string;
    operator:         string;
    typePlan:         string;
    dueDataPlan:      Date;
    macWifi:          string;
    addressBluetooth: string;
    purchaseDate:     Date;
    warrantyTime:     string;
    warranty:         string;
    deliveryDate:     Date;
    inventoryNumber:  string;
    responsable:      number;
    caseProtector:    string;
    temperedGlass:    string;
    observation:      string;
    status:           string;
    headquarters:     string;
    acquisitionValue: string;
    updatedAt:        Date;
}
