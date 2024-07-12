import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PrimeIcons} from "primeng/api";
import {AuthHttpService, AuthService} from '@servicesApp/auth';
import {CoreService, MessageService, RoutesService} from '@servicesApp/core';
import {LoginFormEnum} from "@shared/enums";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit {
  //Services
  protected readonly authService = inject(AuthService);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageService = inject(MessageService);
  private readonly routesService = inject(RoutesService);

  //Form
  protected form!: FormGroup;

  //Enums
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly LoginFormEnum = LoginFormEnum;

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.form = this.formBuilder.group({
      // username: ['reviewer', [Validators.required]],
      username: [null, [Validators.required]],
      // password: ['12345678', [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.login();
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields();
    }
  }

  login() {
    this.authService.removeLogin();

    this.authHttpService.login(this.form.value)
      .subscribe(
        response => {
          if (this.authService.roles.length === 0) {
            this.messageService.errorCustom('Sin Rol', 'No cuenta con un rol asignado');
            this.authService.removeLogin();
            return;
          }

          this.routesService.roleSelect();
        });
  }

  /** Redirects **/
  redirectPasswordReset() {
    this.routesService.passwordReset();
  }

  redirectRegistration() {
    this.routesService.registration();
  }

  /** Getters **/
  get usernameField(): AbstractControl {
    return this.form.controls['username'];
  }

  get passwordField(): AbstractControl {
    return this.form.controls['password'];
  }
}
