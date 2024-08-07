import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AgreementsService, MessageDialogService} from "@servicesApp/core";
import {ConfirmationService, PrimeIcons} from "primeng/api";
import {AgreementsHttpService} from "@servicesHttp/core";
import {AgreementModel} from "@models/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly agreementsService = inject(AgreementsService);
  private readonly agreementsHttpService = inject(AgreementsHttpService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly formBuilder = inject(FormBuilder);
  protected readonly messageDialogService = inject(MessageDialogService);

  protected form!: FormGroup;
  protected formErrors: string[] = [];
  protected basicDataErrors: string[] = [];
  protected agreementDateErrors: string[] = [];
  protected agreementAdministratorErrors: string[] = [];
  protected appearerErrors: string[] = [];
  protected obligationErrors: string[] = [];
  protected financingErrors: string[] = [];
  protected activeStep: number = 0;

  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      // basic-data
      agreementState: [null, Validators.required],
      name: [null, Validators.required],
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

    if (this.agreementsService.agreementStorage) {
      this.form.patchValue(this.agreementsService.agreementStorage);
      console.log(this.agreementsService.agreementStorage.id);
      if (this.agreementsService.agreementStorage.id) {
        this.activeStep = 3;
      }
    }
  }

  save(event: AgreementModel) {
    this.form.patchValue(event);
    this.agreementsService.agreement = this.form.value;
  }

  register(nextCallback: any) {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: 'Después de guardar no podrá cambiar la información',
      header: '¿Está seguro de guardar?',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.agreementsHttpService.register(this.form.value).subscribe(response => {
          console.log(response.id)
          this.agreementsService.agreement = response; //review
          nextCallback.emit();
        });
      }
    });
  }

  get validateForms(): boolean {
    this.formErrors = [];

    if (this.basicDataErrors.length > 0) this.formErrors = this.formErrors.concat(this.basicDataErrors);

    if (this.agreementDateErrors.length > 0) this.formErrors = this.formErrors.concat(this.agreementDateErrors);

    if (this.agreementAdministratorErrors.length > 0) this.formErrors = this.formErrors.concat(this.agreementAdministratorErrors);

    if (this.appearerErrors.length > 0) this.formErrors = this.formErrors.concat(this.appearerErrors);

    if (this.obligationErrors.length > 0) this.formErrors = this.formErrors.concat(this.obligationErrors);

    if (this.financingErrors.length > 0) this.formErrors = this.formErrors.concat(this.financingErrors);

    return this.formErrors.length === 0 && this.form.valid;
  }

  validateFormAgreement(nextCallback: any) {
    this.formErrors = [];

    if (this.basicDataErrors.length > 0) this.formErrors = this.formErrors.concat(this.basicDataErrors);

    if (this.agreementDateErrors.length > 0) this.formErrors = this.formErrors.concat(this.agreementDateErrors);

    if (this.agreementAdministratorErrors.length > 0) this.formErrors = this.formErrors.concat(this.agreementAdministratorErrors);

    if (this.appearerErrors.length > 0) this.formErrors = this.formErrors.concat(this.appearerErrors);

    if (this.formErrors.length === 0 && this.form.valid) {
      nextCallback.emit();
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  validateFormObligation(nextCallback: any) {
    this.formErrors = [];

    if (this.obligationErrors.length > 0) this.formErrors = this.formErrors.concat(this.obligationErrors);

    if (this.formErrors.length === 0 && this.form.valid) {
      nextCallback.emit();
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  validateFormFinancing(nextCallback: any) {
    this.formErrors = [];

    if (this.financingErrors.length > 0) this.formErrors = this.formErrors.concat(this.financingErrors);

    if (this.formErrors.length === 0 && this.form.valid) {
      nextCallback.emit();
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  get externalInstitutionsField(): FormArray {
    return this.form.controls['externalInstitutions'] as FormArray;
  }

  get internalInstitutionsField(): FormArray {
    return this.form.controls['internalInstitutions'] as FormArray;
  }

  onSubmit(nextCallback: any) {
    if (this.validateForms) {
      this.register(nextCallback);
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }
}
