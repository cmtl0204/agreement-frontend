import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {CatalogueModel} from '@models/core';
import {AuthService} from '@servicesApp/auth';
import {CoreService, MessageDialogService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {
  SkeletonEnum,
  RoutesEnum,
  ExternalInstitutionsObligations,
  ObligationsMintur,
  SeverityButtonActionEnum
} from '@shared/enums';
import {PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrls: ['./obligation.component.scss']
})
export class ObligationComponent implements OnInit {
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter();
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  @Input() internalInstitutions: CatalogueModel[] = [];
  @Input() externalInstitutions: CatalogueModel[] = [];
  @Input() formInput!: any;
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  protected obligationType: CatalogueModel[] = [];
  protected institutions: CatalogueModel[] = [];
  selectedObligationTypes: any[] = [];
  selectedInstitutions: any[] = [];
  description: string = '';
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
   
    private messageDialogService: MessageDialogService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadObligationTypes();
    this.loadInstitutions();
    this.patchValueForm();
  }

  buildForm() {
    this.form = this.fb.group({
      obligations: this.fb.array([])
    });
  }

  get obligationsField(): FormArray {
    return this.form.get('obligations') as FormArray;
  }

  loadObligationTypes() {
    this.obligationType = [
      {name: 'obligacion mintur'},
      {name: 'obligacion contraparte'},
      {name: 'obligacion conjunta'}
    ];
  }

  loadInstitutions() {
    this.institutions = this.internalInstitutions.concat(this.externalInstitutions);
  }

  onObligationTypesChange(selectedObligations: any[]) {
    this.selectedObligationTypes = selectedObligations;
  }

  onInstitutionsChange(selectedInstitutions: any[]) {
    this.selectedInstitutions = selectedInstitutions;
  }

  addObligation() {
    if (this.selectedInstitutions.length && this.selectedObligationTypes.length && this.description.trim()) {
      this.selectedInstitutions.forEach(institution => {
        this.selectedObligationTypes.forEach(obligationType => {
          const obligation = this.fb.group({
            institutionName: [institution.name, Validators.required],
            obligationType: [obligationType.name, Validators.required],
            description: [this.description, Validators.required]
          });
          this.obligationsField.push(obligation);
        });
      });
      this.description = '';
    } else {
      this.messageDialogService.fieldErrors(['Debe seleccionar al menos una institución y un tipo de obligación, y proporcionar una descripción.']);
    }
  }

  deleteObligation(index: number) {
    this.obligationsField.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.formOutput.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(['Debe completar todos los campos obligatorios.']);
    }
  }

  patchValueForm() {
    const {obligations} = this.formInput;
    if (obligations) {
      obligations.forEach((value: any) => {
        this.obligationsField.push(this.fb.group(value));
      });
    }
  }
}