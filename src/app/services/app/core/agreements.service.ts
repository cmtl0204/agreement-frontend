import {Injectable, signal, WritableSignal} from '@angular/core';
import {AgreementModel, createAgreementModel} from "@models/core";

@Injectable({
  providedIn: 'root'
})

export class AgreementsService {
  private _agreement$: WritableSignal<AgreementModel> = signal(createAgreementModel());

  constructor() {
  }

  get agreement(): AgreementModel {
    return this._agreement$();
    // return JSON.parse(String(sessionStorage.getItem('agreement')));
  }

  get agreementStorage(): AgreementModel {
    return JSON.parse(String(sessionStorage.getItem('agreement')));
  }

  set agreement(value: AgreementModel) {
    this._agreement$.update(() => value);
    sessionStorage.setItem('agreement', JSON.stringify(value));
  }

  clearAgreement():void{
    sessionStorage.removeItem('agreement');
  }
}
