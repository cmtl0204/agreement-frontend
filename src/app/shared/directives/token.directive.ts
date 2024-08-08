import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '@servicesApp/auth';

@Directive({
  selector: '[appToken]'
})
export class TokenDirective implements OnInit {

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef, private authService: AuthService) {

  }

  ngOnInit(): void {

  }

  @Input()
  set appToken(val: string) {
    this.viewContainerRef.clear();
    switch (val) {
      case 'authenticated': {
        if (this.authService.accessToken) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        break;
      }
      case 'unauthenticated': {
        if (!this.authService.accessToken) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        break;
      }
    }
  }
}
