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

export const CompanyRegistrationFormEnum2 = [{
  tradeName: 'Correo electrónico',
  personTypeId: 'Número de documento',
}];

export enum CourseFormEnum {
  AREA = 'Área',
}

export enum FinancingsFormEnum{
  model = 'Comparecientes del convenio',
  budget = 'Presupusesto y financiamiento',
  paymentMethod = 'Forma de pago',
  source = 'Fuente de financiamiento',
}

export enum DocumentationFormEnum{
  signedAgreement = 'Convenio suscrito',
  administratorAgreement = 'Designación del administrador del convenio'
}

export enum InternalInstitutionsFormEnum{
  name = 'Nombre entidad/institución contraparte que firma el convenio',
  unit = 'Unidad a la que pertenece la contraparte',
  position = 'Cargo del funcionario Ministerio de Turismo',
  personType = 'Entidad',
}

export enum ExternalInstitutionsFormEnum{
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

export enum InstitutionsObligations {
  institutionName = 'instituciones seleccionadas',
  institutionObligations = 'obligaciones seleccionadas',
  positionsNames = "positionsNames"
}
export enum AgreementFormEnum{
  subscribedAt='Fecha suscripción de convenio',
  startedAt ='Fecha inicio de convenio',
  isFinishDate='¿El convenio cuenta con fecha de terminación?',
  endedAt='Fecha de terminación del Convenio',
  endedReason ='Razón de terminación del convenio',
  totalTerm ='Plazo total del convenio',
  yearTerm = 'Años',
  monthTerm = 'Meses',
  dayTerm = 'Días',
  objective='Objeto del convenio',
  name ='Nombre del convenio',
  internalNumber = 'Numero interno de convenio',
  number = 'Numero de convenio',
  agreementState = 'Estado del convenio',
  origin = 'Origen del convenio',
  type = 'Tipo del convenio',
  isFinancing = 'Financiamiento',
  specialType = 'Tipo especifico del convenio',
}

export enum AdministratorFormEnum{
  unit = 'Unidad Administrativa',
  position = 'Cargo del funcionario',
  administrator='Administrador del convenio',
}

export enum AddendumEnum{
  isAddendum='Registrar Adenda',
  description= 'Información de la Adenda',
  isModifiedFinishDate= '¿Se modifica fecha de terminación del convenio?',
  document='Documento de adenda o modificatorio',
  agreementEndedAt='Fecha de terminación'
}
