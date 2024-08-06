import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PrimeIcons} from "primeng/api";
import {UpdateUserDto} from '@models/auth';
import {CatalogueModel} from '@models/core';
import {AuthHttpService, AuthService} from '@servicesApp/auth';
import {BreadcrumbService, CoreService, MessageDialogService, MessageService} from '@servicesApp/core';
import {CataloguesHttpService} from '@servicesHttp/core';
import {OnExitInterface} from '@shared/interfaces';
import {DateValidators} from '@shared/validators';
import {DateFormatPipe} from "@shared/pipes";
import {CatalogueTypeEnum, SkeletonEnum, CatalogueUsersIdentificationTypeEnum} from "@shared/enums";
import {environment} from "@env/environment";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected HOST_URL: string = environment.API_URL;
  protected dateFormat = new DateFormatPipe();
  protected bloodTypes: CatalogueModel[] = [];
  protected ethnicOrigins: CatalogueModel[] = [];
  protected genders: CatalogueModel[] = [];
  protected identificationTypes: CatalogueModel[] = [];
  protected form: FormGroup;
  protected maritalStatus: CatalogueModel[] = [];
  protected sexes: CatalogueModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private authHttpService: AuthHttpService,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageDialogService: MessageDialogService,
    public messageService: MessageService,
  ) {
    this.form = this.newForm;
    this.identificationField.valueChanges.subscribe(value => {
      if (value.code === CatalogueUsersIdentificationTypeEnum.IDENTIFICATION) {
        this.identificationField.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      } else {
        this.identificationField.clearValidators();
      }
    });
  }

  onExit(): boolean {
    if (this.form.touched && this.form.dirty) {
       this.messageDialogService.questionOnExit().subscribe() ;
    }
    return true;
  }

  ngOnInit(): void {
    this.loadBloodTypes();
    this.loadEthnicOrigins();
    this.loadGenders();
    this.loadIdentificationTypes();
    this.loadMaritalStatus();
    this.loadSexes();
    this.getProfile();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      avatar: [null],
      birthdate: [null, [DateValidators.max(new Date())]],
      bloodType: [null, []],
      ethnicOrigin: [null, []],
      gender: [null, []],
      identification: [null, [Validators.required]],
      identificationType: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      maritalStatus: [null, []],
      name: [null, [Validators.required]],
      sex: [null, []],
    });
  }

  onSubmitProfile(): void {
    if (this.birthdateField.value)
      this.birthdateField.setValue(this.dateFormat.transform(this.birthdateField.value));

    if (this.form.valid) {
      this.updateProfile(this.form.value);
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields();
    }
  }

  getProfile(): void {
    this.authHttpService.getProfile().subscribe((user) => {
        this.form.patchValue(user);
        if (this.birthdateField.value)
          this.birthdateField.setValue(new Date(this.birthdateField.value));
      }
    );
  }

  loadBloodTypes(): void {
    this.bloodTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.USERS_BLOOD_TYPE);
  }

  loadEthnicOrigins(): void {
    this.ethnicOrigins = this.cataloguesHttpService.findByType(CatalogueTypeEnum.USERS_ETHNIC_ORIGIN);
  }

  loadGenders(): void {
    this.genders = this.cataloguesHttpService.findByType(CatalogueTypeEnum.USERS_GENDER);
  }

  loadIdentificationTypes(): void {
    this.identificationTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.USERS_IDENTIFICATION_TYPE);
  }

  loadMaritalStatus(): void {
    this.maritalStatus = this.cataloguesHttpService.findByType(CatalogueTypeEnum.USERS_MARITAL_STATUS);
  }

  loadSexes(): void {
    this.sexes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.USERS_SEX);
  }

  updateProfile(user: UpdateUserDto): void {
    this.authHttpService.updateProfile(user).subscribe((user) => {
      this.getProfile();
    });
  }

  uploadAvatar(event: any, uploadFiles: any) {
    const formData = new FormData();
    formData.append('avatar', event.files[0]);
    this.authHttpService.uploadAvatar(this.authService.auth.id, formData).subscribe(response => {
      uploadFiles.clear();
      this, this.authService.avatar = response.avatar;
      this.getProfile();
    }, error => uploadFiles.clear());
  }

  get avatarField(): AbstractControl {
    return this.form.controls['avatar'];
  }

  get bloodTypeField(): AbstractControl {
    return this.form.controls['bloodType'];
  }

  get birthdateField(): AbstractControl {
    return this.form.controls['birthdate'];
  }

  get ethnicOriginField(): AbstractControl {
    return this.form.controls['ethnicOrigin'];
  }

  get genderField(): AbstractControl {
    return this.form.controls['gender'];
  }

  get identificationField(): AbstractControl {
    return this.form.controls['identification'];
  }

  get identificationTypeField(): AbstractControl {
    return this.form.controls['identificationType'];
  }

  get lastnameField(): AbstractControl {
    return this.form.controls['lastname'];
  }

  get maritalStatusField(): AbstractControl {
    return this.form.controls['maritalStatus'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get sexField(): AbstractControl {
    return this.form.controls['sex'];
  }
}
