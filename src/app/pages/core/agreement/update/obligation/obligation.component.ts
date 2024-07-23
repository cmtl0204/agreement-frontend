import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, Form, FormControl } from '@angular/forms';
import { CatalogueModel, ObligationModel } from '@models/core';
import { AuthService, AuthHttpService } from '@servicesApp/auth';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { SkeletonEnum, RoutesEnum, ExternalInstitutionsObligations, ObligationsMintur, SeverityButtonActionEnum } from '@shared/enums';
import { PrimeIcons, MessageService } from 'primeng/api';

@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrl: './obligation.component.scss'
})
export class ObligationComponent implements OnInit {

  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter();
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  institutions = [];
  @Input({ required: true }) formInput!: any;

  protected obligationType: CatalogueModel[] = [];
  protected obligationMintur: CatalogueModel[] = [];
  protected readonly authService = inject(AuthService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);

  displayModal: boolean = false;
  displayObligationsModal: boolean = false;
  showObligationsTable: boolean = false;
  selectedObligationTypes: any[] = [];
  selectedInstitution: any = null;
  filteredObligations: any[] = [];

  id: string = RoutesEnum.NEW
  protected obligationForm!: FormGroup;
  protected form!: FormGroup;
  protected formMintur!: FormGroup;
  private formErrors: string[] = [];
  @Input() internalInstitutions: CatalogueModel[] = [];
  @Input() externalInstitutions: CatalogueModel[] = [];
  protected obligationInstitutions: CatalogueModel[] = [];
  protected readonly ObligationsMintur = ObligationsMintur;
  protected readonly ExternalInstitutionsObligations = ExternalInstitutionsObligations;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor(private messageService: MessageService) {
    this.buildForm();
    this.buildObligationForm();
  }

  ngOnInit(): void {
    /* Load Foreign Keys*/
    this.loadObligationTypes();
    this.loadMintur();
    this.patchValueForm();
    this.loadObligationInstitutions();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      obligationTypes: this.formBuilder.array([]),
      obligations: this.formBuilder.array([])
    });
  }

  buildObligationForm() {
    this.obligationForm = this.formBuilder.group({
      model: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  addObligation(): void {
    if (this.obligationForm.invalid) {
      return; // Si el formulario es inválido, no agregues la obligación
    }
    this.obligations.push(this.createObligation(this.obligationForm.value.model, this.obligationForm.value.description));
    this.obligationForm.reset();
    this.closeModal();
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
    if (this.obligationForm.invalid) {
      return;
    }
    this.obligations.push(this.createObligation(this.obligationForm.value.model, this.obligationForm.value.description));
    this.closeModal();
  }

  /* Load Foreign Keys  */
  loadExternalInstitutions() {
    /* this.externalInstitutions = this.cataloguesHttpService.findByType(CatalogueTypeEnum.OBLIGATIONS_MODEL); */
   
  }

  loadObligationTypes() {
    this.obligationType = [
      { name: 'obligacion mintur' },
      { name: 'obligacion contraparte' },
      { name: 'obligacion conjunta' }
    ]
  }

  loadMintur() {
    this.obligationMintur = [
      { name: 'Mintur' }
    ]
  }

  loadObligationInstitutions() {
    this.obligationInstitutions = this.internalInstitutions.concat(this.externalInstitutions);
  }

  save() {
    this.formOutput.emit(this.form.value);
    console.log(this.form.value)
  }

  patchValueForm() {
    const { obligations } = this.formInput;
    if (obligations) {
      obligations.forEach((value: ObligationModel) => {
        this.obligations.push(this.formBuilder.group(value))
      });
    }
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.save();
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  addMinturObligation(model: any, description: string): void {
    if (description.trim() === '') {
      return;
    }
    this.obligations.push(this.createObligation(model.name, description));
  }

  createObligation(model: string, description: string): FormGroup {
    return this.formBuilder.group({
      model: [model, Validators.required],
      description: [description, Validators.required],
    });
  }

  onObligationTypesChange(selectedObligations: any[]) {
    const obligationTypesArray = this.form.get('obligationTypes') as FormArray;
    obligationTypesArray.clear();
    selectedObligations.forEach(obligation => {
      obligationTypesArray.push(new FormControl(obligation));
    });
  }

  addObligationForInstitution(institution: CatalogueModel, description: string, save: boolean = true) {
    const obligationsArray = this.form.get('obligations') as FormArray;
    const newObligation = this.formBuilder.group({
      model: [institution.name, Validators.required],
      description: [description, Validators.required]
    });
    obligationsArray.push(newObligation);
  }

  get obligations(): FormArray {
    return this.form.get('obligations') as FormArray;
  }

  get type(): FormArray {
    return this.form.get('type') as FormArray;
  }

  get modelField(): AbstractControl {
    return this.obligationForm.controls['model'];
  }

  get descriptionField(): AbstractControl {
    return this.obligationForm.controls['description'];
  }
}