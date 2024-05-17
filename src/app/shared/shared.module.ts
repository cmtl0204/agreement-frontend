import {NgModule,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolesPermissionsDirective} from '@shared/directives/roles-permissions.directive';
import {ErrorMessageDirective} from '@shared/directives/error-message.directive';
import {TokenDirective} from '@shared/directives/token.directive';
import {SkeletonModule} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {LabelDirective} from './directives/label.directive';
import {ProgressBarModule} from "primeng/progressbar";
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';
import {SkeletonComponent} from '@shared/components/skeleton/skeleton.component';
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {TooltipModule} from "primeng/tooltip";
import {FileUploadModule} from "primeng/fileupload";
import {MessageModule} from "primeng/message";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ReactiveFormsModule} from "@angular/forms";
import {SearchComponent} from './components/search/search.component';
import {
  ActivePipe,
  DateFormatPipe,
  EnabledPipe,
  EnabledSeverityPipe,
  ExtensionsPipe,
  RequiredPipe, RequiredSeverityPipe,
  RolePipe,
  SelecetedPipe,
  StatePipe, YesNoPipe
} from '@shared/pipes';
import {UserStatePipe} from "@shared/pipes/auth/userState.pipe";
import {LocationComponent} from './components/location/location.component';
import {TagModule} from "primeng/tag";
import {FileListComponent} from './components/file-list/file-list.component';
import {FileUploadComponent} from './components/file-upload/file-upload.component';
import {PanelMenuModule} from "primeng/panelmenu";
import {SidebarModule} from "primeng/sidebar";
import {SpeedDialModule} from "primeng/speeddial";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService} from "primeng/api";
import {SizesPipe} from "@shared/pipes/common/sizes.pipe";
import {ImageUploadComponent} from "@shared/components/image-upload/image-upload.component";
import {HeaderFormComponent} from './components/header-form/header-form.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {HelpFieldComponent} from './components/help-field/help-field.component';
import {ErrorsFieldComponent} from './components/errors-field/errors-field.component';
import {PanelModule} from "primeng/panel";
import {VisibleComponent} from './components/visible/visible.component';
import {DialogModule} from "primeng/dialog";
import {ButtonActionComponent} from './components/button-action/button-action.component';
import {MapComponent} from './components/map/map.component';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [
    SkeletonComponent,
    ProgressBarComponent,
    SearchComponent,
    ErrorMessageDirective,
    LabelDirective,
    RolesPermissionsDirective,
    TokenDirective,
    ExtensionsPipe,
    DateFormatPipe,
    RolePipe,
    ActivePipe,
    UserStatePipe,
    SizesPipe,
    LocationComponent,
    FileListComponent,
    FileUploadComponent,
    ImageUploadComponent,
    HeaderFormComponent,
    StatePipe,
    HelpFieldComponent,
    ErrorsFieldComponent,
    SelecetedPipe,
    VisibleComponent,
    ButtonActionComponent,
    MapComponent,
    RequiredPipe,
    RequiredSeverityPipe,
    EnabledPipe,
    EnabledSeverityPipe,
    YesNoPipe,
  ],
  exports: [
    SkeletonComponent,
    ProgressBarComponent,
    SearchComponent,
    LocationComponent,
    ErrorMessageDirective,
    LabelDirective,
    RolesPermissionsDirective,
    TokenDirective,
    ExtensionsPipe,
    DateFormatPipe,
    RolePipe,
    ActivePipe,
    UserStatePipe,
    SizesPipe,
    FileListComponent,
    FileUploadComponent,
    ImageUploadComponent,
    HeaderFormComponent,
    StatePipe,
    HelpFieldComponent,
    ErrorsFieldComponent,
    SelecetedPipe,
    VisibleComponent,
    ButtonActionComponent,
    MapComponent,
    RequiredPipe,
    RequiredSeverityPipe,
    EnabledPipe,
    EnabledSeverityPipe,
    YesNoPipe,
    MenuModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkeletonModule,
    TableModule,
    ProgressBarModule,
    PaginatorModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    TooltipModule,
    FileUploadModule,
    MessageModule,
    InputTextareaModule,
    DividerModule,
    CardModule,
    OverlayPanelModule,
    TagModule,
    PanelMenuModule,
    SidebarModule,
    SpeedDialModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    PanelModule,
    DialogModule,
    MenuModule
  ],
  providers: [ConfirmationService]
})
export class SharedModule {
}
