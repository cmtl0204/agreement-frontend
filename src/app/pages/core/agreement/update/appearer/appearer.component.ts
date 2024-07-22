import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgreementModel, CatalogueModel, ColumnModel, ExternalInstitutionModel, InternalInstitutionModel } from '@models/core';
import {AuthService } from '@servicesApp/auth';
import { CoreService, MessageDialogService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { CatalogueTypeEnum, ExternalInstitutionsFormEnum, InternalInstitutionsFormEnum, RoutesEnum, SkeletonEnum } from '@shared/enums';
import {onlyLetters} from "@shared/helpers";
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-appearer',
  templateUrl: './appearer.component.html',
  styleUrl: './appearer.component.scss'
})


export class AppearerComponent implements OnInit {

  /** Services **/
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);
  protected readonly authService = inject(AuthService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);

  /** Form **/
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter();
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter()
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter()
  @Input({required: true}) formInput!: AgreementModel;
  protected id: string = RoutesEnum.NEW
  protected form!: FormGroup;
  protected internalInstitutionForm!: FormGroup;
  protected externalInstitutionForm!: FormGroup;
  private formErrors: string[] = [];
  protected externalInstitutionsColumns:ColumnModel[] = [];
  protected internalInstitutionsColumns:ColumnModel[] = [];

  /** Foreign Keys **/
  protected internalPersonTypes: CatalogueModel[] = [];
  protected externalPersonTypes: CatalogueModel[] = [];
  protected positions: CatalogueModel[] = [];

  /** Enums **/
  protected readonly ExternalInstitutionsFormEnum = ExternalInstitutionsFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly InternalInstitutionsFormEnum = InternalInstitutionsFormEnum;
  protected readonly PrimeIcons = PrimeIcons; //review

  constructor() {
    this.buildForm();
    this.buildExternalInstitutionsForm();
    this.buildInternalInstitutionsForm();
    this.buildExternalInstitutionsColumns();
    this.buildInternalInstitutionsColumns();
  }

  ngOnInit(): void {
    /** Load Foreign Keys**/
   this.loadPositions();
   this.loadInternalPersonTypes();
   this.loadExternalPersonTypes();
   
  this.patchValueForm();
    //pending
    if (this.id !== RoutesEnum.NEW) {
      this.findCompany(this.id);
    };

  
  }

  findCompany(id: string) {
    /*
    TODO
    */
    this.form.patchValue({});
  }
  
 /* Load Foreign Keys  */
  loadPositions(){
     this.positions = this.cataloguesHttpService.findByType(CatalogueTypeEnum.INTERNAL_INSTITUTIONS_POSITION); 
  }

  loadInternalPersonTypes(){
    this.internalPersonTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.INTERNAL_INSTITUTIONS_PERSON_TYPE); 
  }

  loadExternalPersonTypes(){
   this.externalPersonTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.EXTERNAL_INSTITUTIONS_PERSON_TYPE); 
  }

