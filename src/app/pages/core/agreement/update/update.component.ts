import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  form!: FormGroup;
  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    this.buildForm()
  }

  buildForm() {
    this.form = this.formBuilder.group({
      // basic-data
      name: [null],
      internalNumber: [null],
      number: [null],
      type: [null],
      specialType: [null],

      // appearer
      internalInstitutions: [null],
      externalInstitutions: [null],

      // agreement-date
      subscribedAt: [null],
      startedAt: [null],
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

    })
  };


  save(event: any) {
    console.log('event', event);
    this.form.patchValue(event);
    console.log('form', this.form.value);
  }

}
