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
    this.patchValueForm();
  }

  save() {
    this.formOutput.emit(this.form.value);
    this.nextOutput.emit(true);
  }

  patchValueForm() {
    this.form.patchValue(this.formInput);

    const { financings } = this.formInput;

    if (financings) {
      financings.forEach((value: FinancingModel) => {
        this.financings.push(this.formBuilder.group(value))
      });
    }
  }

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      isFinancing: [null, [Validators.required]],
      financings: this.formBuilder.array([])
    });
  }

  buildFinancingForm() {
    this.financingForm = this.formBuilder.group({
      model: [null, [Validators.required]],
      budget: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{2,2})?$/)]],
      paymentMethod: [null, [Validators.required, Validators.pattern(onlyLetters())]],
      source: [null, [Validators.required, Validators.pattern(onlyLetters())]],
    })
  }

  buildFinancingsColumns() {
    this.financingsColumns = [
      {
        field: 'model', header: FinancingsFormEnum.model
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
    if (this.validateForm()) {
      const financings = this.formBuilder.group({
        model: [this.financingForm.value.model],
        budget: [this.financingForm.value.budget],
        paymentMethod: [this.financingForm.value.paymentMethod],
        source: [this.financingForm.value.source],
      });
      this.financings.push(financings);

      this.financingForm.reset();

      this.modelField.markAsUntouched();
      this.modelField.markAsPristine();
      this.budgetField.markAsUntouched();
      this.budgetField.markAsPristine();
      this.paymentMethodField.markAsUntouched();
      this.paymentMethodField.markAsPristine();
      this.sourceField.markAsUntouched();
      this.sourceField.markAsPristine();

    } else {
      this.financingForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  /** delete array**/
  deleteFinancing(index: number) {
    this.financings.removeAt(index);
  }

  /** Edit**/
  editFinancing(index: number) {
    const financing = this.financings.at(index);

    if (financing) {
      this.financingForm.patchValue(financing.value);
    }
    this.financings.removeAt(index);
  }


  loadCombineInstitutions() {
    this.combinedInstitutions = this.internalInstitutions.concat(this.externalInstitutions);
  }

  validateForm(): boolean {
    this.formErrors = [];

    if (this.isFinancingField.invalid) this.formErrors.push(AgreementFormEnum.isFinancing);

    if (this.formErrors.length === 0) {
      if (this.modelField.invalid) this.formErrors.push(FinancingsFormEnum.model);
      if (this.budgetField.invalid) this.formErrors.push(FinancingsFormEnum.budget);
      if (this.paymentMethodField.invalid) this.formErrors.push(FinancingsFormEnum.paymentMethod);
      if (this.sourceField.invalid) this.formErrors.push(FinancingsFormEnum.source);
    }

    return this.form.valid && this.formErrors.length === 0;
  }

  onSubmit(): void {
    if (!this.isFinancingField.value) {
      if (this.financings.length > 0) {
        this.financings.clear();
      }
      this.save();
    } else {
      if (this.financings.length > 0) {
        this.save();
      } else {
        if (this.validateForm()) {
          this.messageDialogService.fieldErrors(['Debe añadir']);
        } else {
          this.form.markAllAsTouched();
          this.messageDialogService.fieldErrors(this.formErrors);
          if (this.form.valid) {
            this.financingForm.markAllAsTouched();
            this.messageDialogService.fieldErrors(this.formErrors);
          }
        }
      }
    }
  }

  checkValueChanges() {
    this.isFinancingField.valueChanges.subscribe(value => {
      if (value) {
        this.modelField.setValidators(Validators.required);
        this.budgetField.setValidators(Validators.required);
        this.paymentMethodField.setValidators(Validators.required);
        this.sourceField.setValidators(Validators.required);
      } else if (!value) {
        this.financingForm.reset();
        this.modelField.clearValidators();
        this.budgetField.clearValidators();
        this.paymentMethodField.clearValidators();
        this.sourceField.clearValidators();
      }
      this.modelField.updateValueAndValidity();
      this.budgetField.updateValueAndValidity();
      this.paymentMethodField.updateValueAndValidity();
      this.sourceField.updateValueAndValidity();
    });
  }

  get financings(): FormArray {
    return this.form.get('financings') as FormArray;
  }

  get isFinancingField(): AbstractControl {
    return this.form.controls['isFinancing'];
  }

  get modelField(): AbstractControl {
    return this.financingForm.controls['model']
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
