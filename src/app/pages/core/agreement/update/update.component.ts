import { Component, inject } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AgreementModel } from '@models/core';
import { AuthService } from '@servicesApp/auth';
import { AgreementsService, MessageDialogService } from '@servicesApp/core';
import {AgreementsHttpService} from "@servicesHttp/core";
import { RoleEnum, SeverityButtonActionEnum } from '@shared/enums';
import { ConfirmationService, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  private readonly authService = inject(AuthService);
  private readonly agreementsService = inject(AgreementsService);
  private readonly agreementsHttpService = inject(AgreementsHttpService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly formBuilder = inject(FormBuilder);
  protected readonly messageDialogService = inject(MessageDialogService);
  protected readonly router = inject(Router);

  protected form!: FormGroup;
  protected formErrors: string[] = [];
  protected basicDataErrors: string[] = [];
  protected agreementDateErrors: string[] = [];
  protected appearerErrors: string[] = [];
  protected obligationErrors: string[] = [];
  protected financingErrors: string[] = [];
  protected documentErrors: string[] = [];
  protected activeStep: number = 0;

  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.buildForm();

    this.findAgreement();
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
      internalInstitutions: [[]],
      externalInstitutions: [[]],
      subscribedAt: [null],
      startedAt: [null],
      isFinishDate: [null],
      endedAt: [null],
      endedReason: [null],
      yearTerm: [null],
      monthTerm: [null],
      dayTerm: [null],
      objective: [null],
      obligations: [[]],
      isFinancing: [null],
      financings: [[]],
      files: [[]],
      enabled: [null],
    });
  }

  findAgreement() {
    this.agreementsHttpService.findOne('636693c7-1fc0-49cd-bbc3-33012828901b').subscribe(agreement => {
      this.form.patchValue(agreement);
    });
  }

  get validateForms(): boolean {
    this.formErrors = [];

    this.formErrors = this.formErrors.concat(this.basicDataErrors);

    this.formErrors = this.formErrors.concat(this.agreementDateErrors);

    this.formErrors = this.formErrors.concat(this.appearerErrors);

    this.formErrors = this.formErrors.concat(this.obligationErrors);

    this.formErrors = this.formErrors.concat(this.financingErrors);

    return this.formErrors.length === 0;
  }

  validateFormAgreement(nextCallback: any) {
    this.formErrors = [];

    this.formErrors = this.formErrors.concat(this.basicDataErrors);

    this.formErrors = this.formErrors.concat(this.agreementDateErrors);

    this.formErrors = this.formErrors.concat(this.appearerErrors);

    if (this.formErrors.length === 0) {
      nextCallback.emit();
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  validateFormObligation(nextCallback: any) {
    this.formErrors = [];

    this.formErrors = this.formErrors.concat(this.obligationErrors);

    if (this.formErrors.length === 0) {
      nextCallback.emit();
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  get validateFormDocument(): boolean {
    this.formErrors = [];

    this.formErrors = this.formErrors.concat(this.documentErrors);

    return this.formErrors.length === 0
  }

  onSubmitAgreement(nextCallback: any) {
    if (this.validateForms) {
      this.update(nextCallback);
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  onSubmitDocuments(nextCallback: any) {
    if (this.validateFormDocument) {
      this.registerDocuments(nextCallback);
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  save(event: AgreementModel) {
    this.form.patchValue(event);
  }

  update(nextCallback: any) {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: 'Después de guardar, no podrá realizar cambios en la información del convenio',
      header: '¿Está seguro de guardar?',
      icon: PrimeIcons.TIMES_CIRCLE,
      acceptLabel: "Si",
      rejectLabel: "No",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.agreementsHttpService.update('',this.form.value).subscribe(response => {
          this.form.patchValue(response);
          nextCallback.emit();
        });
      }
    });
  }

  registerDocuments(nextCallback: any) {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: 'Después de guardar, no podrá realizar cambios en la información del convenio',
      header: '¿Está seguro de guardar?',
      icon: PrimeIcons.TIMES_CIRCLE,
      acceptLabel: "Si",
      rejectLabel: "No",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        const formData = new FormData();

        for (const myFile of this.filesField.value) {
          formData.append('typeIds', myFile.type.id);
          formData.append('files', myFile.file);
        }

        if (this.idField.valid) {
          this.agreementsHttpService.uploadEnablingDocuments(this.idField.value, formData).subscribe(response => {
            this.enabledField.setValue(true);
            this.agreementsService.agreement = this.form.value;

            nextCallback.emit();
          });
        }
      }
    });
  }

  finish() {
    // this.agreementsService.clearAgreement();

    if (this.authService.role.code === RoleEnum.NATIONAL_SUPERVISOR) {
      this.router.navigate(['/core/national-supervisor/agreement-list']);
    }

    if (this.authService.role.code === RoleEnum.INTERNATIONAL_SUPERVISOR) {
      this.router.navigate(['/core/international-supervisor/agreement-list']);
    }
  }

  get externalInstitutionsField(): FormArray {
    return this.form.controls['externalInstitutions'] as FormArray;
  }

  get internalInstitutionsField(): FormArray {
    return this.form.controls['internalInstitutions'] as FormArray;
  }

  get idField(): AbstractControl {
    return this.form.controls['id'];
  }

  get filesField(): AbstractControl {
    return this.form.controls['files'];
  }

  get enabledField(): AbstractControl {
    return this.form.controls['enabled'];
  }

}
