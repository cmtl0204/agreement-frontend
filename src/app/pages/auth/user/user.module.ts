import {NgModule} from '@angular/core';
import {CommonModule as NgCommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from 'primeng/checkbox';
import {RippleModule} from "primeng/ripple";
import {TableModule} from 'primeng/table';
import {MessageModule} from "primeng/message";
import {UserComponent} from './user.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextModule} from 'primeng/inputtext';
import {SharedModule} from '@shared/shared.module';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {CardModule} from "primeng/card";
import {ToastModule} from "primeng/toast";
import {PaginatorModule} from "primeng/paginator";
import {KeyFilterModule} from "primeng/keyfilter";
import {DialogModule} from "primeng/dialog";
import {ProfileComponent} from './profile/profile.component';
import {AuthModule} from "../auth.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {PanelModule} from "primeng/panel";
import {MenuModule} from 'primeng/menu';
import {TagModule} from "primeng/tag";
import {DividerModule} from "primeng/divider";
import {AccordionModule} from "primeng/accordion";
import {UserInformationComponent} from "./profile/user-information/user-information.component";
import {UserProfileComponent} from "./profile/user-profile/user-profile.component";
import {MultiSelectModule} from "primeng/multiselect";
import {SplitButtonModule} from "primeng/splitbutton";
import {BadgeModule} from 'primeng/badge';
import {AuthenticationModule} from "../authentication/authentication.module";
import {SidebarModule} from "primeng/sidebar";
import {PanelMenuModule} from "primeng/panelmenu";
import {AvatarModule} from "primeng/avatar";
import {FileUploadModule} from "primeng/fileupload";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputGroupModule} from "primeng/inputgroup";

@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    UserListComponent,
    ProfileComponent,
    UserInformationComponent,
    UserProfileComponent,
  ],
  imports: [
    NgCommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    AuthenticationModule,
    SharedModule,

    //PrimeNg
    BadgeModule,
    ButtonModule,
    CardModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    InputSwitchModule,
    InputTextModule,
    KeyFilterModule,
    MenuModule,
    MessageModule,
    PaginatorModule,
    PanelModule,
    PasswordModule,
    RippleModule,
    TableModule,
    TagModule,
    ToolbarModule,
    TooltipModule,
    ToastModule,
    DividerModule,
    AccordionModule,
    MultiSelectModule,
    SplitButtonModule,
    SidebarModule,
    PanelMenuModule,
    AvatarModule,
    FileUploadModule,
    OverlayPanelModule,
    InputGroupModule,
  ]
})
export class UserModule {
}
