import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { SkeletonEnum, AgreementFormEnum, AdministratorFormEnum} from '@shared/enums';
import { OnExitInterface } from '@shared/interfaces';
import { PrimeIcons } from 'primeng/api';
  import { firstValueFrom} from 'rxjs';

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
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter(); 
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter()
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter()
  id:string = ''
  protected form!: FormGroup;
  private formErrors: string[] = [];
  protected readonly Validators = Validators;
  
  // Enums
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly AdministratorFormEnum = AdministratorFormEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.buildForm();
  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
    // return this.messageDialogService.questionOnExit();
  }

  ngOnInit(): void {
    // if (this.id !== RoutesEnum.NEW) {
    //   // this.findAgreement(this.id);
    // }
  }

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      subscribedAt: [null,Validators.required],
      startedAt: [null, Validators.required],
      isFinishDate: [null, Validators.required],
      endedAt: [{value:null, disabled:true}, Validators.required],
      endedReason: [null],
      yearTerm: [null, Validators.required],
      monthTerm: [null, Validators.required],
      dayTerm: [null, Validators.required],
    })

    this.checkValueChanges()
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
    return this.form.valid && this.formErrors.length === 0;
  }

  // FormActions
  onSubmit(): void {
    if (this.validateForm()) {
      this.save();
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  save() {
    this.formOutput.emit(this.form.value); 
    this.nextOutput.emit(true);
  }
  
  checkValueChanges() {
    this.isFinishDateField.valueChanges.subscribe(value => {
      if (value) {
        this.endedAtField.setValidators(Validators.required);
        this.yearTermField.setValidators(Validators.required);
        this.monthTermField.setValidators(Validators.required);
        this.dayTermField.setValidators(Validators.required);
        this.endedReasonField.clearValidators();
        this.endedReasonField.reset();
      } else {
        this.endedReasonField.setValidators(Validators.required);
        this.yearTermField.clearValidators();
        this.monthTermField.clearValidators();
        this.dayTermField.clearValidators();
        this.endedAtField.clearValidators();
        this.endedAtField.reset();
        this.yearTermField.reset();
        this.monthTermField.reset();
        this.dayTermField.reset();
      }

      this.endedReasonField.updateValueAndValidity();
      this.endedAtField.updateValueAndValidity();
      this.yearTermField.updateValueAndValidity();
      this.monthTermField.updateValueAndValidity();
      this.dayTermField.updateValueAndValidity();
    });
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
  get yearTermField(): AbstractControl {
    return this.form.controls['yearTerm'];
  }
  get monthTermField(): AbstractControl {
    return this.form.controls['monthTerm'];
  }
  get dayTermField(): AbstractControl {
    return this.form.controls['dayTerm'];
  }
}
