import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AgreementsService} from "@servicesApp/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly agreementsService = inject(AgreementsService);
  private readonly formBuilder = inject(FormBuilder);
  protected form!: FormGroup;

  constructor() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      // basic-data
      agreementState: [null],
      name: [null],
      internalNumber: [null],
      number: [null],
      origin: [null],
      type: [null],
      specialType: [null],

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

      // agreement-administrator
      administrator: [null],

      // obligation
      obligations: [null],

      // financing
      isFinancing: [false],
      financings: [null],

      // document

      // addendum
      isAddendum: [false],
      addendums: [null]
    });

    if (sessionStorage.getItem('agreement')) {
      this.form.patchValue(this.agreementsService.agreement);
    }
  }

  save(event: any) {
    this.form.patchValue(event);
    this.agreementsService.agreement = this.form.value;
  }

  register() {
    // this.agreementHttpServices.register(this.form.value).subscribe();
  }

  get externalInstitutionsField(): FormArray {
    return this.form.controls['externalInstitutions'] as FormArray;
  }

  get internalInstitutionsField(): FormArray {
    return this.form.controls['internalInstitutions'] as FormArray;
  }
}
