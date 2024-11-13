import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "@servicesApp/auth";
import {RoutesService} from "@servicesApp/core";

export const TokenGuard: CanActivateFn = (route, state) => {
  const routesService = inject(RoutesService);
  const authService = inject(AuthService);

  if (authService.accessToken) {
    return true;
  }

  authService.removeLogin();
  routesService.login();

  return false;
}
