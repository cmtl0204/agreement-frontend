export enum LoginFormEnum {
  username = 'Correo electrónico instuticional',
  password = 'Contraseña',
  passwordNew = 'Nueva contraseña',
  passwordConfirmation = 'Repita la contraseña',
  roleSelect = 'Seleccione un rol',
}

export enum UsersFormEnum {
  email = 'Correo electrónico',
  identification = 'Número de documento',
  identificationType = 'Tipo de documento',
  lastname = 'Apellidos',
  name = 'Nombres',
  password = 'Contraseña',
  passwordChanged = 'Confirmar contraseña',
  roles = 'Roles',
  unitManagers = 'Unidades ejecutoras',
  bloodType = 'Tipo de sangre',
  ethnicOrigin = 'Etnia',
}

export enum FileFormEnum {
  type = 'Tipo de documento',
  myFile = 'Archivo',
  name = 'Nombre del archivo',
}

export enum FinancingsFormEnum {
  header = 'Financiamientos',
  institutionName = 'Compareciente',
  budget = 'Presupuesto y financiamiento',
  paymentMethod = 'Forma de pago',
  source = 'Fuente de financiamiento',
}

export enum EnablingDocumentFormEnum {
  header = 'Documentos Habilitantes',
  signedAgreement = 'Convenio suscrito',
  administratorAgreement = 'Designación del administrador del convenio'
}

export enum AppearerFormEnum {
  header = 'Comparecientes del convenio',
}

export enum AgreementSectionFormEnum {
  basicData = 'Datos Básicos',
  appearer = 'Comparecientes del convenio',
  obligation = 'Obligaciones',
  financing = 'Financiamiento',
  enablingDocument = 'Documentos Habilitantes',
  agreementDate = 'Fechas del convenio',
  administrator = 'Administrador del convenio',
  addendum = 'Adendas'
}

export enum InternalInstitutionsFormEnum {
  name = 'Nombre entidad',
  unit = 'Unidad',
  position = 'Cargo del funcionario Ministerio de Turismo',
  personType = 'Entidad',
}

export enum ExternalInstitutionsFormEnum {
  name = 'Nombre entidad/institución contraparte que firma el convenio',
  position = 'Cargo de la contraparte',
  unit = 'Unidad a la que pertenece la contraparte',
  personType = 'Entidad de la contraparte',
}

export enum ObligationsMintur {
  minturObligations = 'obligaciones Mintur'
}

export enum ExternalInstitutionsObligations {
  institutionsName = 'nombre de las instituciones',
  obligations = 'Obligaciones de las instituciones',
  positionName = "positionName"
}

export enum ObligationForEnum {
  header = 'Obligaciones',
  institutionName = 'Nombre entidad/institución contraparte',
  institutionResponsible = 'Responsable de Obligación',
  type = 'Tipo de obligaciones',
}

export enum ObligationDetailForEnum {
  description = 'Obligación'
}

export enum AgreementDateFormEnum {
  header = 'Fechas del convenio',
  subscribedAt = 'Fecha suscripción de convenio',
  startedAt = 'Fecha inicio de convenio',
  isFinishDate = '¿El convenio cuenta con fecha de terminación?',
  endedAt = 'Fecha de terminación del Convenio',
  endedReason = 'Razón de terminación del convenio',
  yearTerm = 'Años',
  monthTerm = 'Meses',
  dayTerm = 'Días',
}

export enum AgreementFormEnum {
  header = 'Datos Básicos',
  enabled = 'Estado de Registro',
  subscribedAt = 'Fecha suscripción de convenio',
  startedAt = 'Fecha inicio del convenio',
  isFinishDate = '¿El convenio cuenta con fecha de terminación?',
  endedAt = 'Fecha de terminación del Convenio',
  endedReason = 'Razón de terminación del convenio',
  isAddendum = 'Registrar adenda o modificatorio',
  totalTerm = 'Plazo total del convenio',
  yearTerm = 'Años',
  monthTerm = 'Meses',
  dayTerm = 'Días',
  objective = 'Objeto del convenio',
  name = 'Nombre del convenio',
  internalNumber = 'Número interno de convenio',
  number = 'Número de convenio',
  origin = 'Origen del convenio',
  type = 'Tipo del convenio',
  isFinancing = 'Financiamiento',
  specialType = 'Tipo específico del convenio',
}

export enum AgreementStateEnum {
  state = 'Estado del convenio',
}

export enum AgreementLogEnum {
  header = 'Bitácora del convenio',
  registeredAt = 'Fecha de registro',
  user = 'Usuario',
}

export enum AdministratorFormEnum {
  header = 'Administrador del convenio',
  position = 'Cargo del funcionario Ministerio de Turismo',
  unit = 'Unidad Administrativa del Ministerio de Turismo',
  user = 'Nombres y apellidos / Correo electrónico institucional',
}

export enum AddendumEnum {
  header = 'Adendas',
  description = 'Información de la adenda o modificatorio',
  file = 'Documento de adenda o modificatorio',
}

export enum PeriodEnum {
  header = 'Periodos',
  documentName = 'Documento',
  endedAt = 'Fecha de finalización',
  name = 'Informe',
  startedAt = 'Documento de adenda o modificatorio',
  uploadedAt = 'Fecha de carga',
  type = 'Documento de adenda o modificatorio',
  reportPeriod = 'Periodo reporte',
  reportFile = 'Archivo',
  evidenceFile = 'Evidencias',
  trafficLight = 'Semáforo',
  user = 'Modificado por',
  state = 'Estado',
}

export enum TrackingLogEnum {
  header = 'Bitácora',
  state = 'Estado',
  user = 'Modificado por ',
  registeredAt = 'Fecha y hora de estado',
}

export enum AdditionalDocumentEnum {
  header = 'Reporte adicional al convenio',
  name = 'Informe',
  detail = 'Motivo',
  additionalDocuments = 'Documento',
  uploadedAt = 'Fecha de carga',
  user = 'Modificado por',
  reportFile = 'Archivo',
  evidenceFile = 'Evidencias',
}
