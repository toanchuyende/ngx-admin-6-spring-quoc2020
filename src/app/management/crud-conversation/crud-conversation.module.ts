import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudConversationRoutingModule } from './crud-conversation-routing.module';
import { CrudConversationComponent } from './crud-conversation.component';
import { ConversationButtonViewComponent, CrudConversationListComponent } from './crud-conversation-list/crud-conversation-list.component';
import { CrudConversationCreateComponent } from './crud-conversation-create/crud-conversation-create.component';

import {
  NbActionsModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbChatModule,
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
import { ConversationOpenComponent } from './conversation-open/conversation-open.component';
import { MiscellaneousModule } from 'app/pages/miscellaneous/miscellaneous.module';

@NgModule({
  declarations: [ConversationButtonViewComponent, CrudConversationComponent, CrudConversationListComponent, CrudConversationCreateComponent, ConversationOpenComponent],
  imports: [
    CommonModule,
    CrudConversationRoutingModule,

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

  ]
})
export class CrudConversationModule { }
