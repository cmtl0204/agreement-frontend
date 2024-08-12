export enum LoginFormEnum {
  username = 'Usuario',
  password = 'Contraseña',
  passwordNew = 'Nueva contraseña',
  passwordConfirmation = 'Repita la contraseña',
  roleSelect = 'Seleccione un rol',
}

export enum CompanyRegistrationFormEnum {
  email = 'Correo electrónico',
  identification = 'Número de documento',
  identificationType = 'Tipo de documento',
  lastname = 'Apellidos',
  tradeName = 'Nombres',
  password = 'Contraseña',
  web = 'Página web',
  personType = 'Tipo de personería jurídica',
  unitManagers = 'Unidades ejecutoras',
  bloodType = 'Tipo de sangre',
  ethnicOrigin = 'Etnia',
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
  type = 'Tipo de archivo',
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

export enum DocumentationFormEnum {
  header = 'Documentación',
  signedAgreement = 'Convenio suscrito',
  administratorAgreement = 'Designación del administrador del convenio'
}

export enum AppearerFormEnum {
  header = 'Comparecientes del convenio',
}

export enum InternalInstitutionsFormEnum {
  name = 'Nombre entidad/institución contraparte que firma el convenio',
  unit = 'Unidad a la que pertenece la contraparte',
  position = 'Cargo del funcionario Ministerio de Turismo',
  personType = 'Entidad',
}

export enum ExternalInstitutionsFormEnum {
  name = 'Nombre entidad/institución contraparte que firma el convenio',
  position = 'Cargo de la contraparte',
  unit = 'Unidad a la que pertenece la contraparte',
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
  subscribedAt = 'Fecha suscripción de convenio',
  startedAt = 'Fecha inicio de convenio',
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
  internalNumber = 'Numero interno de convenio',
  number = 'Numero de convenio',
  origin = 'Origen del convenio',
  type = 'Tipo del convenio',
  isFinancing = '¿Registra Financiamiento?',
  specialType = 'Tipo especifico del convenio',
}

export enum AgreementStateEnum {
  state = 'Estado del convenio',
}

export enum AdministratorFormEnum {
  header = 'Administrador del convenio',
  position = 'Cargo del funcionario',
  unit = 'Unidad Administrativa',
  user = 'Administrador del convenio',
}

export enum AddendumEnum {
  header = 'Adendas',
  description = 'Información de la Adenda',
  file = 'Documento de adenda o modificatorio',
}
