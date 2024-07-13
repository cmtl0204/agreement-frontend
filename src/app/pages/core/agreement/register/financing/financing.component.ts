import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { CatalogueModel, ColumnModel } from '@models/core';
import { AuthService, AuthHttpService } from '@servicesApp/auth';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AgreementFormEnum, FinancingsFormEnum, DocumentationFormEnum, SkeletonEnum,RoutesEnum } from '@shared/enums';
import { OnExitInterface } from '@shared/interfaces';
import { MessageService, PrimeIcons } from 'primeng/api';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';

interface FinancingOption {
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-financing',
  templateUrl: './financing.component.html',
  styleUrl: './financing.component.scss'
})
export class FinancingComponent implements OnInit, OnExitInterface {
  /** Services **/
  protected readonly authService = inject(AuthService);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);
  private readonly routesService = inject(RoutesService);
  
  /** variables **/
  financingOptions!: FinancingOption[];
  input: number[] = [];
  uploadedFiles: any[] = [];
  protected form!: FormGroup;
  protected financingForm!: FormGroup;
  protected financingsColumns: ColumnModel[] = [];
  
  /** Form **/
  // @Input({ required: true }) id!: string;
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter();
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  protected id: string = RoutesEnum.NEW
  private formErrors: string[] = [];
  groupedInstitutions: any[] = [];

  /** Foreign Keys **/
  protected internalInstitutions: CatalogueModel[] = [];
  protected externalInstitutions: CatalogueModel[] = [];
  protected combinedInstitutions: CatalogueModel[] = [];
  
  /** Enums **/
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly FinancingsFormEnum = FinancingsFormEnum;
  protected readonly DocumentationFormEnum = DocumentationFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;

  showFinancingFields: boolean = false;

  constructor(private messageService: MessageService) {
    this.loadInternalInstitutions();
    this.loadExternalInstitutions();
    this.combineInstitutions();
    this.buildForm();
    this.buildFinancingForm();
    this.buildFinancingsColumns();
    this.addFinancing();
    
    this.financingOptions = [
      { name: 'Si', active: true },
      { name: 'No', active: false }
    ];

  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
    // return this.messageDialogService.questionOnExit();
  }

  ngOnInit(): void {
    this.onFinancingChange();
  }

  save() {
    this.formOutput.emit(this.form.value);
    this.nextOutput.emit(true);
  }
  
  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      isFinancing: [null, [Validators.required]],
      financings: this.formBuilder.array([])
    });
  }

  buildFinancingForm(){
    this.financingForm =this.formBuilder.group({
      model: [null, [Validators.required]],
      budget: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{2,2})?$/)]],
      paymentMethod: [null, [Validators.required]],
      source: [null, [Validators.required]],
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
    if (this.financingForm.valid) {
    const financings = this.formBuilder.group({
      model: [this.financingForm.value.model, [Validators.required]],
      budget: [this.financingForm.value.budget, [Validators.required]],
      paymentMethod: [this.financingForm.value.paymentMethod, [Validators.required]],
      source: [this.financingForm.value.source, [Validators.required]],
    });
    this.financings.push(financings);
    this.financingForm.reset();
    
    this.modelField.clearValidators();
    this.modelField.reset();
    this.budgetField.clearValidators();
    this.budgetField.reset();
    this.paymentMethodField.clearValidators();
    this.paymentMethodField.reset();
    this.sourceField.clearValidators();
    this.sourceField.reset();
    } else{
     
    } 
  }

  /** delete array**/
  deleteFinancing(index: number) {
    this.financings.removeAt(index);
  }

  loadInternalInstitutions(){
        /* this.internalInstitutions = this.cataloguesHttpService.findByType(CatalogueTypeEnum.); */
      this.internalInstitutions = [
        { name: 'Ministro' },
        { name: 'Viceministro' },
      ];
  }

  loadExternalInstitutions(){
        /* this.externalInstitutions = this.cataloguesHttpService.findByType(CatalogueTypeEnum.); */
      this.externalInstitutions = [
        { name: 'Director 2' },
        { name: 'Coordinador 2' },
      ]; 
  }

  combineInstitutions() {
    this.combinedInstitutions = this.internalInstitutions.concat(this.externalInstitutions);
    this.groupedInstitutions = this.combinedInstitutions.map(inst => ({ label: inst.name, value: inst.name }));
  }  

  validateForm(): boolean {
    this.formErrors = [];
  
    if (this.isFinancingField.invalid) {
      this.formErrors.push(AgreementFormEnum.isFinancing);
    }
  
    if (this.formErrors.length === 0) {
      if (this.modelField.invalid) this.formErrors.push(FinancingsFormEnum.model);
      if (this.budgetField.invalid) this.formErrors.push(FinancingsFormEnum.budget);
      if (this.paymentMethodField.invalid) this.formErrors.push(FinancingsFormEnum.paymentMethod);
      if (this.sourceField.invalid) this.formErrors.push(FinancingsFormEnum.source);
    }
  
    return this.form.valid && this.formErrors.length === 0;
  }  

  onSubmit(): void {
    if (this.validateForm()) {
      this.save();
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

 /* onFinancingChange(event?: any) {
    const financingValue = this.isFinancingField.value?.name || null;
    const financingsForm = this.form.get('financings');

    if (financingValue === 'Si') {
      this.showFinancingFields = true;
      financingsForm?.enable();
    } else if(financingValue === 'No'){
      this.showFinancingFields = false;
      financingsForm?.disable();
      this.financingForm.reset();
      this.modelField.clearValidators();
      this.modelField.reset();
      this.budgetField.clearValidators();
      this.budgetField.reset();
      this.paymentMethodField.clearValidators();
      this.paymentMethodField.reset();
      this.sourceField.clearValidators();
      this.sourceField.reset();
      
    }
  }*/
  
  onFinancingChange(event?: any) {
    this.isFinancingField.valueChanges.subscribe(value =>{
    if (value) {
      this.showFinancingFields = true;
    } else {
      this.showFinancingFields = false;
      this.financingForm.reset();
      this.modelField.clearValidators();
      this.modelField.reset();
      this.budgetField.clearValidators();
      this.budgetField.reset();
      this.paymentMethodField.clearValidators();
      this.paymentMethodField.reset();
      this.sourceField.clearValidators();
      this.sourceField.reset();
    }
  });
  }

  get financings(): FormArray {
    return this.form.get('financings') as FormArray;
  }

  get isFinancingField(): AbstractControl {
    return this.form.controls['isFinancing'];
  }

  get modelField(): AbstractControl{
    return this.financingForm.controls['model']
  }

  get budgetField(): AbstractControl{
    return this.financingForm.controls['budget']
  }

  get paymentMethodField(): AbstractControl{
    return this.financingForm.controls['paymentMethod']
  }

  get sourceField(): AbstractControl{
    return this.financingForm.controls['source']
  }
}