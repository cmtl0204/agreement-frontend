import {AsyncValidatorFn,} from '@angular/forms';
import {AgreementsHttpService} from "@servicesHttp/core";
import {debounce, map} from "rxjs/operators";
import {ServerResponse} from "@models/http-response";
import {debounceTime, delay} from "rxjs";

export const verifyAgreementInternalNumber = (agreementsHttpService: AgreementsHttpService): AsyncValidatorFn => {
  return (control) => {
    return agreementsHttpService.verifyInternalNumber(control.value).pipe(
      debounceTime(1500),
      map((response) => {
        return response ? {agreementExists: true} : null;
      })
    )
  }
}
