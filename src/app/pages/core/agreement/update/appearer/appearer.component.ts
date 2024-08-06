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
  @Output() formOutput: EventEmitter<AgreementModel> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter()
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  @Input({required: true}) formInput!: AgreementModel;

  protected id: string = RoutesEnum.NEW
  protected form!: FormGroup;
  protected agreement!: AgreementModel;
  protected internalInstitutionForm!: FormGroup;
  protected externalInstitutionForm!: FormGroup;
  protected internalInstitutionDetailForm!: FormGroup;
  protected externalInstitutionDetailForm!: FormGroup;
  protected externalInstitutionsColumns: ColumnModel[] = [];
  protected internalInstitutionsColumns: ColumnModel[] = [];
  private formErrors: string[] = [];
  protected isVisibleExternalInstitutionDetailForm: boolean = false;
  protected index: number = -1;
  protected isEditing: boolean = false;
  protected isEditingDetail: boolean =false;
  protected detailIndex: number = -1;;
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
    this.buildExternalInstitutionForm();
    this.buildInternalInstitutionForm();
    this.buildExternalInstitutionDetailForm();
    this.buildInternalInstitutionDetailForm();
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
    this.agreement = this.formInput;

    this.agreement.internalInstitutions = this.agreement.internalInstitutions || [];
    this.agreement.externalInstitutions = this.agreement.externalInstitutions || [];

    this.form.patchValue(this.formInput);
  }

  checkValueChanges() {
    this.form.valueChanges.subscribe(value => {
      this.formOutput.emit(this.agreement);
      this.validateForm();
    });
  }

  validateForm() {
    this.formErrors = [];

    if (this.internalInstitutions.invalid) this.formErrors.push('Mintur');//review

    if (this.internalInstitutions.invalid) this.formErrors.push('Contraparte');//review

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
      name: [null, [Validators.required, Validators.pattern(onlyLetters())]],
    });
  }

  buildExternalInstitutionDetailForm() {
    this.externalInstitutionDetailForm = this.formBuilder.group({
      position: [null, [Validators.required]],
      unit: [null, [Validators.required, Validators.pattern(onlyLetters())]],
    });
  }

  buildInternalInstitutionsColumns() {
    this.internalInstitutionsColumns = [
      {
        field: 'personType', header: InternalInstitutionsFormEnum.personType
      },
      {
        field: 'name', header: InternalInstitutionsFormEnum.name
      },
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
        field: 'position', header: ExternalInstitutionsFormEnum.position
      },
    ];
  }

  /** add array **/
  addInternalInstitution() {
    if (this.validateInternalInstitutionForm()) {
      if (this.agreement.internalInstitutions) {
        this.agreement.internalInstitutions.push(this.internalInstitutionForm.value);
      } else {
        this.agreement.internalInstitutions = [this.internalInstitutionForm.value];
      }

      this.form.patchValue(this.agreement);

      this.index = this.agreement.internalInstitutions.length - 1;
      this.addInternalInstitutionDetail();

      this.internalInstitutionPersonTypeField.reset();
    } else {
      this.internalInstitutionForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  addInternalInstitutionDetail() {
    if (this.validateInternalInstitutionDetailForm()) {
      if (this.agreement?.internalInstitutions) {
        if (this.agreement?.internalInstitutions[this.index].internalInstitutionDetails) {
          this.agreement.internalInstitutions[this.index].internalInstitutionDetails.push(this.internalInstitutionDetailForm.value);
        } else {
          this.agreement.internalInstitutions[this.index].internalInstitutionDetails = [this.internalInstitutionDetailForm.value];
        }
      }

      this.internalInstitutionDetailPositionField.reset();
    } else {
      this.internalInstitutionDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  addExternalInstitution() {
    if (this.validateExternalInstitutionForm()) {
      if (this.agreement.externalInstitutions) {
        this.agreement.externalInstitutions.push(this.externalInstitutionForm.value);
      } else {
        this.agreement.externalInstitutions = [this.externalInstitutionForm.value];
      }

      this.form.patchValue(this.agreement);

      console.log(this.form.value)

      this.externalInstitutionForm.reset();
    } else {
      this.externalInstitutionForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  addExternalInstitutionDetail() {
    if (this.validateExternalInstitutionDetailForm()) {
      if (this.agreement?.externalInstitutions) {
        if (this.agreement?.externalInstitutions[this.index].externalInstitutionDetails) {
          this.agreement.externalInstitutions[this.index].externalInstitutionDetails.push(this.externalInstitutionDetailForm.value);
        } else {
          this.agreement.externalInstitutions[this.index].externalInstitutionDetails = [this.externalInstitutionDetailForm.value];
        }
      }

      this.form.patchValue(this.agreement);
      console.log(this.agreement);
      console.log(this.form.value);
      
      this.isEditing= false
      this.isVisibleExternalInstitutionDetailForm = false;
      this.externalInstitutionDetailForm.reset();
    } else {
      this.externalInstitutionDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  showExternalInstitutionDetailModal(index: number) {
    this.isVisibleExternalInstitutionDetailForm = true;
    this.index = index;
  }

  /** delete array**/
  deleteExternalInstitution(index: number) {
    if (this.agreement.externalInstitutions) {
      this.agreement.externalInstitutions.splice(index, 1);
    }

    this.form.patchValue(this.agreement);
  }

  deleteInternalInstitutionDetail(institution: InternalInstitutionModel, detail: any) {
    const index = institution.internalInstitutionDetails.indexOf(detail);
    if (index !== -1) {
      institution.internalInstitutionDetails.splice(index, 1);
      this.form.patchValue(this.agreement);
    }
  }

  deleteInternalInstitution(index: number) {
    if (this.agreement.internalInstitutions) {
      this.agreement.internalInstitutions.splice(index, 1);
    }

    this.form.patchValue(this.agreement);
  }

  deleteExternalInstitutionDetail(indexExternalInstitution: number, indexExternalInstitutionDetail: number) {
    if (this.agreement.externalInstitutions) {
      this.agreement.externalInstitutions[indexExternalInstitution].externalInstitutionDetails.splice(indexExternalInstitutionDetail, 1);
    }
  }
  
 /** edit array **/
  editExternalInstitution(index: number) {
    if (
      this.agreement.externalInstitutions &&
      index >= 0 &&
      index < this.agreement.externalInstitutions.length
    ) {
      const institutionToEdit = this.agreement.externalInstitutions[index];
      if (institutionToEdit) {
        this.externalInstitutionForm.patchValue({
          name: institutionToEdit.name,
          personType: institutionToEdit.personType,
        });
        
        this.index = index;
        this.isEditing= true
      }
    } else {
      console.error('no vale');
    }
  }
 
  updateExternalInstitution() {
  
    if (
      this.agreement.externalInstitutions &&
      Array.isArray(this.agreement.externalInstitutions) &&
      this.index >= 0 &&
      this.index < this.agreement.externalInstitutions.length
    ) {
     
      this.agreement.externalInstitutions[this.index] = {
        ...this.agreement.externalInstitutions[this.index],
        ...this.externalInstitutionForm.value
      };
  
      this.externalInstitutionForm.reset();
      this.isEditing= false
    
      this.isVisibleExternalInstitutionDetailForm = false;
  
      this.form.patchValue(this.agreement);
    } else {
      console.error('no vale');
    }
  }

  cancelEdit() {
    this.externalInstitutionForm.reset();
    this.isEditing =false
    this.index = -1;
  }

  editExternalInstitutionDetail(externalInstitutionIndex: number, detailIndex: number) {
   
    if (this.agreement?.externalInstitutions &&
        externalInstitutionIndex >= 0 &&
        externalInstitutionIndex < this.agreement.externalInstitutions.length &&
        this.agreement.externalInstitutions[externalInstitutionIndex]?.externalInstitutionDetails &&
        detailIndex >= 0 &&
        detailIndex < this.agreement.externalInstitutions[externalInstitutionIndex].externalInstitutionDetails.length) {
  
      const detailToEdit = this.agreement.externalInstitutions[externalInstitutionIndex].externalInstitutionDetails[detailIndex];

      this.externalInstitutionDetailForm.patchValue(detailToEdit);

      this.index = externalInstitutionIndex;
      this.detailIndex = detailIndex;
      this.isEditingDetail =true;
   
      this.isVisibleExternalInstitutionDetailForm = true;
    } else {
      console.error('no vale');
    }
  }

  updateExternalInstitutionDetail() {
    if (
      this.agreement?.externalInstitutions &&
      this.index >= 0 &&
      this.index < this.agreement.externalInstitutions.length &&
      this.agreement.externalInstitutions[this.index]?.externalInstitutionDetails
    ) {
      const detailsArray = this.agreement.externalInstitutions[this.index].externalInstitutionDetails;
  
      if (this.detailIndex >= 0 && this.detailIndex < detailsArray.length) {
        detailsArray[this.detailIndex] = this.externalInstitutionDetailForm.value;
        this.form.patchValue(this.agreement);
        
        
      } 
      this.isEditingDetail =false;
      this.isVisibleExternalInstitutionDetailForm = false;
      this.externalInstitutionDetailForm.reset();
    } else {
      console.error('error');
    }
  }
  cancelEditDetail() {
    this.isEditingDetail =false;
    this.isVisibleExternalInstitutionDetailForm = false;
    this.externalInstitutionDetailForm.reset();
  }
  validateExternalInstitutionForm(): boolean {
    this.formErrors = [];

    if (this.externalInstitutionNameField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.name);
    if (this.externalInstitutionPersonTypeField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.personType);

    return this.externalInstitutionForm.valid && this.formErrors.length === 0;
  }

  validateExternalInstitutionDetailForm(): boolean {
    this.formErrors = [];

    if (this.externalInstitutionDetailUnitField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.unit);
    if (this.externalInstitutionDetailPositionField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.position);

    return this.externalInstitutionDetailForm.valid && this.formErrors.length === 0;
  }

  validateInternalInstitutionForm() {
    this.formErrors = [];

    if (this.internalInstitutionPersonTypeField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.personType);

    return this.internalInstitutionForm.valid && this.formErrors.length === 0;
  }

  validateInternalInstitutionDetailForm() {
    this.formErrors = [];

    if (this.internalInstitutionDetailPositionField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.position);

    return this.internalInstitutionDetailForm.valid && this.formErrors.length === 0;
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

  /** Getters Form**/
  get internalInstitutions(): FormArray {
    return this.form.get('internalInstitutions') as FormArray;
  }


  get internalInstitutionPersonTypeField(): AbstractControl {
    return this.internalInstitutionForm.controls['personType'];
  }

  get internalInstitutionDetailPositionField(): AbstractControl {
    return this.internalInstitutionDetailForm.controls['position'];
  }

  get externalInstitutions(): FormArray {
    return this.form.get('externalInstitutions') as FormArray;
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