import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {AgreementModel, CatalogueModel, ColumnModel, FileModel} from "@models/core";
import {PrimeIcons} from "primeng/api";
import {
  CatalogueTypeEnum,
  ExternalInstitutionsFormEnum, FileFormEnum, IconButtonActionEnum,
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
  @Output() formOutput: EventEmitter<AgreementModel> = new EventEmitter();
  @Output() nextOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() prevOutput: EventEmitter<boolean> = new EventEmitter();
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly TableEnum = TableEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly filesHttpService = inject(FilesHttpService);
  protected readonly agreementsService = inject(AgreementsService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly messageDialogService = inject(MessageDialogService);
  protected readonly formBuilder = inject(FormBuilder);
  protected form!: FormGroup;
  protected formErrors: string[] = [];
  protected uploadedFiles: FormData = new FormData;

  files: FileModel[] = [];
  types: CatalogueModel[] = [];
  columns: ColumnModel[] = [];

  constructor() {
    this.buildFileForm();
  }

  ngOnInit() {
    this.loadTypes();
  }

  findFilesByAgreement() {

  }

  buildFileForm(): void {
    this.form = this.formBuilder.group({
      type: [null, Validators.required],
      myFile: [null, Validators.required]
    })
  }

  loadTypes() {
    this.types = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_ENABLING_DOCUMENT);
  }

  onUpload(event: any, uploadFiles: any) {
    if (this.validateForm()) {
      this.files.push({
        type: this.typeFiled.value,
        file: event.files[0]
      });
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
      this.form.markAllAsTouched();
    }

    uploadFiles.clear();
  }

  validateForm() {
    this.formErrors = [];

    if (this.typeFiled.invalid) this.formErrors.push(FileFormEnum.type);

    if (this.files.findIndex(item => item.type === this.typeFiled.value) > -1) this.formErrors.push(`${this.typeFiled.value.name} ya se encuentra cargado`);

    return this.formErrors.length === 0
  }

  validateFiles() {
    this.formErrors = [];

    if (this.files.length < 2) this.formErrors.push(`Debe cargar los ${this.types.length} tipos de archivos`);

    return this.formErrors.length === 0
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  onSubmit() {
    if (this.validateFiles()) {
      const payload = new FormData();

      for (const myFile of this.files) {
        payload.append('typeIds', myFile.type!.id!);
        payload.append('files', myFile.file);
      }

      console.log(this.agreementsService.agreement.id)
      // if (this.agreementsService.agreement.id) {
      this.filesHttpService.uploadFiles('a247c1da-6ae7-482a-8bca-5312c158f95f', payload).subscribe();
      // this.filesHttpService.uploadFiles(this.agreementsService.agreement.id, this.uploadedFiles).subscribe();
      // }
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  get typeFiled(): AbstractControl {
    return this.form.controls['type'];
  }

  get fileFiled(): AbstractControl {
    return this.form.controls['myFile'];
  }

  protected readonly ExternalInstitutionsFormEnum = ExternalInstitutionsFormEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly FileFormEnum = FileFormEnum;
  protected readonly onsubmit = onsubmit;
}
