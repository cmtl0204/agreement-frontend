export enum CatalogueTypeEnum {
  USERS_BLOOD_TYPE = 'USERS_BLOOD_TYPE',
  USERS_GENDER = 'USERS_GENDER',
  USERS_ETHNIC_ORIGIN = 'USERS_ETHNIC_ORIGIN',
  USERS_IDENTIFICATION_TYPE = 'USERS_IDENTIFICATION_TYPE',
  USERS_MARITAL_STATUS = 'USERS_MARITAL_STATUS',
  USERS_SEX = 'USERS_SEX',
  ADMINISTRATORS_UNIT = 'ADMINISTRATORS_UNIT',
  ADMINISTRATORS_POSITION = 'ADMINISTRATORS_POSITION',
  AGREEMENT_STATES_STATE = 'AGREEMENT_STATES_STATE',
  AGREEMENTS_ORIGIN = 'AGREEMENTS_ORIGIN',
  AGREEMENTS_TYPE = 'AGREEMENTS_TYPE',
  INTERNAL_INSTITUTIONS_POSITION = 'INTERNAL_INSTITUTIONS_POSITION',
  EXTERNAL_INSTITUTIONS_PERSON_TYPE = 'EXTERNAL_INSTITUTIONS_PERSON_TYPE',
  INTERNAL_INSTITUTIONS_PERSON_TYPE = 'INTERNAL_INSTITUTIONS_PERSON_TYPE',
  AGREEMENTS_SPECIAL_TYPE = 'AGREEMENTS_SPECIAL_TYPE',
  OBLIGATIONS_TYPE = 'OBLIGATIONS_TYPE',
  AGREEMENTS_CLOSING_TYPE = 'AGREEMENTS_CLOSING_TYPE',
  AGREEMENTS_ENABLING_DOCUMENT = 'AGREEMENTS_ENABLING_DOCUMENT',
  AGREEMENTS_ADDENDUM_DOCUMENT = 'AGREEMENTS_ADDENDUM_DOCUMENT',
  AGREEMENTS_EXECUTION_DOCUMENT = 'AGREEMENTS_EXECUTION_DOCUMENT',
  AGREEMENTS_ADDITIONAL_EXECUTION_PROGRESS_DOCUMENT = 'AGREEMENTS_ADDITIONAL_EXECUTION_PROGRESS_DOCUMENT',
  AGREEMENTS_CLOSING_ADVANCE_DOCUMENT = 'AGREEMENTS_CLOSING_ADVANCE_DOCUMENT',
  AGREEMENTS_CLOSING_DOCUMENT = 'AGREEMENTS_CLOSING_DOCUMENT',
}

export enum CatalogueUsersIdentificationTypeEnum {
  IDENTIFICATION = '1',
  PASSPORT = '2',
}

export enum RoutesEnum {
  NEW = 'new',
}

export enum CatalogueAgreementsTypeEnum {
  SPECIAL = 'SPECIAL',
}

export enum CatalogueAgreementsOriginEnum {
  NATIONAL = 'NATIONAL',
  INTERNATIONAL = 'INTERNATIONAL',
}

export enum CatalogueObligationsTypeEnum {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
  JOIN = 'JOIN',
}

export enum CatalogueAgreementsEnablingDocumentEnum {
  SIGNED_AGREEMENT = 'SIGNED_AGREEMENT',
  ADMINISTRATOR_ASSIGNMENT = 'ADMINISTRATOR_ASSIGNMENT',
}

export enum CatalogueInternalInstitutionsPersonTypeEnum {
  PUBLIC = 'PUBLIC',
  PRIVATE_NATURAL = 'PRIVATE_NATURAL',
  PRIVATE_LEGAL = 'PRIVATE_LEGAL',
}

export enum CatalogueExternalInstitutionsPersonTypeEnum {
  PUBLIC = 'PUBLIC',
  PRIVATE_NATURAL = 'PRIVATE_NATURAL',
  PRIVATE_LEGAL = 'PRIVATE_LEGAL',
}
