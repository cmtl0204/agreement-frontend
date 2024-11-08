import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "@servicesApp/auth";
import {RoleModel} from "@models/auth";

export const RoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.auth) {
    router.navigate(['/common/403']);
    return false;
  }

  const authRole: RoleModel = authService.role;

  if (authRole) {
    for (const role of route.data['roles']) {
      if (role.toUpperCase() === authRole.code.toUpperCase()) return true;
    }
  }

  router.navigate(['/common/403']);

  return false;
}
