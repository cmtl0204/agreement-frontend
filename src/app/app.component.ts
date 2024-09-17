import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {environment} from "@env/environment";
import {TranslateService} from '@ngx-translate/core';
import {PrimeNGConfig} from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'SIC';
  env = environment.API_URL;
  private readonly translateService = inject(TranslateService);
  private readonly primengConfig = inject(PrimeNGConfig);

  ngAfterViewInit() {
    this.translateChange('es')
  }

  translateChange(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
