import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgreementModel, CatalogueModel, ColumnModel, createAgreementModel} from '@models/core';
import {CoreService, MessageDialogService} from '@servicesApp/core';
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

  @Input({required: true}) formInput: AgreementModel = createAgreementModel();
  @Output() formOutput: EventEmitter<AgreementModel> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter();

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
      {field: 'type', header: ObligationForEnum.type},
      {field: 'institutionName', header: ObligationForEnum.institutionResponsible},
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
    this.form.patchValue(this.formInput);
  }

  checkValueChanges() {
    this.form.valueChanges.subscribe(value => {
      this.formOutput.emit(this.formInput);
      this.validateForm();
    });

    this.obligationTypeField.valueChanges.subscribe(value => {
      this.obligationInstitutionNameField.reset();

      if (value && value.code === CatalogueObligationsTypeEnum.INTERNAL) {
        if (this.formInput.internalInstitutions)
          this.obligationInstitutionNameField.setValue(this.formInput.internalInstitutions[0].name);
      }
    });
  }

  validateForm() {
    this.formErrors = [];

    if (this.formInput.obligations?.length === 0) this.formErrors.push('Obligaciones');

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

    if (this.formInput.internalInstitutions) {
      internalInstitutions = this.formInput.internalInstitutions.map(internalInstitution =>
        internalInstitution.name);
    }

    if (this.formInput.externalInstitutions) {
      externalInstitutions = this.formInput.externalInstitutions.map(externalInstitution =>
        externalInstitution.name);
    }

    this.institutions = internalInstitutions.concat(externalInstitutions);
  }

  addObligation() {
    if (this.validateObligationForm()) {
      const obligation = this.obligationForm.value;

      if (Array.isArray(obligation.institutionName))
        obligation.institutionName.sort();
      obligation.institutionName = obligation.institutionName.toString();
      obligation.institutionName = obligation.institutionName.replace(',', ', ');
      obligation.obligationDetails = [this.obligationDetailForm.value];

      if (this.obligationTypeField.value.code === CatalogueObligationsTypeEnum.JOIN && this.obligationInstitutionNameField.value.length < 2) {
        this.messageDialogService.errorCustom('Mínimo requerido', 'Debe seleccionar al menos 2 (dos) Instituciones');
        return;
      }

      if (this.formInput.obligations.findIndex(item => {
        return item.institutionName === obligation.institutionName;
      }) > -1) {
        this.messageDialogService.errorCustom('Duplicado', 'La Institución ya cuenta con obligaciones, para agregar haga click en el botón +');
        return;
      }

      this.formInput.obligations.push(obligation);

      this.formInput.obligations.sort();

      this.form.patchValue(this.formInput);

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
      if (this.formInput.obligations) {
        if (this.formInput.obligations[this.index].obligationDetails) {
          this.formInput.obligations[this.index].obligationDetails?.push(this.obligationDetailForm.value);
        } else {
          this.formInput.obligations[this.index].obligationDetails = [this.obligationDetailForm.value];
        }
      }

      this.form.patchValue(this.formInput);

      this.obligationDetailForm.reset();

      this.isVisibleObligationDetailForm = false;
    } else {
      this.obligationDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  deleteObligation(index: number) {
    this.formInput.obligations?.splice(index, 1);
    this.form.patchValue(this.formInput);
  }

  deleteObligationDetail(indexObligation: number, index: number) {
    if (this.formInput.obligations[indexObligation].obligationDetails.length === 1) {
      this.messageDialogService.errorCustom('No se puede elminar', 'Debe haber al menos un campo');
      return;
    }

    this.formInput.obligations[indexObligation].obligationDetails?.splice(index, 1);


    if (this.formInput.obligations[indexObligation].obligationDetails.length === 0) {
      this.formInput.obligations.splice(indexObligation, 1);
    }

    this.form.patchValue(this.formInput);
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
