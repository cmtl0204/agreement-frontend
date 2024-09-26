import {Component, inject, OnInit} from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {AuthHttpService, AuthService, MenusHttpService} from "@servicesApp/auth";
import {MenuModel} from "@models/auth";
import {AgreementsService, CoreService, MessageService, RoutesService} from "@servicesApp/core";
import {AgreementsHttpService} from "@servicesHttp/core";
import {format} from "date-fns";
import {Router} from "@angular/router";

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
  private readonly agreementsService = inject(AgreementsService);
  protected readonly authService = inject(AuthService);
  protected readonly messageService = inject(MessageService);
  protected readonly routesService = inject(RoutesService);
  protected readonly router = inject(Router);
  protected currentYear: string;

  constructor() {
    this.currentYear = format(new Date(), 'yyyy');
  }

  ngOnInit(): void {
    this.getMenus();
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
            return {
              label: menu.label,
              icon: menu.icon,
              command: () => {
                this.agreementsService.clearAgreement();
                this.coreService.sidebarVisible = false;
                this.router.navigate([menu.routerLink])
              }
            }
          });

          this.menus.push({
            label: 'Cerrar Sesión',
            icon: PrimeIcons.POWER_OFF,
            command: () => {
              this.coreService.sidebarVisible = false;
              this.authHttpService.signOut();
            }
          });

        }
      );
    } else {
      this.routesService.login();
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
