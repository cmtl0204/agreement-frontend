import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {AgreementModel, ColumnModel, createAgreementModel} from '@models/core';
import {AuthService} from '@servicesApp/auth';
import {CoreService, MessageDialogService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {
  AgreementFormEnum,
  FinancingsFormEnum,
  SkeletonEnum,
  SeverityButtonActionEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum,
  TableEnum
} from '@shared/enums';
import {onlyLetters} from '@shared/helpers';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-financing',
  templateUrl: './financing.component.html',
  styleUrl: './financing.component.scss'
})
export class FinancingComponent implements OnInit, OnChanges {
  /** Services **/
  protected readonly authService = inject(AuthService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  protected readonly messageDialogService = inject(MessageDialogService);

  /** variables **/
  protected form!: FormGroup;
  protected financingForm!: FormGroup;
  protected financingsColumns: ColumnModel[] = [];

  /** Form **/
  @Input({required: true}) formInput: AgreementModel = createAgreementModel();
  @Output() formOutput: EventEmitter<AgreementModel> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter()
  private formErrors: string[] = [];

  /** Foreign Keys **/
  protected combinedInstitutions: string[] = [];

  /** Enums **/
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly FinancingsFormEnum = FinancingsFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly TableEnum = TableEnum;

  protected isVisibleFinancingForm = false;

  constructor() {
    this.buildForm();
    this.buildFinancingForm();
    this.buildFinancingsColumns();

    this.checkValueChanges();
  }

  ngOnInit(): void {
    this.loadCombineInstitutions();

    this.patchValueForm();
    this.validateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadCombineInstitutions();
  }

  patchValueForm() {
    this.form.patchValue(this.formInput);

    if (this.formInput.financings.length > 0) {
      this.isFinancingField.disable();
    }
  }

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      isFinancing: [null, [Validators.required]],
      financings: this.formBuilder.array([], Validators.required)
    });
  }

  buildFinancingForm() {
    this.financingForm = this.formBuilder.group({
      institutionName: [null, [Validators.required]],
      budget: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{2,2})?$/)]],
      paymentMethod: [null, [Validators.required, Validators.pattern(onlyLetters())]],
      source: [null, [Validators.required, Validators.pattern(onlyLetters())]],
    })
  }

  buildFinancingsColumns() {
    this.financingsColumns = [
      {
        field: 'institutionName', header: FinancingsFormEnum.institutionName
      },
      {
        field: 'budget', header: FinancingsFormEnum.budget
      },
      {
        field: 'paymentMethod', header: FinancingsFormEnum.paymentMethod
      },
      {
        field: 'source', header: FinancingsFormEnum.source
      },
    ];
  }

  addFinancing() {
    if (this.validateFinancingForm()) {
      if (this.formInput.financings.findIndex(item => {
        return item.institutionName === this.financingForm.value.institutionName;
      }) > -1) {
        this.messageDialogService.errorCustom('La entidad ya está registrada', 'Intente con otra por favor');
        return;
      }

      this.formInput.financings.push(this.financingForm.value);

      this.form.patchValue(this.formInput);
      // this.messageService.add({key:'toastMsg', severity: 'success', summary: 'Correcto', detail: 'Agregado'});

      this.financingForm.reset();
      this.isVisibleFinancingForm = false;
    } else {
      this.financingForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  deleteFinancing(index: number) {
    this.formInput.financings.splice(index, 1);

    this.form.patchValue(this.formInput);
  }

  loadCombineInstitutions() {
    this.combinedInstitutions = [];

    let internalInstitutions: string[] = [];
    let externalInstitutions: string[] = [];

    if (this.formInput.internalInstitutions) {
      internalInstitutions = this.formInput.internalInstitutions.map(item => item.name);
    }

    if (this.formInput.externalInstitutions) {
      externalInstitutions = this.formInput.externalInstitutions.map(item => item.name);
    }

    this.combinedInstitutions = internalInstitutions.concat(externalInstitutions);
  }

  validateForm() {
    this.formErrors = [];

    if (this.isFinancingField.value) {
      if (this.formInput.financings && this.formInput.financings.length === 0) {
        this.formErrors.push('Financiamientos');
      }
    }

    this.formErrorsOutput.emit(this.formErrors);
  }

  validateFinancingForm(): boolean {
    this.formErrors = [];

    if (this.institutionNameField.invalid) this.formErrors.push(FinancingsFormEnum.institutionName);
    if (this.budgetField.invalid) this.formErrors.push(FinancingsFormEnum.budget);
    if (this.paymentMethodField.invalid) this.formErrors.push(FinancingsFormEnum.paymentMethod);
    if (this.sourceField.invalid) this.formErrors.push(FinancingsFormEnum.source);

    return this.formErrors.length === 0;
  }

  checkValueChanges() {
    this.form.valueChanges.subscribe(value => {
      this.formOutput.emit(this.formInput);

      this.validateForm();
    });

    this.isFinancingField.valueChanges.subscribe(value => {
      this.formInput.isFinancing = value;

      if (value) {
        this.institutionNameField.setValidators(Validators.required);
        this.budgetField.setValidators(Validators.required);
        this.paymentMethodField.setValidators(Validators.required);
        this.sourceField.setValidators(Validators.required);
      } else {
        this.institutionNameField.clearValidators();
        this.budgetField.clearValidators();
        this.paymentMethodField.clearValidators();
        this.sourceField.clearValidators();
      }

      this.financingForm.reset();

      this.institutionNameField.updateValueAndValidity();
      this.budgetField.updateValueAndValidity();
      this.paymentMethodField.updateValueAndValidity();
      this.sourceField.updateValueAndValidity();
    });
  }

  showFinancingModal() {
    this.isVisibleFinancingForm = true;
  }

  get isFinancingField(): AbstractControl {
    return this.form.controls['isFinancing'];
  }

  get institutionNameField(): AbstractControl {
    return this.financingForm.controls['institutionName']
  }

  get budgetField(): AbstractControl {
    return this.financingForm.controls['budget']
  }

  get paymentMethodField(): AbstractControl {
    return this.financingForm.controls['paymentMethod']
  }

  get sourceField(): AbstractControl {
    return this.financingForm.controls['source']
  }
}
