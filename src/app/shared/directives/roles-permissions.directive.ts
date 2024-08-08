import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthModel, PermissionModel, RoleModel, UserModel} from '@models/auth';
import {AuthService} from '@servicesApp/auth';

@Directive({
  selector: '[appRolesPermissions]'
})
export class RolesPermissionsDirective implements OnInit {
  private auth: AuthModel | null;
  private readonly permissions: PermissionModel[] | null = []
  private readonly roles: RoleModel[] = []
  private currentPermissions: string[] = []
  private currentRoles: string[] = []

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef, private authService: AuthService) {
    this.auth = this.authService.auth;
    this.permissions = this.authService.permissions;
    this.roles = this.authService.roles;
  }

  ngOnInit(): void {

  }

  @Input()
  set appRolesPermissions(val: string[]) {
    this.currentRoles = val.filter(element => element.startsWith('role:'));
    this.currentPermissions = val.filter(element => element.startsWith('permission:'));
    this.updateView();
  }

  private updateView() {
    this.viewContainerRef.clear();
    if (this.checkRole() && (this.checkPermission() || this.checkRolePermission())) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  private checkRole() {
    let role = null;
    let hasRole = false;
    if (!this.currentRoles.length) {
      return true;
    }

    if (this.roles) {
      for (const currentRole of this.currentRoles) {
        role = this.roles.find(
          role => {
            const splitCurrentRole = currentRole.split(':')[1];
            const splitCurrentRoles = splitCurrentRole.split('|');

            for (const splitRole of splitCurrentRoles) {
              hasRole = (role.name?.toLowerCase() === splitRole?.toLowerCase())
              if (hasRole) {
                break;
              }
            }
            return hasRole;
          });
        if (role) {
          return true;
        }
      }

    }
    return false;
  }

  private checkPermission() {
    let permission = null;
    let hasPermission = false;

    if (!this.currentPermissions.length) {
      return true;
    }

    if (this.permissions) {
      for (const currentPermission of this.currentPermissions) {
        permission = this.permissions.find(
          permission => {
            const splitCurrentPermission = currentPermission.split(':')[1];
            const splitCurrentPermissions = splitCurrentPermission.split('|');

            for (const splitPermission of splitCurrentPermissions) {
              hasPermission = (permission.name?.toLowerCase() === splitPermission?.toLowerCase());
              if (hasPermission) {
                break;
              }
            }
            return hasPermission;
          });
        if (permission) {
          return true;
        }
      }
    }
    return false;
  }

  private checkRolePermission() {
    let permission = null;
    let hasPermission = false;

    if (!this.currentPermissions.length) {
      return true;
    }

    if (this.roles) {
      for (const role of this.roles) {
        for (const currentPermission of this.currentPermissions) {
          if (role.permissions) {
            permission = role.permissions.find(
              permission => {
                const splitCurrentPermission = currentPermission.split(':')[1];
                const splitCurrentPermissions = splitCurrentPermission.split('|');

                for (const splitPermission of splitCurrentPermissions) {
                  hasPermission = (permission.name?.toLowerCase() === splitPermission?.toLowerCase());
                  if (hasPermission) {
                    break;
                  }
                }
                return hasPermission;
              });
            if (permission) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}
