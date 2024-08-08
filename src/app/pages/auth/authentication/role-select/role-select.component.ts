import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrimeIcons} from "primeng/api";
import {RoleModel} from "@models/auth";
import {AuthService} from '@servicesApp/auth';
import {CoreService, MessageService, RoutesService} from '@servicesApp/core';
import {LoginFormEnum} from "@shared/enums";

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoleSelectComponent implements OnInit {
  //Services
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageService = inject(MessageService);
  protected readonly authService = inject(AuthService);
  protected readonly routesService = inject(RoutesService);

  //Form
  protected form!: FormGroup;
  protected roles: RoleModel[] = [];

  //Enums
  protected readonly LoginFormEnum = LoginFormEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
    this.roles = this.authService.roles;
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
        role: [null, [Validators.required]],
        fiscalYear: [null],
        unit: [null],
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.selectRole();
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields();
    }
  }

  selectRole() {
    this.authService.role = this.roleField.value;

    this.authService.selectDashboard();
  }

  redirectLogin() {
    this.routesService.login();
  }

  get roleField() {
    return this.form.controls['role'];
  }
}
