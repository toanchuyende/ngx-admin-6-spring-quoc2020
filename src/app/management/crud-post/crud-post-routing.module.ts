import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from 'app/pages/miscellaneous/not-found/not-found.component';
import { CrudPostCreateComponent } from './crud-post-create/crud-post-create.component';
import { CrudPostEditComponent } from './crud-post-edit/crud-post-edit.component';
import { CrudPostListComponent } from './crud-post-list/crud-post-list.component';
import { CrudPostComponent } from './crud-post.component';

const routes: Routes = [
  {
    path: "",
    component: CrudPostComponent,
    children: [
      {
        path: 'list',
        component: CrudPostListComponent,
      },
      {
        path: 'edit',
        component: CrudPostEditComponent,
      },
      {
        path: 'create',
        component: CrudPostCreateComponent,
      },
      // {
      //   path: 'miscellaneous',
      //   loadChildren: () => import('./miscellaneous/miscellaneous.module')
      //     .then(m => m.MiscellaneousModule),
      // },
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
//   { path: "", redirectTo: "post", pathMatch: "full" },
//   { path: "**", redirectTo: "post" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudPostRoutingModule { }
