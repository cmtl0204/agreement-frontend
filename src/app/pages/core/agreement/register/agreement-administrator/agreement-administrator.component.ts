import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgreementModel, CatalogueModel} from '@models/core';
import {CoreService, MessageDialogService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {SkeletonEnum, AgreementFormEnum, AdministratorFormEnum, CatalogueTypeEnum} from '@shared/enums';
import {UserLdapModel} from "@models/auth";
import {UsersHttpService} from "@servicesHttp/auth";

@Component({
  selector: 'app-agreement-administrator',
  templateUrl: './agreement-administrator.component.html',
  styleUrl: './agreement-administrator.component.scss'
})
export class AgreementAdministratorComponent implements OnInit {

  protected readonly coreService = inject(CoreService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);
  public readonly usersHttpService = inject(UsersHttpService);

  // Form
  @Output() formOutput: EventEmitter<AgreementModel> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter()
  @Input({required: true}) formInput!: AgreementModel;
  protected form!: FormGroup;
  private formErrors: string[] = [];
  protected readonly Validators = Validators;

  // Foreign keys
  units: CatalogueModel[] = [];
  positions: CatalogueModel[] = [];
  users: UserLdapModel[] = [];

  // Enums
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly AdministratorFormEnum = AdministratorFormEnum;

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
    // this.loadPositions();
    this.loadUnits();
    this.loadUsers();

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

    this.unitField.valueChanges.subscribe(() => {
      this.loadPositions();
    });
  }

  get administratorForm() {
    return this.formBuilder.group({
      unit: [null, Validators.required],
      position: [null, Validators.required],
      user: [null, Validators.required],
    })
  }

  validateForm() {
    this.formErrors = [];

    if (this.unitField.invalid) this.formErrors.push(AdministratorFormEnum.unit);
    if (this.positionField.invalid) this.formErrors.push(AdministratorFormEnum.position);
    if (this.userField.invalid) this.formErrors.push(AdministratorFormEnum.user);

    this.formErrorsOutput.emit(this.formErrors);
  }

  /** Load Foreign Keys  **/
  loadPositions() {
    this.positionField.setValue(null);

    this.positions = this.cataloguesHttpService.findByParent(this.unitField.value.id);
  }

  loadUnits() {
    this.units = this.cataloguesHttpService.findByType(CatalogueTypeEnum.ADMINISTRATORS_UNIT);
  }

  loadUsers() {
    this.usersHttpService.findAllUsersLDAP().subscribe(response => {
      this.users = response;
    })
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

  get userField(): AbstractControl {
    return this.administratorFormField.controls['user'];
  }
}
