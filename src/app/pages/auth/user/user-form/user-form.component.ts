import {Component, inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {PrimeIcons} from "primeng/api";
import {CreateUserDto, RoleModel, UpdateUserDto} from '@models/auth';
import {CatalogueModel} from "@models/core";
import {RolesHttpService, UsersHttpService} from '@servicesApp/auth';
import {
  BreadcrumbService,
  CoreService,
  MessageService,
  RoutesService,
} from '@servicesApp/core';
import {CataloguesHttpService,} from '@servicesHttp/core';
import {OnExitInterface} from '@shared/interfaces';
import {
  BreadcrumbEnum,
  CatalogueTypeEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum,
  RoutesEnum,
  SeverityButtonActionEnum,
  SkeletonEnum,
  UsersFormEnum,
  CatalogueUsersIdentificationTypeEnum
} from "@shared/enums";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly UsersFormEnum = UsersFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected helpText: string = '';

  @Input() id: string = '';
  protected form: FormGroup;
  protected formErrors: string[] = [];

  protected roles: RoleModel[] = [];
  protected identificationTypes: CatalogueModel[] = [];

  protected isChangePassword: FormControl = new FormControl(false);
  private saving: boolean = true;

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    protected readonly coreService: CoreService,
    private readonly formBuilder: FormBuilder,
    public readonly messageService: MessageService,
    private readonly router: Router,
    private readonly routesService: RoutesService,
    private readonly rolesHttpService: RolesHttpService,
    private readonly cataloguesHttpService: CataloguesHttpService,
    private readonly usersHttpService: UsersHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.USERS, routerLink: [this.routesService.users]},
      {label: BreadcrumbEnum.FORM},
    ]);

    this.form = this.newForm;

    this.validateFormFields();
  }

  validateFormFields() {
    this.identificationTypeField.valueChanges.subscribe(value => {
      if (value) {
        this.identificationField.enable();
      } else {
        this.identificationField.disable();
      }

      if (value.code === CatalogueUsersIdentificationTypeEnum.IDENTIFICATION) {
        this.identificationField.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
      } else {
        this.identificationField.setValidators([Validators.required]);
      }

      this.identificationField.updateValueAndValidity();
    });
  }

  async onExit(): Promise<boolean> {
    if ((this.form.touched || this.form.dirty) && this.saving) {
      // return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.loadRoles();
    this.loadIdentificationTypes();

    if (this.id != RoutesEnum.NEW) {
      this.get();
      this.passwordField.clearValidators();
    } else {
      this.isChangePassword.setValue(true);
      this.passwordField.enable();
      this.passwordChangedField.enable();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      identification: [{
        value: null,
        disabled: true
      }, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      identificationType: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [{value: null, disabled: true}, [Validators.required, Validators.minLength(8)]],
      passwordChanged: [{value: true, disabled: true}],
      roles: [null, [Validators.required]],
      username: [null, [Validators.required]],
      units: [null, [Validators.required]],
    });
  }

  get validateFormErrors() {
    this.formErrors = [];

    if (this.emailField.errors) this.formErrors.push(UsersFormEnum.email);
    if (this.identificationField.errors) this.formErrors.push(UsersFormEnum.identification);
    if (this.identificationTypeField.errors) this.formErrors.push(UsersFormEnum.identificationType);
    if (this.lastnameField.errors) this.formErrors.push(UsersFormEnum.lastname);
    if (this.nameField.errors) this.formErrors.push(UsersFormEnum.name);
    if (this.passwordField.errors) this.formErrors.push(UsersFormEnum.password);
    if (this.passwordChangedField.errors) this.formErrors.push(UsersFormEnum.passwordChanged);
    if (this.rolesField.errors) this.formErrors.push(UsersFormEnum.roles);

    this.formErrors.sort();

    return this.formErrors.length === 0 && this.form.valid;
  }

  get(): void {
    this.usersHttpService.findOne(this.id!).subscribe((user) => {
      this.form.patchValue(user);
    });
  }

  onSubmit(): void {
    this.usernameField.setValue(this.identificationField.value);

    if (this.validateFormErrors) {
      if (this.id != RoutesEnum.NEW) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields(this.formErrors);
    }
  }

  back(): void {
    this.router.navigate([this.routesService.users]);
  }

  create(user: CreateUserDto): void {
    user.passwordChanged = !user.passwordChanged;

    this.usersHttpService.create(user).subscribe(user => {
      //this.form.reset(user);
      this.saving = false;
      this.back();
    });
  }

  update(user: UpdateUserDto): void {
    user.passwordChanged = !user.passwordChanged;

    this.usersHttpService.update(this.id!, user).subscribe((user) => {
      //this.form.reset(user);
      this.saving = false;
      this.back()
    });
  }

  loadRoles(): void {
    this.rolesHttpService.findAll().subscribe((roles) => this.roles = roles);
  }

  loadIdentificationTypes(): void {
    this.identificationTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.USERS_IDENTIFICATION_TYPE);
  }

  handleChangePassword(event: any) {
    this.isChangePassword.setValue(event.checked);
    if (this.isChangePassword.value) {
      this.passwordChangedField.enable();
      this.passwordField.enable();
      this.passwordField.setValidators([Validators.required, Validators.minLength(8)]);
    } else {
      this.passwordChangedField.setValue(false);
      this.passwordChangedField.disable();
      this.passwordField.setValue(null);
      this.passwordField.disable();
      this.passwordField.clearValidators();
    }
    this.passwordField.updateValueAndValidity();
  }

  get emailField(): AbstractControl {
    return this.form.controls['email'];
  }

  get identificationField(): AbstractControl {
    return this.form.controls['identification'];
  }

  get identificationTypeField(): AbstractControl {
    return this.form.controls['identificationType'];
  }

  get lastnameField(): AbstractControl {
    return this.form.controls['lastname'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get passwordField(): AbstractControl {
    return this.form.controls['password'];
  }

  get passwordChangedField(): AbstractControl {
    return this.form.controls['passwordChanged'];
  }

  get rolesField(): FormArray {
    return this.form.controls['roles'] as FormArray;
  }

  get usernameField(): AbstractControl {
    return this.form.controls['username'];
  }

  get unitsField(): AbstractControl {
    return this.form.controls['units'];
  }
}
