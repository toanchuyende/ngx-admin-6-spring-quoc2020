import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CrudPostRoutingModule } from "./crud-post-routing.module";
import { CrudPostEditComponent } from "./crud-post-edit/crud-post-edit.component";
import {
  ButtonViewComponent,
  CrudPostListComponent,
} from "./crud-post-list/crud-post-list.component";
import { CrudPostCreateComponent } from "./crud-post-create/crud-post-create.component";
import { CrudPostComponent } from "./crud-post.component";

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

import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [
    CrudPostComponent,
    CrudPostEditComponent,
    CrudPostListComponent,
    ButtonViewComponent,
    CrudPostCreateComponent,
  ],
  imports: [
    CommonModule,
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
    CKEditorModule,


    CrudPostRoutingModule,
  ],
})
export class CrudPostModule {}
