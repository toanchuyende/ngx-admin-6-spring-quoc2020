import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbActionsModule, NbAlertModule, NbBadgeModule, NbButtonModule, NbCardModule, NbChatModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbRadioModule, NbSelectModule, NbSidebarModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { AgileRegisterComponent } from './agile-register/agile-register.component';
import { AgileViewMyProfileComponent } from './agile-view-my-profile/agile-view-my-profile.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ng2-ckeditor';
import { MiscellaneousModule } from 'app/pages/miscellaneous/miscellaneous.module';
import { FormsModule as ngFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginComponent, AgileRegisterComponent, AgileViewMyProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
    NbIconModule,


    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbBadgeModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,

    NbSelectModule,

    ngFormsModule,

    NbLayoutModule,
    NbSidebarModule,
    CKEditorModule,
    NbChatModule,
    MiscellaneousModule,


    AuthRoutingModule
  ]
})
export class AuthModule { }
