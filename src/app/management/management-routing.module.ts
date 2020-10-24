import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AgileChatComponent } from 'app/pages/agile-chat/agile-chat.component';
import { NotFoundComponent } from 'app/pages/miscellaneous/not-found/not-found.component';
import { ManagementComponent } from './management.component';

const routes: Routes = [
  {
    path: "",
    component: ManagementComponent,
    children: [
      {
        path: 'post',
        loadChildren: () =>
        import("./crud-post/crud-post.module").then((m) => m.CrudPostModule),
      },
      {
        path: 'conversation',
        loadChildren: () =>
        import("./crud-conversation/crud-conversation.module").then((m) => m.CrudConversationModule),
      },
      {
        path: 'chat',
        component: AgileChatComponent,
      },
      // {
      //   path: 'miscellaneous',
      //   loadChildren: () => import('./miscellaneous/miscellaneous.module')
      //     .then(m => m.MiscellaneousModule),
      // },
      {
        path: '',
        redirectTo: 'post',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]
  },
//   { path: "", redirectTo: "post", pathMatch: "full" },
//   { path: "**", redirectTo: "post" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
