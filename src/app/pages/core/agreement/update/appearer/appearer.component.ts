import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogueModel, ColumnModel } from '@models/core';
import { AuthHttpService } from '@servicesApp/auth';
import { CoreService, MessageDialogService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { CatalogueTypeEnum, CompanyRegistrationFormEnum, ExternalInstitutionsFormEnum, InternalInstitutionsFormEnum, RoutesEnum, SkeletonEnum } from '@shared/enums';
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
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);

  /** Form **/
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter();
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter()
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter()
  protected id: string = RoutesEnum.NEW
  protected form!: FormGroup;
  protected internalInstitutionForm!: FormGroup;
  protected externalInstitutionForm!: FormGroup;
  private formErrors: string[] = [];
  protected externalInstitutionsColumns:ColumnModel[] = [];

  /** Foreign Keys **/
  protected personTypes: CatalogueModel[] = [];
  protected position: CatalogueModel[] = [];
 
  /** Enums **/
  protected readonly ExternalInstitutionsFormEnum = ExternalInstitutionsFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly CompanyRegistrationFormEnum = CompanyRegistrationFormEnum;
  protected readonly InternalInstitutionsFormEnum = InternalInstitutionsFormEnum;
  protected readonly PrimeIcons = PrimeIcons; //review

  constructor() {
    this.buildForm();
    this.buildExternalInstitutionsForm();
    this.buildInternalInstitutionsForm();
    this.buildExternalInstitutionsColumns();
  }

  ngOnInit(): void {
    /** Load Foreign Keys**/
    this.loadPersonTypes();
   this.loadPosition();
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

  loadPersonTypes() {
    // this.cataloguesHttpService.findByType(CatalogueTypeEnum.COMPANIES_PERSON_TYPE);
    this.personTypes = [
      { id: '1', name: 'Director' },
      { id: '2',  name: 'Ministro' },
      { id: '3', name: 'ViceMinistro' }
    ];
  }

  loadPosition(){
     this.position = [
      { id: '1', name: 'Director' },
      { id: '2',  name: 'Ministro' },
      { id: '3', name: 'ViceMinistro' }
    ];
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
      name: ['', [Validators.required, Validators.pattern(onlyLetters())]],
      position: ['', Validators.required],
      unit: ['', [Validators.required, Validators.pattern(onlyLetters())]],
      personType: ['', [Validators.required]]
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

  buildExternalInstitutionsColumns() {
    this.externalInstitutionsColumns = [
      {
        field: 'name', header: ExternalInstitutionsFormEnum.name
      },
      {
        field: 'unit', header: ExternalInstitutionsFormEnum.unit
      },
      {
        field: 'position', header: ExternalInstitutionsFormEnum.position
      },
      {
        field: 'personType', header: ExternalInstitutionsFormEnum.personType
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

  // validateInternalInstitutionsForm() {
  //   this.formErrors = [];
  //   if (this.internalInstitutionNameField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.name);
  //   if (this.internalInstitutionPositionField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.position);
  //   if (this.internalInstitutionUnitField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.unit);
  //   if (this.internalInstitutionPersonTypeField.invalid) this.formErrors.push(InternalInstitutionsFormEnum.personType);
  //   return this.internalInstitutionForm.valid && this.formErrors.length === 0;
  // }

  /**  Add **/
  // addInternalInstitutions() {
  //   if (this.validateInternalInstitutionsForm()) {
  //     this.internalInstitutions.push(this.formBuilder.group(this.internalInstitutionForm.value));
  //     this.internalInstitutionForm.reset();

  //   } else {
  //     this.internalInstitutionForm.markAllAsTouched();
  //     this.messageDialogService.fieldErrors(this.formErrors);
  //   }
  // }

  addExternalInstitutions() {
    if (this.validateExternalInstitutionsForm()) {
      this.externalInstitutions.push(this.formBuilder.group(this.externalInstitutionForm.value));
      this.externalInstitutionForm.reset();
       this.externalInstitutionNameField.markAsUntouched();
       this.externalInstitutionUnitField.markAsUntouched();
       this.externalInstitutionPositionField.markAsUntouched();
       this.externalInstitutionPersonTypeField.markAsUntouched();
     
    } else {
      this.externalInstitutionForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }



  /** Form Actions **/
  onSubmit(): void {
    if (this.externalInstitutions.length > 0 ) {
      this.save()
    } else {
      this.externalInstitutionForm.markAllAsTouched();
      this.messageDialogService.fieldErrors("En las tablas debe haber por lo menos una fila");
    }
  } 
  
  save() {
    this.formOutput.emit(this.form.value); 
    this.nextOutput.emit(true); 
    console.log('save called');
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
