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
    console.log(this.formInput);
    this.agreement = this.formInput;
<<<<<<< HEAD
    this.agreement.externalInstitutions = this.agreement.externalInstitutions || [];
    this.agreement.externalInstitutions.forEach(inst => {
      inst.externalInstitutionDetails = inst.externalInstitutionDetails || [];
    });
    this.agreement.internalInstitutions = this.agreement.internalInstitutions || [];
  this.agreement.internalInstitutions.forEach(inst => {
    inst.internalInstitutionDetails = inst.internalInstitutionDetails || [];
  });

=======
>>>>>>> main
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

    if (this.internalInstitutionsField.invalid) this.formErrors.push('Mintur');//review

    if (this.internalInstitutionsField.invalid) this.formErrors.push('Contraparte');//review

    this.formErrorsOutput.emit(this.formErrors);
  }

  buildInternalInstitutionForm() {
    this.internalInstitutionForm = this.formBuilder.group({
      name: ['Ministerio de Turismo'],
      personType: [null, [Validators.required]],
<<<<<<< HEAD
    });
  }

  buildInternalInstitutionDetailForm() {
    this.internalInstitutionDetailForm = this.formBuilder.group({
      position: [null, [Validators.required]],
      unit: ['Unidad'],
=======
>>>>>>> main
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

  buildInternalInstitutionDetailForm() {
    this.internalInstitutionDetailForm = this.formBuilder.group({
      position: [null, [Validators.required]],
      unit: ['Unidad'],
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
<<<<<<< HEAD
    if (this.validateInternalInstitutionForm()) {
      if (this.agreement.internalInstitutions) {
        this.agreement.internalInstitutions.push(this.internalInstitutionForm.value);
      } else {
        this.agreement.internalInstitutions = [this.internalInstitutionForm.value];
      }
      this.form.patchValue(this.agreement);
  
      this.index = this.agreement.internalInstitutions.length - 1;
      this.addInternalInstitutionDetail();
  
      this.internalInstitutionForm.reset();
=======
    if (this.validateInternalInstitutionsForm()) {
      this.agreement.internalInstitutions = [this.internalInstitutionForm.value];

      if (this.agreement?.internalInstitutions) {
        this.agreement.internalInstitutions[0].internalInstitutionDetails = [this.internalInstitutionDetailForm.value];
      }

      this.form.patchValue(this.agreement);
>>>>>>> main
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
  
      this.form.patchValue(this.agreement);
      this.internalInstitutionDetailForm.reset();
    } else {
      this.internalInstitutionDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  addExternalInstitution() {
    if (this.validateExternalInstitutionForm()) {
<<<<<<< HEAD
=======
      console.log(this.agreement.externalInstitutions);
>>>>>>> main
      if (this.agreement.externalInstitutions) {
        this.agreement.externalInstitutions.push(this.externalInstitutionForm.value);
      } else {
        this.agreement.externalInstitutions = [this.externalInstitutionForm.value];
      }

      this.form.patchValue(this.agreement);

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

  addExternalInstitutionDetail() {
    if (true) {
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
    (this.form.get('externalInstitutions') as FormArray).removeAt(index);
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
  
  /* deleteExternalInstitutionDetail(institutionIndex: number, detailIndex: number) {
    const externalInstitutionDetails = this.externalInstitutionsField.at(institutionIndex).get('externalInstitutionDetails') as FormArray;
    externalInstitutionDetails.removeAt(detailIndex);
  } */

  deleteInternalInstitution(index: number) {
    (this.form.get('internalInstitutions') as FormArray).removeAt(index);
    if (this.agreement.internalInstitutions) {
      this.agreement.internalInstitutions.splice(index, 1);
    }
    this.form.patchValue(this.agreement);
  }

<<<<<<< HEAD
  deleteExternalInstitutionDetail(institution: ExternalInstitutionModel, detail: any) {
    const index = institution.externalInstitutionDetails.indexOf(detail);
    if (index !== -1) {
      institution.externalInstitutionDetails.splice(index, 1);
      this.form.patchValue(this.agreement);
    }
  }
  
=======
>>>>>>> main
  validateExternalInstitutionForm(): boolean {
    this.formErrors = [];
    
    if (this.externalInstitutionNameField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.name);
<<<<<<< HEAD
=======
    // if (this.externalInstitutionDetailUnitField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.unit);
    // if (this.externalInstitutionDetailPositionField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.position);
>>>>>>> main
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

<<<<<<< HEAD
=======
    if (this.internalInstitutionDetailPositionField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.position);
>>>>>>> main
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
<<<<<<< HEAD
  
=======

  get internalInstitutionDetailPositionField(): AbstractControl {
    return this.internalInstitutionDetailForm.controls['position'];
  }

>>>>>>> main
  get internalInstitutionPersonTypeField(): AbstractControl {
    return this.internalInstitutionForm.controls['personType'];
  }

  get internalInstitutionDetailPositionField(): AbstractControl {
    return this.internalInstitutionDetailForm.controls['position'];
  }

  get externalInstitutionNameField(): AbstractControl {
    return this.externalInstitutionForm.controls['name'];
  }
<<<<<<< HEAD
  
=======

  get externalInstitutionDetailUnitField(): AbstractControl {
    return this.externalInstitutionDetailForm.controls['unit'];
  }

  get externalInstitutionDetailPositionField(): AbstractControl {
    return this.externalInstitutionDetailForm.controls['position'];
  }

>>>>>>> main
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


