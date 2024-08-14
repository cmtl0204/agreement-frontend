import {Component, inject} from '@angular/core';
import {AuthService} from "@servicesApp/auth";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private readonly authService = inject(AuthService);

  constructor() {
    // this.authService.selectDashboard();
  }

}
