import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl} from '@angular/forms';
import {AgreementModel, CatalogueModel} from '@models/core';
import {CoreService, MessageDialogService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {
  SkeletonEnum,
  SeverityButtonActionEnum,
  CatalogueTypeEnum, IconButtonActionEnum,
  InstitutionsObligations
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
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  @Input({required: true}) formInput!: AgreementModel;

  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  protected obligationTypes: CatalogueModel[] = [];
  protected institutions: any[] = [];

  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected form!: FormGroup;
  protected obligationForm!: FormGroup;
  protected obligationDetailForm!: FormGroup;
  protected agreement!: AgreementModel;
  protected index: number = -1;
  protected isVisibleObligationDetailForm: boolean = false;
  protected readonly InstitutionsObligations = InstitutionsObligations; 
  
  constructor() {
    this.buildForm();
    this.buildObligationForm();
    this.buildObligationDetailForm();
  }

  ngOnInit(): void {
    this.loadObligationTypes();
    this.loadInstitutions();
    this.patchValueForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      obligations: this.formBuilder.array([])
    });

    this.checkValueChanges();
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
  }

  loadObligationTypes() {
    this.obligationTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.OBLIGATIONS_TYPE);
  }

  loadInstitutions() {
    this.institutions = [];
    if (this.formInput.internalInstitutions) {
      this.institutions.push(...this.formInput.internalInstitutions);
    }
    if (this.formInput.externalInstitutions) {
      this.institutions.push(...this.formInput.externalInstitutions);
    }
  }

  addObligation() {
    const obligation = this.obligationForm.value;
    obligation.obligationDetails = [this.obligationDetailForm.value.description];
  
    if (!this.agreement.obligations) {
      this.agreement.obligations = [];
    }
    this.agreement.obligations.push(obligation);
  
    const obligationsArray = this.form.get('obligations') as FormArray;
    obligationsArray.push(this.formBuilder.group(obligation));
  
    this.form.patchValue({ obligations: this.agreement.obligations });
  
    this.obligationForm.reset();
    this.obligationDetailForm.reset();
  }


  addObligationDetail() {
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
  }

  deleteObligation(index: number) {
    const obligationsArray = this.form.get('obligations') as FormArray;
    obligationsArray.removeAt(index);
  
    this.agreement.obligations?.splice(index, 1);
    this.form.patchValue({ obligations: this.agreement.obligations });
  }

  showObligationDetailModal(index: number) {
    this.isVisibleObligationDetailForm = true;
    this.index = index;
  }
  
  getObligationDetailsField(index: number): FormArray {
    return this.obligationsField.at(index).get('obligationDetails') as FormArray;
  }

  get obligationsField(): FormArray {
    return this.form.get('obligations') as FormArray;
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

  protected readonly IconButtonActionEnum = IconButtonActionEnum;
}