patchValueForm(){
  const{externalInstitutions, internalInstitutions, ...agreement}= this.formInput;
  if (externalInstitutions){
    externalInstitutions.forEach((item:ExternalInstitutionModel)=>{
    const externalInstitution = this.formBuilder.group({
      name:[item.name],
      position: [item.position],
      unit: [item.unit],
      personType:[item.personType]
    });
    this.externalInstitutions.push(externalInstitution)
  });}
 if (internalInstitutions){
    internalInstitutions.forEach((item:InternalInstitutionModel)=>{
      const internalInstitution = this.formBuilder.group({
        personType: [item.personType],
        position: [item.position],
        name: [item.name],
        unit: [item.unit],
      });
      this.internalInstitutions.push(internalInstitution);
    });
  }
}
 
  /** Form Builder **/
  buildForm() {
    this.form = this.formBuilder.group({
      internalInstitutions: this.formBuilder.array([]),
      externalInstitutions: this.formBuilder.array([])
    });
  }

  buildInternalInstitutionsForm() {
    this.internalInstitutionForm = this.formBuilder.group({
      name: ['Ministerio de Turismo'],
      unit: ['Unidad'],
      position: ['', Validators.required],
       personType: ['', [Validators.required]],
    
    });
  }

  buildExternalInstitutionsForm() {
    this.externalInstitutionForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(onlyLetters())]],
      position: ['', [Validators.required, Validators.pattern(onlyLetters())]],
      unit: ['', [Validators.required, Validators.pattern(onlyLetters())]],
      personType: ['', Validators.required]
    });
   
  }

  buildInternalInstitutionsColumns(){
    this.internalInstitutionsColumns =[  
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
      
    ]
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
  /**  Validates **/
  validateExternalInstitutionsForm() {
    this.formErrors = [];
    if (this.externalInstitutionNameField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.name);
    if (this.externalInstitutionPositionField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.position);
    if (this.externalInstitutionUnitField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.unit);
    if (this.externalInstitutionPersonTypeField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.personType);

    return this.externalInstitutionForm.valid && this.formErrors.length === 0;
  }

   validateInternalInstitutionsForm() {
     this.formErrors = [];
    if (this.internalInstitutionPositionField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.position);
    if (this.internalInstitutionPersonTypeField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.personType);
    return this.internalInstitutionForm.valid && this.formErrors.length === 0;
   }

  /**  Add **/
   addInternalInstitutions() {
 if (this.validateInternalInstitutionsForm()) {
    this.internalInstitutions.push(this.formBuilder.group(this.internalInstitutionForm.value));
     this.internalInstitutionForm.reset();

   } else {
     this.internalInstitutionForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
   }

  addExternalInstitutions() {
    if (this.validateExternalInstitutionsForm()) {
      this.externalInstitutions.push(this.formBuilder.group(this.externalInstitutionForm.value));
      this.externalInstitutionForm.reset();
   
    } else {
      this.externalInstitutionForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

 

  /** Form Actions **/
  onSubmit(): void {
    if (this.externalInstitutions.length > 0 && this.internalInstitutions.length > 0) {
        this.save();
    } else {

        if (this.externalInstitutions.length === 0) {
            this.externalInstitutionForm.markAllAsTouched();
        }
        if (this.internalInstitutions.length === 0) {
            this.internalInstitutionForm.markAllAsTouched();
        }
        this.messageDialogService.fieldErrors('Debe completar el formulario al menos una vez');
    }
}
  
  save() {
    this.formOutput.emit(this.form.value); 
    this.nextOutput.emit(true); 
   
  }

  /** Remove**/
  removeExternalInstitutions(index: number) {
    this.externalInstitutions.removeAt(index);
   
  }

  removeInternalInstitutions(index: number) {
    this.internalInstitutions.removeAt(index);
  }

  /** Edit**/
  editExternalInstitutions(index: number) {
    const externalInstitution = this.externalInstitutions.at(index);

    if (externalInstitution) {
      this.externalInstitutionForm.patchValue(externalInstitution.value);
    }
    this.externalInstitutions.removeAt(index);
   
  }

  editInternalInstitutions(index: number) {
    const internalInstitution = this.internalInstitutions.at(index);

    if (internalInstitution) {
      this.internalInstitutionForm.patchValue(internalInstitution.value);
    }
    this.internalInstitutions.removeAt(index);
  }
 


  /** Getters Form**/
  get externalInstitutions() {
    return this.form.get('externalInstitutions') as FormArray;
  }
  get externalInstitutionNameField(): AbstractControl {
    return this.externalInstitutionForm.controls['name'];
  }
  get externalInstitutionPositionField(): AbstractControl {
    return this.externalInstitutionForm.controls['position'];
  }
  get externalInstitutionUnitField(): AbstractControl {
    return this.externalInstitutionForm.controls['unit'];
  }
  get externalInstitutionPersonTypeField(): AbstractControl {
    return this.externalInstitutionForm.controls['personType'];
  }


  get internalInstitutions() {
    return this.form.get('internalInstitutions') as FormArray;
  }
  get internalInstitutionNameField(): AbstractControl {
    return this.internalInstitutionForm.controls['name'];
  }
  get internalInstitutionPositionField(): AbstractControl {
    return this.internalInstitutionForm.controls['position'];
  }
  get internalInstitutionUnitField(): AbstractControl {
    return this.internalInstitutionForm.controls['unit'];
  }
  get internalInstitutionPersonTypeField(): AbstractControl {
    return this.internalInstitutionForm.controls['personType'];
  }
}
