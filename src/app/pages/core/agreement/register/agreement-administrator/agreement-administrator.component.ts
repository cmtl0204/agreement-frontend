import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogueModel } from '@models/core';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { RoutesEnum, SkeletonEnum, AgreementFormEnum, AdministratorFormEnum, CatalogueTypeEnum } from '@shared/enums';
import { PrimeIcons } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-agreement-administrator',
  templateUrl: './agreement-administrator.component.html',
  styleUrl: './agreement-administrator.component.scss'
})
export class AgreementAdministratorComponent {

  protected readonly formBuilder = inject(FormBuilder);
  protected readonly coreService = inject(CoreService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  public readonly messageDialogService = inject(MessageDialogService);

  // Form
  // @Input({required: true}) id: string;
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter(); //add
  id: string = RoutesEnum.NEW
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
      administrator: this.administratorForm
    });

  }

  get administratorForm() {
    return this.formBuilder.group({
      unitId: [null, Validators.required],
      positionId: [null, Validators.required],
    })
  }

  validateForm(): boolean {
    this.formErrors = [];
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
      this.save();
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  // getters Form
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