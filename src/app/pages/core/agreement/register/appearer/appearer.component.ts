import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, AbstractControl} from '@angular/forms';
import {CatalogueModel, ColumnModel} from '@models/core';
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
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  protected id: string = RoutesEnum.NEW
  protected form!: FormGroup;
  protected appearerForm!: FormGroup;
  private formErrors: string[] = [];
  protected externalInstitutionsColumns: ColumnModel[] = [];

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
    this.buildExternalInstitutionsColumns();
    this.addInternalInstitution();
  }

  ngOnInit(): void {
    /** Load Foreign Keys**/
    this.loadInternalPersonTypes();
    this.loadExternalPersonTypes();
    this.loadPositions();
  }

  save() {
    this.formOutput.emit(this.form.value);
    this.nextOutput.emit(true);
  }

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      internalInstitutions: this.formBuilder.array([]),
      externalInstitutions: this.formBuilder.array([])
    });
  }

  buildAppearerForm() {
    this.appearerForm = this.formBuilder.group({
      personType: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(onlyLetters())]],
      position: ['', [Validators.required, Validators.pattern(onlyLetters())]],
      unit: ['', [Validators.required, Validators.pattern(onlyLetters())]],
    });
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
    const internalInstitutions = this.formBuilder.group({
      position: [null, [Validators.required]],
      personType: [null, [Validators.required]],
      name: ['Ministerio de Turismo', [Validators.required, Validators.pattern(onlyLetters())]],
      unit: ['Unidad', [Validators.required, Validators.pattern(onlyLetters())]],
    });
    this.internalInstitutions.push(internalInstitutions);
  }

  addExternalInstitution() {
    if (this.validateForm()) {
      const externalInstitution = this.formBuilder.group({
        personType: [this.appearerForm.value.personType],
        name: [this.appearerForm.value.name],
        position: [this.appearerForm.value.position],
        unit: [this.appearerForm.value.unit],
      });
      this.externalInstitutions.push(externalInstitution);
      this.appearerForm.reset();
      this.externalInstitutionNameField.markAsUntouched();
       this.externalInstitutionUnitField.markAsUntouched();
       this.externalInstitutionPositionField.markAsUntouched();
       this.externalInstitutionPersonTypeField.markAsUntouched();
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
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
    /* this.externalInstitutions.controls.forEach((control, index) => {
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
    }); */
    this.internalInstitutions.controls.forEach((control) => {
      if (control.get('personType')?.invalid) {
        this.formErrors.push(`La entidad del instituto interno`);
      }
      if (control.get('position')?.invalid) {
        this.formErrors.push(`El cargo del funcionario`);
      }
      /** de momento no se usan**/
      if (control.get('name')?.invalid) {
        this.formErrors.push(``);
      }
      if (control.get('unit')?.invalid) {
        this.formErrors.push(``);
      }
    });

    if (this.externalInstitutionNameField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.name);
    if (this.externalInstitutionUnitField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.unit);
    if (this.externalInstitutionPositionField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.position);
    if (this.externalInstitutionPersonTypeField.invalid) this.formErrors.push(ExternalInstitutionsFormEnum.personType);

    return this.form.valid && this.formErrors.length === 0;
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
    if (this.externalInstitutions.length > 0 ) {
      this.save()
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors('Debe agregar al menos una institución externa.')
    }
  }

  /** Getters Form**/
  get internalInstitutions(): FormArray {
    return this.form.get('internalInstitutions') as FormArray;
  }

  get externalInstitutions(): FormArray {
    return this.form.get('externalInstitutions') as FormArray;
  }

  get externalInstitutionNameField(): AbstractControl {
    return this.appearerForm.controls['name'];
  }

  get externalInstitutionUnitField(): AbstractControl {
    return this.appearerForm.controls['unit'];
  }

  get externalInstitutionPositionField(): AbstractControl {
    return this.appearerForm.controls['position'];
  }

  get externalInstitutionPersonTypeField(): AbstractControl {
    return this.appearerForm.controls['personType'];
  }
}


