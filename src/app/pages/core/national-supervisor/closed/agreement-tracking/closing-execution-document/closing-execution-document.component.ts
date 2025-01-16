import {Component, inject, Input, OnInit} from '@angular/core';
import {
  AdditionalDocumentEnum,
  FileEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum, ReportExecutionEnum,
  SeverityButtonActionEnum,
  TableEnum
} from "@shared/enums";
import {PrimeIcons} from "primeng/api";
import {ColumnModel, FileModel} from "@models/core";
import {AgreementsHttpService, FilesHttpService} from "@servicesHttp/core";
import {CoreService, MessageDialogService} from "@servicesApp/core";
import {forkJoin} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-closing-execution-document',
  templateUrl: './closing-execution-document.component.html',
  styleUrl: './closing-execution-document.component.scss'
})
export class ClosingExecutionDocumentComponent implements OnInit {
  @Input() agreementId!: string;
  protected readonly coreService = inject(CoreService);
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly messageDialogService = inject(MessageDialogService);
  private readonly agreementsHttpService: AgreementsHttpService = inject(AgreementsHttpService);
  private readonly filesHttpService: FilesHttpService = inject(FilesHttpService);
  protected reportExecutions: FileModel[] = [];
  protected columns: ColumnModel[] = [];
  protected isVisibleFilesModal: boolean = false;
  protected form!: FormGroup;
  protected formErrors: string[] = [];

  ngOnInit(): void {
    this.buildForm();
    this.buildColumns();
    this.findReportExecutions();
  }

  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly TableEnum = TableEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;

  buildForm() {
    this.form = this.formBuilder.group({
      reportFile: [null],
      description: [null, Validators.required],
    })
  }

  buildColumns() {
    this.columns = [
      {field: 'type', header: ReportExecutionEnum.type},
      {field: 'description', header: ReportExecutionEnum.description},
      {field: 'registeredAt', header: ReportExecutionEnum.registeredAt},
      {field: 'user', header: ReportExecutionEnum.user},
    ];
  }

  findReportExecutions() {
    this.agreementsHttpService.findReportExecutions(this.agreementId).subscribe(
      response => {
        this.reportExecutions = response;
      }
    );
  }

  openFilesModal() {
    this.isVisibleFilesModal = true;
  }

  closeModal() {
    this.isVisibleFilesModal = false;
    // this.reportFileField.setValue(null);
    // this.evidenceFileField.setValue(null);
  }

  onSubmit() {
    if (this.reportFileField.valid) {
      const formData = new FormData();

      formData.append('report', this.reportFileField.value);
      formData.append('description', this.descriptionField.value);

      this.agreementsHttpService.createReportExecution(this.agreementId, formData).subscribe(response => {
        this.findReportExecutions();
        this.isVisibleFilesModal = false;
      });
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  uploadReportFile(event: any, uploadFiles: any) {
    this.reportFileField.patchValue(event.files[0]);

    uploadFiles.clear();
  }

  deleteFile(id: string, index: number) {
    this.filesHttpService.remove(id).subscribe(()=>{
      this.reportExecutions.splice(index, 1);
    });
  }


  get reportFileField(): AbstractControl {
    return this.form.controls['reportFile'];
  }

  get descriptionField(): AbstractControl {
    return this.form.controls['description'];
  }

  protected readonly FileEnum = FileEnum;
  protected readonly ReportExecutionEnum = ReportExecutionEnum;
}
