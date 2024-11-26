import {Component, inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AgreementModel, FileModel} from '@models/core';
import {AuthService} from '@servicesApp/auth';
import {AgreementsService, BreadcrumbService, MessageDialogService} from '@servicesApp/core';
import {AgreementsHttpService} from "@servicesHttp/core";
import {BreadcrumbEnum, RoleEnum, SeverityButtonActionEnum} from '@shared/enums';
import {ConfirmationService, PrimeIcons} from 'primeng/api';
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  @Input() id!: string;
  private readonly authService = inject(AuthService);
  private readonly agreementsService = inject(AgreementsService);
  private readonly agreementsHttpService = inject(AgreementsHttpService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly formBuilder = inject(FormBuilder);
  protected readonly messageDialogService = inject(MessageDialogService);
  protected readonly router = inject(Router);

  protected form!: FormGroup;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;

  protected formErrors: string[] = [];
  protected basicDataErrors: string[] = [];
  protected agreementDateErrors: string[] = [];
  protected agreementAdministratorErrors: string[] = [];
  protected appearerErrors: string[] = [];
  protected obligationErrors: string[] = [];
  protected financingErrors: string[] = [];
  protected documentErrors: string[] = [];
  protected activeStep: number = 0;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS, routerLink: [`/core/${this.authService.role.code}/agreement-list`]},
      {label: BreadcrumbEnum.AGREEMENTS_UPDATE},
    ]);

    this.buildForm();
  }

  ngOnInit() {
    if (this.agreementsService.agreementStorage) {

      this.form.patchValue(this.agreementsService.agreementStorage);

      if (this.idField.value) {
        this.activeStep = 3;
      }

      if (this.enablingDocumentsField.value.length == 2) {
        if (this.enablingDocumentsField.value.every((item: FileModel) => item.id)) {
          this.activeStep = 4;
        }
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
      internalInstitutions: [[]],
      externalInstitutions: [[]],
      subscribedAt: [new Date()],
      startedAt: [new Date()],
      isFinishDate: [true],
      endedAt: [null],
      endedReason: [null],
      totalTerm: [null],
      yearTerm: [null],
      monthTerm: [null],
      dayTerm: [null],
      objective: [null],
      administrator: [null],
      obligations: [[]],
      isFinancing: [false],
      financings: [[]],
      isAddendum: [false],
      addendums: [[]],
      enablingDocuments: [[]],
      enabled: [false],
    });
  }

  validateFormAgreement() {
    this.formErrors = [];

    this.formErrors = this.formErrors.concat(this.basicDataErrors);

    this.formErrors = this.formErrors.concat(this.agreementDateErrors);

    this.formErrors = this.formErrors.concat(this.agreementAdministratorErrors);

    this.formErrors = this.formErrors.concat(this.appearerErrors);

    if (this.formErrors.length === 0) {
      this.update();
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  save(event: AgreementModel) {
    this.form.patchValue(event);

    this.agreementsService.agreement = this.form.value;
  }

  update() {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: '',
      header: '¿Está seguro de actualizar?',
      // icon: PrimeIcons.QUESTION_CIRCLE,
      acceptLabel: "Si",
      rejectLabel: "No",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.agreementsHttpService.update(this.idField.value, this.agreementsService.agreement).subscribe(response => {
          this.redirectAgreementList();
        });
      }
    });
  }

  redirectAgreementList() {
    if (this.authService.role.code === RoleEnum.NATIONAL_SUPERVISOR)
      this.router.navigate(['/core/national-supervisor/agreement-list']);

    if (this.authService.role.code === RoleEnum.INTERNATIONAL_SUPERVISOR)
      this.router.navigate(['/core/international-supervisor/agreement-list']);
  }

  get idField(): AbstractControl {
    return this.form.controls['id'];
  }

  get enablingDocumentsField(): AbstractControl {
    return this.form.controls['enablingDocuments'];
  }
}
