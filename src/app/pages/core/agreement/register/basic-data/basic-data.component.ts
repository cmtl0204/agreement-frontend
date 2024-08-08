import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgreementModel, CatalogueModel} from '@models/core';
import {CoreService, MessageDialogService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {
  AgreementFormEnum,
  SkeletonEnum,
  CatalogueTypeEnum,
  CatalogueAgreementsTypeEnum,
  AgreementStateEnum
} from '@shared/enums';
import {PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.scss'
})
export class BasicDataComponent implements OnInit {
  /* Services */
  protected readonly formBuilder = inject(FormBuilder)
  protected readonly coreService = inject(CoreService)
  protected readonly cataloguesHttpService = inject(CataloguesHttpService)
  protected readonly messageDialogService = inject(MessageDialogService)
  protected readonly Validators = Validators;

  /* Form */
  @Output() formOutput: EventEmitter<AgreementModel> = new EventEmitter()
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter()
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Input({required: true}) formInput!: AgreementModel;

  protected form!: FormGroup;
  private formErrors: string[] = [];

  /* Foreign Keys */
  protected states: CatalogueModel[] = [];
  protected origins: CatalogueModel[] = [];
  protected types: CatalogueModel[] = [];
  protected specialTypes: CatalogueModel[] = []

  /* Enums */
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly AgreementStateEnum = AgreementStateEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons; //pending

  constructor() {
    this.buildForm();
  }

  ngOnInit() {
    this.loadStates();
    this.loadOrigins();
    this.loadTypes();
    this.loadSpecialTypes();

    this.patchValueForm();
    this.validateForm();
  }

  /* Form Builder & Validates */
  buildForm() {
    this.form = this.formBuilder.group({
      agreementState: this.agreementStateForm,
      name: [null, [Validators.required]],
      internalNumber: [null, [Validators.required]],
      number: [null, [Validators.required]],
      objective: [null, [Validators.required]],
      origin: [null, [Validators.required]],
      specialType: [null],
      type: [null, [Validators.required]],
    });

    this.checkValueChanges();
  }

  patchValueForm() {
    this.form.patchValue(this.formInput);
  }

  get agreementStateForm() {
    return this.formBuilder.group({
      state: [null, Validators.required],
    });
  }

  checkValueChanges() {
    this.form.valueChanges.subscribe(value => {
      this.formOutput.emit(value);
      this.validateForm();
    });

    this.typeField.valueChanges.subscribe((value) => {
      if (value && value.code === CatalogueAgreementsTypeEnum.SPECIAL) {
        this.specialTypeField.setValidators(Validators.required);
      } else {
        this.specialTypeField.clearValidators();
      }

      this.specialTypeField.reset();
      this.specialTypeField.updateValueAndValidity();
    });
  }

  validateForm() {
    this.formErrors = [];

    if (this.stateField.invalid) this.formErrors.push(AgreementStateEnum.state);
    if (this.nameField.invalid) this.formErrors.push(AgreementFormEnum.name);
    if (this.internalNumberField.invalid) this.formErrors.push(AgreementFormEnum.internalNumber);
    if (this.numberField.invalid) this.formErrors.push(AgreementFormEnum.number);
    if (this.objectiveField.invalid) this.formErrors.push(AgreementFormEnum.objective);
    if (this.originField.invalid) this.formErrors.push(AgreementFormEnum.origin);
    if (this.typeField.invalid) this.formErrors.push(AgreementFormEnum.type);
    if (this.specialTypeField.invalid) this.formErrors.push(AgreementFormEnum.specialType);

    this.formErrorsOutput.emit(this.formErrors);
  }

  /* Load Foreign Keys  */
  loadStates() {
    this.states = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENT_STATES_STATE);
  };

  loadOrigins() {
    this.origins = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_ORIGIN);
  };

  loadTypes() {
    this.types = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_TYPE);
  };

  loadSpecialTypes() {
    this.specialTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_SPECIAL_TYPE);
  }

  /* Getters Form*/
  get agreementStateFormField(): FormGroup {
    return this.form.controls['agreementState'] as FormGroup;
  }

  get stateField(): AbstractControl {
    return this.agreementStateFormField.controls['state'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get internalNumberField(): AbstractControl {
    return this.form.controls['internalNumber'];
  }

  get numberField(): AbstractControl {
    return this.form.controls['number'];
  }

  get originField(): AbstractControl {
    return this.form.controls['origin'];
  }

  get typeField(): AbstractControl {
    return this.form.controls['type'];
  }

  get objectiveField(): AbstractControl {
    return this.form.controls['objective'];
  }

  get specialTypeField(): AbstractControl {
    return this.form.controls['specialType'];
  }
}
