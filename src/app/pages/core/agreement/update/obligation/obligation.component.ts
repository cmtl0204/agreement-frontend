import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService, AuthHttpService } from '@servicesApp/auth';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { SkeletonEnum, RoutesEnum, CatalogueTypeEnum } from '@shared/enums';
import { OnExitInterface } from '@shared/interfaces';
import { PrimeIcons, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrl: './obligation.component.scss'
})
export class ObligationComponent implements OnInit, OnExitInterface {

  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter(); 

  protected readonly authService = inject(AuthService);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);
  private readonly routesService = inject(RoutesService);

  tableForm: FormGroup;
  multiSelectForm: FormGroup;
  newMinturObligation: string = '';
  newObligation: string = '';
  newObligations: string[] = [];

  // @Input({required: true}) id!: string;
  id:string = ''
  protected form!: FormGroup;
  private formErrors: string[] = [];

  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor(private messageService: MessageService) {
    this.form = this.formBuilder.group({
      textAreas: this.formBuilder.array([], Validators.required)
    });

    this.tableForm = this.formBuilder.group({
      elements: this.formBuilder.array([
        this.createElementGroup('Entidad 1', 'Institución 1'),
        this.createElementGroup('Entidad 2', 'Institución 2'),
        this.createElementGroup('Entidad 3', 'Institución 3')
      ])
    });

    this.multiSelectForm = this.formBuilder.group({
      elements: this.formBuilder.array([
        this.createMultiSelectElementGroup('Entidad 1', 'Institución 1'),
        this.createMultiSelectElementGroup('Entidad 2', 'Institución 2'),
        this.createMultiSelectElementGroup('Entidad 3', 'Institución 3')
      ])
    });

    this.newObligations = Array(this.elements.length).fill('');
  }
  
  save() {
    this.formOutput.emit(this.form.value); //add
  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
    // return this.messageDialogService.questionOnExit();
  }

  ngOnInit(): void {
    /** Load Foreign Keys**/
    this.loadPersonTypes();
    //pending
    if (this.id !== RoutesEnum.NEW) {
      this.findCompany(this.id);
    }
  }

  findCompany(id: string) {
    /*
    TODO
    */
    this.form.patchValue({});
  }

  get textAreas() {
    return this.form.get('textAreas') as FormArray;
  }

  get elements() {
    return this.tableForm.get('elements') as FormArray;
  }

  get multiSelectElements(): FormArray {
    return this.multiSelectForm.get('elements') as FormArray;
  }

  createElementGroup(name: string, institution: string): FormGroup {
    return this.formBuilder.group({
      name: [name],
      institution: [institution],
      obligations: this.formBuilder.array([], Validators.required)
    });
  }

  createMultiSelectElementGroup(name: string, institution: string): FormGroup {
    return this.formBuilder.group({
      selected: [false],
      name: [name],
      institution: [institution],
      obligations: this.formBuilder.array([], Validators.required)
    });
  }

  addTextArea() {
    if (this.newMinturObligation.trim() !== '') {
      this.textAreas.push(this.formBuilder.control(this.newMinturObligation, Validators.required));
      this.newMinturObligation = '';
    }
  }

  removeTextArea(index: number) {
    this.textAreas.removeAt(index);
  }

  addObligationToElement(elementIndex: number, obligation: string) {
    if (obligation.trim() !== '') {
      const element = this.elements.at(elementIndex) as FormGroup;
      const obligations = element.get('obligations') as FormArray;
      obligations.push(this.formBuilder.control(obligation, Validators.required));
      this.newObligations[elementIndex] = '';
    }
  }

  removeObligationFromElement(elementIndex: number, obligationIndex: number) {
    const element = this.elements.at(elementIndex) as FormGroup;
    const obligations = element.get('obligations') as FormArray;
    obligations.removeAt(obligationIndex);
  }

  addObligationToSelected() {
    if (this.newObligation.trim() !== '') {
      this.multiSelectElements.controls.forEach((element, index) => {
        if ((element as FormGroup).get('selected')?.value) {
          this.addObligationToMultiSelectElement(index, this.newObligation);
        }
      });
      this.newObligation = '';
    }
  }

  removeObligationFromMultiSelectElement(elementIndex: number, obligationIndex: number) {
    const element = this.multiSelectElements.at(elementIndex) as FormGroup;
    const obligations = element.get('obligations') as FormArray;
    obligations.removeAt(obligationIndex);
  }

  addObligationToMultiSelectElement(elementIndex: number, obligation: string) {
    const element = this.multiSelectElements.at(elementIndex) as FormGroup;
    const obligations = element.get('obligations') as FormArray;
    obligations.push(this.formBuilder.control(obligation, Validators.required));
  }

  saveMinturObligations() {
    if (this.form.valid) {
      console.log('Obligaciones MINTUR:', this.form.value.textAreas);
    }
  }

  saveCounterpartObligations() {
    if (this.tableForm.valid) {
      const counterpartObligations = this.elements.controls.map(element => ({
        name: element.get('name')?.value,
        institution: element.get('institution')?.value,
        obligations: element.get('obligations')?.value
      }));
      console.log('Obligaciones Contraparte:', counterpartObligations);
    }
  }

  saveJointObligations() {
    if (this.multiSelectForm.valid) {
      const jointObligations = this.multiSelectElements.controls.map(element => ({
        name: element.get('name')?.value,
        institution: element.get('institution')?.value,
        obligations: element.get('obligations')?.value
      }));
      console.log('Obligaciones conjuntas:', jointObligations);
    }
  }

  hasSelectedElements(): boolean {
    return this.multiSelectElements.controls.some(element => (element as FormGroup).get('selected')?.value === true);
  }

  getControls(elementIndex: number, columnName: string) {
    const element = this.elements.at(elementIndex) as FormGroup;
    return (element.get(columnName) as FormArray).controls;
  }

  getMultiSelectControls(elementIndex: number, columnName: string) {
    const element = this.multiSelectElements.at(elementIndex) as FormGroup;
    return (element.get(columnName) as FormArray).controls;
  }

  loadPersonTypes() {
    this.cataloguesHttpService.findByType(CatalogueTypeEnum.COMPANIES_PERSON_TYPE);
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
