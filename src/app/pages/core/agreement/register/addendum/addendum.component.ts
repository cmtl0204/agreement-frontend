import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
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
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  id:string= RoutesEnum.NEW
  protected form!: FormGroup;
  protected addendumForm! : FormGroup;
  private formErrors: string[] = [];
  protected Validators = Validators;
  
  /** Enums **/
  protected readonly AddendumEnum = AddendumEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.buildForm()
    this.buildAddendumForm()
  }
  
  save() {
    this.formOutput.emit(this.form.value); //add
  }

  buildForm() {
    this.form =this.formBuilder.group({
      isAddendum: [false, Validators.required],
      addendums: this.formBuilder.array([])
    })
    this.checkValueChanges()
  }

  buildAddendumForm(){
    this.addendumForm = this.formBuilder.group({
      description: [null],
      isModifiedFinishDate: [null],
      document: [null],
      agreementEndedAt: [null]
    })
  }

  addAddendum(){
    if (this.validateForm()) {
      this.addendums.controls.push(this.formBuilder.group(this.addendumForm.value))
      this.addendumForm.reset()
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  deleteAddendum(index:number){
   this.addendums.removeAt(index)
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
    // if (this.validateForm()) {
    //   this.create();
    //   this.save()
    // } else {
    //   this.form.markAllAsTouched();
    //   this.messageDialogService.fieldErrors(this.formErrors);
    // }
    this.create();
    this.save();
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

    checkValueChanges(){
    this.isAddendumField.valueChanges.subscribe((value) => {
      console.log(value)
     if (value){

        this.descriptionField.addValidators(Validators.required),
        this.isModifiedFinishDateField.addValidators(Validators.required)
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
  get addendums():FormArray {
    return this.form.controls['addendums'] as FormArray;
  }

  get descriptionField(): AbstractControl {
    return this.addendumForm.controls['description'];
  }
  get isModifiedFinishDateField(): AbstractControl {
    return this.addendumForm.controls['isModifiedFinishDate'];
  }
  get documentField(): AbstractControl {
    return this.addendumForm.controls['document'];
  }
  get agreementEndedAtField(): AbstractControl {
    return this.addendumForm.controls['agreementEndedAt'];
  }
}
