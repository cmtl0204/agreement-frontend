import {Component, inject, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {MenuItem, MenuItemCommandEvent, PrimeIcons} from 'primeng/api';
import {BreadcrumbService, CoreService, RoutesService} from '@servicesApp/core';
import {AuthHttpService, AuthService, MenusHttpService} from "@servicesApp/auth";
import {environment} from "@env/environment";
import {MenuModel} from "@models/auth";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopbarComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected items: MenuItem[] = [];
  protected home!: MenuItem;
  protected menu!: MenuItem;
  protected nickname!: string;

  protected readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly coreService = inject(CoreService);
  private readonly authHttpService = inject(AuthHttpService);
  public readonly authService = inject(AuthService);
  private readonly routesService = inject(RoutesService);

  constructor() {
    if (this.authService.auth) {
      this.nickname = `${this.authService.auth.name} ${this.authService.auth.lastname}`;
    }

    this.home = {label: 'Home', icon: PrimeIcons.HOME, routerLink: `/core/dashboards/${this.authService.role?.code}`};

    this.menu = {label: 'Menú', icon: PrimeIcons.LIST, command: () => this.coreService.sidebarVisible = true};

    this.items.push(this.menu);
  }

  signOut() {
    this.authHttpService.signOut();
  }

  protected readonly environment = environment;
}
