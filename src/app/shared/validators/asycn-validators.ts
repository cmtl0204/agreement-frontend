import {AsyncValidatorFn,} from '@angular/forms';
import {AgreementsHttpService} from "@servicesHttp/core";
import {debounce, map} from "rxjs/operators";
import {ServerResponse} from "@models/http-response";
import {debounceTime, delay, of} from "rxjs";

export const verifyAgreementInternalNumber = (agreementsHttpService: AgreementsHttpService): AsyncValidatorFn => {
  return (control) => {
    return agreementsHttpService.verifyInternalNumber(control.value).pipe(
      map((response) => {
        return response ? {agreementExists: true} : null;
      })
    )
  }
}

export const verifyAgreementInternalNumberUpdate = (agreementsHttpService: AgreementsHttpService, agreementId?: string): AsyncValidatorFn => {
  return (control) => {
    if (agreementId) {
      return agreementsHttpService.verifyInternalNumberUpdate(control.value, agreementId).pipe(
        map((response) => {
          return response ? {agreementExists: true} : null;
        })
      );
    }

    return of(null);
  }
}
