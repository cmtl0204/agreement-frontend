import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AgreementsService, MessageDialogService} from "@servicesApp/core";
import {ConfirmationService, PrimeIcons} from "primeng/api";
import {AgreementsHttpService} from "@servicesHttp/core";
import {AgreementModel} from "@models/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
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

  ngOnInit() {
    if (this.agreementsService.agreementStorage) {
      this.form.patchValue(this.agreementsService.agreementStorage);

      if (this.idField.value) {
        this.activeStep = 3;
      }
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      agreementState: [null],
      name: [null],
      internalNumber: [null],
      number: [null],
      origin: [null],
      type: [null],
      specialType: [null],
      internalInstitutions: [null],
      externalInstitutions: [null],
      subscribedAt: [new Date()],
      startedAt: [new Date()],
      isFinishDate: [null],
      endedAt: [null],
      endedReason: [null],
      yearTerm: [null],
      monthTerm: [null],
      dayTerm: [null],
      objective: [null],
      administrator: [null],
      obligations: [null],
      isFinancing: [false],
      financings: [null],
      isAddendum: [false],
      addendums: [null]
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

    return this.formErrors.length === 0;
  }

  validateFormAgreement(nextCallback: any) {
    this.formErrors = [];

    if (this.basicDataErrors.length > 0) this.formErrors = this.formErrors.concat(this.basicDataErrors);

    if (this.agreementDateErrors.length > 0) this.formErrors = this.formErrors.concat(this.agreementDateErrors);

    if (this.agreementAdministratorErrors.length > 0) this.formErrors = this.formErrors.concat(this.agreementAdministratorErrors);

    if (this.appearerErrors.length > 0) this.formErrors = this.formErrors.concat(this.appearerErrors);

    if (this.formErrors.length === 0) {
      nextCallback.emit();
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  validateFormObligation(nextCallback: any) {
    this.formErrors = [];

    if (this.obligationErrors.length > 0) this.formErrors = this.formErrors.concat(this.obligationErrors);

    if (this.formErrors.length === 0) {
      nextCallback.emit();
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  onSubmit(nextCallback: any) {
    if (this.validateForms) {
      this.register(nextCallback);
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  save(event: AgreementModel) {
    this.form.patchValue(event);

    this.agreementsService.agreement = this.form.value;
  }

  register(nextCallback: any) {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: 'Después de guardar, no podrá realizar cambios en la información del convenio',
      header: '¿Está seguro de guardar?',
      icon: PrimeIcons.TIMES_CIRCLE,
      acceptLabel: "Si",
      rejectLabel: "No",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.agreementsHttpService.register(this.agreementsService.agreement).subscribe(response => {
          this.agreementsService.agreement = response; //review
          nextCallback.emit();
        });
      }
    });
  }

  get idField(): AbstractControl {
    return this.form.controls['id'];
  }
}
