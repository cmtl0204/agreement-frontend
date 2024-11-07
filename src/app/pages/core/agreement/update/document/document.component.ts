import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AgreementModel, CatalogueModel, ColumnModel, createAgreementModel, FileModel} from "@models/core";
import {ConfirmationService, PrimeIcons} from "primeng/api";
import {
  CatalogueTypeEnum,
  FileFormEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum,
  SeverityButtonActionEnum,
  TableEnum
} from "@shared/enums";
import {AgreementsHttpService, CataloguesHttpService, FilesHttpService} from "@servicesHttp/core";
import {MessageDialogService} from "@servicesApp/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent implements OnInit {
  @Input({required: true}) formInput: AgreementModel = createAgreementModel();
  @Output() formOutput: EventEmitter<AgreementModel> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter();

  private readonly cataloguesHttpService = inject(CataloguesHttpService);
  private readonly messageDialogService = inject(MessageDialogService);
  private readonly filesHttpService = inject(FilesHttpService);
  private readonly agreementsHttpService = inject(AgreementsHttpService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly formBuilder = inject(FormBuilder);

  protected form!: FormGroup;
  protected fileForm!: FormGroup;
  protected formErrors: string[] = [];
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly FileFormEnum = FileFormEnum;
  protected readonly TableEnum = TableEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;

  protected types: CatalogueModel[] = [];
  protected typesClone: CatalogueModel[] = [];
  protected columns: ColumnModel[] = [];

  constructor() {
    this.buildForm();
    this.buildFileForm();
    this.buildColumns();
  }

  ngOnInit() {
    this.loadTypes();

    this.patchValueForm();
    this.validateForm();
  }

  patchValueForm() {
    this.form.patchValue(this.formInput);
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      files: this.formBuilder.array([], Validators.required),
    });

    this.checkValuesChange();
  }

  buildFileForm(): void {
    this.fileForm = this.formBuilder.group({
      type: [null, Validators.required],
      myFile: [null, Validators.required]
    });

    this.checkValuesChange();
  }

  checkValuesChange() {
    this.form.valueChanges.subscribe(value => {
      this.formOutput.emit(this.formInput);

      this.validateForm();
    });
  }

  buildColumns() {
    this.columns = [
      {
        field: 'type', header: FileFormEnum.type
      },
      {
        field: 'name', header: FileFormEnum.name
      }
    ];
  }

  loadTypes() {
    this.types = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_ENABLING_DOCUMENT);
    this.typesClone = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_ENABLING_DOCUMENT);
    for (let i = 0; i < this.formInput.enablingDocuments.length; i++) {
      const index = this.types.findIndex(item => item.id === this.formInput.enablingDocuments[i].type?.id);
      this.types.splice(index, 1);
    }
  }

  validateForm() {
    this.formErrors = [];

    if (this.formInput.enablingDocuments.length < 2)
      this.formErrors.push(`Debe cargar los ${this.types.length} tipos de archivos`);

    this.formErrorsOutput.emit(this.formErrors);
  }

  validateFileForm(file: FileModel, type: CatalogueModel) {
    this.formErrors = [];

    if (this.formInput.enablingDocuments.findIndex(item => item.type?.id === type.id) > -1)
      this.formErrors.push(`${type.name} ya se encuentra cargado`);

    if (this.formInput.enablingDocuments.findIndex(item => item.name === file.name) > -1)
      this.formErrors.push(`El archivo ${file.name} ya se encuentra cargado`);

    return this.formErrors.length === 0
  }

  uploadFile(event: any, uploadFiles: any, type: CatalogueModel) {
    const file = event.files[0];

    if (this.validateFileForm(file, type)) {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('typeId', type.id!);

      this.agreementsHttpService.uploadEnablingDocument(this.formInput.id!, formData, true).subscribe(response => {
        this.formInput.enablingDocuments.push({
          id: response.id,
          name: file.name,
          type,
        });

        const index = this.types.findIndex(item => item.id === type.id);
        this.types.splice(index, 1);

        this.form.patchValue(this.formInput);
      });
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
      this.form.markAllAsTouched();
    }

    uploadFiles.clear();
  }

  removeFile(index: number, item: FileModel) {

    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: '¿Está seguro de eliminar de manera definitiva el archivo?',
      header: '',
      icon: PrimeIcons.TRASH,
      acceptLabel: "Si",
      rejectLabel: "No",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.filesHttpService.remove(item.id!, true,this.formInput.id!).subscribe(response => {
          this.formInput.enablingDocuments.splice(index, 1);
          this.types.push(item.type!);

          this.form.patchValue(this.formInput.enablingDocuments);
        });
      }
    });
  }

  download(file: FileModel) {
    this.filesHttpService.downloadFile(file);
  }

  get typeField(): AbstractControl {
    return this.fileForm.controls['type'];
  }

  get fileField(): AbstractControl {
    return this.fileForm.controls['myFile'];
  }
}
