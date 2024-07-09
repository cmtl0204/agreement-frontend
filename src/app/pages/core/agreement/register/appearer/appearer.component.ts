import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {CatalogueModel} from '@models/core';
import {AuthService, AuthHttpService} from '@servicesApp/auth';
import {CoreService, MessageDialogService, RoutesService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {
  ExternalInstitutionsFormEnum,
  InternalInstitutionsFormEnum,
  SkeletonEnum,
  RoutesEnum,
  CatalogueTypeEnum
} from '@shared/enums';
import {OnExitInterface} from '@shared/interfaces';
import {PrimeIcons, MessageService} from 'primeng/api';
import {firstValueFrom} from 'rxjs';
import {onlyLetters} from "@shared/helpers";

/** Interface Provicional**/
interface Official {
  name: string
}

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

  officials!: Official[];

  // input: number[] = [];

  /** Form **/
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter();
  protected id: string = RoutesEnum.NEW
  protected form!: FormGroup;
  private formErrors: string[] = [];

  /** Foreign Keys **/
  protected personTypes: CatalogueModel[] = [];

  /** Enums **/
  protected readonly ExternalInstitutionsFormEnum = ExternalInstitutionsFormEnum;
  protected readonly InternalInstitutionsFormEnum = InternalInstitutionsFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons; //pending

  constructor(private messageService: MessageService) {
    this.buildForm();
    this.addExternalInstitution();
    this.addInternalInstitution();
    this.officials = [
      {name: 'Ministro'},
      {name: 'Viceministro'},
      {name: 'Director'},
      {name: 'Coordinador'},
      {name: 'Ministro1'},
      {name: 'Viceministro1'},
      {name: 'Director1'},
      {name: 'Coordinador1'},
    ];

  }

  ngOnInit(): void {
    /** Load Foreign Keys**/
    this.loadPersonTypes();
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

  /** add array **/
  addInternalInstitution() {
    const internalInstitutions = this.formBuilder.group({
      positionId: [null, [Validators.required]],
      personTypeId: [null, [Validators.required]],
      name: ['Ministerio de Turismo', [Validators.required, Validators.pattern('[A-Za-zÁÉÍÓÚáéíóúÑñ\s ]+')]],
      unit: ['Unidad', [Validators.required, Validators.pattern('[A-Za-zÁÉÍÓÚáéíóúÑñ\s ]+')]],
    });

    this.internalInstitutions.push(internalInstitutions);
  }

  addExternalInstitution() {
    const externalInstitutions = this.formBuilder.group({
      personTypeId: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.pattern(onlyLetters())]],
      position: [null, [Validators.required, Validators.pattern('[A-Za-zÁÉÍÓÚáéíóúÑñ\s ]+')]],
      unit: [null, [Validators.required, Validators.pattern('[A-Za-zÁÉÍÓÚáéíóúÑñ\s ]+')]],
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

  /** pendiente no recuerdo que hace **/
  validateForm(): boolean {
    this.formErrors = [];
    this.externalInstitutions.controls.forEach((control, index) => {
      if (control.get('name')?.invalid) {
        this.formErrors.push(`Name at index ${index} is required.`);
      }
      if (control.get('position')?.invalid) {
        this.formErrors.push(`Position at index ${index} is required.`);
      }
      if (control.get('unit')?.invalid) {
        this.formErrors.push(`Unit at index ${index} is required.`);
      }
      if (control.get('personTypeId')?.invalid) {
        this.formErrors.push(`Person Type at index ${index} is required.`);
      }
    });

    this.internalInstitutions.controls.forEach((control, index) => {
      if (control.get('name')?.invalid) {
        this.formErrors.push(`Name at index ${index} is required.`);
      }
      if (control.get('personTypeId')?.invalid) {
        this.formErrors.push(`Person Type at index ${index} is required.`);
      }
      if (control.get('positionId')?.invalid) {
        this.formErrors.push(`Position at index ${index} is required.`);
      }
      if (control.get('unit')?.invalid) {
        this.formErrors.push(`Unit at index ${index} is required.`);
      }
    });

    return this.form.valid && this.formErrors.length === 0;
  }

  /** Load Foreign Keys  **/
  loadPersonTypes() {
    this.cataloguesHttpService.findByType(CatalogueTypeEnum.COMPANIES_PERSON_TYPE);
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
}


