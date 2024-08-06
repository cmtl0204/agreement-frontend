import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgreementModel, CatalogueModel} from '@models/core';
import {CoreService, MessageDialogService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {SkeletonEnum, AgreementFormEnum, AdministratorFormEnum, CatalogueTypeEnum} from '@shared/enums';
import {PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-agreement-administrator',
  templateUrl: './agreement-administrator.component.html',
  styleUrl: './agreement-administrator.component.scss'
})
export class AgreementAdministratorComponent implements OnInit {

  protected readonly formBuilder = inject(FormBuilder);
  protected readonly coreService = inject(CoreService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  public readonly messageDialogService = inject(MessageDialogService);

  // Form
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter()
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter()
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter()
  @Input({required: true}) formInput!: AgreementModel;
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

  ngOnInit(): void {
    this.loadPositions();
    this.loadUnits();
    this.patchValueForm();
    this.validateForm();
  }

  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      administrator: this.administratorForm
    });

    this.checkValueChanges();
  }

  patchValueForm() {
    this.form.patchValue(this.formInput);
  }

  checkValueChanges() {
    this.form.valueChanges.subscribe(value => {
      this.formOutput.emit(value);
      this.validateForm();
    });
  }

  get administratorForm() {
    return this.formBuilder.group({
      unit: [null, Validators.required],
      position: [null, Validators.required],
    })
  }

  validateForm() {
    this.formErrors = [];

    if (this.unitField.invalid) this.formErrors.push(AdministratorFormEnum.unit);
    if (this.positionField.invalid) this.formErrors.push(AdministratorFormEnum.position);

    this.formErrorsOutput.emit(this.formErrors);
  }

  /** Load Foreign Keys  **/
  loadPositions() {
    this.positions = this.cataloguesHttpService.findByType(CatalogueTypeEnum.INTERNAL_INSTITUTIONS_POSITION);
  }

  loadUnits() {
    this.units = this.cataloguesHttpService.findByType(CatalogueTypeEnum.ADMINISTRATORS_UNIT);
  }

  // getters Form
  get administratorFormField(): FormGroup {
    return this.form.controls['administrator'] as FormGroup;
  }

  get unitField(): AbstractControl {
    return this.administratorFormField.controls['unit'];
  }

  get positionField(): AbstractControl {
    return this.administratorFormField.controls['position'];
  }
}
