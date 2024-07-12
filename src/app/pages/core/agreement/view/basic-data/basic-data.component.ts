import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AgreementModel } from '@models/core/agreement.model';
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
   private readonly formBuilder = inject(FormBuilder);
   protected readonly coreService = inject(CoreService);
   protected readonly cataloguesHttpService = inject(CataloguesHttpService);
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
   
   ngOnInit(): void { }

   async onExit() {
     const res = await firstValueFrom(this.messageDialogService.questionOnExit());
     console.log(res);
     return res;
     // return this.messageDialogService.questionOnExit();
   }
 
 
   /** Form Actions **/
   onSubmit(): void {
     
   }
 
   /** Form Builder & Validates **/
   buildForm() {
     this.form = this.formBuilder.group({
 
     });
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
