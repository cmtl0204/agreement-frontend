import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  protected form: FormGroup = this.formBuilder.group({
    // basic-data
    agreementState: [null],
    name: [null],
    internalNumber: [null],
    number: [null],
    originId: [null],
    typeId: [null],

    // appearer
    internalInstitutions: [null],
    externalInstitutions: [null],

    // agreement-date
    subscribedAt: [null],
    startedAt: [null],
    isFinishDate: [null],
    endedAt: [null],
    endedReason: [null],
    yearTerm: [null],
    monthTerm: [null],
    dayTerm: [null],
    objective: [null],
    administrator: [null],

    // agreement-administrator

    // obligation

    // financing
    isFinancing: [false],
    financings: [null],

    // document

    // addendum
    isAddendum: [false],
    description: [null],
    isModifiedFinishDate: [null],
    document: [null],
    agreementEndedAt: [null]
  });

  save(event: any) {
    console.log('event', event);
    this.form.patchValue(event);
    console.log('form', this.form.value);
  }

  register() {
    // this.agreementHttpServices.register(this.form.value).subscribe();
  }

  get externalInstitutionsField(): FormArray {
    return this.form.controls['externalInstitutions'] as FormArray;
  }
}
