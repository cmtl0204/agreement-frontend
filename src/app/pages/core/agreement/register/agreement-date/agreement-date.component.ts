import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CatalogueModel } from '@models/core';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { RoutesEnum, SkeletonEnum, AgreementFormEnum, AdministratorFormEnum, CatalogueTypeEnum } from '@shared/enums';
import { OnExitInterface } from '@shared/interfaces';
import { PrimeIcons } from 'primeng/api';
import { firstValueFrom, merge } from 'rxjs';

@Component({
  selector: 'app-agreement-date',
  templateUrl: './agreement-date.component.html',
  styleUrl: './agreement-date.component.scss'
})
export class AgreementDateComponent implements OnInit, OnExitInterface {
  // Services
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly coreService = inject(CoreService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  public readonly messageDialogService = inject(MessageDialogService);
  private readonly routesService = inject(RoutesService);
  
  
  // Form
  // @Input({required: true}) id: string;
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter(); //add
  id:string = RoutesEnum.NEW
  protected form!: FormGroup;
  private formErrors: string[] = [];
  protected readonly Validators = Validators;
  
  // Foreign keys
  units: CatalogueModel[] = [];
  positions: CatalogueModel[] = [];

  // Enums
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly AdministratorFormEnum = AdministratorFormEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.buildForm();
    this.applyValidations();
    this.setEndedReason();
  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
    // return this.messageDialogService.questionOnExit();
  }

  ngOnInit(): void {
    this.loadPositions();
    this.loadUnits();

    // if (this.id !== RoutesEnum.NEW) {
    //   // this.findAgreement(this.id);
    // }
  }

  save() {
    this.formOutput.emit(this.form.value); //add
  }

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      subscribedAt: [null,Validators.required],
      startedAt: [null, Validators.required],
      isFinishDate: [null, Validators.required],
      endedAt: [null],
      endedReason: [null],
      yearTerm: [null, Validators.required],
      monthTerm: [null, Validators.required],
      dayTerm: [null, Validators.required],
      objective: [null, Validators.required],
      administrator: this.administratorForm
    })
  }

  get administratorForm() {
    return this.formBuilder.group({
      unitId: [null, Validators.required],
      positionId: [null, Validators.required],
    })
  }
  
  validateForm(): boolean {
    this.formErrors = [];
    if (this.subscribedAtField.invalid) this.formErrors.push(AgreementFormEnum.subscribedAt);
    if (this.startedAtField.invalid) this.formErrors.push(AgreementFormEnum.startedAt);
    if (this.isFinishDateField.invalid) this.formErrors.push(AgreementFormEnum.isFinishDate);
    if (this.endedAtField.invalid) this.formErrors.push(AgreementFormEnum.endedAt);
    if (this.endedReasonField.invalid) this.formErrors.push(AgreementFormEnum.endedReason);
    if (this.yearTermField.invalid) this.formErrors.push(AgreementFormEnum.yearTerm);
    if (this.monthTermField.invalid) this.formErrors.push(AgreementFormEnum.monthTerm);
    if (this.dayTermField.invalid) this.formErrors.push(AgreementFormEnum.dayTerm);
    if (this.objectiveField.invalid) this.formErrors.push(AgreementFormEnum.objective);
    if (this.unitIdField.invalid) this.formErrors.push(AdministratorFormEnum.unitId);
    if (this.positionIdField.invalid) this.formErrors.push(AdministratorFormEnum.positionId);
    
    return this.form.valid && this.formErrors.length === 0;
  }

  /** Load Foreign Keys  **/
  loadPositions() {
    this.positions = this.cataloguesHttpService.findByType(CatalogueTypeEnum.ADMINISTRATORS_POSITION);
  }
  loadUnits() {
    this.units = this.cataloguesHttpService.findByType(CatalogueTypeEnum.ADMINISTRATORS_UNIT);
  }

  // FormActions
  onSubmit(): void {
    if (this.validateForm()) {
      this.create();
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

  applyValidations(){
    this.isFinishDateField.valueChanges.subscribe(()=>{
      if(this.isFinishDateField.value==true){
        this.endedAtField.addValidators(Validators.required)
        this.endedReasonField.reset()
        this.endedReasonField.removeValidators(Validators.required)
        this.endedReasonField.updateValueAndValidity()
      }else{
        this.endedReasonField.addValidators(Validators.required)
        this.endedAtField.removeValidators(Validators.required)
        this.endedAtField.reset()
      }
    })
  }

  setEndedReason() {
    merge(
      this.isFinishDateField.valueChanges,
      this.startedAtField.valueChanges
    ).subscribe(() => {
      if (this.startedAtField.value && this.isFinishDateField.value == false) {
        this.endedReasonField.setValue('Razón de terminación del convenio indefinida')
      }
    })
  }

  // redirects
  redirectRegistration() {
    // this.messageDialogService.questionOnExit().subscribe(result => {
    //   if (result) {
    //     this.onLeave = true;
    //     this.routesService.registration();
    //   } else {
    //     this.onLeave = false;
    //   }
    // });

    // this.routesService.registration();
  }

  /*getters forms*/
  get subscribedAtField(): AbstractControl {
    return this.form.controls['subscribedAt'];
  }
  get startedAtField(): AbstractControl {
    return this.form.controls['startedAt'];
  }
  get isFinishDateField(): AbstractControl {
    return this.form.controls['isFinishDate'];
  }
  get endedAtField(): AbstractControl {
    return this.form.controls['endedAt'];
  }
  get endedReasonField(): AbstractControl {
    return this.form.controls['endedReason'];
  }
  get objectiveField(): AbstractControl {
    return this.form.controls['objective'];
  }
  get yearTermField(): AbstractControl {
    return this.form.controls['yearTerm'];
  }
  get monthTermField(): AbstractControl {
    return this.form.controls['monthTerm'];
  }
  get dayTermField(): AbstractControl {
    return this.form.controls['dayTerm'];
  }

  // administratorForm
  get administratorFormField(): FormGroup {
    return this.form.controls['administrator'] as FormGroup;
  }
  get unitIdField(): AbstractControl {
    return this.administratorFormField.controls['unitId'];
  }
  get positionIdField(): AbstractControl {
    return this.administratorFormField.controls['positionId'];
  }

}
