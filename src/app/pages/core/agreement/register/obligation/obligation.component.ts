import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgreementModel, CatalogueModel, ColumnModel} from '@models/core';
import {AgreementsService, CoreService, MessageDialogService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {
  CatalogueObligationsTypeEnum,
  CatalogueTypeEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum,
  ObligationDetailForEnum,
  ObligationForEnum,
  SeverityButtonActionEnum,
  SkeletonEnum, TableEnum
} from '@shared/enums';
import {PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrls: ['./obligation.component.scss']
})
export class ObligationComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);
  protected readonly agreementsService = inject(AgreementsService);

  @Output() formOutput: EventEmitter<AgreementModel> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter()
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();

  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  protected obligationTypes: CatalogueModel[] = [];
  protected institutions: any[] = [];

  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected form!: FormGroup;
  private formErrors: string[] = [];
  protected obligationForm!: FormGroup;
  protected obligationDetailForm!: FormGroup;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly CatalogueObligationsTypeEnum = CatalogueObligationsTypeEnum;
  protected readonly TableEnum = TableEnum;
  protected isVisibleObligationForm: boolean = false;
  protected isVisibleObligationDetailForm: boolean = false;
  protected readonly ObligationForEnum = ObligationForEnum;
  protected readonly ObligationDetailForEnum = ObligationDetailForEnum;
  protected columns: ColumnModel[] = [];
  protected index: number = -1;

  constructor() {
    this.buildForm();
    this.buildObligationForm();
    this.buildObligationDetailForm();
    this.buildColumns();

    this.checkValueChanges();
  }

  ngOnInit(): void {
    this.loadObligationTypes();
    this.loadInstitutions();

    this.patchValueForm();
    this.validateForm();
  }

  buildColumns() {
    this.columns = [
      {field: 'institutionName', header: ObligationForEnum.institutionName},
      {field: 'type', header: ObligationForEnum.type},
      {field: 'obligations', header: ObligationDetailForEnum.description},
    ];
  }

  buildForm() {
    this.form = this.formBuilder.group({
      obligations: this.formBuilder.array([], Validators.required)
    });
  }

  buildObligationForm() {
    this.obligationForm = this.formBuilder.group({
      institutionName: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  buildObligationDetailForm() {
    this.obligationDetailForm = this.formBuilder.group({
      description: [null, [Validators.required]],
    });
  }

  patchValueForm() {
    this.form.patchValue(this.agreementsService.agreement);
  }

  checkValueChanges() {
    this.form.valueChanges.subscribe(value => {
      this.formOutput.emit(this.agreementsService.agreement);
      this.validateForm();
    });

    this.obligationTypeField.valueChanges.subscribe(value => {
      if (value && value.code === CatalogueObligationsTypeEnum.INTERNAL) {

        if (this.agreementsService.agreement.internalInstitutions)
          this.obligationInstitutionNameField.setValue(this.agreementsService.agreement.internalInstitutions[0].name);
      }
    });
  }

  validateForm() {
    this.formErrors = [];

    if (this.agreementsService.agreement.obligations?.length === 0) this.formErrors.push('Obligaciones');

    this.formErrorsOutput.emit(this.formErrors);
  }

  validateObligationForm(): boolean {
    this.formErrors = [];

    if (this.obligationTypeField.invalid) this.formErrors.push(this.ObligationForEnum.type);
    if (this.obligationInstitutionNameField.invalid) this.formErrors.push(this.ObligationForEnum.institutionName);
    if (this.obligationDetailDescriptionField.invalid) this.formErrors.push(this.ObligationDetailForEnum.description);

    return this.formErrors.length === 0;
  }

  validateObligationDetailForm(): boolean {
    this.formErrors = [];

    if (this.obligationDetailDescriptionField.invalid) this.formErrors.push(this.ObligationDetailForEnum.description);

    return this.formErrors.length === 0;
  }

  loadObligationTypes() {
    this.obligationTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.OBLIGATIONS_TYPE);
  }

  loadInstitutions() {
    this.institutions = [];

    let internalInstitutions: string[] = [];
    let externalInstitutions: string[] = [];

    if (this.agreementsService.agreement.internalInstitutions) {
      internalInstitutions = this.agreementsService.agreement.internalInstitutions.map(internalInstitution =>
        internalInstitution.name);
    }

    if (this.agreementsService.agreement.externalInstitutions) {
      externalInstitutions = this.agreementsService.agreement.externalInstitutions.map(externalInstitution =>
        externalInstitution.name);
    }

    this.institutions = internalInstitutions.concat(externalInstitutions);
  }

  addObligation() {
    if (this.validateObligationForm()) {
      const obligation = this.obligationForm.value;

      obligation.institutionName = obligation.institutionName.toString();
      obligation.obligationDetails = [this.obligationDetailForm.value];

      if (!this.agreementsService.agreement.obligations) {
        this.agreementsService.agreement.obligations = [];
      } else {
        if (this.agreementsService.agreement.obligations.findIndex(item => {
          return item.institutionName === obligation.institutionName.toString();
        }) > -1) {
          this.messageDialogService.errorCustom('La entidad ya está registrada', 'Intente con otra por favor');
          return;
        }
      }

      this.agreementsService.agreement.obligations.push(obligation);

      this.form.patchValue({obligations: this.agreementsService.agreement.obligations});

      this.obligationForm.reset();
      this.obligationDetailForm.reset();
      this.isVisibleObligationForm = false;
    } else {
      this.obligationForm.markAllAsTouched();
      this.obligationDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  addObligationDetail() {
    if (this.validateObligationDetailForm()) {
      if (this.agreementsService.agreement.obligations) {
        if (this.agreementsService.agreement.obligations[this.index].obligationDetails) {
          this.agreementsService.agreement.obligations[this.index].obligationDetails?.push(this.obligationDetailForm.value);
        } else {
          this.agreementsService.agreement.obligations[this.index].obligationDetails = [this.obligationDetailForm.value];
        }
      }

      this.form.patchValue(this.agreementsService.agreement);

      this.obligationDetailForm.reset();

      this.isVisibleObligationDetailForm = false;
    } else {
      this.obligationDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  deleteObligation(index: number) {
    this.agreementsService.agreement.obligations?.splice(index, 1);
    this.form.patchValue({obligations: this.agreementsService.agreement.obligations});
  }

  deleteObligationDetail(indexObligation: number, index: number) {
    if (this.agreementsService.agreement.obligations) {
      // this.agreementsService.agreement.obligations[indexObligation].obligationDetails[index].splice(index, 1);
    }
    this.form.patchValue({obligations: this.agreementsService.agreement.obligations});
  }

  showObligationModal() {
    this.isVisibleObligationForm = true;
  }

  showObligationDetailModal(index: number) {
    this.isVisibleObligationDetailForm = true;
    this.index = index;
  }

  get obligationInstitutionNameField(): AbstractControl {
    return this.obligationForm.controls['institutionName'];
  }

  get obligationTypeField(): AbstractControl {
    return this.obligationForm.controls['type'];
  }

  get obligationDetailDescriptionField(): AbstractControl {
    return this.obligationDetailForm.controls['description'];
  }
}
