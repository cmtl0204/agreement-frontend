import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, AbstractControl} from '@angular/forms';
import {AgreementModel, CatalogueModel, ColumnModel, ExternalInstitutionModel, InternalInstitutionModel} from '@models/core';
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
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  @Input({required:true}) formInput!:AgreementModel;
  protected id: string = RoutesEnum.NEW
  protected form!: FormGroup;
  protected internalInstitutionForm!: FormGroup;
  protected externalInstitutionForm!: FormGroup;
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
    this.buildExternalInstitutionsColumns();
    this.buildInternalInstitutionsColumns();
  }
  
  ngOnInit(): void {
    /** Load Foreign Keys**/
    this.loadInternalPersonTypes();
    this.loadExternalPersonTypes();
    this.loadPositions();
    this.patchValueForm();
  }

  save() {
    this.formOutput.emit(this.form.value);
    this.nextOutput.emit(true);
  }

  patchValueForm(){
    const {internalInstitutions,externalInstitutions}=this.formInput;
    if(internalInstitutions){
      internalInstitutions.forEach((item:InternalInstitutionModel)=>{
        const internalInstitution = this.formBuilder.group({
          personType: [item.personType],
          position: [item.position],
          name: [item.name],
          unit: [item.unit],
        });
        this.internalInstitutionsField.push(internalInstitution);
      });
    }
    if(externalInstitutions){
    externalInstitutions.forEach((item:ExternalInstitutionModel)=>{
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

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      internalInstitutions: this.formBuilder.array([]),
      externalInstitutions: this.formBuilder.array([]),
    });
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
      position: [null, [Validators.required]],
      personType: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.pattern(onlyLetters())]],
      unit: [null, [Validators.required, Validators.pattern(onlyLetters())]],
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
        position: [this.externalInstitutionForm.value.position],
        unit: [this.externalInstitutionForm.value.unit],
      });
      this.externalInstitutionsField.push(externalInstitution);
      this.externalInstitutionForm.reset();
    } else {
      this.externalInstitutionForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  /** delete array**/
  deleteExternalInstitution(index: number) {
    this.externalInstitutionsField.removeAt(index);
  }

  deleteInternalInstitution(index: number) {
    this.internalInstitutionsField.removeAt(index);
  }

  validateExternalInstitutionsForm():boolean {
    this.formErrors = [];
    if (this.externalInstitutionNameField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.name);
    if (this.externalInstitutionUnitField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.unit);
    if (this.externalInstitutionPositionField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.position);
    if (this.externalInstitutionPersonTypeField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.personType);

    return this.externalInstitutionForm.valid && this.formErrors.length === 0;
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

  /** Getters Form**/
  get internalInstitutionsField(): FormArray {
    return this.form.get('internalInstitutions') as FormArray;
  }

  get externalInstitutionsField(): FormArray {
    return this.form.get('externalInstitutions') as FormArray;
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

  get externalInstitutionUnitField(): AbstractControl {
    return this.externalInstitutionForm.controls['unit'];
  }

  get externalInstitutionPositionField(): AbstractControl {
    return this.externalInstitutionForm.controls['position'];
  }

  get externalInstitutionPersonTypeField(): AbstractControl {
    return this.externalInstitutionForm.controls['personType'];
  }
}


