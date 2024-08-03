import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AgreementsService, MessageDialogService} from "@servicesApp/core";
import {PrimeIcons} from "primeng/api";
import {AgreementsHttpService} from "@servicesHttp/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly agreementsService = inject(AgreementsService);
  private readonly agreementsHttpService = inject(AgreementsHttpService);
  private readonly formBuilder = inject(FormBuilder);
  protected readonly messageDialogService = inject(MessageDialogService);

  protected form!: FormGroup;
  protected formErrors: string[] = [];
  protected basicDataErrors: string[] = [];
  protected agreementDateErrors: string[] = [];
  protected agreementAdministratorErrors: string[] = [];
  protected appearerErrors: string[] = [];

  protected readonly PrimeIcons = PrimeIcons;

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
      subscribedAt: [new Date()],
      startedAt: [new Date()],
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

    if (this.agreementsService.agreement) {
      this.form.patchValue(this.agreementsService.agreement);
    }
  }

  save(event: any) {
    this.form.patchValue(event);
    this.agreementsService.agreement = this.form.value;
  }

  register() {
    this.agreementsHttpService.register(this.form.value).subscribe(response=>{
      console.log(response);
    });
  }

  get validateForms(): boolean {
    this.formErrors = [];

    if (this.basicDataErrors.length > 0) this.formErrors = this.formErrors.concat(this.basicDataErrors);

    if (this.agreementDateErrors.length > 0) this.formErrors = this.formErrors.concat(this.agreementDateErrors);

    if (this.agreementAdministratorErrors.length > 0) this.formErrors = this.formErrors.concat(this.agreementAdministratorErrors);

    if (this.appearerErrors.length > 0) this.formErrors = this.formErrors.concat(this.appearerErrors);

    return this.formErrors.length === 0;
  }

  get externalInstitutionsField(): FormArray {
    return this.form.controls['externalInstitutions'] as FormArray;
  }

  get internalInstitutionsField(): FormArray {
    return this.form.controls['internalInstitutions'] as FormArray;
  }

  onSubmit() {
    if (this.validateForms) {
      this.register();
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }
}
