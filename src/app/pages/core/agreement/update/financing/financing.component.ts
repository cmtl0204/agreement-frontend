import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { AuthService, AuthHttpService } from '@servicesApp/auth';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AgreementFormEnum, FinancingsFormEnum, DocumentationFormEnum, SkeletonEnum,RoutesEnum } from '@shared/enums';
import { OnExitInterface } from '@shared/interfaces';
import { MessageService } from 'primeng/api';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';

/** interfaces para la prueba de datos **/
interface InternalInstitution {
  name: string,
}

interface ExternalInstitution {
  name: string,
}

interface FinancingOption {
  name: string;
  active: boolean;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-financing',
  templateUrl: './financing.component.html',
  styleUrl: './financing.component.scss'
})
export class FinancingComponent implements OnInit, OnExitInterface {
  /** Services **/
  protected readonly authService = inject(AuthService);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);
  private readonly routesService = inject(RoutesService);
  
  /** variables **/
  financingOptions!: FinancingOption[];
  input: number[] = [];
  uploadedFiles: any[] = [];
  protected form!: FormGroup;
  
  /** Form **/
  // @Input({ required: true }) id!: string;
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter(); //add
  id:string=RoutesEnum.NEW
  private formErrors: string[] = [];
  groupedInstitutions: any[] = [];
  
  /** Enums **/
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly FinancingsFormEnum = FinancingsFormEnum;
  protected readonly DocumentationFormEnum = DocumentationFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;

  showFinancingFields: boolean = false;

  constructor(private messageService: MessageService) {
    this.buildForm();
    this.groupInstitutions()

    this.financingOptions = [
      { name: 'Si', active: true },
      { name: 'No', active: false }
    ];

  }

  internalInstitutions: InternalInstitution[] = [
    { name: 'Ministro' },
    { name: 'Viceministro' },
  ];

  externalInstitutions: ExternalInstitution[] = [
    { name: 'Director 2' },
    { name: 'Coordinador 2' },
  ];

  
/** Boton para subir archivos **/
  onUpload(event: UploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
    // return this.messageDialogService.questionOnExit();
  }


  ngOnInit(): void {
    this.onFinancingChange();
  }

  save() {
    this.formOutput.emit(this.form.value); //add
  }
  
  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({
      isFinancing: [null, [Validators.required]],
      financings: this.formBuilder.array([])
    });
    this.addFinancing();
  }

  /** add array **/
  addFinancing() {
    const financings = this.formBuilder.group({
      modelId: [null, [Validators.required]],
      budget: [null, [Validators.required]],
      paymentMethod: [null, [Validators.required]],
      source: [null, [Validators.required]],
    });
    this.financings.push(financings);
  }

  /** delete array**/
  deleteFinancing(index: number) {
    this.financings.removeAt(index);
  }

  groupInstitutions(): void {
    forkJoin({
      internals: this.getInternalInstitutions(),
      externals: this.getExternalInstitutions(),
    }).subscribe(({ internals, externals }) => {
      this.groupedInstitutions = this.combineInstitutions(internals, externals);
    });
  }

  combineInstitutions(internals: InternalInstitution[], externals: ExternalInstitution[]): any[] {
    const combinedList: any[] = [];
    
    internals.forEach(internal => {
      combinedList.push({
        label: internal.name,
        value: internal.name,
        type: 'internal'
      });
    });

    externals.forEach(external => {
      combinedList.push({
        label: external.name,
        value: external.name,
        type: 'external'
      });
    });

    return combinedList;
  }

  private getInternalInstitutions(): Observable<InternalInstitution[]> {
    // Simular una solicitud HTTP u obtener datos de alguna fuente
    return new Observable<InternalInstitution[]>(observer => {
      observer.next(this.internalInstitutions);
      observer.complete();
    });
  }

  private getExternalInstitutions(): Observable<ExternalInstitution[]> {
    // Simular una solicitud HTTP u obtener datos de alguna fuente
    return new Observable<ExternalInstitution[]>(observer => {
      observer.next(this.externalInstitutions);
      observer.complete();
    });
  }


  validateForm(): boolean {
    this.formErrors = [];

    if (this.isFinancingField.invalid) this.formErrors.push(AgreementFormEnum.isFinancing);
    this.financings.controls.forEach((control, index) => {
      if (control.get('modelId')?.invalid) {
        this.formErrors.push(`Name at index ${index} is required.`);
      }
      if (control.get('budget')?.invalid) {
        this.formErrors.push(`Bugdet at index ${index} is required.`);
      }
      if (control.get('paymentMethod')?.invalid) {
        this.formErrors.push(`Payment Method at index ${index} is required.`);
      }
      if (control.get('source')?.invalid) {
        this.formErrors.push(`Source at index ${index} is required.`);
      }
    });

    return this.form.valid && this.formErrors.length === 0;
  }

  onSubmit(): void {
    /* if (this.validateForm()) {
      this.create();
    } else {
      this.agreementsForm.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    } */
  }

  redirectRegistration() {
    /* this.routesService.registration(); */
  }

  onFinancingChange(event?: any) {
    const financingValue = this.isFinancingField.value?.name || null;
    const financingsForm = this.form.get('financings');

    if (financingValue === 'Si') {
      this.showFinancingFields = true;
      financingsForm?.enable();
    } else {
      this.showFinancingFields = false;
      financingsForm?.disable();
    }
  }

  get financings(): FormArray {
    return this.form.get('financings') as FormArray;
  }

  get isFinancingField(): AbstractControl {
    return this.form.controls['isFinancing'];
  }
}