import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  private readonly formBuilder = inject(FormBuilder);
  protected form: FormGroup = this.formBuilder.group({
    // basic-data
    name: [null],
    internalNumber: [null],
    number: [null],
    typeId: [null],
    
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
    
    // financing
    isFinancing: [null],
    financings: [null],

    // document

  });


  save(event: any) {
    console.log('event', event);
    this.form.patchValue(event);
    console.log('form', this.form.value);
  }

}