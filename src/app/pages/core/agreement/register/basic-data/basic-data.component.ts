import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogueModel } from '@models/core';
import { CoreService, MessageDialogService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AgreementFormEnum, SkeletonEnum, CatalogueTypeEnum} from '@shared/enums';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.scss'
})
export class BasicDataComponent implements OnInit {
  protected readonly formBuilder = inject(FormBuilder)
  protected readonly coreService = inject(CoreService )
  protected readonly cataloguesHttpService = inject(CataloguesHttpService)
  protected readonly messageDialogService = inject(MessageDialogService)
  protected readonly Validators = Validators;


  /* Form && Output */
  // @Input({required: true}) id: string;
  @Output() formOutput:EventEmitter<FormGroup> = new EventEmitter()
  protected id =''
  protected form!: FormGroup;
  private formErrors: string[] = [];

  /* Foreign Keys */
  protected states: CatalogueModel[] = [];
  protected origins: CatalogueModel[] = [];
  protected types: CatalogueModel[] = [];
  protected specialTypes: CatalogueModel[]=[]

  /* Enums */
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons; //pending

  constructor() {
    this.buildForm();
  }

  ngOnInit(){
    this.loadStates();
    this.loadOrigins();
    this.loadTypes();
    this.loadSpecialTypes()
  }

  save(){
    this.formOutput.emit(this.form.value)
  }

  /* Form Builder & Validates */
  buildForm() {
    this.form = this.formBuilder.group({
      agreementState: [null, [Validators.required]],
      name : [null, [Validators.required]],
      internalNumber: [null, [Validators.required]],
      number: [null, [Validators.required]],
      objective: [null, [Validators.required]],
      originId: [null, [Validators.required]],
      typeId: ['', [Validators.required]],
      specialTypeId: [null],
    });

    this.checkValueChanges();
  }

  checkValueChanges(){
    this.typeIdField.valueChanges.subscribe((value) => {
      if(value.id === '3') {
        this.specialTypeIdField.setValidators(Validators.required);
        this.specialTypeIdField.reset();
      }else{
        this.specialTypeIdField.clearValidators();
        this.specialTypeIdField.reset();
      }
      this.typeIdField.updateValueAndValidity();
    })
  }


  validateForm(): boolean {
    this.formErrors = [];
    if (this.agreementStateField.invalid) this.formErrors.push(AgreementFormEnum.agreementState);
    if (this.nameField.invalid) this.formErrors.push(AgreementFormEnum.name);
    if (this.internalNumberField.invalid) this.formErrors.push(AgreementFormEnum.internalNumber);
    if (this.numberField.invalid) this.formErrors.push(AgreementFormEnum.number);
    if (this.objectiveField.invalid) this.formErrors.push(AgreementFormEnum.objective);
    if (this.originIdField.invalid) this.formErrors.push(AgreementFormEnum.originId);
    if (this.typeIdField.invalid) this.formErrors.push(AgreementFormEnum.typeId);
    if (this.specialTypeIdField.invalid) this.formErrors.push(AgreementFormEnum.specialTypeId);

    return this.form.valid && this.formErrors.length === 0;
  }


  /* Load Foreign Keys  */
  loadStates() {
    this.states =  this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_STATE);
  };
  loadOrigins() {
    this.origins = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_ORIGIN);
  };
  loadTypes() {
    //this.types = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_TYPE);
    this.types = [
      {name: 'Marco', id: '1'},
      {name: 'Específicos', id: '2'},
      {name: 'Especial', id: '3'},
      {name: 'Comodato o convenio de préstamo de uso', id: '4'},
    ]
  };

  loadSpecialTypes(){
    //this.specialTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_SPECIAL_TYPE);
    this.specialTypes = [
      {name: 'Memorando de Entendimiento', id: '1'},
      {name: 'Carta de Intención', id: '2'},
      {name: 'Articulación', id: '3'},
      {name: 'Cooperación', id: '4'},
    ]
  }


  /* Form Actions */
  onSubmit(): void {
    if (this.validateForm()) {
      console.log(this.form.value)
      this.save();
      alert('Send')
      /*
     TODO
     */
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  /* Getters Form*/
  get agreementStateField(): AbstractControl {
    return this.form.controls['agreementState'];
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

  get originIdField(): AbstractControl {
    return this.form.controls['originId'];
  }

  get typeIdField(): AbstractControl {
    return this.form.controls['typeId'];
  }

  get objectiveField(): AbstractControl {
    return this.form.controls['objective'];
  }

  get specialTypeIdField(): AbstractControl {
    return this.form.controls['specialTypeId'];
  }
}