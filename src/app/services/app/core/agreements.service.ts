import {Injectable} from '@angular/core';
import {AgreementModel} from "@models/core";

@Injectable({
  providedIn: 'root'
})

export class AgreementsService {

  constructor() {
  }

  get agreement(): AgreementModel {
    return JSON.parse(String(sessionStorage.getItem('agreement')));
  }

  set agreement(value: AgreementModel) {
    sessionStorage.setItem('agreement', JSON.stringify(value));
  }
}
