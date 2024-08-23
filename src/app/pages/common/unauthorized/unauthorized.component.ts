import {Component, inject} from '@angular/core';
import {RoutesService} from "@servicesApp/core";
import {AuthService} from "@servicesApp/auth";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
  private readonly routesService = inject(RoutesService);
  private readonly authService = inject(AuthService);
  protected count: number = 4;

  constructor() {
    this.authService.removeLogin();

    setInterval(() => {
      this.count--;
    }, 1000);

    setTimeout(() => {
      this.routesService.login();
    }, this.count * 1000);
  }

}
