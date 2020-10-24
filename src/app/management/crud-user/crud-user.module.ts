import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudUserRoutingModule } from './crud-user-routing.module';
import {
  NbActionsModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbRadioModule,
  NbSelectModule,
  NbSidebarModule,
  NbTreeGridModule,
  NbUserModule,
} from "@nebular/theme";
import { ThemeModule } from "app/@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { FormsModule as ngFormsModule } from "@angular/forms";
import { CrudUserComponent } from './crud-user.component';
import { CrudUserListComponent } from './crud-user-list/crud-user-list.component';
import { CrudUserEditComponent } from './crud-user-edit/crud-user-edit.component';
import { CrudUserCreateComponent } from './crud-user-create/crud-user-create.component';
import { CrudUserDeleteComponent } from './crud-user-delete/crud-user-delete.component';


@NgModule({
  declarations: [CrudUserComponent, CrudUserListComponent, CrudUserEditComponent, CrudUserCreateComponent, CrudUserDeleteComponent],
  imports: [
    CommonModule,
    CrudUserRoutingModule,
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
    NbIconModule,
    ngFormsModule,

    NbLayoutModule,
    NbSidebarModule,

  ]
})
export class CrudUserModule { }
