import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl} from '@angular/forms';
import {AgreementModel, CatalogueModel, ColumnModel} from '@models/core';
import {CoreService, MessageDialogService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {
  SkeletonEnum,
  SeverityButtonActionEnum,
  CatalogueTypeEnum, IconButtonActionEnum,
  ObligationForEnum, ObligationDetailForEnum, LabelButtonActionEnum, CatalogueObligationsTypeEnum
} from '@shared/enums';
import {PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrls: ['./obligation.component.scss']
})
export class ObligationComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);

  @Output() formOutput: EventEmitter<AgreementModel> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter()
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter();
  @Input({required: true}) formInput!: AgreementModel;

  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  protected obligationTypes: CatalogueModel[] = [];
  protected institutions: any[] = [];

  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected form!: FormGroup;
  private formErrors: string[] = [];
  protected obligationForm!: FormGroup;
  protected obligationDetailForm!: FormGroup;
  protected agreement!: AgreementModel;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected isVisibleObligationDetailForm: boolean = false;
  protected readonly ObligationForEnum = ObligationForEnum;
  protected readonly ObligationDetailForEnum = ObligationDetailForEnum;
  protected columns: ColumnModel[] = [];
  protected index: number = -1;

  constructor() {
    this.buildForm();
    this.buildObligationForm();
    this.buildObligationDetailForm();
    this.buildColumns();

    this.checkValueChanges();
  }

  ngOnInit(): void {
    this.loadObligationTypes();
    this.loadInstitutions();
    this.patchValueForm();
  }

  buildColumns() {
    this.columns = [
      {field: 'institutionName', header: ObligationForEnum.institutionName},
      {field: 'type', header: ObligationForEnum.type},
    ];
  }

  buildForm() {
    this.form = this.formBuilder.group({
      obligations: this.formBuilder.array([])
    });
  }

  buildObligationForm() {
    this.obligationForm = this.formBuilder.group({
      institutionName: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  buildObligationDetailForm() {
    this.obligationDetailForm = this.formBuilder.group({
      description: [null, [Validators.required]],
    });
  }

  patchValueForm() {
    this.agreement = this.formInput;
    this.form.patchValue(this.agreement);
  }

  checkValueChanges() {
    this.form.valueChanges.subscribe(value => {
      this.formOutput.emit(this.agreement);
    });

    this.obligationTypeField.valueChanges.subscribe(value => {
      if (value && value.code === CatalogueObligationsTypeEnum.INTERNAL) {
        if (this.formInput.internalInstitutions)
          this.obligationInstitutionNameField.setValue(this.formInput.internalInstitutions[0].name);
      }
    });
  }

  validateForm() {
    this.formErrors = [];

    if (this.formInput.obligations?.length === 0) this.formErrors.push('Obligaciones');

    this.formErrorsOutput.emit(this.formErrors);
  }

  validateObligationForm(): boolean {
    this.formErrors = [];

    if (this.obligationTypeField.invalid) this.formErrors.push(this.ObligationForEnum.type);
    if (this.obligationInstitutionNameField.invalid) this.formErrors.push(this.ObligationForEnum.institutionName);
    if (this.obligationDetailDescriptionField.invalid) this.formErrors.push(this.ObligationDetailForEnum.description);

    return this.formErrors.length === 0;
  }

  validateObligationDetailForm(): boolean {
    this.formErrors = [];

    if (this.obligationDetailDescriptionField.invalid) this.formErrors.push(this.ObligationDetailForEnum.description);

    return this.formErrors.length === 0;
  }

  loadObligationTypes() {
    this.obligationTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.OBLIGATIONS_TYPE);
  }

  loadInstitutions() {
    this.institutions = [];

    if (this.formInput.internalInstitutions) this.institutions = this.formInput.internalInstitutions;


    if (this.formInput.externalInstitutions) this.institutions = this.formInput.externalInstitutions;
  }

  addObligation() {
    if (this.validateObligationForm()) {
      const obligation = this.obligationForm.value;

      obligation.obligationDetails = [this.obligationDetailForm.value];

      if (!this.agreement.obligations) {
        this.agreement.obligations = [];
      } else {
        if (this.agreement.obligations.findIndex(item => {
          item.institutionName === obligation.institutionName.toString()
        }) > -1) {
          this.messageDialogService.errorCustom('La entidad ya está registrada', 'Intente con otra por favor');
          return;
        }
      }

      this.agreement.obligations.push(obligation);

      this.form.patchValue({obligations: this.agreement.obligations});

      this.obligationForm.reset();
      this.obligationDetailForm.reset();
    } else {
      this.obligationForm.markAllAsTouched();
      this.obligationDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  addObligationDetail() {
    if (this.validateObligationDetailForm()) {
      if (this.agreement.obligations) {
        if (this.agreement.obligations[this.index].obligationDetails) {
          this.agreement.obligations[this.index].obligationDetails?.push(this.obligationDetailDescriptionField.value);
        } else {
          this.agreement.obligations[this.index].obligationDetails = [this.obligationDetailDescriptionField.value];
        }
      }

      this.form.patchValue(this.agreement);

      this.obligationForm.reset();
      this.obligationDetailDescriptionField.reset();

      this.isVisibleObligationDetailForm = false;
    } else {
      this.obligationDetailForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  deleteObligation(index: number) {
    const obligationsArray = this.form.get('obligations') as FormArray;
    obligationsArray.removeAt(index);

    this.agreement.obligations?.splice(index, 1);
    this.form.patchValue({obligations: this.agreement.obligations});
  }

  showObligationDetailModal(index: number) {
    this.isVisibleObligationDetailForm = true;
    this.index = index;
  }

  get obligationInstitutionNameField(): AbstractControl {
    return this.obligationForm.controls['institutionName'];
  }

  get obligationTypeField(): AbstractControl {
    return this.obligationForm.controls['type'];
  }

  get obligationDetailDescriptionField(): AbstractControl {
    return this.obligationDetailForm.controls['description'];
  }

  protected readonly CatalogueObligationsTypeEnum = CatalogueObligationsTypeEnum;
}
