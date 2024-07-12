import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import {AuthService, AuthHttpService} from '@servicesApp/auth';
import {CoreService, MessageDialogService, RoutesService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {
  SkeletonEnum,
  RoutesEnum,
  CatalogueTypeEnum, 
  ObligationsMintur,
  ExternalInstitutionsObligations,
  InstitutionsObligations
} from '@shared/enums';
import {OnExitInterface} from '@shared/interfaces';
import {PrimeIcons, MessageService} from 'primeng/api';
import {firstValueFrom} from 'rxjs';

interface Obligation {
  id: string;
  code: string;
  name: string;
}

@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrl: './obligation.component.scss'
})
export class ObligationComponent implements OnInit, OnExitInterface {

  selectedObligations: any[] = [];
  obligations = {
    mintur: false,
    counterpart: false,
    joint: false
  };
//Prueba MINTUR
displayAddModal: boolean = false;
displayViewModal: boolean = false;
displayAddModalCounterpart = false;
displayViewModalCounterpart = false;
newMinturObligation: string = '';
obligationMintur: string[] = [];
newCounterpartObligation = '';
selectedRowIndex = -1;

  @Input({required: true}) externalInstitutions: any[] = [];
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter();
  institutions = [];

  protected readonly authService = inject(AuthService);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);
  private readonly routesService = inject(RoutesService);

  tableForm!: FormGroup;
  multiSelectForm!: FormGroup;
  externalInstitutionsObligations!: FormArray;

  newObligation: string = '';
  newObligations: string[] = [];
  obligationCounterpart: { [key: number]: string[] } = {};
  selectedCounterpartObligations: string[] = [];

  // @Input({required: true}) id!: string;
  id: string = RoutesEnum.NEW
  protected form!: FormGroup;
  private formErrors: string[] = [];
//importacion enums

  protected readonly ObligationsMintur = ObligationsMintur;
  protected ExternalInstitutionsObligations = ExternalInstitutionsObligations;
  protected readonly InstitutionsObligations = InstitutionsObligations;

  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;

  //constructor
  constructor(private messageService: MessageService) {
    
    }

  ngOnInit(): void {
  
    if (!this.form) {
      this.buildForm();
    }
  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
    // return this.messageDialogService.questionOnExit();
    
  }
  
//formulario
  buildForm() {
    this.form = this.formBuilder.group({
      [ObligationsMintur.minturObligations]: this.formBuilder.array([]),
    });
  
    this.tableForm = this.formBuilder.group({
      [ExternalInstitutionsObligations.institutionsName]: this.formBuilder.array([
        this.createElementGroup('Entidad 1', 'Institución 1'),
        this.createElementGroup('Entidad 2', 'Institución 2'),
        this.createElementGroup('Entidad 3', 'Institución 3'),
      ]),
    });
  
    this.externalInstitutionsObligations = this.tableForm.get(ExternalInstitutionsObligations.institutionsName) as FormArray;

    console.log('Form initialized:', this.tableForm.value);
  
    this.multiSelectForm = this.formBuilder.group({
      [InstitutionsObligations.institutionName]: this.formBuilder.array([
        this.createMultiSelectElementGroup('Entidad 1', 'Institución 1'),
        this.createMultiSelectElementGroup('Entidad 2', 'Institución 2'),
        this.createMultiSelectElementGroup('Entidad 3', 'Institución 3'),
      ]),
    });
    const control = this.tableForm.get(ExternalInstitutionsObligations.institutionsName);
    if (!control) {
      console.error(`Control ${ExternalInstitutionsObligations.institutionsName} not found in tableForm`);
    } else {
      this.externalInstitutionsObligations = control as FormArray;
    }
    // Array nuevas Obligaciones
    this.newObligations = new Array(this.externalInstitutionsObligations.length).fill('');
  }

  //get de las obligaciones Mintur
  
  
  //get de las obligaciones externas 
  get externalInstitutionsObligation(): FormArray {
    return this.tableForm.get(ExternalInstitutionsObligations.institutionsName) as FormArray;
  }
  
  //get de instituciones seleccionadas
  get institutionsObligations(): FormArray {
    return this.multiSelectForm.get(InstitutionsObligations.institutionName) as FormArray;
  }

  // formulario obligaciones contraparte 
  createElementGroup(name: string, institution: string): FormGroup {
    return this.formBuilder.group({
      [ExternalInstitutionsObligations.institutionsName]: [name, Validators.required],
      [ExternalInstitutionsObligations.positionName]: [institution, Validators.required],
      [ExternalInstitutionsObligations.obligations]: this.formBuilder.array([], Validators.required)
    });
  }


  //formulario obligaciones conjuntas
  createMultiSelectElementGroup(name: string, institution: string): FormGroup {
    return this.formBuilder.group({
      selected: [false],
      [InstitutionsObligations.institutionName]: [name, Validators.required],
      [InstitutionsObligations.positionsNames]: [institution, Validators.required],
      [InstitutionsObligations.institutionObligations]: this.formBuilder.array([], Validators.required) as FormArray,
    });
  }
  
  //agrega obligaciones alas filas de instituciones
  addObligationToElement(rowIndex: number, obligation: string) {
    if (obligation && obligation.trim() !== '') {
      const control = this.getControls(rowIndex, ExternalInstitutionsObligations.obligations);
      control.push(this.formBuilder.control(obligation.trim()));
      this.newObligations[rowIndex] = '';
    }
  }
  
  //agrega obligaciones a las instituciones seleccionadas
  addObligationToSelected() {
    if (this.newObligation.trim() !== '') {
      this.institutionsObligations.controls.forEach(group => {
        if (group.get('selected')?.value) {
          const obligations = group.get(InstitutionsObligations.institutionObligations) as FormArray;
          obligations.push(this.formBuilder.control(this.newObligation.trim()));
        }
      });
      this.newObligation = ''; // Clear the input field
    }
  }
  
  //control de eexternalObligations
 
  getControls(rowIndex: number, controlName: string): FormArray<FormControl> {
    const group = this.externalInstitutionsObligations.at(rowIndex) as FormGroup;
    if (!group) {
      console.error(`No FormGroup found at rowIndex: ${rowIndex}`);
      return new FormArray<FormControl>([]);  // Return an empty FormArray
    }
  
    const control = group.get(controlName);
    if (!control) {
      console.error(`No control found with controlName: ${controlName} at rowIndex: ${rowIndex}`);
      return new FormArray<FormControl>([]);  // Return an empty FormArray
    }
  
    console.log(`getControls rowIndex: ${rowIndex}, controlName: ${controlName}, control: ${control}`);
    return control as FormArray<FormControl>;  // Cast to FormArray<FormControl>
  }
  

  //control instituciones seleccionadas
  getMultiSelectControls(rowIndex: number, controlName: string): FormArray {
    const control = this.institutionsObligations.at(rowIndex).get(controlName);
    console.log(`getMultiSelectControls rowIndex: ${rowIndex}, controlName: ${controlName}, control: ${control}`);
    return control as FormArray;
  }
  
  //eliminacion de obligaciones de externalinstitutions obligations
  removeObligationFromElement(rowIndex: number, obligationIndex: number) {
    const control = this.getControls(rowIndex, ExternalInstitutionsObligations.obligations);
    control.removeAt(obligationIndex);
  }
  
  //eliminacion obligaciones de las instituciones seleccionadas
  removeObligationFromMultiSelectElement(rowIndex: number, obligationIndex: number) {
    const control = this.getMultiSelectControls(rowIndex, InstitutionsObligations.institutionObligations);
    control.removeAt(obligationIndex);
  }

 //MINTUR PRUEBA
 openAddModal() {
  this.displayAddModal = true;
}

