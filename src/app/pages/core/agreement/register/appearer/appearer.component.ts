import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, AbstractControl} from '@angular/forms';
import {
  AgreementModel,
  CatalogueModel,
  ColumnModel,
  ExternalInstitutionModel,
  InternalInstitutionModel
} from '@models/core';
import {AuthService} from '@servicesApp/auth';
import {CoreService, MessageDialogService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {
  ExternalInstitutionsFormEnum,
  InternalInstitutionsFormEnum,
  SkeletonEnum,
  RoutesEnum,
  CatalogueTypeEnum,
  SeverityButtonActionEnum,
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
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter()
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  @Input({required: true}) formInput!: AgreementModel;

  protected id: string = RoutesEnum.NEW
  protected form!: FormGroup;
  protected internalInstitutionForm!: FormGroup;
  protected externalInstitutionForm!: FormGroup;
  protected externalInstitutionDetailForm!: FormGroup;

  private formErrors: string[] = [];
  protected externalInstitutionsColumns: ColumnModel[] = [];
  protected internalInstitutionsColumns: ColumnModel[] = [];

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

  constructor() {
    this.buildForm();
    this.buildInternalInstitutionForm();
    this.buildExternalInstitutionForm();
    this.buildExternalInstitutionDetailForm();
    this.buildExternalInstitutionsColumns();
    this.buildInternalInstitutionsColumns();
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

    this.checkValueChanges();
  }

  patchValueForm() {
    const {internalInstitutions, externalInstitutions} = this.formInput;

    if (internalInstitutions) {
      internalInstitutions.forEach((item: InternalInstitutionModel) => {
        const internalInstitution = this.formBuilder.group({
          personType: [item.personType],
          position: [item.position],
          name: [item.name],
          unit: [item.unit],
        });

        this.internalInstitutionsField.push(internalInstitution);
      });
    }

    if (externalInstitutions) {
      externalInstitutions.forEach((item: ExternalInstitutionModel) => {
        const externalInstitution = this.formBuilder.group({
          personType: [item.personType],
          position: [item.position],
          name: [item.name],
          unit: [item.unit],
        });

        this.externalInstitutionsField.push(externalInstitution);
      });
    }
  }

  checkValueChanges() {
    this.form.valueChanges.subscribe(value => {
      this.formOutput.emit(value);
      this.validateForm();
    });
  }
  
  buildInternalInstitutionsColumns() {
    this.internalInstitutionsColumns = [
      {
        field: 'position', header: InternalInstitutionsFormEnum.position
      },
      {
        field: 'personType', header: InternalInstitutionsFormEnum.personType
      },
      {
        field: 'name', header: InternalInstitutionsFormEnum.name
      },
      {
        field: 'unit', header: InternalInstitutionsFormEnum.unit
      },
    ];
  }

  buildExternalInstitutionsColumns() {
    this.externalInstitutionsColumns = [
      {
        field: 'position', header: ExternalInstitutionsFormEnum.position
      },
      {
        field: 'personType', header: ExternalInstitutionsFormEnum.personType
      },
      {
        field: 'name', header: ExternalInstitutionsFormEnum.name
      },
      {
        field: 'unit', header: ExternalInstitutionsFormEnum.unit
      },
    ];
  }

  validateForm() {
    this.formErrors = [];

    if (this.internalInstitutionsField.invalid) this.formErrors.push('Mintur');//review

    if (this.internalInstitutionsField.invalid) this.formErrors.push('Contraparte');//review

    this.formErrorsOutput.emit(this.formErrors);
  }

  buildInternalInstitutionForm() {
    this.internalInstitutionForm = this.formBuilder.group({
      position: [null, [Validators.required]],
      personType: [null, [Validators.required]],
      name: ['Ministerio de Turismo'],
      unit: ['Unidad'],
    });
  }
  
  buildExternalInstitutionForm() {
    this.externalInstitutionForm = this.formBuilder.group({
      personType: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.pattern(onlyLetters())]],
      externalInstitutionDetails: this.formBuilder.array([])
    });
  }
  
  buildExternalInstitutionDetailForm() {
    this.externalInstitutionDetailForm = this.formBuilder.group({
      position: [null, [Validators.required]],
      unit: [null, [Validators.required, Validators.pattern(onlyLetters())]],
    });
  }
  

  /** add array **/
  addInternalInstitution() {
    if (this.validateInternalInstitutionsForm()) {
      const internalInstitutions = this.formBuilder.group({
        position: [this.internalInstitutionForm.value.position],
        personType: [this.internalInstitutionForm.value.personType],
        name: ['Ministerio de Turismo'],
        unit: ['Unidad'],
      });

      this.internalInstitutionsField.push(internalInstitutions);
      this.internalInstitutionForm.reset();
    } else {
      this.internalInstitutionForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  addExternalInstitution() {
    if (this.validateExternalInstitutionsForm()) {
      const externalInstitution = this.formBuilder.group({
        personType: [this.externalInstitutionForm.value.personType],
        name: [this.externalInstitutionForm.value.name],
        externalInstitutionDetails: this.formBuilder.array([])
      });
      this.externalInstitutionsField.push(externalInstitution);
      this.addExternalInstitutionDetail(this.externalInstitutionsField.length - 1);
      this.externalInstitutionForm.reset();
    } else {
      this.externalInstitutionForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }
  

  addExternalInstitutionDetail(index: number) {
    if (this.validateExternalInstitutionsForm()) {
      const externalInstitutionDetails = this.externalInstitutionsField.at(index).get('externalInstitutionDetails') as FormArray;
      const externalInstitutionDetail = this.formBuilder.group({
        position: [this.externalInstitutionDetailForm.value.position],
        unit: [this.externalInstitutionDetailForm.value.unit],
      });
      externalInstitutionDetails.push(externalInstitutionDetail);
      this.externalInstitutionDetailForm.reset();
    } else {
      this.externalInstitutionDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  /** delete array**/
  deleteExternalInstitution(index: number) {
    this.externalInstitutionsField.removeAt(index);
  }
  
  /* deleteExternalInstitutionDetail(institutionIndex: number, detailIndex: number) {
    const externalInstitutionDetails = this.externalInstitutionsField.at(institutionIndex).get('externalInstitutionDetails') as FormArray;
    externalInstitutionDetails.removeAt(detailIndex);
  } */

  deleteInternalInstitution(index: number) {
    this.internalInstitutionsField.removeAt(index);
  }

  validateExternalInstitutionsForm(): boolean {
    this.formErrors = [];
  
    if (this.externalInstitutionNameField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.name);
    if (this.externalInstitutionPersonTypeField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.personType);
  
    return this.externalInstitutionForm.valid && this.formErrors.length === 0;
  }
  
  validateExternalInstitutionDetailsForm(): boolean {
    this.formErrors = [];
  
    if (this.externalInstitutionDetailUnitField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.unit);
    if (this.externalInstitutionDetailPositionField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.position);
  
    return this.externalInstitutionDetailForm.valid && this.formErrors.length === 0;
  }
  

  validateInternalInstitutionsForm() {
    this.formErrors = [];

    if (this.internalInstitutionPositionField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.position);
    if (this.internalInstitutionPersonTypeField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.personType);

    return this.internalInstitutionForm.valid && this.formErrors.length === 0;
  }

  /** Load Foreign Keys  **/
  loadInternalPersonTypes() {
    this.internalPersonTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.INTERNAL_INSTITUTIONS_PERSON_TYPE);
  }

  loadExternalPersonTypes() {
    this.externalPersonTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.EXTERNAL_INSTITUTIONS_PERSON_TYPE);
  }

  loadPositions() {
    this.positions = this.cataloguesHttpService.findByType(CatalogueTypeEnum.INTERNAL_INSTITUTIONS_POSITION);
  }

  /** Form Actions **/
  onSubmit(): void {
    if (this.internalInstitutionsField.length > 0 && this.externalInstitutionsField.length > 0) {
      this.save()
    } else {
      if (this.internalInstitutionsField.length === 0) {
        this.internalInstitutionForm.markAllAsTouched();
        this.messageDialogService.fieldErrors('Debe agregar al menos una institución interna.')
      }
      if (this.externalInstitutionsField.length === 0) {
        this.externalInstitutionForm.markAllAsTouched();
        this.messageDialogService.fieldErrors('Debe agregar al menos una institución externa.')
      }
    }
  }

  save() {
    this.formOutput.emit(this.form.value);
    this.nextOutput.emit(true);
  }

  /** Getters Form**/
  get internalInstitutionsField(): FormArray {
    return this.form.get('internalInstitutions') as FormArray;
  }

  get externalInstitutionsField(): FormArray {
    return this.form.get('externalInstitutions') as FormArray;
  }

  get externalInstitutionDetailsField(): FormArray {
    return this.externalInstitutionForm.get('externalInstitutionDetails') as FormArray;
  }

  get internalInstitutionPositionField(): AbstractControl {
    return this.internalInstitutionForm.controls['position'];
  }

  get internalInstitutionPersonTypeField(): AbstractControl {
    return this.internalInstitutionForm.controls['personType'];
  }

  get externalInstitutionNameField(): AbstractControl {
    return this.externalInstitutionForm.controls['name'];
  }
  
  get externalInstitutionPersonTypeField(): AbstractControl {
    return this.externalInstitutionForm.controls['personType'];
  }


  get externalInstitutionDetailUnitField(): AbstractControl {
    return this.externalInstitutionDetailForm.controls['unit'];
  }
  
  get externalInstitutionDetailPositionField(): AbstractControl {
    return this.externalInstitutionDetailForm.controls['position'];
  }
}


