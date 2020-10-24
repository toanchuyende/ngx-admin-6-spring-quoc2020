import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from 'app/pages/miscellaneous/not-found/not-found.component';
import { ConversationOpenComponent } from './conversation-open/conversation-open.component';
import { CrudConversationCreateComponent } from './crud-conversation-create/crud-conversation-create.component';
import { CrudConversationListComponent } from './crud-conversation-list/crud-conversation-list.component';
import { CrudConversationComponent } from './crud-conversation.component';

const routes: Routes = [
  {
    path: "",
    component: CrudConversationComponent,
    children: [
      {
        path: 'list',
        component: CrudConversationListComponent,
      },
      // {
      //   path: 'edit',
      //   component: CrudConversationEditComponent,
      // },
      {
        path: 'create',
        component: CrudConversationCreateComponent,
      },
      {
        path: 'open',
        component: ConversationOpenComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudConversationRoutingModule { }
