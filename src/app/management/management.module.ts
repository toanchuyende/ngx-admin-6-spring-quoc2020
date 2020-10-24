import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ManagementRoutingModule } from "./management-routing.module";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
} from "@nebular/theme";
import { NbAuthModule } from "@nebular/auth";
import { CrudPostComponent } from "./crud-post/crud-post.component";
import { ManagementComponent } from "./management.component";
import { ThemeModule } from "app/@theme/theme.module";
import { PagesModule } from "app/pages/pages.module";

@NgModule({
  declarations: [ManagementComponent],
  imports: [
    ManagementRoutingModule,
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
    PagesModule,
  ],
})
export class ManagementModule {}
