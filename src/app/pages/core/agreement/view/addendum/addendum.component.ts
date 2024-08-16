import { Component, inject, Input } from '@angular/core';
import {AgreementModel, ColumnModel, FileModel} from '@models/core';
import { CoreService } from '@servicesApp/core';
import {
  AddendumEnum,
  AgreementFormEnum,
  AgreementSectionFormEnum, FileFormEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum, SeverityButtonActionEnum, TableEnum
} from '@shared/enums';
import {FilesHttpService} from "@servicesHttp/core";

@Component({
  selector: 'app-addendum',
  templateUrl: './addendum.component.html',
  styleUrl: './addendum.component.scss'
})
export class AddendumComponent{
  /** Services **/
  protected readonly coreService = inject(CoreService);
  protected readonly AgreementSectionFormEnum = AgreementSectionFormEnum;
  private readonly filesHttpService = inject(FilesHttpService);

  /** Form **/
  @Input({required: true}) agreement!: AgreementModel;
  protected addendumColumns: ColumnModel[]=[];

  /** build Columns**/
  constructor() {
    this.buildAddendumColumns();
  }

  buildAddendumColumns() {
    this.addendumColumns = [
      {
        field: 'description', header: AddendumEnum.description
      },
      {
        field: 'file', header: FileFormEnum.name
      },
    ];
  }

  download(file: FileModel) {
    this.filesHttpService.downloadFile(file);
  }

  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly TableEnum = TableEnum;
}
