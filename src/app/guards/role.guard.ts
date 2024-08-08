import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "@servicesApp/auth";
import {RoleModel} from "@models/auth";

export const RoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  console.log('roels guard')
  if (!authService.auth) {
    router.navigate(['/common/403']);
    return false;
  }
  const roles: RoleModel[] = authService.auth.roles;
  if (roles) {
    for (const role of route.data['roles']) {
      if (authService.accessToken && roles.find(r => r.code?.toUpperCase() === role?.toUpperCase())) {
        return true;
      }
    }
  }

  router.navigate(['/common/403']);

  return false;
}
