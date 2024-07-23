import { Component, inject } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  form!: FormGroup;
  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    this.buildForm();

    this.findAgreement();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      // basic-data
      name: [null],
      internalNumber: [null],
      number: [null],
      type: [null],
      origin: [null],
      specialType: [null],

      // appearer
      internalInstitutions: [null],
      externalInstitutions: [null],

      // agreement-date
      subscribedAt: [null],
      startedAt: [null],
      endedAt:[null],
      isFinishDate: [null],
      endedReason: [null],
      yearTerm: [null],
      monthTerm: [null],
      dayTerm: [null],
      objective: [null],

      // obligation
      obligations:[null],

      // financing
      isFinancing: [null],
      financings: [null],

      // document
    });
  };

  findAgreement() {
    // this.agreementsHttpService.findOne('').subscribe(agreement => {
    //   this.form.patchValue(agreement);
    // });

    //temp
    this.form.patchValue(JSON.parse(String(sessionStorage.getItem('agreement'))));
  }

  save(event: any) {
    console.log('event', event);
    this.form.patchValue(event);
    console.log('form', this.form.value);
  }

  get externalInstitutionsField(): FormArray {
    return this.form.controls['externalInstitutions'] as FormArray;
  }

  get internalInstitutionsField(): FormArray {
    return this.form.controls['internalInstitutions'] as FormArray;
  }
}
