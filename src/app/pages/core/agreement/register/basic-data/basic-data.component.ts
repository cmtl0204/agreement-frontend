import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogueModel } from '@models/core';
import { CoreService, MessageDialogService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AgreementFormEnum, SkeletonEnum, CatalogueTypeEnum, RoutesEnum } from '@shared/enums';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.scss'
})
export class BasicDataComponent{
  /** Services **/
  protected readonly formBuilder = inject(FormBuilder)
  protected readonly coreService = inject(CoreService )
  protected readonly cataloguesHttpService = inject(CataloguesHttpService)
  protected readonly messageDialogService = inject(MessageDialogService)

  /** Form **/
  // @Input({required: true}) id!: string;
  @Output() formOutput:EventEmitter<FormGroup> = new EventEmitter()
  id:string=RoutesEnum.NEW
  protected form!: FormGroup;
  private formErrors: string[] = [];

  /** Foreign Keys **/
  protected states: CatalogueModel[] = [];
  protected origins: CatalogueModel[] = [];
  protected types: CatalogueModel[] = [];

  /** Enums **/
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons; //pending

  constructor() {
    this.buildForm();
  }


  save(){
    this.formOutput.emit(this.form.value)
  }

  /* data */
  stateIdOptions = [
    { name: 'Convenio vigente', id: 1 },
    { name: 'Convenio en proceso de cierre', id: 2 },
    { name: 'Convenio cerrado', id: 3 }
  ];

  originIdOptions = [
    { name: 'Nacional', id: 1 },
    { name: 'Internacional/Extranjera', id: 2 }
  ];

  typeIdOptions = [
    { name: 'Marco', id: 1 },
    { name: 'Específicos', id: 2 },
    { name: 'Articulación', id: 3 },
    { name: 'Cooperación', id: 4 },
    { name: 'Especial: Memorando de entendimiento', id: 5 },
    { name: 'Especial: Carta de intención', id: 6 },
    { name: 'Comodato o convenio de préstamo de uso', id: 7 }
  ];

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      agreementState: [null, [Validators.required]],
      name : [null, [Validators.required]],
      internalNumber: [null, [Validators.required]],
      number: [null, [Validators.required]],
      originId: [null, [Validators.required]],
      typeId: [null, [Validators.required]]
    });
  }

  validateForm(): boolean {
    this.formErrors = [];

    if (this.agreementStateField.invalid) this.formErrors.push(AgreementFormEnum.agreementState);
    if (this.nameField.invalid) this.formErrors.push(AgreementFormEnum.name);
    if (this.internalNumberField.invalid) this.formErrors.push(AgreementFormEnum.internalNumber);
    if (this.numberField.invalid) this.formErrors.push(AgreementFormEnum.number);
    if (this.originIdField.invalid) this.formErrors.push(AgreementFormEnum.originId);
    if (this.typeIdField.invalid) this.formErrors.push(AgreementFormEnum.typeId);

    return this.form.valid && this.formErrors.length === 0;
  }

  /** Load Foreign Keys  **/
  loadStates() {
    this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_STATE);
  };
  loadOrigins() {
    this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_ORGIN);
  };
  loadTypes() {
    this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_TYPE);
  };

  /** Form Actions **/
  onSubmit(): void {
    if (this.validateForm()) {
      this.create();
      console.log(this.form.value)
      alert('Eniviado')
      
      /*
     TODO
     */
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  create(): void {
    /*
        TODO
    */
  }

  update(): void {
    /*
        TODO
        */
  }

  /** Redirects **/
  redirectRegistration() {
    // this.messageDialogService.questionOnExit().subscribe(result => {
    //   if (result) {
    //     this.onLeave = true;
    //     this.routesService.registration();
    //   } else {
    //     this.onLeave = false;
    //   }
    // });

    /* this.routesService.registration(); */
  }

  /** Getters Form**/
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
}