closeAddModal() {
  this.displayAddModal = false;
  this.newMinturObligation = '';
}

addObligation() {
  if (this.newMinturObligation.trim() !== '') {
    this.obligationMintur.push(this.newMinturObligation.trim());
    this.newMinturObligation = '';
    this.closeAddModal();
  }
}

openViewModal() {
  this.displayViewModal = true;
}

closeViewModal() {
  this.displayViewModal = false;
}

removeObligation(index: number) {
  this.obligationMintur.splice(index, 1);
}
//modal contraparte

openAddModalCounterpart(rowIndex: number) {
  this.selectedRowIndex = rowIndex;
  this.displayAddModalCounterpart = true;
}

closeAddModalCounterpart() {
  this.displayAddModalCounterpart = false;
  this.newCounterpartObligation = '';
}

addCounterpartObligation() {
  if (this.newCounterpartObligation.trim() !== '') {
    if (!this.obligationCounterpart[this.selectedRowIndex]) {
      this.obligationCounterpart[this.selectedRowIndex] = [];
    }
    this.obligationCounterpart[this.selectedRowIndex].push(this.newCounterpartObligation.trim());
    this.newCounterpartObligation = '';
    this.closeAddModalCounterpart();
  }
}

openViewModalCounterpart(rowIndex: number) {
  this.selectedRowIndex = rowIndex;
  this.selectedCounterpartObligations = this.obligationCounterpart[rowIndex] || [];
  this.displayViewModalCounterpart = true;
}

closeViewModalCounterpart() {
  this.displayViewModalCounterpart = false;
}

removeCounterpartObligation(index: number) {
  if (this.selectedRowIndex > -1 && this.obligationCounterpart[this.selectedRowIndex]) {
    this.obligationCounterpart[this.selectedRowIndex].splice(index, 1);
    this.selectedCounterpartObligations = this.obligationCounterpart[this.selectedRowIndex];
  }
}

  hasSelectedElements(): boolean {
    return this.institutionsObligations.controls.some(group => group.get('selected')?.value);
  }
  
  //funcion del multiselect para que aparezcan en pantalla lo seleccionado
  updateSelectedObligations() {
    const selected: Obligation[] = this.selectedObligations;
    this.obligations.mintur = selected.some(obligation => obligation.id === '1');
    this.obligations.counterpart = selected.some(obligation => obligation.id === '2');
    this.obligations.joint = selected.some(obligation => obligation.id === '3');
  }

  

  onSubmit(): void {
    /* if (this.validateForm()) {
      this.create();
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    } */
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

    this.routesService.registration();
  }
}

