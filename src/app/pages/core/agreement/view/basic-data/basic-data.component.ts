import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CatalogueModel} from '@models/core';
import { AgreementModel } from '@models/core/agreement.model';
import { AuthService, AuthHttpService } from '@servicesApp/auth';
import {CoreService, MessageDialogService, RoutesService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {AgreementFormEnum, SkeletonEnum} from '@shared/enums';
import {PrimeIcons} from 'primeng/api';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.scss'
})
export class BasicDataComponent implements OnInit {
   /** Services **/
   protected readonly authService = inject(AuthService);
   private readonly authHttpService = inject(AuthHttpService);
   protected readonly cataloguesHttpService = inject(CataloguesHttpService);
   protected readonly coreService = inject(CoreService);
   private readonly formBuilder = inject(FormBuilder);
   public readonly messageDialogService = inject(MessageDialogService);
   private readonly routesService = inject(RoutesService);
 
 
   /** Form **/
   @Input({ required: true }) id!: string;
   protected form!: FormGroup;
   //private onLeave: boolean = true;
 
   /** Enums **/
   protected readonly AgreementFormEnum = AgreementFormEnum;
   protected readonly SkeletonEnum = SkeletonEnum;
   protected readonly PrimeIcons = PrimeIcons;
 
   /** Model */
   protected agreement: AgreementModel = {
     id: '',
     number: '1200',
     internalNumber: 100,
     name: 'Convenio 01',
     originId: 'origen',
     typeId: 'tipo',
     isFinishDate: false,
     endedReason: '',
     yearTerm: 2024,
     monthTerm: 10,
     dayTerm: 31,
     objective: '',
     isFinancing: false,
     userId: ''
   }
 
   constructor() {
     this.buildForm();
   }
 
   async onExit() {
     const res = await firstValueFrom(this.messageDialogService.questionOnExit());
     console.log(res);
     return res;
     // return this.messageDialogService.questionOnExit();
   }
 
   ngOnInit(): void { }
 
   /** Form Actions **/
   onSubmit(): void {
     
   }
 
   findCompany(id: string) {
     /*
     TODO
     */
     this.form.patchValue({});
   }
 
   /** Form Builder & Validates **/
   buildForm() {
     this.form = this.formBuilder.group({
 
     });
   }
 
   create(): void {
     /*
         TODO
     */
   }
 
   update(): void {
     /*
         TODO
         */
   }
 
   /** Redirects **/
   redirectRegistration() {
     // this.messageDialogService.questionOnExit().subscribe(result => {
     //   if (result) {
     //     this.onLeave = true;
     //     this.routesService.registration();
     //   } else {
     //     this.onLeave = false;
     //   }
     // });
 
     this.routesService.registration();
   }
 
   /** Getters Form**/
   /**
    Pending
    */
}
