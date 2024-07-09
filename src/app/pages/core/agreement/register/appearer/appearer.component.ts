import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, AbstractControl} from '@angular/forms';
import {CatalogueModel} from '@models/core';
import {AuthService} from '@servicesApp/auth';
import {CoreService, MessageDialogService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {
  ExternalInstitutionsFormEnum,
  InternalInstitutionsFormEnum,
  SkeletonEnum,
  RoutesEnum,
  CatalogueTypeEnum,
} from '@shared/enums';
import {PrimeIcons, MessageService} from 'primeng/api';
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
  protected id: string = RoutesEnum.NEW
  protected form!: FormGroup;
  protected appearerform!: FormGroup;
  private formErrors: string[] = [];

  /** Foreign Keys **/
  protected internalPersonTypes: CatalogueModel[] = [];
  protected externalPersonTypes: CatalogueModel[] = [];
  protected positions: CatalogueModel[] = [];

  /** Enums **/
  protected readonly ExternalInstitutionsFormEnum = ExternalInstitutionsFormEnum;
  protected readonly InternalInstitutionsFormEnum = InternalInstitutionsFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons; //pending

  constructor(private messageService: MessageService) {
    this.buildForm();
    this.buildAppearerForm();
    this.addExternalInstitution();
    this.addInternalInstitution();
  }

  ngOnInit(): void {
    /** Load Foreign Keys**/
    this.loadInternalPersonTypes();
    this.loadExternalPersonTypes();
    this.loadPositions();
  }

  save() {
    this.formOutput.emit(this.form.value); //add
  }

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      internalInstitutions: this.formBuilder.array([]),
      externalInstitutions: this.formBuilder.array([])
    });
  }

  buildAppearerForm() {
    this.appearerform = this.formBuilder.group({
      personTypeId: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.pattern(onlyLetters())]],
      position: [null, [Validators.required, Validators.pattern(onlyLetters())]],
      unit: [null, [Validators.required, Validators.pattern(onlyLetters())]],
    });
  }

  /** add array **/
  addInternalInstitution() {
    const internalInstitutions = this.formBuilder.group({
      positionId: [null, [Validators.required]],
      personTypeId: [null, [Validators.required]],
      name: ['Ministerio de Turismo', [Validators.required, Validators.pattern(onlyLetters())]],
      unit: ['Unidad', [Validators.required, Validators.pattern(onlyLetters())]],
    });

    this.internalInstitutions.push(internalInstitutions);
  }

  addExternalInstitution() {
    const externalInstitutions = this.formBuilder.group({
      personTypeId: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.pattern(onlyLetters())]],
      position: [null, [Validators.required, Validators.pattern(onlyLetters())]],
      unit: [null, [Validators.required, Validators.pattern(onlyLetters())]],
    });

    this.externalInstitutions.push(externalInstitutions);
  }

  /** delete array**/
  deleteExternalInstitution(index: number) {
    this.externalInstitutions.removeAt(index);
  }

  deleteInternalInstitution(index: number) {
    this.internalInstitutions.removeAt(index);
  }

  validateForm(): boolean {
    this.formErrors = [];
    this.externalInstitutions.controls.forEach((control, index) => {
      if (control.get('name')?.invalid) {
        this.formErrors.push(`Name at index ${index} is required.`);
      }
      if (control.get('position')?.invalid) {
        this.formErrors.push(`El cargo del funcionario n°${index} es requerida`);
      }
      if (control.get('unit')?.invalid) {
        this.formErrors.push(`Unit at index ${index} is required.`);
      }
      if (control.get('personTypeId')?.invalid) {
        this.formErrors.push(`La entidad del instituto externo n°${index} es requerida.`);
      }
    });

    this.internalInstitutions.controls.forEach((control, index) => {
      if (control.get('name')?.invalid) {
        this.formErrors.push(`El nombre de la institución contraparte n°${index} es requerida.`);
      }
      if (control.get('personTypeId')?.invalid) {
        this.formErrors.push(`La entidad del instituto interno n°${index} es requerida.`);
      }
      if (control.get('positionId')?.invalid) {
        this.formErrors.push(`El cargo de la contraparte n°${index} es requerida`);
      }
      if (control.get('unit')?.invalid) {
        this.formErrors.push(`La unidad a la que pertenece la contraparte n°${index} es requerida.`);
      }
    });

    return this.form.valid && this.formErrors.length === 0;
  }

  /** Load Foreign Keys  **/
  loadInternalPersonTypes() {
    /* this.internalPersonTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.INTERNAL_INSTITUTIONS_PERSON_TYPE); */
    this.internalPersonTypes = [
      {name: 'Entidad Pública', id: '1'},
      {name: 'Personas Naturales privadas', id: '2'},
      {name: 'Personas Jurídicas privadas', id: '3'}
    ]
  }

  loadExternalPersonTypes() {
    this.externalPersonTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.EXTERNAL_INSTITUTIONS_PERSON_TYPE);
    this.externalPersonTypes = [
      {name: 'Entidad Pública', id: '1'},
      {name: 'Personas Naturales privadas', id: '2'},
      {name: 'Personas Jurídicas privadas', id: '3'}
    ]
  }

  loadPositions() {
    /* this.positions = this.cataloguesHttpService.findByType(CatalogueTypeEnum.INTERNAL_INSTITUTIONS_POSITION); */
    this.positions = [
      {name: 'Ministro', id: '1'},
      {name: 'Viceministro', id: '2'},
      {name: 'Director', id: '3'}
    ]
  }

  /** Form Actions **/
  onSubmit(): void {
    if (this.validateForm()) {
      this.save();
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  /** Getters Form**/
  get internalInstitutions() {
    return this.form.get('internalInstitutions') as FormArray;
  }

  get externalInstitutions() {
    return this.form.get('externalInstitutions') as FormArray;
  }

  get externalInstitutionNameField(): AbstractControl {
    return this.appearerform.controls['name'];
  }
}


