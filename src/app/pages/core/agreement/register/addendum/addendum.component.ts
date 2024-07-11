import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService, AuthHttpService } from '@servicesApp/auth';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AddendumEnum, RoutesEnum, SkeletonEnum } from '@shared/enums';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-addendum',
  templateUrl: './addendum.component.html',
  styleUrl: './addendum.component.scss'
})
export class AddendumComponent implements OnInit {
  
  ngOnInit(): void {
    
  }
  /** Services **/
  protected readonly authService = inject(AuthService);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);
  private readonly routesService = inject(RoutesService);
  
  /** Form **/
  // @Input({required: true}) id!: string;
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter(); //add
  id:string= RoutesEnum.NEW
  protected form!: FormGroup;
  private formErrors: string[] = [];
  protected Validators = Validators;
  protected addendum = "No registrar"
  
  /** Enums **/
  protected readonly AddendumEnum = AddendumEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.buildForm(), 
    this.registerAddendum()
  }
  
  save() {
    this.formOutput.emit(this.form.value); //add
  }

  buildForm() {
    this.form =this.formBuilder.group({
      isAddendum: [false, Validators.required],
      description: [null],
      isModifiedFinishDate: [null],
      document: [null],
      agreementEndedAt: [null]
    })
  }

  validateForm(): boolean {
    this.formErrors = [];

    if (this.isAddendumField.invalid) this.formErrors.push(AddendumEnum.isAddendum);
    if (this.descriptionField.invalid) this.formErrors.push(AddendumEnum.description);
    if (this.isModifiedFinishDateField.invalid) this.formErrors.push(AddendumEnum.isModifiedFinishDate);
    if (this.documentField.invalid) this.formErrors.push(AddendumEnum.document);
    if (this.agreementEndedAtField.invalid) this.formErrors.push(AddendumEnum.agreementEndedAt);

    return this.form.valid && this.formErrors.length === 0;
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.create();
      
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  create(): void {
    /*
        TODO
    */
  }

  redirectRegistration() {
    // this.messageDialogService.questionOnExit().subscribe(result => {
    //   if (result) {
    //     this.onLeave = true;
    //     this.routesService.registration();
    //   } else {
    //     this.onLeave = false;
    //   }
    // });

    // this.routesService.registration();
  }

  registerAddendum(){
    this.isAddendumField.valueChanges.subscribe(() => {
     if (this.isAddendumField.value == true){

        this.descriptionField.addValidators(Validators.required),
        this.isModifiedFinishDateField.addValidators(Validators.required),
        this.documentField.addValidators(Validators.required)

     } else{
      
        this.descriptionField.removeValidators(Validators.required),
        this.isModifiedFinishDateField.removeValidators(Validators.required),
        this.documentField.removeValidators(Validators.required),
        
        this.descriptionField.reset(),
        this.isModifiedFinishDateField.reset(),
        this.documentField.reset()
        
     }

     this.isModifiedFinishDateField.valueChanges.subscribe(()=>{

      if(this.isModifiedFinishDateField.value == true){

        this.agreementEndedAtField.addValidators(Validators.required)

      } else{

        this.agreementEndedAtField.removeValidators(Validators.required)
        this.agreementEndedAtField.reset()

      }
     })
    })
  }

  /** Getters Form**/
  get isAddendumField(): AbstractControl {
    return this.form.controls['isAddendum'];
  }
  get descriptionField(): AbstractControl {
    return this.form.controls['description'];
  }
  get isModifiedFinishDateField(): AbstractControl {
    return this.form.controls['isModifiedFinishDate'];
  }
  get documentField(): AbstractControl {
    return this.form.controls['document'];
  }
  get agreementEndedAtField(): AbstractControl {
    return this.form.controls['agreementEndedAt'];
  }
}