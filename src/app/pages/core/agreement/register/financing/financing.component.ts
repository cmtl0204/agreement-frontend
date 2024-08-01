import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { AgreementModel, CatalogueModel, ColumnModel, FinancingModel } from '@models/core';
import { AuthService } from '@servicesApp/auth';
import { CoreService, MessageDialogService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AgreementFormEnum, FinancingsFormEnum, DocumentationFormEnum, SkeletonEnum, RoutesEnum } from '@shared/enums';
import { onlyLetters } from '@shared/helpers';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-financing',
  templateUrl: './financing.component.html',
  styleUrl: './financing.component.scss'
})
export class FinancingComponent implements OnInit {
  /** Services **/
  protected readonly authService = inject(AuthService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);

  /** variables **/
  protected form!: FormGroup;
  protected financingForm!: FormGroup;
  @Input({ required: true }) formInput!: AgreementModel;
  protected financingsColumns: ColumnModel[] = [];

  /** Form **/
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter()
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  protected id: string = RoutesEnum.NEW
  private formErrors: string[] = [];


  /** Foreign Keys **/
  @Input() internalInstitutions: CatalogueModel[] = [];
  @Input() externalInstitutions: CatalogueModel[] = [];
  protected combinedInstitutions: CatalogueModel[] = [];

  /** Enums **/
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly FinancingsFormEnum = FinancingsFormEnum;
  protected readonly DocumentationFormEnum = DocumentationFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.buildForm();
    this.buildFinancingForm();
    this.buildFinancingsColumns();
  }

  ngOnInit(): void {
    this.loadCombineInstitutions();
    this.form.patchValue(this.formInput);
    this.patchValueForm();
  }


  patchValueForm() {
    const { financings } = this.formInput;

    if (financings) {
      financings.forEach((value: FinancingModel) => {
        this.financingsField.push(this.formBuilder.group(value))
      });
    }
  }

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      isFinancing: [null, [Validators.required]],
      financings: this.formBuilder.array([])
    });

    this.checkValueChanges();
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
        field: 'institutionName', header: FinancingsFormEnum.model
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

  /** add array **/
  addFinancing() {
    if (this.validateFinancings()) {
      const financings = this.formBuilder.group({
        institutionName: [this.financingForm.value.institutionName],
        budget: [this.financingForm.value.budget],
        paymentMethod: [this.financingForm.value.paymentMethod],
        source: [this.financingForm.value.source],
      });

      this.financingsField.push(financings);
      this.financingForm.reset();
      
    } else {
      this.financingForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  /** delete array**/
  deleteFinancing(index: number) {
    this.financingsField.removeAt(index);
  }

  loadCombineInstitutions() {
    this.combinedInstitutions = this.internalInstitutions.concat(this.externalInstitutions);
    console.log(this.combinedInstitutions)
  }

  validateForm() {
    this.formErrors = [];

    if (this.isFinancingField.invalid) this.formErrors.push(AgreementFormEnum.isFinancing);

    if (this.formErrors.length === 0) {
      if (this.institutionNameField.invalid) this.formErrors.push(FinancingsFormEnum.model);
      if (this.budgetField.invalid) this.formErrors.push(FinancingsFormEnum.budget);
      if (this.paymentMethodField.invalid) this.formErrors.push(FinancingsFormEnum.paymentMethod);
      if (this.sourceField.invalid) this.formErrors.push(FinancingsFormEnum.source);
    }
    if (!this.isFinancingField.value) {
      if (this.financingsField.length > 0) {
        this.financingsField.clear();
      }
      this.formErrors = [];
    } else {
      if (this.financingsField.length > 0) {
        this.formErrors = [];
      }
    }

    this.formErrorsOutput.emit(this.formErrors);
    
  }

  validateFinancings(): boolean {
    this.formErrors = [];
    
      if (this.institutionNameField.invalid) this.formErrors.push(FinancingsFormEnum.model);
      if (this.budgetField.invalid) this.formErrors.push(FinancingsFormEnum.budget);
      if (this.paymentMethodField.invalid) this.formErrors.push(FinancingsFormEnum.paymentMethod);
      if (this.sourceField.invalid) this.formErrors.push(FinancingsFormEnum.source);
    
    return this.form.valid && this.formErrors.length === 0;
  }

  checkValueChanges() {
    this.form.valueChanges.subscribe(value => {
      this.formOutput.emit(value);
      this.validateForm();
    });

    this.isFinancingField.valueChanges.subscribe(value => {
      if (value) {
        this.institutionNameField.setValidators(Validators.required);
        this.budgetField.setValidators(Validators.required);
        this.paymentMethodField.setValidators(Validators.required);
        this.sourceField.setValidators(Validators.required);
      } else if (!value) {
        this.financingForm.reset();
        this.institutionNameField.clearValidators();
        this.budgetField.clearValidators();
        this.paymentMethodField.clearValidators();
        this.sourceField.clearValidators();
      }
      this.institutionNameField.updateValueAndValidity();
      this.budgetField.updateValueAndValidity();
      this.paymentMethodField.updateValueAndValidity();
      this.sourceField.updateValueAndValidity();
    });
  }

  get financingsField(): FormArray {
    return this.form.get('financings') as FormArray;
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
