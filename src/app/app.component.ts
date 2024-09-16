import {Component, inject, OnInit} from '@angular/core';
import {environment} from "@env/environment";
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'SIC';
  env = environment.API_URL;
  private readonly translateService = inject(TranslateService);
  private readonly config = inject(PrimeNGConfig);
  ngOnInit() {
    // this.translateService.setDefaultLang('es');
    // this.translate('es')
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  constructor() {
    this.translateService.addLangs(['es']);
    this.translateService.setDefaultLang('es');
    this.translateService.use(this.translateService.getBrowserLang()||"es");
  }
}
