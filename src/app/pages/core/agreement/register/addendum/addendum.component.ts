import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormArray} from '@angular/forms';
import {AgreementModel, CatalogueModel, ColumnModel, createAgreementModel, FileModel} from '@models/core';
import {MessageDialogService} from '@servicesApp/core';
import {AddendumsHttpService, AgreementsHttpService, CataloguesHttpService} from '@servicesHttp/core';
import {
  AddendumEnum,
  AgreementFormEnum,
  CatalogueTypeEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum,
  SeverityButtonActionEnum,
  TableEnum
} from '@shared/enums';
import {PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-addendum',
  templateUrl: './addendum.component.html',
  styleUrl: './addendum.component.scss'
})
export class AddendumComponent implements OnInit {
  @Input({required: true}) formInput: AgreementModel = createAgreementModel();
  @Output() formOutput: EventEmitter<AgreementModel> = new EventEmitter();
  @Output() formErrorsOutput: EventEmitter<string[]> = new EventEmitter();

  protected readonly agreementsHttpService = inject(AgreementsHttpService);
  protected readonly addendumsHttpService = inject(AddendumsHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly messageDialogService = inject(MessageDialogService);
  protected readonly formBuilder = inject(FormBuilder);

  protected form!: FormGroup;
  protected addendumForm!: FormGroup;
  protected fileForm!: FormGroup;
  protected formErrors: string[] = [];
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly AddendumEnum = AddendumEnum;
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly TableEnum = TableEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;

  protected types: CatalogueModel[] = [];
  protected columns: ColumnModel[] = [];

  protected isVisibleAddendumForm: boolean = false;
  protected yesNo: any[] = []

  constructor() {
    this.buildForm();
    this.buildAddendumForm();
    this.buildFileForm();

    this.checkValuesChange();

    this.buildColumns();

    this.yesNo = [{label: 'Si', value: true}, {label: 'No', value: false}];
  }

  ngOnInit() {
    this.loadTypes();

    this.patchValueForm();
    this.validateForm();
  }

  patchValueForm() {
    this.form.patchValue(this.formInput);

    if (this.formInput.addendums.length > 0) {
      this.isAddendumField.disable();
    } else {
      this.isAddendumField.enable();
    }
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      isAddendum: [false],
      addendums: this.formBuilder.array([], Validators.required),
    });
  }

  buildAddendumForm() {
    this.addendumForm = this.formBuilder.group({
      description: [null],
      file: [null],
    })
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

    this.isAddendumField.valueChanges.subscribe(value => {
      this.formInput.isAddendum = value;

      if (value) {
        this.descriptionField.setValidators(Validators.required);
        this.fileField.setValidators(Validators.required);
      } else {
        this.descriptionField.clearValidators();
        this.fileField.clearValidators();
      }

      this.descriptionField.updateValueAndValidity();
    });
  }

  buildColumns() {
    this.columns = [
      {
        field: 'description', header: AddendumEnum.description
      },
      {
        field: 'file', header: AddendumEnum.file
      }
    ];
  }

  loadTypes() {
    this.types = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENTS_ADDENDUM_DOCUMENT);
  }

  validateForm() {
    this.formErrors = [];

    this.formErrorsOutput.emit(this.formErrors);
  }

  validateAddendumForm() {
    this.formErrors = [];

    if (this.descriptionField.invalid) this.formErrors.push(AddendumEnum.description);

    return this.formErrors.length === 0
  }

  uploadAddendumFile(event: any, uploadFiles: any) {
    this.fileField.patchValue({
      file: event.files[0],
      name: event.files[0].name,
      type: this.types[0]
    });

    uploadFiles.clear();
  }

  onUpload() {
    if (this.validateAddendumForm()) {
      const formData = new FormData();

      formData.append('file', this.fileField.value.file);
      formData.append('typeId', this.fileField.value.type.id);
      formData.append('description', this.descriptionField.value);

      this.agreementsHttpService.uploadAddendum(this.formInput.id!, formData).subscribe(response => {
        this.formInput.addendums.push({
          id: response.id,
          description: this.descriptionField.value,
          files: [{
            file: this.fileField.value.file,
            name: this.fileField.value.name,
          }],
        });

        this.form.patchValue(this.formInput);

        this.addendumForm.reset();

        this.isVisibleAddendumForm = false;
      });

      if (this.formInput.addendums.length > 0) {
        this.isAddendumField.disable();
      }
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
      this.form.markAllAsTouched();
      this.addendumForm.markAllAsTouched();
    }
  }

  showAddendumModal() {
    this.isVisibleAddendumForm = true;
  }

  deleteAddendum(id: string) {
    this.addendumsHttpService.remove(id).subscribe(response => {
      const index = this.formInput.addendums.findIndex(item => item.id === id);

      this.formInput.addendums.splice(index, 1);

      this.form.patchValue(this.formInput);

      if (this.formInput.addendums.length === 0) {
        this.isAddendumField.enable();
      }
    });
  }

  /** Getters Form**/
  get isAddendumField(): AbstractControl {
    return this.form.controls['isAddendum'];
  }

  get descriptionField(): AbstractControl {
    return this.addendumForm.controls['description'];
  }

  get fileField(): AbstractControl {
    return this.addendumForm.controls['file'];
  }
}
