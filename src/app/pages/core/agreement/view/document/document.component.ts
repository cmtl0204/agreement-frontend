import {Component, inject, Input, OnInit} from '@angular/core';
import {AgreementModel, CatalogueModel, ColumnModel, createAgreementModel, FileModel} from "@models/core";
import {PrimeIcons} from "primeng/api";
import {
  AgreementFormEnum, AgreementSectionFormEnum, EnablingDocumentFormEnum,
  FileFormEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum,
  SeverityButtonActionEnum,
  TableEnum
} from "@shared/enums";
import {CoreService} from "@servicesApp/core";
import {FilesHttpService} from "@servicesHttp/core";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent implements OnInit {
  @Input({required: true}) agreement!: AgreementModel;
  private readonly filesHttpService = inject(FilesHttpService);
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly TableEnum = TableEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly AgreementSectionFormEnum = AgreementSectionFormEnum;

  protected types: CatalogueModel[] = [];
  protected columns: ColumnModel[] = [];

  constructor() {
    this.buildColumns();
  }

  ngOnInit() {

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

  download(file: FileModel) {
    this.filesHttpService.downloadFile(file);
  }
}
