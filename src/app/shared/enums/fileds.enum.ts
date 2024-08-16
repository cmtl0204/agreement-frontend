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
  institutionName = 'Comparecientes del convenio',
  budget = 'Presupusesto y financiamiento',
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
  position = 'Cargo del funcionario',
  personType = 'Entidad',
}

export enum ExternalInstitutionsFormEnum {
  name = 'Nombre entidad',
  position = 'Cargo',
  unit = 'Unidad',
  personType = 'Entidad',
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
  institutionName = 'Nombre de la Institución',
  type = 'Tipo de obligación',
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
  subscribedAt = 'Fecha suscripción del convenio',
  startedAt = 'Fecha inicio del convenio',
  isFinishDate = '¿El convenio cuenta con fecha de terminación?',
  endedAt = 'Fecha de terminación del Convenio',
  endedReason = 'Razón de terminación del convenio',
  isAddendum = '¿Registra Adendas?',
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
  isFinancing = '¿Registra Financiamiento?',
  specialType = 'Tipo específico del convenio',
}

export enum AgreementStateEnum {
  state = 'Estado del convenio',
}

export enum AdministratorFormEnum {
  header = 'Administrador del convenio',
  position = 'Administrador del convenio',
  unit = 'Unidad Administrativa',
  user = 'Responsable del convenio',
}

export enum AddendumEnum {
  header = 'Adendas',
  description = 'Descripción',
  file = 'Documento',
}
