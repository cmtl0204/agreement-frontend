import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AgreementModel, CatalogueModel, ColumnModel, createAgreementModel, FileModel} from "@models/core";
import {PrimeIcons} from "primeng/api";
import {
  CatalogueTypeEnum,
  FileFormEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum,
  SeverityButtonActionEnum,
  TableEnum
} from "@shared/enums";
import {CataloguesHttpService, FilesHttpService} from "@servicesHttp/core";
import {AgreementsService, MessageDialogService} from "@servicesApp/core";
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

  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly messageDialogService = inject(MessageDialogService);
  protected readonly formBuilder = inject(FormBuilder);

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
  }

  validateForm() {
    this.formErrors = [];

    if (this.formInput.enablingDocuments.length < 2)
      this.formErrors.push(`Debe cargar los ${this.types.length} tipos de archivos`);

    this.formErrorsOutput.emit(this.formErrors);
  }

  validateFileForm(file:FileModel,type:CatalogueModel) {
    this.formErrors = [];

    if (this.formInput.enablingDocuments.findIndex(item => item.type?.id === type.id) > -1)
      this.formErrors.push(`${type.name} ya se encuentra cargado`);

    if (this.formInput.enablingDocuments.findIndex(item => item.name === file.name) > -1)
      this.formErrors.push(`${file.name} ya se encuentra cargado`);

    return this.formErrors.length === 0
  }

  onUpload(event: any, uploadFiles: any,type:CatalogueModel) {
    const file = event.files[0];

    if (this.validateFileForm(file,type)) {
      this.formInput.enablingDocuments.push({
        type,
        name: file.name,
        file
      });

      this.form.patchValue(this.formInput);
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
      this.form.markAllAsTouched();
    }

    uploadFiles.clear();
  }

  removeFile(index: number) {
    this.formInput.enablingDocuments.splice(index, 1);

    this.form.patchValue(this.formInput.enablingDocuments);
  }

  get typeField(): AbstractControl {
    return this.fileForm.controls['type'];
  }

  get fileField(): AbstractControl {
    return this.fileForm.controls['myFile'];
  }
}
