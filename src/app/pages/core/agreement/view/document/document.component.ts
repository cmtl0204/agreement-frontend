import {Component, Input, OnInit} from '@angular/core';
import {AgreementModel, CatalogueModel, ColumnModel, createAgreementModel} from "@models/core";
import {PrimeIcons} from "primeng/api";
import {
  AgreementFormEnum, AgreementSectionFormEnum, EnablingDocumentFormEnum,
  FileFormEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum,
  SeverityButtonActionEnum,
  TableEnum
} from "@shared/enums";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent implements OnInit {
  @Input({required: true}) agreement!: AgreementModel;

  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly FileFormEnum = FileFormEnum;
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

  download(){

  }
  protected readonly EnablingDocumentFormEnum = EnablingDocumentFormEnum;
}
