import { Component, OnInit, Output, EventEmitter, inject } from "@angular/core";
import { CatalogueModel } from "@models/core";
import { AuthService, AuthHttpService } from "@servicesApp/auth";
import { CoreService, MessageDialogService, RoutesService, MessageService } from "@servicesApp/core";
import { CataloguesHttpService } from "@servicesHttp/core";
import { RoutesEnum, ObligationsMintur, ExternalInstitutionsObligations, SkeletonEnum } from "@shared/enums";
import { OnExitInterface } from "@shared/interfaces";
import { firstValueFrom } from "rxjs/dist/types";


interface Obligations {
  mintur: boolean;
  counterpart: boolean;
  joint: boolean;
}
@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrl: './obligation.component.scss'
})
export class ObligationComponent implements OnInit, OnExitInterface {
  //  @Input({required: true}) externalInstitutions: any[] = [];
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter();
  institutions = [];

  protected obligationType: CatalogueModel[]=[];
  protected externalInstitutions: CatalogueModel[] = [];
  protected obligationMintur: CatalogueModel[]=[];
  protected readonly authService = inject(AuthService);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);
  private readonly routesService = inject(RoutesService);

   
 
  displayModal: boolean = false;
  showObligationsTable: boolean = false;
  selectedObligationTypes: any[]=[];


  // @Input({required: true}) id!: string;

  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter()
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter()

  id: string = RoutesEnum.NEW
  protected obligationForm!: FormGroup;
  protected form!: FormGroup;
  protected formMintur!: FormGroup; 
  private formErrors: string[] = [];

  protected readonly ObligationsMintur = ObligationsMintur;
  protected readonly ExternalInstitutionsObligations = ExternalInstitutionsObligations;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor(private messageService: MessageService) {
    this.buildForm();
    this.buildObligationForm();
  }

  ngOnInit(): void {
    /** Load Foreign Keys**/
    this.loadExternalInstitutions();
    this.loadObligationTypes();
    this.loadMintur();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      obligations: this.formBuilder.array([])
    }); 
  }

  buildObligationForm() {
    this.obligationForm = this.formBuilder.group({
      model: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  addObligation() {
    const obligations = this.formBuilder.group({
      model: [this.obligationForm.value.model, [Validators.required]],
      description: [this.obligationForm.value.description, [Validators.required]]
    })
    this.obligations.push(obligations);
    this.obligationForm.reset();
  }

  deleteObligation(index: number) {
    this.obligations.removeAt(index);
  }

  validateForm(): boolean {
    this.formErrors = [];

    if (this.modelField.invalid) this.formErrors.push(ExternalInstitutionsObligations.positionName);
    if (this.descriptionField.invalid) this.formErrors.push(ExternalInstitutionsObligations.obligations);
    return this.form.valid && this.formErrors.length === 0;
  }

  openModal(institutionName: string) {
    this.obligationForm.reset();
    this.obligationForm.patchValue({ model: institutionName });
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }

  addObligationAndCloseModal() {
    if (this.obligationForm.valid) {
      this.obligations.push(this.formBuilder.group(this.obligationForm.value));
      this.closeModal();
    }
  }

  toggleObligationsTable() {
    this.showObligationsTable = !this.showObligationsTable;
  }
  
  /* Load Foreign Keys  */
  loadExternalInstitutions() {
    /* this.externalInstitutions = this.cataloguesHttpService.findByType(CatalogueTypeEnum.OBLIGATIONS_MODEL); */
    this.externalInstitutions = [
      { name: 'Ministro' },
      { name: 'Viceministro' },
      { name: 'Presidente' }
    ]
  }

  loadObligationTypes(){
    this.obligationType=[
      {name: 'obligacion mintur'},
      {name: 'obligacion contraparte'},
      {name:'obligacion conjunta'}
    ]
  }

  loadMintur(){
this.obligationMintur=[
  {name: 'Mintur'}
]
  }

  save() {
    this.formOutput.emit(this.form.value);
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.save();
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
  }

  get obligations(): FormArray {
    return this.form.get('obligations') as FormArray;
  }

  get modelField(): AbstractControl {
    return this.obligationForm.controls['model'];
  }

  get descriptionField(): AbstractControl {
    return this.obligationForm.controls['description'];
  }

  get textAreas(): FormArray {
    return this.form.get('textAreas') as FormArray;
  }
}
