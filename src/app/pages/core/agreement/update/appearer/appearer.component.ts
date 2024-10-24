import {Component, EventEmitter, inject, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, AbstractControl} from '@angular/forms';
import {
  AgreementModel,
  CatalogueModel,
  ColumnModel,
  createAgreementModel
} from '@models/core';
import {AuthService} from '@servicesApp/auth';
import {CoreService, MessageDialogService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {
  ExternalInstitutionsFormEnum,
  InternalInstitutionsFormEnum,
  SkeletonEnum,
  CatalogueTypeEnum,
  SeverityButtonActionEnum,
  LabelButtonActionEnum,
  IconButtonActionEnum,
  AgreementFormEnum,
  TableEnum,
  CatalogueInternalInstitutionsPersonTypeEnum,
} from '@shared/enums';
import {PrimeIcons} from 'primeng/api';
import {onlyLetters} from "@shared/helpers";

@Component({
  selector: 'app-appearer',
  templateUrl: './appearer.component.html',
  styleUrl: './appearer.component.scss'
})

export class AppearerComponent implements OnInit {
  /** Services **/
  protected readonly authService = inject(AuthService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);

  /** Form **/
  @Input({required: true}) formInput: AgreementModel = createAgreementModel();
  @Output() formOutput: EventEmitter<AgreementModel> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter()

  protected form!: FormGroup;
  protected internalInstitutionForm!: FormGroup;
  protected externalInstitutionForm!: FormGroup;
  protected internalInstitutionDetailForm!: FormGroup;
  protected externalInstitutionDetailForm!: FormGroup;
  protected externalInstitutionsColumns: ColumnModel[] = [];
  protected internalInstitutionsColumns: ColumnModel[] = [];
  private formErrors: string[] = [];
  protected isVisibleExternalInstitutionDetailForm: boolean = false;
  protected isVisibleInternalInstitutionForm: boolean = false;
  protected isVisibleExternalInstitutionForm: boolean = false;
  protected index: number = -1;

  /** Foreign Keys **/
  protected internalPersonTypes: CatalogueModel[] = [];
  protected externalPersonTypes: CatalogueModel[] = [];
  protected positions: CatalogueModel[] = [];

  /** Enums **/
  protected readonly ExternalInstitutionsFormEnum = ExternalInstitutionsFormEnum;
  protected readonly InternalInstitutionsFormEnum = InternalInstitutionsFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly TableEnum = TableEnum;

  constructor() {
    this.buildForm();
    this.buildExternalInstitutionForm();
    this.buildInternalInstitutionForm();
    this.buildExternalInstitutionDetailForm();
    this.buildInternalInstitutionDetailForm();
    this.buildExternalInstitutionsColumns();
    this.buildInternalInstitutionsColumns();

    this.checkValueChanges();
  }

  ngOnInit(): void {
    this.loadInternalPersonTypes();
    this.loadExternalPersonTypes();
    this.loadPositions();

    this.patchValueForm();
    this.validateForm();
  }

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      internalInstitutions: this.formBuilder.array([], Validators.required),
      externalInstitutions: this.formBuilder.array([], Validators.required),
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
  }

  validateForm() {
    this.formErrors = [];

    if (this.formInput.internalInstitutions?.length === 0) this.formErrors.push('Comparecientes - Mintur');//review

    if (this.formInput.externalInstitutions?.length === 0) this.formErrors.push('Comparecientes - Contraparte');//review

    this.formErrorsOutput.emit(this.formErrors);
  }

  buildInternalInstitutionForm() {
    this.internalInstitutionForm = this.formBuilder.group({
      name: ['Ministerio de Turismo'],
      personType: [null, [Validators.required]],
    });
  }

  buildInternalInstitutionDetailForm() {
    this.internalInstitutionDetailForm = this.formBuilder.group({
      position: [null, [Validators.required]],
      unit: [null],
    });
  }

  buildExternalInstitutionForm() {
    this.externalInstitutionForm = this.formBuilder.group({
      personType: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }

  buildExternalInstitutionDetailForm() {
    this.externalInstitutionDetailForm = this.formBuilder.group({
      id: [null],
      position: [null, [Validators.required]],
      unit: [null, [Validators.required, Validators.pattern(onlyLetters())]],
    });
  }

  buildInternalInstitutionsColumns() {
    this.internalInstitutionsColumns = [
      // {
      //   field: 'personType', header: InternalInstitutionsFormEnum.personType
      // },
      // {
      //   field: 'name', header: InternalInstitutionsFormEnum.name
      // },
      {
        field: 'position', header: InternalInstitutionsFormEnum.position
      },
    ];
  }

  buildExternalInstitutionsColumns() {
    this.externalInstitutionsColumns = [
      {
        field: 'personType', header: ExternalInstitutionsFormEnum.personType
      },
      {
        field: 'name', header: ExternalInstitutionsFormEnum.name
      },
      {
        field: 'position', header: ExternalInstitutionsFormEnum.unit
      },
      {
        field: 'position', header: ExternalInstitutionsFormEnum.position
      },
    ];
  }

  /** add array **/
  addInternalInstitution() {
    this.internalInstitutionPersonTypeField.patchValue(this.internalPersonTypes.find(item => item.code === CatalogueInternalInstitutionsPersonTypeEnum.PUBLIC));
    this.internalInstitutionNameField.patchValue('Ministerio de Turismo');

    if (this.validateInternalInstitutionForm() && this.validateInternalInstitutionDetailForm()) {
      if (this.formInput.internalInstitutions.length === 0) {
        this.formInput.internalInstitutions.push(this.internalInstitutionForm.value);
      }

      this.index = 0;

      this.form.patchValue(this.formInput);

      this.addInternalInstitutionDetail();

      this.internalInstitutionForm.reset();

      this.isVisibleInternalInstitutionForm = false;
    } else {
      this.internalInstitutionForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  addInternalInstitutionDetail() {
    if (this.validateInternalInstitutionDetailForm()) {
      if (this.formInput?.internalInstitutions) {
        if (this.formInput?.internalInstitutions[this.index].internalInstitutionDetails) {
          this.formInput.internalInstitutions[this.index].internalInstitutionDetails.push(this.internalInstitutionDetailForm.value);
        } else {
          this.formInput.internalInstitutions[this.index].internalInstitutionDetails = [this.internalInstitutionDetailForm.value];
        }
      }

      this.form.patchValue(this.formInput);

      this.internalInstitutionDetailPositionField.reset();
    } else {
      this.internalInstitutionDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  addExternalInstitution() {
    if (this.validateExternalInstitutionForm() && this.validateExternalInstitutionDetailForm()) {
      if (this.formInput.externalInstitutions.length === 0) {
        this.formInput.externalInstitutions.push(this.externalInstitutionForm.value);
        this.index = 0;
      } else {
        this.index = this.formInput.externalInstitutions.findIndex(item => item.name.toLowerCase() === this.externalInstitutionNameField.value.toLowerCase());

        if (this.index === -1) {
          this.formInput.externalInstitutions.push(this.externalInstitutionForm.value);

          this.index = this.formInput.externalInstitutions.length - 1;
        }
      }

      this.form.patchValue(this.formInput);

      this.addExternalInstitutionDetail();

      this.externalInstitutionForm.reset();

      this.isVisibleExternalInstitutionForm = false;
    } else {
      this.externalInstitutionForm.markAllAsTouched();
      this.externalInstitutionDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  updateExternalInstitution() {
    if (this.validateExternalInstitutionForm() && this.validateExternalInstitutionDetailForm()) {
      this.index = this.formInput.externalInstitutions.findIndex(item => item.name.toLowerCase() === this.externalInstitutionNameField.value.toLowerCase());

      if (this.index === -1) {
        this.formInput.externalInstitutions.push(this.externalInstitutionForm.value);

        this.index = this.formInput.externalInstitutions.length - 1;
      }


      this.form.patchValue(this.formInput);

      this.addExternalInstitutionDetail();

      this.externalInstitutionForm.reset();

      this.isVisibleExternalInstitutionForm = false;
    } else {
      this.externalInstitutionForm.markAllAsTouched();
      this.externalInstitutionDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  addExternalInstitutionDetail() {
    if (this.validateExternalInstitutionDetailForm()) {
      if (this.formInput?.externalInstitutions) {
        if (this.formInput?.externalInstitutions[this.index].externalInstitutionDetails) {
          this.formInput.externalInstitutions[this.index].externalInstitutionDetails.push(this.externalInstitutionDetailForm.value);
        } else {
          this.formInput.externalInstitutions[this.index].externalInstitutionDetails = [this.externalInstitutionDetailForm.value];
        }
      }

      this.form.patchValue(this.formInput);

      this.isVisibleExternalInstitutionDetailForm = false;

      this.externalInstitutionDetailForm.reset();
    } else {
      this.externalInstitutionDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  showExternalInstitutionModal() {
    this.isVisibleExternalInstitutionForm = true;
  }

  showExternalInstitutionDetailModal(index: number) {
    this.isVisibleExternalInstitutionDetailForm = true;
    this.index = index;
  }

  /** delete array**/
  deleteExternalInstitution(index: number) {
    if (this.formInput.obligations.some(item => item.institutionName.includes(this.formInput.externalInstitutions[index].name))) {
      this.messageDialogService.errorCustom('Existe obligaciones asignadas', 'Por favor elimine primero las obligaciones');
      return;
    }

    if (this.formInput.financings.some(item => item.institutionName === this.formInput.externalInstitutions[index].name)) {
      this.messageDialogService.errorCustom('Existe financiamientos asignados', 'Por favor elimine primero los financiamientos');
      return;
    }

    this.formInput.externalInstitutions.splice(index, 1);

    this.form.patchValue(this.formInput);
  }

  deleteInternalInstitutionDetail(indexInternalInstitution: number, indexInternalInstitutionDetail: number) {
    this.formInput.internalInstitutions[indexInternalInstitution].internalInstitutionDetails.splice(indexInternalInstitutionDetail, 1);
  }

  deleteInternalInstitution(index: number) {
    this.formInput.internalInstitutions.splice(index, 1);

    this.form.patchValue(this.formInput);
  }

  deleteExternalInstitutionDetail(indexExternalInstitution: number, indexExternalInstitutionDetail: number) {
    if (this.formInput.externalInstitutions[indexExternalInstitution].externalInstitutionDetails.length === 1) {
      this.messageDialogService.errorCustom('No se puede elminar', 'Debe contener al menos una unidad y un cargo');
      return;
    }

    this.formInput.externalInstitutions[indexExternalInstitution].externalInstitutionDetails.splice(indexExternalInstitutionDetail, 1);
  }

  validateExternalInstitutionForm(): boolean {
    this.formErrors = [];

    if (this.externalInstitutionNameField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.name);
    if (this.externalInstitutionPersonTypeField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.personType);
    if (this.externalInstitutionDetailUnitField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.unit);
    if (this.externalInstitutionDetailPositionField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.position);

    return this.formErrors.length === 0;
  }

  validateExternalInstitutionDetailForm(): boolean {
    this.formErrors = [];

    if (this.externalInstitutionDetailUnitField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.unit);
    if (this.externalInstitutionDetailPositionField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.position);

    return this.formErrors.length === 0;
  }

  validateInternalInstitutionForm() {
    this.formErrors = [];

    if (this.internalInstitutionPersonTypeField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.personType);

    return this.formErrors.length === 0;
  }

  validateInternalInstitutionDetailForm() {
    this.formErrors = [];

    if (this.internalInstitutionDetailPositionField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.position);

    return this.internalInstitutionDetailForm.valid && this.formErrors.length === 0;
  }

  /** Load Foreign Keys  **/
  loadInternalPersonTypes() {
    this.internalPersonTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.INTERNAL_INSTITUTIONS_PERSON_TYPE);
    this.internalInstitutionPersonTypeField.patchValue(this.internalPersonTypes.find(item => item.code === CatalogueInternalInstitutionsPersonTypeEnum.PUBLIC));
  }

  loadExternalPersonTypes() {
    this.externalPersonTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.EXTERNAL_INSTITUTIONS_PERSON_TYPE);
  }

  loadPositions() {
    this.positions = this.cataloguesHttpService.findByType(CatalogueTypeEnum.INTERNAL_INSTITUTIONS_POSITION);
  }

  /** Form Actions **/
  save() {
    this.formOutput.emit(this.form.value);
  }

  showInternalInstitutionModal() {
    this.isVisibleInternalInstitutionForm = true;
  }

  /** Getters Form**/
  get internalInstitutionsField(): FormArray {
    return this.form.get('internalInstitutions') as FormArray;
  }

  get externalInstitutionsField(): FormArray {
    return this.form.get('externalInstitutions') as FormArray;
  }

  get internalInstitutionNameField(): AbstractControl {
    return this.internalInstitutionForm.controls['name'];
  }

  get internalInstitutionPersonTypeField(): AbstractControl {
    return this.internalInstitutionForm.controls['personType'];
  }

  get internalInstitutionDetailPositionField(): AbstractControl {
    return this.internalInstitutionDetailForm.controls['position'];
  }

  get externalInstitutionNameField(): AbstractControl {
    return this.externalInstitutionForm.controls['name'];
  }

  get externalInstitutionPersonTypeField(): AbstractControl {
    return this.externalInstitutionForm.controls['personType'];
  }

  get externalInstitutionDetailIdField(): AbstractControl {
    return this.externalInstitutionDetailForm.controls['id'];
  }

  get externalInstitutionDetailUnitField(): AbstractControl {
    return this.externalInstitutionDetailForm.controls['unit'];
  }

  get externalInstitutionDetailPositionField(): AbstractControl {
    return this.externalInstitutionDetailForm.controls['position'];
  }
}
