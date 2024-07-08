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
  protected readonly formBuilder = inject(FormBuilder)
  protected readonly coreService = inject(CoreService )
  protected readonly cataloguesHttpService = inject(CataloguesHttpService)
  protected readonly messageDialogService = inject(MessageDialogService)

  /** Form && Output **/
  // @Input({required: true}) id: string;
  @Output() formOutput:EventEmitter<FormGroup> = new EventEmitter()
  protected id =''
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

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      agreementState: [{value:null, disabled:true}, [Validators.required]],
      name : [null, [Validators.required]],
      internalNumber: [null, [Validators.required]],
      number: [null, [Validators.required]],
      originId: [{value:null, disabled:true}, [Validators.required]],
      typeId: [null, [Validators.required]]
    });
  }
  
  validateForm(): boolean {
    this.formErrors = [];
    if (this.agreementStateField.invalid) this.formErrors.push(this.AgreementFormEnum.agreementState);
    if (this.nameField.invalid) this.formErrors.push(this.AgreementFormEnum.name);
    if (this.internalNumberField.invalid) this.formErrors.push(this.AgreementFormEnum.internalNumber);
    if (this.numberField.invalid) this.formErrors.push(this.AgreementFormEnum.number);
    if (this.originIdField.invalid) this.formErrors.push(this.AgreementFormEnum.originId);
    if (this.typeIdField.invalid) this.formErrors.push(this.AgreementFormEnum.typeId);
    
    return this.form.valid && this.formErrors.length === 0;
  }


  /** Load Foreign Keys  **/
  loadStates() {
    this.states =  this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_STATE);
  };
  loadOrigins() {
    this.origins = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_ORGIN);
  };
  loadTypes() {
    this.types = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_TYPE);
  };

  /** Form Actions **/
  onSubmit(): void {
    if (this.validateForm()) {
      console.log(this.form.value)
      this.update();
      alert('enviado')
      /*
     TODO
     */
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
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

