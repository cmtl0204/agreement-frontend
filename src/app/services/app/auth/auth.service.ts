import {inject, Injectable} from '@angular/core';
import {AuthModel, PermissionModel, RoleModel} from '@models/auth';
import {environment} from "@env/environment";
import {RoleEnum} from "@shared/enums";
import {MessageDialogService, RoutesService} from "@servicesApp/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly routesService = inject(RoutesService);
  private readonly messageDialogService = inject(MessageDialogService);

  get accessToken(): string | null {
    let accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      accessToken = 'Bearer ' + accessToken.replace(/"/g, '');
    }

    return accessToken;
  }

  set accessToken(value: string) {
    sessionStorage.setItem('accessToken', JSON.stringify(value));
  }

  get tokenDecode(): string | null {
    let tokenDecode = sessionStorage.getItem('tokenDecode');

    return tokenDecode;
  }

  set tokenDecode(value: string) {
    sessionStorage.setItem('tokenDecode', JSON.stringify(value));
  }

  set avatar(value: string) {
    const auth = this.auth;
    auth.avatar = value;
    sessionStorage.setItem('auth', JSON.stringify(auth));
  }

  get auth(): AuthModel {
    return JSON.parse(String(sessionStorage.getItem('auth')));
  }

  set auth(auth: AuthModel | undefined | null) {
    sessionStorage.setItem('auth', JSON.stringify(auth));
  }

  get permissions(): PermissionModel[] {
    return JSON.parse(String(sessionStorage.getItem('permissions')));
  }

  set permissions(permissions: PermissionModel[] | undefined | null) {
    sessionStorage.setItem('permissions', JSON.stringify(permissions));
  }

  get role(): RoleModel {
    return JSON.parse(String(sessionStorage.getItem('role')));
  }

  set role(role: RoleModel | undefined | null) {
    sessionStorage.setItem('role', JSON.stringify(role));
  }

  get roles(): RoleModel[] {
    return JSON.parse(String(sessionStorage.getItem('roles')));
  }

  set roles(roles: RoleModel[] | undefined | null) {
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }

  get keepSession(): boolean | null {
    return JSON.parse(String(sessionStorage.getItem('keepSession')));
  }

  set keepSession(value: boolean | undefined | null) {
    sessionStorage.setItem('keepSession', JSON.stringify(value));
  }

  get system(): string | null {
    return environment.APP_NAME;
  }

  get systemShortName(): string | null {
    return environment.APP_SHORT_NAME;
  }

  removeLogin() {
    localStorage.clear();
    sessionStorage.clear();
  }

  selectDashboard() {
    this.messageDialogService.successCustom('Bienvenido', 'Ingreso Correcto');

    switch (this.role.code) {
      case RoleEnum.ADMIN: {
        this.routesService.dashboardAdmin();
        break;
      }
      case RoleEnum.AGREEMENT_ADMINISTRATOR: {
        this.routesService.dashboardAdministrator();
        break;
      }
      case RoleEnum.NATIONAL_SUPERVISOR: {
        this.routesService.dashboardNationalSupervisor();
        break;
      }
      case RoleEnum.INTERNATIONAL_SUPERVISOR: {
        this.routesService.dashboardInternationalSupervisor();
        break;
      }
      default: {
        this.routesService.dashboardNationalSupervisor();
      }
    }
  }
}
