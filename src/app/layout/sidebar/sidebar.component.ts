import {Component, inject, OnInit} from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {AuthHttpService, AuthService, MenusHttpService} from "@servicesApp/auth";
import {MenuModel} from "@models/auth";
import {CoreService, MessageService, RoutesService} from "@servicesApp/core";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected menus: MenuItem[] = [];
  protected showedMenu: boolean = false;
  protected closed: boolean = true;
  protected closedLock: boolean | null = null;
  protected isVisibleAbout: boolean = false;

  protected readonly coreService = inject(CoreService);
  private readonly menusHttpService = inject(MenusHttpService);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly authService = inject(AuthService);
  protected readonly messageService = inject(MessageService);
  protected readonly routes = inject(RoutesService);

  constructor() {
  }

  ngOnInit(): void {
    // this.getMenus();
  }

  showSubMenu(id: number = 0) {
    this.showedMenu = !this.showedMenu;
    if (id > 0) {
      document.getElementById(id?.toString())!.className = this.showedMenu ? 'showMenu' : '';
    }
  }

  getMenus() {
    if (this.authService.role) {
      this.menusHttpService.getMenusByRole(this.authService.role.id!).subscribe(
        menus => {
          this.menus = menus.map(menu => {
            const items = menu.children.map(item => {
              return {
                label: item.label,
                icon: item.icon,
                routerLink: [item.routerLink],
                command: () => {
                  this.coreService.sidebarVisible = false;
                }
              }
            });

            return {
              label: menu.label,
              items,
            }
          });
        }
      );
    } else {
      this.routes.login();
    }
  }

  // lockMenu() {
  //   if (this.closedLock === 'lock') {
  //     this.closedLock = 'lock'
  //   } else {
  //     this.closedLock = 'lock'
  //   }
  //
  // }

  showCloseMenu() {
    if (!this.closedLock) {
      this.closed = !this.closed;
    }
  }

  closeMenu() {
    if (!this.closedLock) {
      this.closed = true;
    }
  }

  signOut() {
    this.authHttpService.signOut();
  }

  about() {
    this.isVisibleAbout = true;
  }
}
